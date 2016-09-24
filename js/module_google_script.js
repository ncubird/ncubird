// https://script.google.com/macros/s/AKfycbyhHU_rRdAOXpJgT9DLyEK63xI21ZM0h1OyWhg-KP3MVH9Qs1A/exec

var google_app_url = "https://script.google.com/macros/s/AKfycbyhHU_rRdAOXpJgT9DLyEK63xI21ZM0h1OyWhg-KP3MVH9Qs1A/exec";

function Module_google_script(){

}


Module_google_script.prototype.event_send = function(data,callback) {

	$.ajax({
	    url: google_app_url+"?data="+JSON.stringify(data), 
	    type: "GET",   
	    dataType: 'jsonp',
	    cache: false,
	    success: function(response){
	        console.log("success" + JSON.stringify(response));
	        if(response['resultcode'] == 200 ){
	        	callback('200')
	        }else{
	        	callback(response['resultcode'])
	        }
	    },
	    error: function(response){
	        console.log(response);
	        callback(null)
	    }   
	  });
	
};

const UTIL_MONTH_DAYS = [31,28,31,30,31,30,31,31,30,31,30,31];

Module_google_script.prototype.get_event_for_month = function(year,month,callback) {

	var start_time = new Date(year,month,1,0,0,0);
	// ((self.is_spectial_Feb(syear) && smonth == 2)? 29 : POST_MONTH_DAYS[parseInt(split_sdate[1])])
	var end_time = new Date(year,month,((this.is_spectial_Feb(year) && month == 1)? 29 : UTIL_MONTH_DAYS[parseInt(month)]),23,59,00);

	var data={
		function_type : 'get_event',
		start : start_time.getTime(),
		end : end_time.getTime()
	}

	$.ajax({
	    url: google_app_url+"?data="+JSON.stringify(data), 
	    type: "GET",   
	    dataType: 'jsonp',
	    cache: false,
	    success: function(response){
	        //console.log("success" + JSON.stringify(response));
	        if(response['resultcode'] == 200 ){
	        	//console.log("success" + JSON.stringify(response['data']));
	        	callback(response['data']);
	        }	        
	    },
	    error: function(response){
	        console.log(response);
	        callback(null);
	    }   
	  });
	
};

Module_google_script.prototype.is_spectial_Feb = function(year){
	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}