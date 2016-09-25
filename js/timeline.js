function Timeline_controller(timeline_class_month){
	this.now;
	this.year;
	this.month;
	this.day;
	this.date;
	this.hour;
	this.long_time;
	this.timeline_class_month = timeline_class_month;
	this.timeline_search = 'all';
	this.timeline_search_value = "";
	this.month_value;
	this.raw_data;
}

Timeline_controller.prototype.set_today_and_sync = function(){
	var now = new Date();
	this.now = now;
	this.year = now.getYear()+1900;
	this.month = now.getMonth();
	this.hour = now.getHours();
	this.day = now.getDay();
	this.date = now.getDate();
	this.long_time = now.getTime();
}

Timeline_controller.prototype.set_template_month_item = function(data,search_callback,select_callback,event_callback){
	Materialize.updateTextFields();
	$('select').material_select();
	var self = this;

	console.log(data);
	

	$('.'+this.timeline_class_month).html("");
	for(var i=0;i<data.length;i++){
		$('.'+this.timeline_class_month).html($('.'+this.timeline_class_month).html()+this.template_item('timeline-month-item',data[i]));		
	}

	this.raw_data = data;

	$('#timeline_month_select').off('change');
	$('#timeline_month_select').on('change',function(){
		$('#timeline_month_select').off('change');
		var tmp_value = $('#timeline_month_select').val();
		self.month_value = tmp_value;
		select_callback(tmp_value);
	})

	$('#timeline_type_select').off('change');
	$('#timeline_type_select').on('change',function(){
		$('#timeline_type_select').off('change')

		$('#timeline_search_time').addClass('timeline-search-disable')
		$('#timeline_search_location').addClass('timeline-search-disable')
		$('#timeline_search_type').addClass('timeline-search-disable')
		var tmp_value = ('#timeline_type_select').val();		
		switch(tmp_value){
			case 'all':
				self.timeline_search = 'all'
				break;
			case 'time':
				$('#timeline_search_time').removeClass('timeline-search-disable');
				self.timeline_search = '#timeline_search_time'
				break;
			case 'location':
				$('#timeline_search_location').removeClass('timeline-search-disable')
				self.timeline_search = '#timeline_search_location'
				break;
			case 'type':
				$('#timeline_search_type').removeClass('timeline-search-disable')
				self.timeline_search = '#timeline_search_type'
				break;
		}

		self.set_search_change(search_callback);
	})

	self.set_search_change(search_callback);	
	event_callback(data);
	// $('.profile-month-item').unbind('click');
	// $('.profile-month-item').click(function(){
	// 	event_callback(data);
	// })
}

Timeline_controller.prototype.set_search_change = function(search_callback){
	var self = this;
	var TIMELINE_UTIL = new Util();
	if(self.timeline_search != 'all'){
		$(self.timeline_search).off('input propertychange paste');
		$(self.timeline_search).on('input propertychange paste',function(){
			var tmp_value = $(self.timeline_search).val();
			self.timeline_search_value = tmp_value;

			$('.'+self.timeline_class_month).html("");
			for(var i=0;i<self.raw_data.length;i++){
				var flag_show = false;
				var other_message = self.raw_data[i][TIMELINE_UTIL.ROOT_DATA_KEY.OTHER_MESSAGE];
				var compare_message = "";

				switch(self.timeline_search){
					case '#timeline_search_time' :
						compare_message = self.raw_data[i][TIMELINE_UTIL.ROOT_DATA_KEY.START];
						break;
					case '#timeline_search_location' :
						compare_message = other_message[TIMELINE_UTIL.OTHER_MESSAGE_KEY.LOCATION_FROM];
						compare_message = compare_message + other_message[TIMELINE_UTIL.OTHER_MESSAGE_KEY.LOCATION_TO];
						break;
					case '#timeline_search_type' :
						compare_message = self.raw_data[i][TIMELINE_UTIL.ROOT_DATA_KEY.EVENT_TITLE];
						break;
				}
				
				if(compare_message.indexOf(tmp_value) !== -1 || compare_message="" ){
					$('.'+this.timeline_class_month).html($('.'+this.timeline_class_month).html()+this.template_item('timeline-month-item',self.raw_data[i]));
				}
			}
			search_callback(self.raw_data);
			
		})
	}else{
		for(var i=0;i<self.raw_data.length;i++){
			$('.'+this.timeline_class_month).html($('.'+this.timeline_class_month).html()+this.template_item('timeline-month-item',self.raw_data[i]));
		}
		search_callback(self.raw_data);
	}
	
	
}

Timeline_controller.prototype.template_item = function(profile_item_class,item_data) {

	var template = "";

	var TIMELINE_UTIL = new Util();
	const TIMELINE_EVENT_TITLE = { post_have_seat:"我有位子",post_find_seat:"我找司機",post_together_seat:"找人共乘"};
	var other_message = item_data[TIMELINE_UTIL.ROOT_DATA_KEY.OTHER_MESSAGE];
	var time = new Date(item_data[TIMELINE_UTIL.ROOT_DATA_KEY.START])
	var date = (time.getYear()+1900) + '/' + (time.getMonth()+1) + '/' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
	var facebook_id = other_message[TIMELINE_UTIL.OTHER_MESSAGE_KEY.FACEBOOK_ID];
	var location_from = other_message[TIMELINE_UTIL.OTHER_MESSAGE_KEY.LOCATION_FROM];
	var location_to  = other_message[TIMELINE_UTIL.OTHER_MESSAGE_KEY.LOCATION_TO];
	var post_time  = other_message[TIMELINE_UTIL.OTHER_MESSAGE_KEY.POST_TIME];
	var bonus_response = new Date(item_data[TIMELINE_UTIL.OTHER_MESSAGE_KEY.BONUS_RESPONSE]);
	var type = item_data[TIMELINE_UTIL.ROOT_DATA_KEY.EVENT_TITLE];
	// body...
	template ="<li class=\"collection-item avatar "+profile_item_class+" \" style=\"padding-left:15%;\" data-facebookid=\""+facebook_id+"\" data-posttime=\""+post_time+"\">"
			    +"<img class=\"profile-my-photo circle\" src=\"https://graph.facebook.com/"+facebook_id+"/picture\" />"
			    +"<span class=\"title\">"
			    	+"<span >"+date+' '+ TIMELINE_EVENT_TITLE[type] +"</span>"
				+"</span>"
			    +"<p><span >從 "+location_from+"<span> <span >到 "+location_to+" 回饋方式 :"+bonus_response+"</span>"
			    	+"<div>"

	var passenger = other_message[TIMELINE_UTIL.OTHER_MESSAGE_KEY.PASSENGER];
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