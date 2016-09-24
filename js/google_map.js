function Google_map(map_id){
	this.map = new google.maps.Map(document.getElementById(map_id), {
	  center: {lat: 25.02, lng: 121.30},
	  zoom: 8,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	this.markers = [];
	this.defaultBounds = new google.maps.LatLngBounds(
	  new google.maps.LatLng(25.18, 120.04),
	  new google.maps.LatLng(21.54, 121.59));
}


Google_map.prototype.add_marker = function(marker_id,bind_searchbox_id,pin_image) {
	var self= this;
	var marker = {};
	var marker_obj = undefined;
	var flag_is_in_array = false;
	var cursur = -1;
	marker['id'] = marker_id;

	for(var i=0;i<self.markers.length;i++){
    	if(self.markers[i]['id'] == marker_id){
    		if(self.markers[i]['object'] != undefined){
    			self.markers[i]['object'].setMap(null);
    		}
    		cursur = i;
    	}
    }

    if(cursur < 0){
    	this.markers.push(marker);
    	cursur = self.markers.length-1;
    }
	var input_searchbox = document.getElementById(bind_searchbox_id);
	var searchbox = new google.maps.places.SearchBox(input_searchbox,{bounds: this.defaultBounds});

	this.map.addListener('bounds_changed', function() {
    	searchbox.setBounds(self.map.getBounds());
  	});


  	searchbox.addListener('places_changed',function(){
  		var places = searchbox.getPlaces();

  		if(self.markers[cursur]['object'] != undefined){
	   		self.markers[cursur]['object'].setMap(null);
	   	}

	    if (places.length == 0 || places.length >1 ) {
	      return;
	    }
	   

	    var place = places[0];

	    var icon = {
	        url: "./images/"+pin_image,
	        size: new google.maps.Size(46, 71),
	        origin: new google.maps.Point(0, 0),
	        anchor: new google.maps.Point(0, 17),
	        scaledSize: new google.maps.Size(23, 35)
	    };

	    self.markers[cursur]['object'] = new google.maps.Marker({
	        map: self.map,
	        icon: icon,
	        title: place.name,
	        position: place.geometry.location
	    })

	    $('#'+bind_searchbox_id).on("change",function(){
	    	self.markers[cursur]['object'].setMap(null);
	    	console.log("change");
	    	$('#'+bind_searchbox_id).off("change");
	    });

	    self.reset_bound();
  	});
};


Google_map.prototype.reset_bound = function(){
	var markers = this.markers;
	var bounds = new google.maps.LatLngBounds();

	for(var i=0;i<markers.length;i++){
		if(markers[i]['object'] != undefined){
			bounds.extend(markers[i]['object'].getPosition());
			// console.log(markers[i]['object'].getPosition());
		}		
	}
	
    this.map.fitBounds(bounds);
}

Google_map.prototype.get_location = function(marker_id){
	var markers = this.markers;	
	var bounds = new google.maps.LatLngBounds();

	for(var i=0;i<markers.length;i++){
		if(markers[i]['id'] == marker_id){
			if(markers[i]['object'] != undefined){
				return markers[i]['object'].getPosition().toJSON();
			}			
		}		
	}

	return null;
}

Google_map.prototype.set_marker = function(marker_id,pin_image,position){
	var self = this;
	var marker = {};
	var cursur = -1;
	marker['id'] = marker_id;

	for(var i=0;i<self.markers.length;i++){
    	if(self.markers[i]['id'] == marker_id){
    		if(self.markers[i]['object'] != undefined){
    			self.markers[i]['object'].setMap(null);
    		}
    		cursur = i;
    	}
    }

    if(cursur < 0){
    	this.markers.push(marker);
    	cursur = self.markers.length-1;
    }

	var icon = {
        url: "./images/"+pin_image,
        size: new google.maps.Size(46, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 17),
        scaledSize: new google.maps.Size(23, 35)
    };

	self.markers[cursur]['object'] = new google.maps.Marker({
	    position: position,
	    icon: icon,
	    map: self.map
	});

}



