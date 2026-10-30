import type { ReactNode } from "react";

/** Minimal, safe Markdown renderer: builds React elements only, never injects raw HTML. */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\[[^\]]+\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("`")) out.push(<code key={i++}>{tok.slice(1, -1)}</code>);
    else if (tok.startsWith("**")) out.push(<strong key={i++}>{tok.slice(2, -2)}</strong>);
    else {
      const label = tok.slice(1, tok.indexOf("]"));
      out.push(
        <a key={i++} href={m[3]} rel="noopener noreferrer">
          {label}
        </a>,
      );
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function Markdown({ source }: { source: string }) {
  const blocks = source.replace(/\r\n/g, "\n").split(/\n{2,}/);
  const nodes: ReactNode[] = [];
  let inFence = false;
  let fence: string[] = [];

  blocks.forEach((block, idx) => {
    if (inFence) {
      fence.push(block);
      if (block.includes("```")) {
        nodes.push(
          <pre key={idx}>
            <code>{fence.join("\n\n").replace(/```\w*\n?/g, "").replace(/\n?```\s*$/, "")}</code>
          </pre>,
        );
        inFence = false;
        fence = [];
      }
      return;
    }
    const t = block.trim();
    if (t.startsWith("```")) {
      if (t.slice(3).includes("```")) {
        nodes.push(
          <pre key={idx}>
            <code>{t.replace(/^```\w*\n?/, "").replace(/\n?```$/, "")}</code>
          </pre>,
        );
      } else {
        inFence = true;
        fence = [t];
      }
    } else if (t.startsWith("## ")) nodes.push(<h2 key={idx}>{inline(t.slice(3))}</h2>);
    else if (t.startsWith("### ")) nodes.push(<h3 key={idx}>{inline(t.slice(4))}</h3>);
    else if (/^[-*] /.test(t))
      nodes.push(
        <ul key={idx}>
          {t.split("\n").map((l, j) => (
            <li key={j}>{inline(l.replace(/^[-*] /, ""))}</li>
          ))}
        </ul>,
      );
    else if (/^\d+\. /.test(t))
      nodes.push(
        <ol key={idx}>
          {t.split("\n").map((l, j) => (
            <li key={j}>{inline(l.replace(/^\d+\. /, ""))}</li>
          ))}
        </ol>,
      );
    else if (t) nodes.push(<p key={idx}>{inline(t.replace(/\n/g, " "))}</p>);
  });

  return <div className="prose-md">{nodes}</div>;
}
