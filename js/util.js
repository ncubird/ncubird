function Util(){
	this.OTHER_MESSAGE_KEY = OTHER_MESSAGE_KEY;
	this.ROOT_DATA_KEY = ROOT_DATA_KEY;
	this.FUNCTION_TYPE_KEY = FUNCTION_TYPE_KEY;
}

var TEMPLATE = [
	{
		_id : "main",
		template : "./templates/home.html"
	},
	{
		_id : "calander",
		template : "./templates/calander.html"
	},
	{
		_id : "timelime",
		template : "./templates/timelime.html"
	},
	{
		_id : "post",
		template : "./templates/post.html"
	},
	{
		_id : "profile",
		template : "./templates/profile.html"
	},
	{
		_id : "about",
		template : "./templates/about.html"
	}

]

var OTHER_MESSAGE_KEY = {
	FACEBOOK_ID : 'facebook_id',
	FACEBOOK_NAME : 'facebook_name',
	GENDER : 'gender',
	LCOATION_FROM : 'location_from',
	LOCATION_FROM_LATLNG : 'location_from_latlng',
	LOCATION_TO : 'location_to',
	LOCATION_TO_LATLNG : 'location_to_latlng',
	BONUS_RESPONSE : 'bonus_response',
	PEOPLE_NUMBER : 'people_number',
	OTHERS : 'others',
	PEROID : 'peroid',
	POST_TIME : 'post_time',
	PASSENGER : 'passenger',
	MAJOR : 'major',
	VEHICAL : 'vehical'
}

var ROOT_DATA_KEY = {
	FUNCTION_TYPE : 'function_type',
	EVENT_TITLE : 'event_title',
	START : 'start',
	END : 'end',
	PEROID : 'peroid',
	END_PEROID : 'end_peroid',
	OTHER_MESSAGE : 'other_message'
}

var FUNCTION_TYPE_KEY = {
	ADD_TO_CALANDER : 'add_to_calander'
}


Util.prototype.get_template_byID = function(id){
	for(var i=0;i<TEMPLATE.length;i++){
		if(TEMPLATE[i]['_id'] == id){
			return TEMPLATE[i]['template'];
		}
	}
	return null;
}

Util.prototype.set_block = function(){
	$('.blockmodal').css('display','table')
}

Util.prototype.set_unblock = function(){
	$('.blockmodal').css('display','none')
}