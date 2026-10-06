// Inlines Leaflet's CSS and the world map data into src/app.html -> index.html (the artifact can't fetch them at runtime).
const fs = require('fs');
const html = fs.readFileSync('src/app.html', 'utf8')
  .split('/*@LEAFLET_CSS@*/').join(fs.readFileSync('src/leaflet.css', 'utf8'))
  .split('/*@WORLD@*/').join(fs.readFileSync('src/world.json', 'utf8').trim());
new Function(html.match(/<script>([\s\S]*)<\/script>\s*$/)[1]); // syntax check
fs.writeFileSync('index.html', html);
console.log('index.html', html.length, 'bytes');
