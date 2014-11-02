'use strict';

 require([
  	"esri/map", 
  	"esri/dijit/HomeButton",
  	"dojo/domReady!"
	], function(Map, HomeButton){
		//Set up init map view
  		var map = new Map("map", {
    		center: [-56.049, 38.485],
    		zoom: 3,
    		basemap: "national-geographic"
  		});
        //Add home button    
  		var home = new HomeButton({
    		map: map
  		}, "HomeButton");
  		home.startup();

	});