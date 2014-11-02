'use strict';

 require([
  	"esri/map", 
  	"esri/dijit/HomeButton",
  	"esri/dijit/BasemapGallery",
   	"esri/arcgis/utils",
   	"esri/layers/FeatureLayer", 
   	"esri/dijit/Legend",
    "dojo/_base/array",
    "dojo/parser",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/TitlePane",
    "dijit/layout/AccordionContainer",
  	"dojo/domReady!"
	], function(Map, HomeButton, BasemapGallery, arcgisUtils, FeatureLayer, Legend, arrayUtils, parser){
		 parser.parse();
		//Set up init map view
  		var map = new Map("map", {
    		center: [-76.920236,  38.183921],
    		zoom: 13,
    		basemap: "national-geographic"
  		});
        //Add home button    
  		var home = new HomeButton({
    		map: map
  		}, "HomeButton");
  		home.startup();

  		//Adding basemap gallery
	    var basemapGallery = new BasemapGallery({
	      	showArcGISBasemaps: true,
	        map: map
	    }, "basemapGallery");
	    basemapGallery.startup();
	      
	    basemapGallery.on("error", function(msg) {
	    	console.log("basemap gallery error:  ", msg);
	    });

	    var nonGameFish = new FeatureLayer("http://152.46.17.144/arcgis/rest/services/GEWA/gewa_sde/MapServer/0", {
        	mode: FeatureLayer.MODE_ONDEMAND,
        	outFields:["*"]
      	});
      	var gameFish = new FeatureLayer("http://152.46.17.144/arcgis/rest/services/GEWA/gewa_sde/MapServer/1", {
        	mode: FeatureLayer.MODE_ONDEMAND,
        	outFields:["*"]
      	});
      	var sampleLocations = new FeatureLayer("http://152.46.17.144/arcgis/rest/services/GEWA/gewa_sde/MapServer/2", {
        	mode: FeatureLayer.MODE_ONDEMAND,
        	outFields:["*"]
      	});
      	var fences = new FeatureLayer("http://152.46.17.144/arcgis/rest/services/GEWA/gewa_sde/MapServer/3", {
        	mode: FeatureLayer.MODE_ONDEMAND,
        	outFields:["*"]
      	});
      	var streams = new FeatureLayer("http://152.46.17.144/arcgis/rest/services/GEWA/gewa_sde/MapServer/4", {
        	mode: FeatureLayer.MODE_ONDEMAND,
        	outFields:["*"]
      	});
      	var boundary = new FeatureLayer("http://152.46.17.144/arcgis/rest/services/GEWA/gewa_sde/MapServer/5", {
        	mode: FeatureLayer.MODE_ONDEMAND,
        	outFields:["*"]
      	});
      	var building = new FeatureLayer("http://152.46.17.144/arcgis/rest/services/GEWA/gewa_sde/MapServer/6", {
        	mode: FeatureLayer.MODE_ONDEMAND,
        	outFields:["*"]
      	});
      	var roads = new FeatureLayer("http://152.46.17.144/arcgis/rest/services/GEWA/gewa_sde/MapServer/7", {
        	mode: FeatureLayer.MODE_ONDEMAND,
        	outFields:["*"]
      	});
      	var smallScaleFeatures = new FeatureLayer("http://152.46.17.144/arcgis/rest/services/GEWA/gewa_sde/MapServer/8", {
        	mode: FeatureLayer.MODE_ONDEMAND,
        	outFields:["*"]
      	});
      	var waterbodies = new FeatureLayer("http://152.46.17.144/arcgis/rest/services/GEWA/gewa_sde/MapServer/9", {
        	mode: FeatureLayer.MODE_ONDEMAND,
        	outFields:["*"]
      	});
      	var naturalVeg = new FeatureLayer("http://152.46.17.144/arcgis/rest/services/GEWA/gewa_sde/MapServer/10", {
        	mode: FeatureLayer.MODE_ONDEMAND,
        	outFields:["*"]
      	});
      	var culturalVeg = new FeatureLayer("http://152.46.17.144/arcgis/rest/services/GEWA/gewa_sde/MapServer/11", {
        	mode: FeatureLayer.MODE_ONDEMAND,
        	outFields:["*"]
      	});

     	//add the legend
     	map.on("layers-add-result", function (evt) {
        	var layerInfo = arrayUtils.map(evt.layers, function (layer, index) {
          		return {layer:layer.layer, title:layer.layer.name};
        	});
        	if (layerInfo.length > 0) {
          		var legendDijit = new Legend({
            		map: map,
            		layerInfos: layerInfo
          	}, "legendDiv");
          	legendDijit.startup();
        	}
      	});

      	map.addLayers([nonGameFish, gameFish, sampleLocations, fences, streams, boundary, building, roads, smallScaleFeatures, waterbodies, naturalVeg, culturalVeg]);
    



	});