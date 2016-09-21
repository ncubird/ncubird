// https://script.google.com/macros/s/AKfycbyhHU_rRdAOXpJgT9DLyEK63xI21ZM0h1OyWhg-KP3MVH9Qs1A/exec

var google_app_url = "https://script.google.com/macros/s/AKfycbyhHU_rRdAOXpJgT9DLyEK63xI21ZM0h1OyWhg-KP3MVH9Qs1A/exec";

function Module_google_script(){

}


Module_google_script.prototype.test = function() {
	var data={
		test : "123"
	}

	$.ajax({
	    url: google_app_url+"?data="+JSON.stringify(data), 
	    type: "GET",   
	    dataType: 'jsonp',
	    cache: false,
	    success: function(response){
	        console.log("success" + JSON.stringify(response));
	    },
	    error: function(response){
	        console.log(response);
	    }   
	  });
	
};