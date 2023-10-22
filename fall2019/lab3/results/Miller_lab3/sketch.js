
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

//var url = 'https://api.sportsdata.io/v3/nba/scores/json/Stadiums?key=8880c49ea4aa46ea8a2a6e072dd04fe1';
var stadium = [
{
"StadiumID": 1,
"Active": true,
"Name": "Capital One Arena",
"Address": "601 F St. N.W.",
"City": "Washington",
"State": "DC",
"Zip": "20004",
"Country": "USA",
"Capacity": 20290,
"Coordinates": [-77.020833, 38.898056],
    "TeamName": "Washington Wizards",
    "Conference": "Eastern",
    "Division": "Southeast",
    "PrimaryColor": "E31837",
    "SecondaryColor": "002B5C",
    "TertiaryColor": "C4CED4",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/0/02/Washington_Wizards_logo.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 2,
"Active": true,
"Name": "Spectrum Center",
"Address": "330 E. Trade St.",
"City": "Charlotte",
"State": "NC",
"Zip": "28202",
"Country": "USA",
"Capacity": 19026,
"Coordinates": [-80.839167, 35.225],
  "TeamName": "Charlotte Hornets",
    "Conference": "Eastern",
    "Division": "Southeast",
    "PrimaryColor": "1D1160",
    "SecondaryColor": "00788C",
    "TertiaryColor": "A1A1A4",
    "QuaternaryColor": "7AB2DD",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/c/c4/Charlotte_Hornets_%282014%29.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 3,
"Active": true,
"Name": "Philips Arena",
"Address": "One Philips Dr.",
"City": "Atlanta",
"State": "GA",
"Zip": "30303",
"Country": "USA",
"Capacity": 18118,
"Coordinates": [-84.396389, 33.757222],
"TeamName": "Atlanta Hawks",
    "Conference": "Eastern",
    "Division": "Southeast",
    "PrimaryColor": "E03A3E",
    "SecondaryColor": "C1D32F",
    "TertiaryColor": "26282A",
    "QuaternaryColor": null,
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/2/24/Atlanta_Hawks_logo.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 4,
"Active": true,
"Name": "American Airlines Arena",
"Address": "601 Biscayne Blvd.",
"City": "Miami",
"State": "FL",
"Zip": "33132",
"Country": "USA",
"Capacity": 19600,
"Coordinates": [-80.188056, 25.781389],
"TeamName": "Miami Heat",
    "Conference": "Eastern",
    "Division": "Southeast",
    "PrimaryColor": "98002E",
    "SecondaryColor": "F9A01B",
    "TertiaryColor": "000000",
    "QuaternaryColor": null,
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/f/fb/Miami_Heat_logo.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 5,
"Active": true,
"Name": "Amway Center",
"Address": "400 W. Church St.",
"City": "Orlando",
"State": "FL",
"Zip": "32801",
"Country": "USA",
"Capacity": 18846,
"Coordinates": [-81.383611, 28.539167],
"TeamName": "Orlando Magic",
    "Conference": "Eastern",
    "Division": "Southeast",
    "PrimaryColor": "0077C0",
    "SecondaryColor": "000000",
    "TertiaryColor": "C4CED4",
    "QuaternaryColor": null,
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/1/10/Orlando_Magic_logo.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 6,
"Active": true,
"Name": "Madison Square Garden",
"Address": "Four Pennsylvania Plaza",
"City": "New York",
"State": "NY",
"Zip": "10001",
"Country": "USA",
"Capacity": 19812,
"Coordinates": [-73.993611, 40.750556],
"TeamName": "New York Knicks",
    "Conference": "Eastern",
    "Division": "Atlantic",
    "PrimaryColor": "006BB6",
    "SecondaryColor": "F58426",
    "TertiaryColor": "BEC0C2",
    "QuaternaryColor": "000000",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/2/25/New_York_Knicks_logo.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 7,
"Active": true,
"Name": "Wells Fargo Center",
"Address": "3601 S. Broad St.",
"City": "Philadelphia",
"State": "PA",
"Zip": "19148",
"Country": "USA",
"Capacity": 20328,
"Coordinates": [-75.171944, 39.901111],
"TeamName": "Philadelphia 76ers",
    "Conference": "Eastern",
    "Division": "Atlantic",
    "PrimaryColor": "ED174C",
    "SecondaryColor": "006BB6",
    "TertiaryColor": "002B5C",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/0/0e/Philadelphia_76ers_logo.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 8,
"Active": true,
"Name": "Barclays Center",
"Address": "620 Atlantic Ave.",
"City": "Brooklyn",
"State": "NY",
"Zip": "11217",
"Country": "USA",
"Capacity": 18200,
"Coordinates": [-73.975225, 40.682661],
"TeamName": "Brooklyn Nets",
    "Conference": "Eastern",
    "Division": "Atlantic",
    "PrimaryColor": "000000",
    "SecondaryColor": "FFFFFF",
    "TertiaryColor": null,
    "QuaternaryColor": null,
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/commons/4/44/Brooklyn_Nets_newlogo.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 9,
"Active": true,
"Name": "TD Garden",
"Address": "100 Legends Way",
"City": "Boston",
"State": "MA",
"Zip": "2114",
"Country": "USA",
"Capacity": 17565,
"Coordinates": [-71.062228, 42.366303],
"TeamName": "Boston Celtics",
    "Conference": "Eastern",
    "Division": "Atlantic",
    "PrimaryColor": "008348",
    "SecondaryColor": "BB9753",
    "TertiaryColor": "000000",
    "QuaternaryColor": null,
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 10,
"Active": true,
"Name": "Scotiabank Arena",
"Address": "40 Bay St.",
"City": "Toronto",
"State": "ON",
"Zip": "M5J 2X2",
"Country": "CAN",
"Capacity": 19800,
"Coordinates": [-79.379167, 43.643333],
"TeamName": "Toronto Raptors",
    "Conference": "Eastern",
    "Division": "Atlantic",
    "PrimaryColor": "CE1141",
    "SecondaryColor": "000000",
    "TertiaryColor": "A1A1A4",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/3/36/Toronto_Raptors_logo.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 11,
"Active": true,
"Name": "United Center",
"Address": "1901 W. Madison St.",
"City": "Chicago",
"State": "IL",
"Zip": "60612",
"Country": "USA",
"Capacity": 20917,
"Coordinates": [-87.674167, 41.880556],
"TeamName": "Chicago Bulls",
    "Conference": "Eastern",
    "Division": "Central",
    "PrimaryColor": "CE1141",
    "SecondaryColor": "000000",
    "TertiaryColor": null,
    "QuaternaryColor": null,
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 12,
"Active": true,
"Name": "Quicken Loans Arena",
"Address": "One Center Court",
"City": "Cleveland",
"State": "OH",
"Zip": "44115",
"Country": "USA",
"Capacity": 20562,
"Coordinates": [-81.688056, 41.496389],
"TeamName": "Cleveland Cavaliers",
    "Conference": "Eastern",
    "Division": "Central",
    "PrimaryColor": "6F263D",
    "SecondaryColor": "FDB81C",
    "TertiaryColor": "041E42",
    "QuaternaryColor": "000000",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/4/4b/Cleveland_Cavaliers_logo.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 13,
"Active": true,
"Name": "Bankers Life Fieldhouse",
"Address": "125 S. Pennsylvania St.",
"City": "Indianapolis",
"State": "IN",
"Zip": "46204",
"Country": "USA",
"Capacity": 18165,
"Coordinates": [-86.155556, 39.763889],
"TeamName": "Indiana Pacers",
    "Conference": "Eastern",
    "Division": "Central",
    "PrimaryColor": "002D62",
    "SecondaryColor": "FDBB30",
    "TertiaryColor": "BEC0C2",
    "QuaternaryColor": null,
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/1/1b/Indiana_Pacers.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 14,
"Active": true,
"Name": "Little Caesars Arena",
"Address": "2645 Woodward Ave",
"City": "Detroit",
"State": "MI",
"Zip": "48201",
"Country": "USA",
"Capacity": 20491,
"Coordinates": [-83.217862, 42.551262],
"TeamName": "Detroit Pistons",
    "Conference": "Eastern",
    "Division": "Central",
    "PrimaryColor": "006BB6",
    "SecondaryColor": "ED174C",
    "TertiaryColor": "BEC0C2",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Pistons_logo17.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 15,
"Active": true,
"Name": "Fiserv Forum",
"Address": "1001 N Fourth St.",
"City": "Milwaukee",
"State": "WI",
"Zip": "53203",
"Country": "USA",
"Capacity": 19000,
"Coordinates": [-87.916944, 43.043611],
"TeamName": "Milwaukee Bucks",
    "Conference": "Eastern",
    "Division": "Central",
    "PrimaryColor": "00471B",
    "SecondaryColor": "EEE1C6",
    "TertiaryColor": "0077C0",
    "QuaternaryColor": "000000",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/4/4a/Milwaukee_Bucks_logo.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 16,
"Active": true,
"Name": "Target Center",
"Address": "600 First Ave. North",
"City": "Minneapolis",
"State": "MN",
"Zip": "55403",
"Country": "USA",
"Capacity": 19356,
"Coordinates": [-93.276111, 44.979444],
"TeamName": "Minnesota Timberwolves",
    "Conference": "Western",
    "Division": "Northwest",
    "PrimaryColor": "0C2340",
    "SecondaryColor": "78BE20",
    "TertiaryColor": "236192",
    "QuaternaryColor": "9EA2A2",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/c/c2/Minnesota_Timberwolves_logo.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 17,
"Active": true,
"Name": "Vivint Smart Home Arena",
"Address": "301 W. South Temple St.",
"City": "Salt Lake City",
"State": "UT",
"Zip": "84101",
"Country": "USA",
"Capacity": 19911,
"Coordinates": [-111.901111, 40.768333],
"TeamName": "Utah Jazz",
    "Conference": "Western",
    "Division": "Northwest",
    "PrimaryColor": "002B5C",
    "SecondaryColor": "F9A01B",
    "TertiaryColor": "00471B",
    "QuaternaryColor": null,
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/0/04/Utah_Jazz_logo_%282016%29.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 18,
"Active": true,
"Name": "Chesapeake Energy Arena",
"Address": "100 W. Reno Ave.",
"City": "Oklahoma City",
"State": "OK",
"Zip": "73102",
"Country": "USA",
"Capacity": 18203,
"Coordinates": [-97.515, 35.463333],
"TeamName": "Oklahoma City Thunder",
    "Conference": "Western",
    "Division": "Northwest",
    "PrimaryColor": "007AC1",
    "SecondaryColor": "EF3B24",
    "TertiaryColor": "FDBB30",
    "QuaternaryColor": "002D62",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/5/5d/Oklahoma_City_Thunder.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 19,
"Active": true,
"Name": "Moda Center",
"Address": "1 Center Court",
"City": "Portland",
"State": "OR",
"Zip": "97227",
"Country": "USA",
"Capacity": 19980,
"Coordinates": [-122.666667, 45.531667],
"TeamName": "Portland Trail Blazers",
    "Conference": "Western",
    "Division": "Northwest",
    "PrimaryColor": "E03A3E",
    "SecondaryColor": "000000",
    "TertiaryColor": "FFFFFF",
    "QuaternaryColor": null,
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/2/21/Portland_Trail_Blazers_logo.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 20,
"Active": true,
"Name": "Pepsi Center",
"Address": "1000 Chopper Circle",
"City": "Denver",
"State": "CO",
"Zip": "80204",
"Country": "USA",
"Capacity": 19155,
"Coordinates": [-105.0075, 39.748611],
"TeamName": "Denver Nuggets",
    "Conference": "Western",
    "Division": "Northwest",
    "PrimaryColor": "00285E",
    "SecondaryColor": "5091CD",
    "TertiaryColor": "FDB927",
    "QuaternaryColor": null,
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/7/76/Denver_Nuggets.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 21,
"Active": true,
"Name": "FedEx Forum",
"Address": "191 Beale St.",
"City": "Memphis",
"State": "TN",
"Zip": "38103",
"Country": "USA",
"Capacity": 18119,
"Coordinates": [-90.050556, 35.138333],
"TeamName": "Memphis Grizzlies",
    "Conference": "Western",
    "Division": "Southwest",
    "PrimaryColor": "00285E",
    "SecondaryColor": "6189B9",
    "TertiaryColor": "BED4E9",
    "QuaternaryColor": "FDB927",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/f/f1/Memphis_Grizzlies.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 22,
"Active": true,
"Name": "Toyota Center",
"Address": "1510 Polk St.",
"City": "Houston",
"State": "TX",
"Zip": "77002",
"Country": "USA",
"Capacity": 18043,
"Coordinates": [-95.362222, 29.750833],
"TeamName": "Houston Rockets",
    "Conference": "Western",
    "Division": "Southwest",
    "PrimaryColor": "CE1141",
    "SecondaryColor": "C4CED4",
    "TertiaryColor": "000000",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/2/28/Houston_Rockets.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 23,
"Active": true,
"Name": "Smoothie King Center",
"Address": "1501 Girod St.",
"City": "New Orleans",
"State": "LA",
"Zip": "70113",
"Country": "USA",
"Capacity": 17188,
"Coordinates": [-90.081944, 29.948889],
"TeamName": "New Orleans Pelicans",
    "Conference": "Western",
    "Division": "Southwest",
    "PrimaryColor": "002B5C",
    "SecondaryColor": "B4975A",
    "TertiaryColor": "E31837",
    "QuaternaryColor": null,
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/0/0d/New_Orleans_Pelicans_logo.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 24,
"Active": true,
"Name": "AT&T Center",
"Address": "One AT&T Center Parkway",
"City": "San Antonio",
"State": "TX",
"Zip": "78219",
"Country": "USA",
"Capacity": 18581,
"Coordinates": [-98.4375, 29.426944],
"TeamName": "San Antonio Spurs",
    "Conference": "Western",
    "Division": "Southwest",
    "PrimaryColor": "000000",
    "SecondaryColor": "C4CED4",
    "TertiaryColor": null,
    "QuaternaryColor": null,
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/a/a2/San_Antonio_Spurs.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 25,
"Active": true,
"Name": "American Airlines Center",
"Address": "2500 Victory Ave.",
"City": "Dallas",
"State": "TX",
"Zip": "75219",
"Country": "USA",
"Capacity": 19200,
"Coordinates": [-96.810278, 32.790556],
"TeamName": "Dallas Mavericks",
    "Conference": "Western",
    "Division": "Southwest",
    "PrimaryColor": "0053BC",
    "SecondaryColor": "BBC4CA",
    "TertiaryColor": "000000",
    "QuaternaryColor": null,
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/9/97/Dallas_Mavericks_logo.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 26,
"Active": true,
"Name": "Oracle Center",
"Address": "7000 Coliseum Way",
"City": "Oakland",
"State": "CA",
"Zip": "94621",
"Country": "USA",
"Capacity": 19596,
"Coordinates": [-122.203056, 37.750278],
"TeamName": "Golden State Warriors",
    "Conference": "Western",
    "Division": "Pacific",
    "PrimaryColor": "006BB6",
    "SecondaryColor": "FDB927",
    "TertiaryColor": "26282A",
    "QuaternaryColor": null,
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 27,
"Active": true,
"Name": "Staples Center",
"Address": "1111 S. Figueroa St.",
"City": "Los Angeles",
"State": "CA",
"Zip": "90015",
"Country": "USA",
"Capacity": 18997,
"Coordinates": [-118.267222, 34.043056],
"TeamName": "Los Angeles Lakers",
    "Conference": "Western",
    "Division": "Pacific",
    "PrimaryColor": "552583",
    "SecondaryColor": "FDB927",
    "TertiaryColor": "000000",
    "QuaternaryColor": null,
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 27,
"Active": true,
"Name": "Staples Center",
"Address": "1111 S. Figueroa St.",
"City": "Los Angeles",
"State": "CA",
"Zip": "90015",
"Country": "USA",
"Capacity": 18997,
"Coordinates": [-118.267, 34.04305],
"TeamName": "Los Angeles Clippers",
    "Conference": "Western",
    "Division": "Pacific",
    "PrimaryColor": "ED174C",
    "SecondaryColor": "006BB6",
    "TertiaryColor": "87ceeb",
    "QuaternaryColor": "000000",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/b/bb/Los_Angeles_Clippers_%282015%29.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 28,
"Active": true,
"Name": "Talking Stick Resort Arena",
"Address": "201 E. Jefferson St.",
"City": "Phoenix",
"State": "AZ",
"Zip": "85004",
"Country": "USA",
"Capacity": 18422,
"Coordinates": [-112.071389, 33.445833],
"TeamName": "Phoenix Suns",
    "Conference": "Western",
    "Division": "Pacific",
    "PrimaryColor": "1D1160",
    "SecondaryColor": "E56020",
    "TertiaryColor": "000000",
    "QuaternaryColor": "F9A01B",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/d/dc/Phoenix_Suns_logo.svg",
    "WikipediaWordMarkUrl": null
},
{
"StadiumID": 29,
"Active": true,
"Name": "Golden 1 Center",
"Address": "One Sports Parkway",
"City": "Sacramento",
"State": "CA",
"Zip": "95834",
"Country": "USA",
"Capacity": 17317,
"Coordinates": [-121.518056, 38.649167],
"TeamName": "Sacramento Kings",
    "Conference": "Western",
    "Division": "Pacific",
    "PrimaryColor": "5A2B81",
    "SecondaryColor": "63727A",
    "TertiaryColor": "000000",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/c/c7/SacramentoKings.svg",
    "WikipediaWordMarkUrl": null
}];

mapboxgl.accessToken = 'pk.eyJ1IjoiaWxsem9yIiwiYSI6ImNqYWx4YXYyZjMxNG8zM25xN3BvZTJyb2cifQ.pG7eWUB_hChjzkoeS-MmAg';

// This adds the map
var map = new mapboxgl.Map({
  // container id specified in the HTML
  container: 'map',
  // style URL
  style: 'mapbox://styles/mapbox/light-v10',
  // initial position in [long, lat] format
  center: [-95.712891, 37.09024],
  // initial zoom
  zoom: 3,
  scrollZoom: true
});


// This adds the data to the map
map.on('load', function(e) {
  // Adding the source without styling a layer
  map.addSource("places", {
    "type": "geojson",
    "data": stadium
  });
  // Initialize the list
  buildLocationList(stadium);

});

// Interactions with DOM markers 
stadium.forEach(function(marker, i) {
  // Create an img element for the marker
  var el = document.createElement('div');
  el.id = "marker-" + i;
  el.className = 'marker';
  // Add markers to the map at all points
  new mapboxgl.Marker(el, {
    //Offset accounts for symbol size  
    offset: [0, -33]
  })
    .setLngLat(marker.Coordinates)
    .addTo(map);

  el.addEventListener('click', function(e) {
    // 1. Fly to the point
    flyToStadium(marker);

    // 2. Close all other popups and display popup for clicked store
    createPopUp(marker);

    // 3. Highlight listing in sidebar (and remove highlight for all other listings)
    var activeItem = document.getElementsByClassName('active');

    e.stopPropagation();
    if (activeItem[0]) {
      activeItem[0].classList.remove('active');
    }

    var listing = document.getElementById('listing-' + i);
    listing.classList.add('active');

  });
});


function flyToStadium(currentFeature) {
  map.flyTo({
    center: currentFeature.Coordinates,
    zoom: 7
  });
}

function createPopUp(currentFeature) {
  var popUps = document.getElementsByClassName('mapboxgl-popup');
  if (popUps[0]) popUps[0].remove();


  var popup = new mapboxgl.Popup({
      closeOnClick: false
    })
    .setLngLat(currentFeature.Coordinates)
    .setHTML('<h3>' + currentFeature.Name + '</h3>' +
      '<h4> Capacity: ' + currentFeature.Capacity + '</h4>')
    .addTo(map);
}
var link;
function buildLocationList(data) {
  for (i = 0; i < data.length; i++) {
    // Creates an array of all the stores and their properties
    var currentFeature = data[i];
    // Select the listing container in the HTML
    var listings = document.getElementById('listings');
    // Append a div with the class 'item' for each store
    var listing = listings.appendChild(document.createElement('div'));
    listing.className = 'item';
    listing.id = "listing-" + i;

    // Create a new link with the class 'title' for each stadium
    // and fill it with the Team that plays in stadium
    link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.dataPosition = i;
    link.innerHTML = currentFeature.TeamName;
 
    // Creates a new div with the class 'details' for each store
    // and fill it with address and city that the team plays
    var details = listing.appendChild(document.createElement('div'));
    details.innerHTML = currentFeature.Address + ', ' + currentFeature.City + ', ' + currentFeature.State;
  
  //  link.addEventListener('click', function(e) {
      // Update the currentFeature to the store associated with the clicked link
      //var clickedListing = data[this.dataPosition];

      // 1. Fly to the point associated with the clicked link
      //flyToStadium(clickedListing);

      // 2. Close all other popups and display popup for clicked store
      //createPopUp(clickedListing);

      // 3. Highlight listing in sidebar (and remove highlight for all other listings)
      //var activeItem = document.getElementsByClassName('active');

      //if (activeItem[0]) {
       // activeItem[0].classList.remove('active');
      //}
      //this.parentNode.classList.add('active');
    }
}