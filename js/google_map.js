function Google_map(map_id){
	this.map;
	this.map_id = map_id; 
	this.markers = [];
	this.defaultBounds = new google.maps.LatLngBounds(
	  new google.maps.LatLng(25.18, 120.04),
	  new google.maps.LatLng(21.54, 121.59));
}


Google_map.prototype.add_marker = function(marker_id,bind_searchbox_id) {
	var self= this;
	this.map = google.maps.Map(document.getElementById('post_map'), {
	  center: {lat: 25.02, lng: 121.30},
	  zoom: 8,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	var marker = {};
	var marker_obj;
	marker['id'] = marker_id;
	var input_searchbox = document.getElementById(bind_searchbox_id);
	var searchbox = new google.maps.places.SearchBox(input_searchbox,{bounds: this.defaultBounds});

	this.map.addListener('bounds_changed', function() {
    	searchbox.setBounds(self.map.getBounds());
  	});

  	marker['object'].addListener('places_changed',function(){
  		var places = marker['object'].getPlaces();

	    if (places.length == 0 || places.length >1 ) {
	      return;
	    }

	    if(marker_obj != undefined){
	    	marker_obj = undefined;
	    }

	    var bounds = new google.maps.LatLngBounds();

	    var place = places[0];

	    var icon = {
	        url: "./images/pin-green.png",
	        size: new google.maps.Size(46, 71),
	        origin: new google.maps.Point(0, 0),
	        anchor: new google.maps.Point(0, 17),
	        scaledSize: new google.maps.Size(23, 35)
	    };

	    marker_obj = new google.maps.Marker({
	        map: map,
	        icon: icon,
	        title: place.name,
	        position: place.geometry.location
	    })

	    if (place.geometry.viewport) {
	        // Only geocodes have viewport.
	        bounds.union(place.geometry.viewport);
	    } else {
	      	bounds.extend(place.geometry.location);
	    }
	    map.fitBounds(bounds);

	    markers['object'] = marker_obj;
  	});
};



