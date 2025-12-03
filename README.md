# Seatmap Assessment

This is a [Next.js](https://nextjs.org) project for the frontend developer assessment.

## Live Demo
[https://seatmap-assessment.vercel.app/](https://seatmap-assessment.vercel.app/)

## Status
- **Renders with 15K seats**
- **Basic Requirements**: ✅ Completed
- **Stretch Goals**: ✅ Dark mode toggle added

## Architecture

- **Framework**: Next.js 16 (App Router) with TypeScript.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) is used for global state (venue data, seat selection, viewport visibility). This avoids prop drilling and provides a centralized store for the application logic.
- **Data Fetching**: [SWR](https://swr.vercel.app/) is used for fetching venue data, providing caching and revalidation capabilities out of the box.
- **Styling**: TailwindCSS for utility-first styling and [shadcn/ui](https://ui.shadcn.com/) for reusable component primitives.
- **Rendering Strategy**: SVG is used for the seating map to ensure scalability and crisp rendering at different zoom levels.

### Trade-offs
- **SVG vs Canvas**: SVG was chosen for easier event handling (click/hover on individual elements) and accessibility (DOM nodes for screen readers) compared to Canvas. However, SVG can have performance bottlenecks with thousands of DOM elements, which is mitigated by virtualization.
- **Custom Virtualization**: A custom spatial grid implementation is used instead of a generic library to have fine-grained control over the coordinate system and transformations specific to the venue data.

## Performance

To meet the requirement of smooth interactions with ~15,000 seats, the following optimizations were implemented:

1.  **Spatial Grid Virtualization**:
    -   The application does not render all seats at once.
    -   A **Spatial Grid** (`src/lib/optimizations.ts`) indexes seats into fixed-size cells based on their absolute coordinates.
    -   During scroll, only seats within the visible viewport (plus a buffer) are queried and rendered. This drastically reduces the DOM node count and keeps the frame rate high.

2.  **Throttled Updates**:
    -   Scroll and resize events are handled using `requestAnimationFrame` via the `useVisibleSections` hook. This ensures that visibility calculations happen in sync with the browser's refresh rate.

3.  **Component Memoization**:
    -   The `Seat` component is wrapped in `React.memo` to prevent unnecessary re-renders when other parts of the state change.

4.  **Efficient State Updates**:
    -   Visibility calculations are performed centrally in the store, and updates are batched where possible.

## Limitations / Future Work

-   **Testing**: Currently, no unit or E2E tests are included.
-   **Mobile Gestures**: Pinch-to-zoom and panning interactions for mobile devices are not yet implemented (standard scrolling is used).
-   **Live Updates**: Real-time seat status updates via WebSockets are not implemented.

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
