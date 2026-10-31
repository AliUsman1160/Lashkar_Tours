# Lashkar Tours — Pakistan Travel Website

A frontend-only Next.js (App Router) site for Lashkar Tours: destination guides, example tours, a gallery and a multi-step **Plan Your Trip** inquiry form with WhatsApp handoff.

Stack: Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide icons. There is no backend, database, API route or server action. The forms validate input and show a demo confirmation only.

## Running

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run build && npm start
```

On low-memory machines, limit build workers: `NEXT_BUILD_CPUS=1 npm run build` (PowerShell: `$env:NEXT_BUILD_CPUS=1; npm run build`).

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://www.example.com`) in production so canonical URLs, Open Graph tags and the sitemap use the real domain.

## Before going live — fill in verified details

Everything is edited in `data/`. Empty values are hidden, never invented.

| File | What to add |
| --- | --- |
| `data/site-config.ts` | **WhatsApp number** (international format, digits only, e.g. `923001234567`). Until it is set, WhatsApp buttons open WhatsApp (app on mobile, WhatsApp Web on desktop) with the message prefilled but no recipient, so the visitor has to choose a chat. Once set, chats open with Lashkar Tours directly. Also email, phone, address, social links, verified credentials and the logo path. |
| `data/testimonials.ts` | Replace the clearly labelled placeholders with genuine reviews and set `verified: true`. |
| `data/tours.ts` | Confirm or edit durations, and add `price`, `inclusions` and `exclusions` once they are confirmed. Without a price the site shows “Request a Custom Quote”. |
| `data/team.ts` | Optional team or guide profiles. The section stays hidden while this list is empty. |
| `data/destinations.ts` | Review seasonal and access notes each year, especially Neelum Valley access rules for foreign nationals. |
| `data/photos.ts` | Swap in company photography (put files in `/public/images` and use `/images/...` paths). |

## Content structure

- `data/destinations.ts`, `data/tours.ts`: these generate `/destinations/[slug]` and `/tours/[slug]` statically.
- `data/gallery.ts`: gallery items and categories. Filters only show categories that have photos.
- `data/faqs.ts`, `data/experiences.ts`, `data/form-options.ts`: FAQ content, homepage experiences, and form options such as budget bands and currencies.
- `lib/whatsapp.ts`: number validation, `wa.me` link building and message templates.
- `lib/trip-inquiry.ts`: form model, URL prefill and validation, with no React dependency.

The Plan Your Trip form accepts these query parameters: `?destination=hunza` (comma-separated values allowed), `?tour=<tour-slug>`, `?month=May` and `?travelers=4`.

## Photography

Destination photos come from independent photographers under the [Unsplash License](https://unsplash.com/license) and are stored in `public/images`. Each photo is credited in heroes and in the gallery lightbox. They show destinations, not Lashkar Tours trips or customers.
