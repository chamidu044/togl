# Trans Orbit Global Logistics — website

Marketing site for Trans Orbit Global Logistics (Pvt) Ltd, a freight forwarder in Colombo, Sri Lanka.

- **Stack:** Next.js 16 (App Router), Tailwind CSS 4, Motion, Aceternity UI components, Resend for email.
- **Pages:** `/` (single scrolling page with Services, Process and Network sections), `/services`, `/about`, `/contact`.

## Run it

```bash
pnpm install
cp .env.example .env.local   # then fill in the values, see "Contact form" below
pnpm dev                     # http://localhost:3000
```

| Script | What it does |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` / `pnpm start` | Production build and server |
| `pnpm lint` | ESLint |
| `pnpm generate:map` | Regenerate the dotted world maps in `public/maps` |

## Editing content

All copy lives in [`lib/content.ts`](lib/content.ts): company details, contact info, services, process steps, industries, mission and vision, and trade lanes.

## Contact form

The form (`/contact`) posts to a server action ([`app/contact/actions.ts`](app/contact/actions.ts)). The action validates the input, rejects bots (honeypot, minimum fill time, per-IP rate limit) and sends two emails with [Resend](https://resend.com):

1. The enquiry goes to `CONTACT_TO_EMAIL` (info@trans-orbit.lk). **Reply-To** is set to the visitor, so hitting Reply answers them directly.
2. A short acknowledgement goes to the visitor.

If the environment variables are missing, the form shows a message asking visitors to email info@trans-orbit.lk directly.

### Setup

1. Create a Resend account and an API key.
2. In Resend, add the domain `trans-orbit.lk` and add the DNS records it gives you (SPF and DKIM) at your DNS provider. Wait until the domain shows **Verified**.
3. Set these variables in `.env.local`, and in Vercel under **Project → Settings → Environment Variables**:

   ```
   RESEND_API_KEY=re_...
   CONTACT_TO_EMAIL=info@trans-orbit.lk
   CONTACT_FROM_EMAIL=Trans Orbit Website <website@trans-orbit.lk>
   ```

Before the domain is verified you can test with `CONTACT_FROM_EMAIL=Trans Orbit <onboarding@resend.dev>`. In that mode, Resend only delivers to the email address that owns the Resend account.

## Deploy

Push the repository to GitHub and import it in Vercel. The framework preset is detected automatically. Add the three environment variables, deploy, then point `trans-orbit.lk` at the Vercel project.

## Design notes

- **Structure and type:** follow [`apple.design.md`](apple.design.md).
  - SF Pro via the system font stack, with Inter as the fallback on non-Apple devices.
  - 17px body text; weights 300, 400, 600 and 700.
  - Full-bleed sections alternate white and mist, with pill-shaped CTAs.
- **Colors:** sampled from the logo. Tokens are in [`app/globals.css`](app/globals.css).
  - Navy `#243F7A`, blue `#2B519A`, teal `#1D6B91`, green `#00A558`, lime `#A7D046`.
  - The logo's lime-to-navy gradient is used sparingly: the hero globe, map lanes, glows and the scroll progress line.
- **Aceternity UI components** live in [`components/ui`](components/ui), re-themed to the brand. All are light theme only:
  - Resizable Navbar (glass pill)
  - Flip Words, Text Generate Effect
  - Globe (cobe), World Map
  - Apple Cards Carousel, Sticky Scroll Reveal, Infinite Moving Cards
  - Bento Grid, Glowing Effect, Card Spotlight
  - Tracing Beam, Pointer Highlight
  - Hover Border Gradient, Stateful Button, Signup Form inputs
- **Hero globe:** cobe draws land dots black on a light globe. A logo-gradient layer with `mix-blend-mode: lighten` recolours them.
- **Motion:** respects `prefers-reduced-motion` throughout.

## Credits

Photography from [Unsplash](https://unsplash.com), used under the Unsplash License.
