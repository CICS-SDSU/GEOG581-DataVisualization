//Keaton Shennan
//GEOG-581 Fall 2019
//Final Graduate Project 

// control that shows state info on hover
var info = L.control();
var rosInfo = L.control();
var frontsInfo = L.control();
var legend = L.control({position: 'bottomright'});


var geojson;
var rosOut;
var slopes;
var ep3_gf;
function setup() {

background(255);

    var contour = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>', id: 'mapbox.outdoors', accessToken: 'pk.eyJ1Ijoia3NoZW5uYW4iLCJhIjoiY2syZG1vZzY4MDBjZzNvbDZtZDk0cm93YiJ9.-dKlW2RGVIoPcftzQBh2ZQ'});
  var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>', id: 'mapbox.satellite', accessToken: 'pk.eyJ1Ijoia3NoZW5uYW4iLCJhIjoiY2syZG1vZzY4MDBjZzNvbDZtZDk0cm93YiJ9.-dKlW2RGVIoPcftzQBh2ZQ'});
  //leaflet map container
  var map = L.map('mapid', {
    center: [34.495, -119.42],
    zoom: 14,
    layers: [contour, satellite],
       fullscreenControl: true,
    timeDimensionControl: true,
    timeDimensionControlOptions: {
        loopButton: true,
    },
    timeDimension: true
  });
  

  //time controls
L.TimeDimension.Layer.GeoJson.GeometryCollection = L.TimeDimension.Layer.GeoJson.extend({

   //only show features that intersect with given time interval 
    _getFeatureBetweenDates: function(feature, minTime, maxTime) {
        var featureStringTimes = this._getFeatureTimes(feature);
        if (featureStringTimes.length == 0) {
            return feature;
        }
        var featureTimes = [];
        for (var i = 0, l = featureStringTimes.length; i < l; i++) {
            var time = featureStringTimes[i]
            if (typeof time == 'string' || time instanceof String) {
                time = Date.parse(time.trim());
            }
            featureTimes.push(time);
        }

        if (featureTimes[0] > maxTime || featureTimes[l - 1] < minTime) {
            return null;
        }
        return feature;
    },

});

L.timeDimension.layer.geoJson.geometryCollection = function(layer, options) {
    return new L.TimeDimension.Layer.GeoJson.GeometryCollection(layer, options);
};
 //fronts geojson
  let frontOptions = {
    style: frontStyle,
    onEachFeature: addFronts
  }
  var frontsLayer = L.geoJson(seq4Fronts, frontOptions);
// console.log(seq4Fronts);
  function frontsResetHighlight(e) {
  frontsLayer.resetStyle(e.target);
  frontsInfo.update();
}

  var geoJsonTimeLayer = L.timeDimension.layer.geoJson.geometryCollection(frontsLayer, {
  updateTimeDimension: true,
  updateTimeDimensionMode: 'replace',  
  duration: 'PT2H',
});
geoJsonTimeLayer.addTo(map);
 
  //basemap layer options
var baseMaps = {
  "Standard" : contour,
  "Satellite": satellite
};
  
  // layer control for ROS and Slope Outliers
 let rosOut = L.layerGroup().addTo(map);
 let slopes = L.layerGroup().addTo(map);
let fronts = L.layerGroup();



  function addROS(ros, layer) {
    rosOut.addLayer(layer);
    layer.on({
      mouseover: rosHighlightFeature,
      mouseout: rosResetHighlight,
      // click: zoomToFeature
    });
  }


  function addSlopes(slopeROS, layer) {
    slopes.addLayer(layer);
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      // click: zoomToFeature
    });
  }

  function addFronts(fronts, layer) {
    layer.on({
      mouseover: frontsHighlightFeature,
      mouseout: frontsResetHighlight
    });
  }

  let rosOptions = {
    style: rosStyle,
    onEachFeature: addROS
  }

  let slopeOptions = {
    style: slopeStyle,
    onEachFeature: addSlopes
  }
  
  
  //anderson fuel map image
  var cfm = L.imageOverlay('ep3_gf_map3.png', [[34.512500, -119.441633],[34.479793, -119.394095]]);
  
  
  
  rosLines = L.geoJson(genOutliers, rosOptions);

  slopeLines = L.geoJson(slopeOutliers, slopeOptions);

  let layers = {
    'ROS Outliers': rosOut,
    'Slope Outliers': slopes,
    'Classification Map': cfm
  }

  

  legend.onAdd = function (map) {
    
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1, 2, 3, 4],
        labels =['Shrub', 'Herb', 'Rock/Barren','Tree'];
    
    for (var i = 0; i < 4 ; i++) {
      div.innerHTML += 
        '<i style="background:' + classColor(grades[i]) + '"></i> ' + grades[i]  + labels[i] + '<br>';
    } 
    return div; 
  };
  
  map.on({
    overlayadd: function(eventLayer) {
    
    if(eventLayer.name == 'Classification Map') {
      legend.addTo(this);
    }
    },
    overlayremove: function(eventLayer) {
      if(eventLayer.name == 'Classification Map') {
        this.removeControl(legend);
      }
    }
  });

//layer control for ROS and Slope Outliers first is on/off second is non exclusive
  L.control.layers(baseMaps, layers).addTo(map);
 //ROS Info
  rosInfo.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

    rosInfo.update = function(rosOut) {
    // console.log(rosOut);
    this._div.innerHTML =  (rosOut ?
      '<b>' + 'Rate of Spread' + '</b><br />' + rosOut.ros + ' Meters per Minute' :
      '');
  };
  //Slope Info
  info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

  info.update = function(slopes) {
    this._div.innerHTML =  (slopes ?
      '<b>' + 'Slope' + '</b><br />' + slopes.Avg_Slope  + ' Average Slope' :
      '');
    // console.log(slopes);
  };

    frontsInfo.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

  frontsInfo.update = function(fronts) {
    this._div.innerHTML =  (fronts ?
      '<b>' + 'Fire Front' + '</b><br/>' + 'Front ID: ' + fronts.front_id  + '<br/>' + 'Time: ' + fronts.time :
      '');
    // console.log(fronts);
  };
  
  info.addTo(map);
  rosInfo.addTo(map);
  frontsInfo.addTo(map);
  
// console.log(frontsSeq.geometry);


}

function draw() {
  createCanvas(windowWidth, 50);
  background(68, 76, 51);
  textAlign(CENTER);
  textSize(24);
  textStyle(BOLD);
  fill(255,102,0);
  text('Thomas Fire Episode 3',windowWidth/2, 32);
}


function frontStyle(fronts) {
  // console.log(fronts.properties.time_image)
  return {
    fillColor: getColor(fronts.properties.front_id),
    weight: 3,
    opacity: 1,
    color: getColor(fronts.properties.front_id),
    dashArray: '0',
    fillOpacity: 0.7
  };
}

function slopeStyle(slopes) {
  // console.log(slopes)
  // console.log(slopes.properties.Avg_Slope)
  return {
    fillColor: slopeColor(slopes.properties.Avg_Slope),
    weight: 3,
    opacity: 1,
    color: slopeColor(slopes.properties.Avg_Slope),
    dashArray: '0',
    fillOpacity: 0.7
  };
}

function rosStyle(rosOut) {
  // console.log(rosOut.properties.ros);
  return {
    fillColor: rosColor(rosOut.properties.ros),
    weight: 3,
    opacity: 1,
    color: rosColor(rosOut.properties.ros)
  };
  }
function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: '#ffffff',
    dashArray: '3',
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  info.update(layer.feature.properties);
}

function rosHighlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: '#ffffff',
    dashArray: '3',
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  rosInfo.update(layer.feature.properties);
}


function frontsHighlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: '#ffffff',
    dashArray: '3',
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  frontsInfo.update(layer.feature.properties);
}
function resetHighlight(e) {
  slopeLines.resetStyle(e.target);
  info.update();
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    // click: zoomToFeature
  });
}

function frontsOnEachFeature(feature, layer) {
  layer.on({
    mouseover: frontsHighlightFeature,
    mouseout: frontsResetHighlight
    // click: zoomToFeature
  });
}
function rosResetHighlight(e) {
 rosLines.resetStyle(e.target);
  rosInfo.update();
}

function rosOnEachFeature(feature, layer) {
  layer.on({
    mouseover: rosHighlightFeature,
    mouseout: rosResetHighlight
  });
}

function getColor(d) {
  return d == 9 ? '#800026' :
    d == 8 ? '#BD0026' :
    d == 7 ? '#E31A1C' :
    d == 6 ? '#FC4E2A' :
    d == 5 ? '#FD8D3C' :
    d == 4 ? '#FEB24C' :
    d == 3 ? '#FED976' :
    d == 2 ? '#ffeda0' :
    d == 1 ? '#ffffcc' :
    '#000000';
}

function slopeColor(e) {
  return e >= 55 ? '#034e7b' :
    e >= 50 ? '#0570b0' :
    e >= 45 ? '#3690c0' :
    e >= 40 ? '#74a9cf' :
    e >= 35 ? '#a6bddb' :
    e >= 30 ? '#d0d1e6' :
    e >= 25 ? '#ece7f2' :
    '#ffffff';
}

function rosColor(f) {
    return f >= 160 ? '#000000' :
    f >= 140 ? '#252525' :
    f >= 120 ? '#525252' :
    f >= 100 ? '#737373' :
    f >= 80 ? '#969696' :
    f >= 60 ? '#bdbdbd' :
    f >= 40 ? '#d9d9d9' :
    '#ffffff';
}

function classColor(g) {
  return  g == 1 ? '#006400' :
    g == 2 ? '#ffd700' :
  g == 3 ? '#d2b48c' :
  g == 4 ? '#ff0000' :
  '#000000';
}