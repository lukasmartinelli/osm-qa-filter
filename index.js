'use strict';

const tileReduce = require('tile-reduce');
const path = require('path');
const fs = require('fs');
const stringify = require('stringify-stream');
const geoJSONStream = require('geojson-stream');
const program = require('commander');

program
    .option('-o, --geojson-file <f>', 'GeoJSON target file')
    .option('-f, --filter <ff>', 'Feature filter')
    .option('-m, --mbtiles-file <f>', 'MBTiles source file')
    .option('--json-lines', 'Output line delimited GeoJSON')
    .parse(process.argv);

if(program.mbtilesFile && program.geojsonFile && program.filter) {
    const outputStream = fs.createWriteStream(program.geojsonFile);
    let featureStream = geoJSONStream.stringify();
    if (program.jsonLines) {
      featureStream = stringify();
    }
    featureStream.pipe(outputStream);

    let foundFeatureCount = 0;
    tileReduce({
      zoom: 12,
      map: path.join(__dirname, '/map.js'),
      mapOptions: {
        filter: JSON.parse(program.filter),
      },
      sources: [{
        name: 'osm',
        mbtiles: path.normalize(program.mbtilesFile),
        raw: false
      }]
    })
    .on('reduce', (features, tile) => {
      foundFeatureCount += features.length;
      features.forEach(function(ft) {
        featureStream.write(ft);
      });
    })
    .on('end', () => {
      featureStream.end();
      console.log('Total found features: %d', foundFeatureCount);
    });
} else {
    program.help();
}
