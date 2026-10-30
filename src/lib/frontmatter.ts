/**
 * Minimal front-matter parser for article files. Supports `key: value` lines with
 * strings (quoted or bare), booleans, and inline arrays like ["a", "b"]. No nested YAML.
 */
export type FrontMatter = Record<string, string | boolean | string[]>;

function unquote(v: string): string {
  const t = v.trim();
  return (t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'")) ? t.slice(1, -1) : t;
}

function parseValue(raw: string): string | boolean | string[] {
  const v = raw.trim();
  if (v === "true") return true;
  if (v === "false") return false;
  if (v.startsWith("[") && v.endsWith("]")) {
    return v
      .slice(1, -1)
      .split(",")
      .map(unquote)
      .filter((s) => s.length > 0);
  }
  return unquote(v);
}

export function parseFrontMatter(source: string): { data: FrontMatter; content: string } {
  const text = source.replace(/\r\n/g, "\n");
  const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(text);
  if (!match) return { data: {}, content: text };
  const data: FrontMatter = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx < 1 || line.trimStart().startsWith("#")) continue;
    data[line.slice(0, idx).trim()] = parseValue(line.slice(idx + 1));
  }
  return { data, content: match[2] };
}
