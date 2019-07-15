// Using Leaflet

// initialize the map

var mapWorld = L.map('map-world', {
    center: [30, -20],
    zoom: 1,
    maxBounds: [
      [90,-180],
      [-90, 180]
    ],
    minZoom: 1,
    maxZoom: 18,
});

// load and display tile layers on the map

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYmFuZ2h1YXpoYW8iLCJhIjoiY2p4ZTR2aDMwMGtwdTN5dGpjaTRiNnRkNiJ9.wiNyoPlj7m1aW5_pKFrT_Q', {
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYmFuZ2h1YXpoYW8iLCJhIjoiY2p4ZTR2aDMwMGtwdTN5dGpjaTRiNnRkNiJ9.wiNyoPlj7m1aW5_pKFrT_Q',
    noWrap: true,
}).addTo(mapWorld);


// create GeoJSON layers

var geoJsonLayer_usa = L.geoJSON(usa_geojson, {
  country: "usa",
  style: {
    color: 'blue',
    opacity: 0.8,
    fillOpacity: 0.5,
  },
  onEachFeature: onEachFeature
}).addTo(mapWorld);

var geoJsonLayer_china = L.geoJSON(china_geojson, {
  country: "china",
  style: {
    color: 'red',
    opacity: 0.5,
  },
  onEachFeature: onEachFeature
}).addTo(mapWorld);


function onEachFeature(feature, layer) {

  layer.on('mouseover', function(e) {
    layer.setStyle({
      opacity: 0.8,
    })
  })

  layer.on('mouseout', function(e) {
    layer.setStyle({
      opacity: 0.5,
    })
    if (layer.options.fillOpacity == 0.5) {
      layer.setStyle({
        opacity: 0.8,
      })
    }
  })

  layer.on('click', function(e) {
    var i;

    for (i = 0; i < geoCountryArray.length; i++) {
      // reset opacity of world map
      geoCountryArray[i].geoJson.setStyle({
        opacity: 0.5,
        fillOpacity: 0.2
      })

      // clear place layers of country map
      mapCountry.removeLayer(geoCountryArray[i].places);
    }

    for (i = 0; i < geoCountryArray.length; i++) {
      if (layer.options.country == geoCountryArray[i].name) {
        mapCountry.panTo(geoCountryArray[i].center);
        mapCountry.addLayer(geoCountryArray[i].places);
        selectImagesToDisplay(geoCountryArray[i].name);
      }
    }

    layer.setStyle({
      opacity: 0.8,
      fillOpacity: 0.5
    })

  })
}


var mapCountry = L.map('map-country', {
    center: [38, -98.583333],
    zoom: 3,
    maxBounds: [
      [90,-180],
      [-90, 180]
    ],
    minZoom: 1,
    maxZoom: 18,
});

// load and display tile layers on the map

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYmFuZ2h1YXpoYW8iLCJhIjoiY2p4ZTR2aDMwMGtwdTN5dGpjaTRiNnRkNiJ9.wiNyoPlj7m1aW5_pKFrT_Q', {
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYmFuZ2h1YXpoYW8iLCJhIjoiY2p4ZTR2aDMwMGtwdTN5dGpjaTRiNnRkNiJ9.wiNyoPlj7m1aW5_pKFrT_Q',
    noWrap: true,
}).addTo(mapCountry);


// Create places marker

// usa places

var grandCanyon = L.marker([36.055261, -112.121836], {bounceOnAdd: true,}).bindPopup('Grand Canyon National Park'),
    yellowstone  = L.marker([44.6, -110.5], {bounceOnAdd: true,}).bindPopup('Yellowstone National Park'),
    yosemite     = L.marker([37.85, -119.55], {bounceOnAdd: true,}).bindPopup('Yosemite National Park'),
    deathValley = L.marker([36.241944, -116.825833], {bounceOnAdd: true,}).bindPopup('Death Valley National Park');

var places_usa = L.layerGroup([grandCanyon, yellowstone, yosemite, deathValley]).addTo(mapCountry);

// usa places

var biPengGou = L.marker([31.409077, 102.987486], {bounceOnAdd: true,}).bindPopup('毕棚沟 (Bi Peng Gou)'),
    duJiangyan  = L.marker([31.026503, 103.605399], {bounceOnAdd: true,}).bindPopup('都江堰 (Dujiangyan Irrigation System)'),
    chengDu  = L.marker([30.590642, 104.045148], {bounceOnAdd: true,}).bindPopup('成都 (Chengdu)'),
    wuHa    = L.marker([30.597084, 114.299094], {bounceOnAdd: true,}).bindPopup('武汉 (Wuhan)');

var places_china = L.layerGroup([biPengGou, duJiangyan, chengDu, wuHa]).addTo(mapCountry);


var geo_usa = {
  name: "usa",
  center: [38, -98.583333],
  zoom: 3,
  places: places_usa,
  geoJson: geoJsonLayer_usa,
}

var geo_china = {
  name: "china",
  center: [38, 106],
  zoom: 3,
  places: places_china,
  geoJson: geoJsonLayer_china
}

var geoCountryArray = [
  geo_usa,
  geo_china
]

selectImagesToDisplay(geo_usa.name);

function selectImagesToDisplay(selectedClass) {

  $(".img-gallery").fadeTo(100, 0.1);

  $(".img-gallery div").not("." + selectedClass).fadeOut();

  setTimeout(function() {
    $("." + selectedClass).fadeIn();
    $(".img-gallery").fadeTo(300, 1);
  }, 300);
};
