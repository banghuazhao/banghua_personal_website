// lazy loading

$(function() {
  $('.lazy').lazy({
    onError: function(element) {
        console.log('error loading ' + element.data('src'));
    }
  });
});


// fancybox

$('[data-fancybox="images"]').fancybox({
  buttons : [
    'slideShow',
    "thumbs",
    'close'
  ],
  thumbs : {
    autoStart : false
  }
});




// initialize the map ussing Leaflet

var map = L.map('map', {
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

var tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYmFuZ2h1YXpoYW8iLCJhIjoiY2p4ZTR2aDMwMGtwdTN5dGpjaTRiNnRkNiJ9.wiNyoPlj7m1aW5_pKFrT_Q', {
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYmFuZ2h1YXpoYW8iLCJhIjoiY2p4ZTR2aDMwMGtwdTN5dGpjaTRiNnRkNiJ9.wiNyoPlj7m1aW5_pKFrT_Q',
    noWrap: true,
}).addTo(map);


// create GeoJSON layers

var geoJsonLayer_usa = L.geoJSON(usa_geojson, {
  country: "usa",
  style: {
    color: 'blue',
    opacity: 0.5,
  },
  onEachFeature: onEachFeature
}).addTo(map);

var geoJsonLayer_china = L.geoJSON(china_geojson, {
  country: "china",
  style: {
    color: 'red',
    opacity: 0.5,
  },
  onEachFeature: onEachFeature
}).addTo(map);


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
      map.removeLayer(geoCountryArray[i].places);

      // reset places icon
      geoCountryArray[i].places.eachLayer(function(layer) {
        layer.setIcon(blueIcon);
      });
    }

    for (i = 0; i < geoCountryArray.length; i++) {
      if (layer.options.country == geoCountryArray[i].name) {
        map.panTo(geoCountryArray[i].center);
        map.addLayer(geoCountryArray[i].places);
        selectImagesToDisplay(geoCountryArray[i].name);
      }
    }

    layer.setStyle({
      opacity: 0.8,
      fillOpacity: 0.5
    })

  })
}



// Create places marker

var blueIcon = L.icon({
    iconUrl: './img/icons8-marker-blue.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 29],
    popupAnchor:  [0, -28] // point from which the popup should open relative to the iconAnchor
});

var orangeIcon = L.icon({
    iconUrl: './img/icons8-marker-orange.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 29],
    popupAnchor:  [0, -28] // point from which the popup should open relative to the iconAnchor
});


// usa places

var grandCanyon = L.marker([36.055261, -112.121836], {icon: blueIcon, bounceOnAdd: true, name: "grandCanyon"}).bindPopup('Grand Canyon National Park').on('click', markerOnClick),
    yellowstone  = L.marker([44.6, -110.5], {icon: blueIcon, bounceOnAdd: true, name: "yellowstone"}).bindPopup('Yellowstone National Park').on('click', markerOnClick),
    yosemite     = L.marker([37.85, -119.55], {icon: blueIcon, bounceOnAdd: true, name: "yosemite"}).bindPopup('Yosemite National Park').on('click', markerOnClick),
    deathValley = L.marker([36.241944, -116.825833], {icon: blueIcon, bounceOnAdd: true, name: "deathValley"}).bindPopup('Death Valley National Park').on('click', markerOnClick);
    antelopeCanyon = L.marker([36.8728287,-111.3657434], {icon: blueIcon, bounceOnAdd: true, name: "antelopeCanyon"}).bindPopup('Antelope Canyon').on('click', markerOnClick);
    badLands = L.marker([43.6833979,-102.3820746], {icon: blueIcon, bounceOnAdd: true, name: "badLands"}).bindPopup('Badlands National Park').on('click', markerOnClick);
    chicago = L.marker([41.8337329,-87.7319639], {icon: blueIcon, bounceOnAdd: true, name: "chicago"}).bindPopup('Chicago').on('click', markerOnClick);
    lasVegas = L.marker([36.125,-115.175], {icon: blueIcon, bounceOnAdd: true, name: "lasVegas"}).bindPopup('Las Vegas').on('click', markerOnClick);
    losAngeles = L.marker([34.020479,-118.4117325], {icon: blueIcon, bounceOnAdd: true, name: "losAngeles"}).bindPopup('Los Angeles').on('click', markerOnClick);
    newOrleans = L.marker([30.0332195,-90.022651], {icon: blueIcon, bounceOnAdd: true, name: "newOrleans"}).bindPopup('New Orleans').on('click', markerOnClick);

var places_usa = L.layerGroup([grandCanyon, yellowstone, yosemite, deathValley, antelopeCanyon, badLands, chicago, lasVegas, losAngeles, newOrleans]).addTo(map);

// china places

var biPengGou = L.marker([31.409077, 102.987486], {icon: blueIcon, bounceOnAdd: true, name: "biPengGou"}).bindPopup('毕棚沟 (Bi Peng Gou)').on('click', markerOnClick),
    duJiangyan  = L.marker([31.026503, 103.605399], {icon: blueIcon, bounceOnAdd: true, name: "duJiangyan"}).bindPopup('都江堰 (Dujiangyan Irrigation System)').on('click', markerOnClick),
    chengDu  = L.marker([30.590642, 104.045148], {icon: blueIcon, bounceOnAdd: true, name: "chengDu"}).bindPopup('成都 (Chengdu)').on('click', markerOnClick),
    wuHan    = L.marker([30.597084, 114.299094], {icon: blueIcon, bounceOnAdd: true, name: "wuHan"}).bindPopup('武汉 (Wuhan)').on('click', markerOnClick);
    cnJurassicPark    = L.marker([28.3587294,105.7311464], {icon: blueIcon, bounceOnAdd: true, name: "cnJurassicPark"}).bindPopup('中国侏罗纪公园 (China Jurassic Park)').on('click', markerOnClick);

var places_china = L.layerGroup([biPengGou, duJiangyan, chengDu, wuHan, cnJurassicPark]).addTo(map);




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

function selectImagesToDisplay(selectedClass) {

  $(".img-gallery").fadeTo(100, 0.1);

  $(".img-gallery div").not("." + selectedClass).fadeOut(100);

  setTimeout(function() {
    $("." + selectedClass).fadeIn(300);
    $(".img-gallery").fadeTo(300, 1);
  }, 300);

};

function markerOnClick(e) {
  var i;

  for (i = 0; i < geoCountryArray.length; i++) {
    geoCountryArray[i].places.eachLayer(function(layer) {
      layer.setIcon(blueIcon);
    });
  }

  e.target.setIcon(orangeIcon);
  selectImagesToDisplay(e.target.options.name);
}



$(document).ready(function(){

  $(".travel-image").hover(function() {
    $(this).addClass('selected');
  }, function() {
      $(this).removeClass('selected');
  });



})
