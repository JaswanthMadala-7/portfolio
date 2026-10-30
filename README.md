# Jaswanth Madala: personal portfolio

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. Static pages, one server route for the contact form, no database.

**Requires Node.js 20.9 or newer** (developed on Node 22).

## Run locally

```bash
npm ci
cp .env.example .env.local   # then edit
npm run dev                  # http://localhost:3000
```

Checks:

```bash
npm run lint
npm run typecheck
npm test                      # unit tests (Vitest)
npm run build && npm start    # production build
npx playwright install chromium   # first time only
npm run test:e2e              # end-to-end tests; builds and serves the site itself
```

If your environment already has a Chromium, set `PW_CHROMIUM_PATH` to its executable instead of installing one.
Set `E2E_PORT` to change the test server port (default 3100).

## Update content (no component edits needed)

| Task | File |
| --- | --- |
| Name, headline, about text, skills, email, social links, resume flag, site URL | `src/content/site.ts` |
| Add, edit, hide a project | `src/content/projects.ts` (`published: false` hides it) |
| Add a role to the timeline | `src/content/experience.ts` |
| Publish an article | add `content/writing/<slug>.md` with front matter (see `content/writing/README.md`); it is public only when `draft: false` |
| Replace the resume | put your PDF at `public/resume.pdf`, set `resume.available: true` in `site.ts` |
| Social links | `socials` in `site.ts`; entries with an empty `href` are hidden |

Rules the content files follow: no confidential employer details, no invented links or metrics, and professional work is labeled as employer work.

## Environment variables

See `.env.example`. Secrets are server-only; never prefix them with `NEXT_PUBLIC_`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used for metadata, sitemap, robots, structured data |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact form delivery through Resend |
| `NOINDEX` | Set `true` to block indexing on a deployment |

Until `NEXT_PUBLIC_SITE_URL` is set to a real domain, the site serves `noindex` and a `Disallow: /` robots.txt. Vercel preview deployments are also `noindex`.

### Email delivery (Resend)

1. Create a Resend account (free tier available; check current limits and pricing).
2. Create an API key and set the three variables in `.env.local` and in your hosting provider.
3. For `CONTACT_FROM_EMAIL`, use Resend's test sender while developing. For production, verify your sending domain in Resend and add the SPF/DKIM DNS records Resend shows you.

If email is not configured, the form reports that delivery is unavailable. It never claims a message was sent.

## Deploy (Vercel)

1. Push this folder to a Git repository (GitHub, GitLab, or Bitbucket).
2. In Vercel, import the repository. Framework preset: Next.js. No build settings needed.
3. Add the environment variables above for Production, and for Preview if you want to test email there.
4. Deploy. Each branch gets a preview URL; the default branch deploys to production.
5. Open the production URL and run the checklist below.

Vercel's free Hobby plan is intended for non-commercial personal use; check current terms. Resend and any analytics may incur charges beyond free tiers. Nothing here purchases a service.

## Connect a custom domain later

1. Buy the domain from a registrar.
2. In Vercel: Project, Settings, Domains, add the domain. Vercel shows the exact DNS records to create (typically an A record for the apex and a CNAME for `www`). Use only the values Vercel displays.
3. In your registrar's DNS panel, create those records. Remove conflicting old records.
4. Choose the primary version (apex or `www`) in Vercel; it redirects the other to it.
5. Wait for DNS propagation (minutes to hours). Verify with `nslookup your-domain` or an online DNS checker; Vercel shows the domain as valid when ready and issues HTTPS automatically.
6. Set `NEXT_PUBLIC_SITE_URL=https://your-domain` in Vercel Production variables and redeploy. This updates canonical URLs, sitemap, Open Graph, and enables indexing.
7. If you send mail from your domain, verify it in Resend and add the SPF and DKIM records Resend provides.
8. Verify: HTTPS padlock, `/sitemap.xml` and `/robots.txt` use the new domain, both domain variants redirect correctly, send a test contact message.

## Security notes

- Server-side validation (Zod) on every field, JSON-only, 12 KB body limit, same-origin check, honeypot field, and header-injection protection.
- Rate limiting is in memory per server instance. On serverless hosting it is best-effort only; use a shared store such as Upstash Redis for strict limits.
- Security headers (CSP, HSTS, frame, referrer, permissions) are set in `next.config.ts`. The CSP allows inline scripts because Next.js needs them without nonce middleware; tighten with nonces if desired.
- Article Markdown is rendered to React elements only; raw HTML is not injected.
- Messages are not stored. There is no admin dashboard.
- `npm audit --omit=dev` reported 0 vulnerabilities when this was built. Dev-tool advisories may remain; re-run audits periodically.

## Launch checklist

- [ ] Real public email in `site.ts` (optional but recommended as a fallback)
- [ ] GitHub and LinkedIn URLs
- [ ] Resume PDF in `public/resume.pdf` and `resume.available: true`
- [ ] Verified experience entries (or leave the empty state)
- [ ] Education institution and years (optional)
- [ ] Review each project entry; confirm nothing exposes confidential employer details and that your employer permits describing the work
- [ ] Add public demo/source links only if they exist
- [ ] Resend configured; send a real test message
- [ ] Privacy page reviewed for accuracy
- [ ] Domain connected and `NEXT_PUBLIC_SITE_URL` set
- [ ] Run Lighthouse on the deployed site
