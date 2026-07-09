# Numerical Methods

Astro static site for a multilingual numerical methods reference: theory,
derivations, solved exercises, formula sheets and exam-focused pages.

## Development

```sh
nvm use
npm install
npm run dev
```

Local URL:

```text
http://127.0.0.1:4321/es/
```

## Build

```sh
npm run build
```

The site builds static pages into `dist/`.

## Monetization Setup

Create `.env` from `.env.example` and set:

```sh
PUBLIC_SITE_URL=https://your-domain.com
PUBLIC_BMC_USERNAME=your-buymeacoffee-username
PUBLIC_KOFI_USERNAME=your-kofi-username
```

Recommended revenue order:

1. Direct support: Buy Me a Coffee or Ko-fi on derivations and solved exercises.
2. Owned products: premium PDF formula sheet, exam packs and solved exercise bank.
3. Ethical affiliates: calculators, books, tablets, math software or courses.
4. Sponsorships: clearly labeled placements for education or software brands.
5. Display ads: only after the site has enough traffic to justify the UX cost.

## Editorial Notes

Personal handwritten notes can be used as private reference for derivation style,
but should not be published directly unless explicitly prepared for publication.
