# osm-qa-filter [![Build Status](https://travis-ci.org/lukasmartinelli/osm-qa-filter.svg?branch=master)](https://travis-ci.org/lukasmartinelli/) [![BSD-3 license](https://img.shields.io/badge/license-BSD--3-blue.svg)](https://tldrlegal.com/license/mit-license)

A [Tile Reduce](https://github.com/mapbox/tile-reduce) processor to extract GeoJSON features from the [OSM QA Tiles](osmlab.github.io/osm-qa-tiles/)
using [Mapbox GL feature filters](https://www.mapbox.com/mapbox-gl-style-spec/#types-filter).

## Run

First install the required dependencies. You need a new Node version (`> 5`).

```bash
npm install -g osm-qa-filter
```

Now download the [Mapbox QA Tiles](https://www.mapbox.com/blog/osm-qa-tiles/).
You can either download the entire planet or a smaller country extract.

```bash
wget https://s3.amazonaws.com/mapbox/osm-qa-tiles/latest.country/liechtenstein.mbtiles.gz
gunzip liechtenstein.mbtiles.gz
```

Invoke `osm-qa-filter` file with the planet file and output GeoJSON file.

```bash
osm-qa-filter -m planet.mbtiles -o postbox.geojson \
    --filter '["all", ["==", "amenity", "post_box"], ["$type", "==", "Point"]]'
```
