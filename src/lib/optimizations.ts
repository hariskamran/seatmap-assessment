import { Section, AbsoluteSeat, SpatialGrid } from '@/types';

const GRID_CELL_SIZE = 60;

export const buildSpatialIndex = (
  sections: Section[],
  mapWidth: number,
  mapHeight: number,
): SpatialGrid => {
  const cells = new Map<string, AbsoluteSeat[]>();

  sections.forEach(section => {
    const { x: sx, y: sy, scale } = section.transform;
    section.rows.forEach(row => {
      row.seats.forEach(seat => {
        // Calculate absolute position (ignoring rotation as MapSection does)
        const absX = sx + seat.x * scale;
        const absY = sy + seat.y * scale;

        const absSeat: AbsoluteSeat = {
          ...seat,
          absX,
          absY,
          sectionLabel: section.label,
          row, // Keep reference
          scale,
        };

        // Determine grid cell
        const cx = Math.floor(absX / GRID_CELL_SIZE);
        const cy = Math.floor(absY / GRID_CELL_SIZE);
        const key = `${cx},${cy}`;

        if (!cells.has(key)) cells.set(key, []);
        cells.get(key)!.push(absSeat);
      });
    });
  });

  return { cells, cellSize: GRID_CELL_SIZE, width: mapWidth, height: mapHeight };
};

export const getVisibleSeats = (
  grid: SpatialGrid | null,
  scrollLeft: number,
  scrollTop: number,
  clientWidth: number,
  clientHeight: number,
): AbsoluteSeat[] => {
  if (!grid) return [];

  const BUFFER = 30; // Pixel buffer
  const startX = Math.floor((scrollLeft - BUFFER) / grid.cellSize);
  const startY = Math.floor((scrollTop - BUFFER) / grid.cellSize);
  const endX = Math.floor((scrollLeft + clientWidth + BUFFER) / grid.cellSize);
  const endY = Math.floor((scrollTop + clientHeight + BUFFER) / grid.cellSize);

  const visibleSeats: AbsoluteSeat[] = [];

  for (let x = startX; x <= endX; x++) {
    for (let y = startY; y <= endY; y++) {
      const cellSeats = grid.cells.get(`${x},${y}`);
      if (cellSeats) {
        // Optional: Further refine by checking exact seat bounds here if needed
        visibleSeats.push(...cellSeats);
      }
    }
  }

  return visibleSeats;
};
