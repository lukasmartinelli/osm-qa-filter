'use strict';

const featureFilter = require('mapbox-gl-style-spec/lib/feature_filter');
const ff = featureFilter(global.mapOptions.filter)

module.exports = function(tileLayers, tile, write, done) {
  const layer = tileLayers.osm.osm;
  const features = layer.features.filter(function(ft) {
    return ff(ft)
  })
  done(null, features);
};
