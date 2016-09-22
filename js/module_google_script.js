// https://script.google.com/macros/s/AKfycbyhHU_rRdAOXpJgT9DLyEK63xI21ZM0h1OyWhg-KP3MVH9Qs1A/exec

var google_app_url = "https://script.google.com/macros/s/AKfycbyhHU_rRdAOXpJgT9DLyEK63xI21ZM0h1OyWhg-KP3MVH9Qs1A/exec";

function Module_google_script(){

}


Module_google_script.prototype.test = function() {
	var data={
		event_title : "onepiece",
		function_type : 'add_to_calander',
		startyear : '2016',
		endyear : '2016',
		startdate : 'September 22',
		enddate : 'September 23',
		starttime : '00:00:00',
		endtime : '00:00:00',
		other_message : {facebook_id:"123123132132132"}	
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

Module_google_script.prototype.generate_data = function(event_title,function_type,syear,eyear,smonth,emonth,sdate,edate,shour,ehour,other_message) {
	var data_starttime = shour + ":00:00";
	var data_endtime = ehour + ":00:00";
	var data_startdate = smonth + ' ' + sdate;
	var data_enddate = emonth + ' ' + edate;
	return {
		event_title : event_title,
		function_type : function_type,
		startyear : syear,
		endyear : eyear,
		startdate : data_startdate,
		enddate : data_enddate,
		starttime : data_starttime,
		endtime : data_endtime,
		other_message : other_message,
	}
};