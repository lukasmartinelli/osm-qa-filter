'use strict';

const featureFilter = require('mapbox-gl-style-spec/lib/feature_filter');
const ff = featureFilter(global.mapOptions.filter)

module.exports = function(tileLayers, tile, write, done) {
  const layer = tileLayers.osm.osm;

  let features = [];
  for (var i = 0; i < layer.length; i++) {
    var ft = layer.feature(i);
    if (ff(ft)) {
      features.push(ft.toGeoJSON(tile[0], tile[1], tile[2]));
    }
  }

  features.forEach(function(feature) {
    write(JSON.stringify(feature) + '\n');
  });

  done(null, features.length);
};
