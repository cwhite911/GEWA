'use strict';

 require([
  	"esri/map", 
  	"esri/dijit/HomeButton",
  	"esri/dijit/BasemapGallery",
  	"esri/dijit/Scalebar",
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
	], function(Map, HomeButton, BasemapGallery, Scalebar, arcgisUtils, FeatureLayer, Legend, arrayUtils, parser){
		 parser.parse();

		 //variables
		 var map,
		 	home,
		 	basemapGallery,
		 	scalebar,
		 	layerInfo,
		 	legendDijit,
		 	layers = [],
	   		url,
	   		temp;



		//Set up init map view
  	 	map = new Map("map", {
    		center: [-76.920236,  38.183921],
    		zoom: 13,
    		basemap: "national-geographic"
  		});
        //Add home button    
  		home = new HomeButton({
    		map: map
  		}, "HomeButton");
  		home.startup();

  		//Adding basemap gallery
	    basemapGallery = new BasemapGallery({
	      	showArcGISBasemaps: true,
	        map: map
	    }, "basemapGallery");
	    basemapGallery.startup();
	      
	    basemapGallery.on("error", function(msg) {
	    	console.log("basemap gallery error:  ", msg);
	    });

	    //Scale bar
	    scalebar = new Scalebar({
          map: map,
          scalebarUnit: "dual"
        });

	 

	   	//Adds all layers to map and legend
	    for (var i = 0; i < 12; i++ ){
	   		url = "http://152.46.17.144/arcgis/rest/services/GEWA/gewa_sde/MapServer/" + i;
	    	temp =  new FeatureLayer(url, {
        		mode: FeatureLayer.MODE_ONDEMAND,
        		outFields:["*"]
      		});
      		layers.push(temp);
	    };
	

     	//add the legend
     	map.on("layers-add-result", function (evt) {
        	layerInfo = arrayUtils.map(evt.layers, function (layer, index) {
        		console.log(layer.layer);
          		return {layer:layer.layer, title:layer.layer.name};
        	});
        	if (layerInfo.length > 0) {
          		legendDijit = new Legend({
            		map: map,
            		layerInfos: layerInfo,
            		respectCurrentMapScale: true
          	}, "legendDiv");
          	legendDijit.startup();
        	}
      	});

      	map.addLayers(layers);
    



	});