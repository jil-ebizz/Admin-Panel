am4core.useTheme(am4themes_animated);
// Themes end

var mapChart = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
mapChart.geodata = am4geodata_continentsLow;

var colorSet = new am4core.ColorSet();
var currentTime = new Date();

// Set projection
mapChart.projection = new am4maps.projections.Orthographic();
mapChart.panBehavior = "rotateLongLat";
mapChart.deltaLatitude = -30;
mapChart.deltaLongitude = 60;
// chart.padding(20,20,20,20);

// Create map polygon series
var polygonSeries = mapChart.series.push(new am4maps.MapPolygonSeries());

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = am4core.color("#47c78a");
polygonTemplate.stroke = am4core.color("#454a58");
polygonTemplate.strokeWidth = 0.5;

var graticuleSeries = mapChart.series.push(new am4maps.GraticuleSeries());
graticuleSeries.mapLines.template.line.stroke = am4core.color("#ffffff");
graticuleSeries.mapLines.template.line.strokeOpacity = 0.08;
graticuleSeries.fitExtent = false;


mapChart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.1;
mapChart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#ffffff");

// Shared
var hoverColorHex = "#9a7bca";
var hoverColor = am4core.color(hoverColorHex);

// Continents 
var continentsSeries = mapChart.series.push(new am4maps.MapPolygonSeries());
continentsSeries.geodata = am4geodata_continentsLow;
continentsSeries.useGeodata = true;
// continentsSeries.exclude = ["antarctica"];

var continentTemplate = continentsSeries.mapPolygons.template;
continentTemplate.tooltipText = "{name}: {population.formatNumber('#,000')}";
continentTemplate.properties.fillOpacity = 0.8; // Reduce conflict with back to continents map label
continentTemplate.propertyFields.fill = "color";
continentTemplate.nonScalingStroke = true;
continentTemplate.strokeOpacity = 0.5;
continentTemplate.events.on("hit", function(event){
  if ( ! countriesSeries.visible) 
    countriesSeries.visible = true;
  mapChart.zoomToMapObject(event.target);
  // stateTemplate.show();
  countryTemplate.show();
    // imageSeriesTemplate.show();
      imageSeriesTemplate2.show();
  //    imageSeriesTemplate3.show();
  // imageSeriesTemplate4.show();
  labelContainer.show();
  
});

var contintentHover = continentTemplate.states.create("hover");
contintentHover.properties.fill = hoverColor;
contintentHover.properties.stroke = hoverColor;

continentsSeries.dataFields.zoomLevel = "zoomLevel";
continentsSeries.dataFields.zoomGeoPoint = "zoomGeoPoint";


continentsSeries.data = [ {
  "id": "africa",
  "population": "1287920000",
  "color": mapChart.colors.getIndex(0),
   "zoomLevel": 2,
  "zoomGeoPoint": {
    "latitude": 18,
    "longitude": 20
  }
}, {
  "id": "asia",
  "population": "4545133000",
  "color": mapChart.colors.getIndex(1),
  "zoomLevel": 2,
  "zoomGeoPoint": {
    "latitude": 46,
    "longitude": 89
  }
}, {
  "id": "oceania",
  "population": "41261000",
  "color": mapChart.colors.getIndex(2),
   "zoomLevel": 2,
  "zoomGeoPoint": {
    "latitude": -7,
    "longitude": 129
  }
}, {
  "id": "europe",
  "population": "742648000",
  "color": mapChart.colors.getIndex(3),
   "zoomLevel": 2,
  "zoomGeoPoint": {
    "latitude": 48,
    "longitude": 10
  }
}, {
  "id": "northAmerica",
  "population": "587615000",
  "color": mapChart.colors.getIndex(4),
  "zoomLevel": 5,
  "zoomGeoPoint": {
    "latitude": 38,
    "longitude": -90
  }
}, {
  "id": "southAmerica",
  "population": "428240000",
  "color": mapChart.colors.getIndex(5),
   "zoomLevel": 2,
  "zoomGeoPoint": {
    "latitude": -9,
    "longitude": -60
  }
}];


let animation;
setTimeout(function(){
  animation = mapChart.animate({property:"deltaLongitude", to:100000}, 20000000);
}, 6000)

mapChart.seriesContainer.events.on("down", function(){
if(animation){
  animation.stop();
}
})