/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const isLarge = args.includes('--large');

let config;

if (isLarge) {
  // Large 15000+
  config = {
    VENUE_WIDTH: 5000,
    VENUE_HEIGHT: 4600,
    SEAT_SIZE: 30,
    SEAT_GAP: 5,
    SECTIONS: [
      { id: 'A', label: 'North', x: 0, y: 30, rows: 62, cols: 62 },
      { id: 'B', label: 'South', x: 0, y: 2300, rows: 62, cols: 62 },
      { id: 'C', label: 'East', x: 2300, y: 30, rows: 62, cols: 62 },
      { id: 'D', label: 'West', x: 2300, y: 2300, rows: 62, cols: 62 },
    ],
  };
  console.log('Generating Large Venue configuration...');
} else {
  // Small 400 seat (Default)
  config = {
    VENUE_WIDTH: 1000,
    VENUE_HEIGHT: 1000,
    SEAT_SIZE: 30,
    SEAT_GAP: 5,
    SECTIONS: [
      { id: 'A', label: 'North', x: 0, y: 30, rows: 10, cols: 10 },
      { id: 'B', label: 'South', x: 0, y: 450, rows: 10, cols: 10 },
      { id: 'C', label: 'East', x: 400, y: 30, rows: 10, cols: 10 },
      { id: 'D', label: 'West', x: 400, y: 450, rows: 10, cols: 10 },
    ],
  };
  console.log('Generating Small Venue configuration...');
}

const { VENUE_WIDTH, VENUE_HEIGHT, SEAT_SIZE, SEAT_GAP, SECTIONS } = config;

const venue = {
  venueId: 'arena-01',
  name: 'Metropolis Arena',
  map: { width: VENUE_WIDTH, height: VENUE_HEIGHT },
  sections: [],
};

SECTIONS.forEach(sectionConfig => {
  const section = {
    id: sectionConfig.id,
    label: sectionConfig.label,
    transform: { x: sectionConfig.x, y: sectionConfig.y, scale: 1 },
    rows: [],
  };

  for (let r = 1; r <= sectionConfig.rows; r++) {
    const row = {
      index: r,
      seats: [],
    };

    for (let c = 1; c <= sectionConfig.cols; c++) {
      const statusRandom = Math.random();
      let status = 'available';
      if (statusRandom > 0.7) status = 'reserved';
      if (statusRandom > 0.8) status = 'sold';
      if (statusRandom > 0.95) status = 'held';

      // Simple layout logic
      const x = c * (SEAT_SIZE + SEAT_GAP);
      const y = r * (SEAT_SIZE + SEAT_GAP);

      // Price tier based on row
      let priceTier = 3;
      if (r < 10) priceTier = 1;
      else if (r < 30) priceTier = 2;

      row.seats.push({
        id: `${sectionConfig.id}-${r}-${c}`,
        col: c,
        x: Math.round(x),
        y: Math.round(y),
        priceTier,
        status,
      });
    }
    section.rows.push(row);
  }
  venue.sections.push(section);
});

const outputPath = path.join(__dirname, '../public/venue.json');
fs.writeFileSync(outputPath, JSON.stringify(venue, null, 2));
console.log(
  `Generated venue.json at ${outputPath} with ${venue.sections.reduce((acc, s) => acc + s.rows.reduce((a, r) => a + r.seats.length, 0), 0)} seats.`,
);
