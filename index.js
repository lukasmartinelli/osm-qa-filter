#!/usr/bin/env node
'use strict';

const tileReduce = require('tile-reduce');
const path = require('path');
const fs = require('fs');
const program = require('commander');

program
    .option('-o, --geojson-file <f>', 'GeoJSON target file')
    .option('-f, --filter <ff>', 'Feature filter')
    .option('-m, --mbtiles-file <f>', 'MBTiles source file')
    .parse(process.argv);

if(program.mbtilesFile && program.geojsonFile && program.filter) {
    const outputStream = fs.createWriteStream(program.geojsonFile);

    let foundFeatureCount = 0;
    tileReduce({
      zoom: 12,
      map: path.join(__dirname, '/map.js'),
      mapOptions: {
        filter: JSON.parse(program.filter),
      },
      output: outputStream,
      sources: [{
        name: 'osm',
        mbtiles: path.normalize(program.mbtilesFile),
        raw: false
      }]
    })
    .on('reduce', (featureCount, tile) => {
      foundFeatureCount += featureCount;
    })
    .on('end', () => {
      outputStream.end();
      console.log('Total found features: %d', foundFeatureCount);
    });
} else {
    program.help();
}
