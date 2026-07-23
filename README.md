# Numidia Dental House - Phase 1

This is the front-end application for the Numidia Dental House website.

## Setup & Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables:
   Copy `.env.example` to `.env.local` and fill in the values if you have the n8n webhook ready. If no environment variables are set, the booking form will run in **Mock Mode** (simulated success).
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Where to edit content

- **UI Copy & Text:** Edit `src/content/fr.ts` for all French strings.
- **Clinic Facts (Phone, Address, etc):** Edit `src/config/clinic.ts`.
- **Services:** Edit `src/data/services.ts`.
- **Hours & Availability:** Edit `src/data/availability.ts`.
- **FAQ:** Edit `src/data/faq.ts`.

## Architecture Notes

- Built with Vite, React 18, TypeScript.
- Styling via vanilla Tailwind CSS, using strictly defined tokens in `src/styles/tokens.css` and `tailwind.config.ts`.
- Animations driven by Framer Motion (respects `prefers-reduced-motion`).
- The booking form submits to `api/book.ts` (a Vercel Serverless Function), which forwards the request to an n8n webhook.
