mapboxgl.accessToken = 'pk.eyJ1IjoiamRlaXNjaGVyIiwiYSI6ImNqbzNmMWxjODB3anozcHF5djk4eWR6M3QifQ.Vdoh3NqDKBWCD9LZ_lj1sA';

var map = new mapboxgl.Map({
  container: 'map', //container
  style: 'mapbox://styles/mapbox/satellite-v9', //style URL
  center: [-104.82, 39.99], //Starting position
  zoom: 10,
  pitch: 70,
  bearing: 330
});


map.on('load', function() {
  map.addSource('mapbox-dem', {
    'type': "raster-dem",
    'url': "mapbox://mapbox.mapbox-terrain-dem-v1",
    'tileSize': 512,
    'maxzoom': 14
  });
  //add the DEM source as a terrain layer with exaggerated height
  map.setTerrain({
    "source": "mapbox-dem",
    'exaggeration': 3
  });

  //add a sky layer that will show when map is highly pitched
  map.addLayer({
    'id': 'sky',
    'type': 'sky',
    'paint': {
      'sky-type': 'atmosphere',
      'sky-atmosphere-sun-intensity': 5
    }
  });



  map.addSource('mhfd-streams', {
    type: 'vector',
    url: 'mapbox://jdeischer.057emi8x'
  });


  //Drainageway centerline
  map.addLayer({
    'id': 'streams',
    'type': 'line',
    'source': 'mhfd-streams',
    'source-layer': 'Streams-ccrdd9',
    'paint': {
      'line-width': 1,
      'line-opacity': 1,
      'line-color': 'rgba(0,77,168,1)'
    },
    'layout': {
      'visibility': 'visible'
    }
  });
  //
  // //  Contours - 2FT
  // map.addLayer({
  //   'id': 'contour-2ft',
  //   'type': 'line',
  //   'source': 'contours',
  //   'source-layer': 'clipped_contours-2tvf5k',
  //   'filter': ['all', ['==', 'INDEX', 0]],
  //   'layout': {
  //     'line-join': 'round',
  //     'visibility': 'none',
  //     'line-cap': 'round'
  //   },
  //   'paint': {
  //     'line-width': {
  //       "stops": [
  //         [13, 1],
  //         [17, 1.75],
  //         [19, 2.5]
  //       ]
  //     },
  //     'line-color': 'gray'
  //   }
  // }, 'road_label');


  //Drainageway Centerline LABEL
  map.addLayer({
    'id': 'streamsLabels',
    'type': 'symbol',
    'source': 'mhfd-streams',
    'source-layer': 'Streams-ccrdd9',
    'layout': {
      'symbol-placement': 'line',
      'symbol-spacing': 100,
      'text-field': '{str_name}',
      'text-size': {
        "stops": [
          [15, 12],
          [17, 14],
          [19, 16]
        ]
      },
      "text-padding": 100,
    },
    'paint': {
      'text-color': 'rgba(0,77,168,1)',
      'text-halo-color': '#ffffff',
      'text-halo-width': 2,
      'text-halo-blur': 1
    }
  });





});
