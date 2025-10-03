This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy is with [Vercel](https://vercel.com/). Steps:

1. Push this repo to GitHub, GitLab, or Bitbucket.
2. Import the repo in Vercel and select the root folder.
3. Framework preset: Next.js (auto-detected).
4. Click Deploy. Your site will build and get a production URL.

Docs: Next.js [deployment guide](https://nextjs.org/docs/app/building-your-application/deploying) and Vercel [docs](https://vercel.com/docs).

---

## Customize

- Edit content in `app/page.tsx` (Hero, About, Skills, Products, Projects, Contact).
- Edit metadata and language in `app/layout.tsx` (`export const metadata`, `<html lang="en">`).
- Global styles in `app/globals.css` (Tailwind v4, smooth scrolling, selection colors).
- Static assets in `public/` (e.g., add a profile image and reference it in the Hero).

## Useful scripts

```bash
npm run dev     # start dev server (http://localhost:3000)
npm run build   # production build
npm start       # start production server after build
npm run lint    # run ESLint
```

## Project structure (key files)

- `app/layout.tsx` – root layout, global metadata, html lang
- `app/page.tsx` – landing page with sections (Hero, About, Skills, Products, Projects, Contact)
- `app/globals.css` – Tailwind v4 import and base theme
- `public/` – static files (icons, images)

## Notes

- Tailwind v4 syntax is used (e.g., `@import "tailwindcss"`).
- A linter may warn about `@theme` in `globals.css`; this is expected and safe with Tailwind v4.

## Next steps

- Replace placeholder contact email and social links in `app/page.tsx`.
- Add real projects and (optionally) product descriptions/icons.
- Add a profile image to `public/` and feature it in the Hero.
