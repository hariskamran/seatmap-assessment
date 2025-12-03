# Seatmap Assessment

This is a [Next.js](https://nextjs.org) project for the frontend developer assessment.

## Live Demo
[https://seatmap-assessment.vercel.app/](https://seatmap-assessment.vercel.app/)

## Status
- **Basic Requirements**: ✅ Completed
- **Stretch Goals**: ✅ Dark mode toggle added

## Getting Started

### Simple Run

First, run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Data Generation Scripts

This project includes scripts to generate venue configurations (small or large).

**Generate Small Venue:**
```bash
pnpm run generate-small-venue
```
*(Runs `node ./scripts/generate-venue.js --small`)*

**Generate Large Venue:**
```bash
pnpm run generate-large-venue
```
*(Runs `node ./scripts/generate-venue.js --large`)*

## Technologies
- Next.js
- TypeScript
- TailwindCSS
- shadcn/ui
- Zustand
