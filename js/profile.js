function Profile_controller(profile_class_today,profile_class_month){
	this.now;
	this.year;
	this.month;
	this.day;
	this.date;
	this.hour;
	this.long_time;
	this.month_value;
	this.profile_class_today = profile_class_today;
	this.profile_class_month = profile_class_month;
}

Profile_controller.prototype.set_today_and_sync = function(){
	var now = new Date();
	this.now = now;
	this.year = now.getYear()+1900;
	this.month = now.getMonth();
	this.hour = now.getHours();
	this.day = now.getDay();
	this.date = now.getDate();
	this.long_time = now.getTime();
}

Profile_controller.prototype.set_template_today_item = function(data,event_callback) {
	$('.'+this.profile_class_today).html("");
	for(var i=0;i<data.length;i++){
		$('.'+this.profile_class_today).html($('.'+this.profile_class_today).html()+this.template_item('profile-today-item',data[i]));
	}

	$('.profile-today-item').unbind('click');
	$('.profile-today-item').click(function(){
		event_callback(data);
	})
	// body...
};

Profile_controller.prototype.set_template_month_item = function(data,select_callback,event_callback){
	Materialize.updateTextFields();
	$('select').material_select();
	var self = this;

	console.log(data);

	$('.'+this.profile_month_today).html("");
	for(var i=0;i<data.length;i++){

		$('.'+this.profile_class_month).html($('.'+this.profile_class_month).html()+this.template_item('profile-month-item',data[i]));
	}

	$('.profile-month-select').off('change');
	$('.profile-month-select').on('change',function(){
		var tmp_value = $('#profile_month_select').val();
		this.month_value = tmp_value;
		console.log("test"+$('#profile_month_select').val() + ' ' +$('.profile-month-select'));
		select_callback(tmp_value);
	})

	$('.profile-month-item').unbind('click');
	$('.profile-month-item').click(function(){
		event_callback(data);
	})

	
}

Profile_controller.prototype.set_onclick_event = function(event_callback){
	
}


Profile_controller.prototype.template_item = function(profile_item_class,item_data) {

	var template = "";

	var PROFILE_UTIL = new Util();
	var other_message = item_data[PROFILE_UTIL.ROOT_DATA_KEY.OTHER_MESSAGE];
	var time = new Date(item_data[PROFILE_UTIL.ROOT_DATA_KEY.START])
	var date = (time.getYear()+1900) + '/' + (time.getMonth()+1) + '/' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
	var facebook_id = other_message[PROFILE_UTIL.OTHER_MESSAGE_KEY.FACEBOOK_ID];
	var location_from = other_message[PROFILE_UTIL.OTHER_MESSAGE_KEY.LOCATION_FROM];
	var location_to  = other_message[PROFILE_UTIL.OTHER_MESSAGE_KEY.LOCATION_TO];
	var post_time  = other_message[PROFILE_UTIL.OTHER_MESSAGE_KEY.POST_TIME];
	// body...
	template ="<li class=\"collection-item avatar "+profile_item_class+" tag-enableclick\" style=\"padding-left:15%;\" data-facebookid=\""+facebook_id+"\" data-posttime=\""+post_time+"\">"
			    +"<img class=\"profile-my-photo circle\" src=\"https://graph.facebook.com/"+facebook_id+"/picture\" />"
			    +"<span class=\"title\">"
			    	+"<span >"+date+"</span>"
				+"</span>"
			    +"<p><span >從 "+location_from+"<span> <span >到 "+location_to+"</span>"
			    	+"<div>"

	var passenger = other_message[PROFILE_UTIL.OTHER_MESSAGE_KEY.PASSENGER];
	for(var i=0;i<passenger.length;i++){
		template = template + "<img class=\"profile-join-photo\" src=\"https://graph.facebook.com/"+passenger[i]+"/picture\" />"
	}

	template = template 
					+"</div>"
			    +"</p>"
			    // +"<div class=\"secondary-content\">"
			    // 	+"<div class=\"btn-floating red\">"
			    // 		+"<i class=\"waves-effect waves-light material-icons\" data-facebookid=\""+facebook_id+"\" data-posttime=\""+post_time+"\">delete</i>"
			    // 	+"</div>"
			    // +"</div>"
		    +"</li>"
	return template;
};