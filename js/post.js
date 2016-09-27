function Post_controller(post_button_id){
	this.post_button_id = post_button_id;
	this.gmap;
}

const INPUT_FROM_MARKERID = 'from';
const INPUT_TO_MARKERID = 'to';

Post_controller.prototype.init = function(eventcallback){
	Materialize.updateTextFields();
	var self = this;
	$('select').material_select();


	$('#post_only_ontime').unbind('click');
	$('#post_only_ontime').click(function(){
		if($("#post_only_ontime").prop("checked")) {
		    $("input[name='post_peroid']").prop("disabled", "disabled");
		} else {
		    $("input[name='post_peroid']").prop("disabled", "");
		}
	})

	$('#post_type').off('change');
	$('#post_type').on('change',function(){
		if($("#post_type").val() == 'post_find_seat') {
			console.log('chahge');
		    $('#post_people_number').val("1");
		    $('#post_people_number').prop("disabled", "disabled");
		} else {
		    $('#post_people_number').prop("disabled", "");
		}
	})

	$('#post_copy_button').unbind('click');
	$('#post_copy_button').click(function(){
		self.event_post_button_onclick(function(data){
			var POST_COPY_UTIL = new Util();
			POST_COPY_UTIL.html2clipboard(POST_COPY_UTIL.html2clipboard_template(data));
			Materialize.toast('已經複製到剪貼簿', 2000);
		});
	});

	$('#'+this.post_button_id).unbind('click');	
	$('#'+this.post_button_id).click(function(){
		self.event_post_button_onclick(eventcallback);
	});

	console.log(document.getElementById('post_map'));

	this.gmap = new Google_map('post_map');
	this.gmap.add_marker(INPUT_FROM_MARKERID,'post_location_from','pin-green.png');
	this.gmap.add_marker(INPUT_TO_MARKERID,'post_location_to','pin-red.png');

	
	
}

Post_controller.prototype.reset_value = function(){
	$('#post_name').val("");
	$("#post_major").val("");
	$("#post_gender").val("");
	$('#post_location_to').val();
	$('#post_location_from').val("");
	$('#post_time_from_date').val("");
	$('#post_time_from_hour').val("");
	$('#post_time_from_minute').val("");
	$('#post_vehicle').val("");
	$('#post_people_number').val("");
	$('#post_bonus_response').val("");
	$('#post_other_message').val("");
}

const POST_MONTH = ['null','January','February','March','April','May','June','July','August','September','October','November' ,'December'];
const POST_MONTH_DAYS = [0,31,28,31,30,31,30,31,31,30,31,30,31];

Post_controller.prototype.event_post_button_onclick = function(eventcallback){
	var self = this;
	var type = $("#post_type").val();
	if( type  == "" || type == null || type == undefined ){
		Materialize.toast('請輸入方式', 2000);
		return;
	}

	var name = $('#post_name').val();
	if(name == "" || name == null || name == undefined){
		Materialize.toast('請輸入姓名', 2000);
		return;
	}

	var major = $("#post_major").val();
	if(major == "" || major == null || major == undefined){
		Materialize.toast('請輸入系所或職業', 2000);
		return;
	}

	var gender = $("#post_gender").val();
	if(gender == "性別" || major == null || major == undefined ){
		Materialize.toast('請輸入性別', 2000);
		return;
	}

	var post_email = "";

	if($("#post_email_check").prop("checked")) {
	    if($("#post_email").val() == "" || $("#post_email").val() == null || $("#post_email").val() == undefined ){
	    	Materialize.toast('請輸入Email，或取消系統通知', 2000);
	    	return;
	    }
	}else{
		post_email = $("#post_email").val();
	}

	var location_from = $('#post_location_from').val();
	var location_to = $('#post_location_to').val();

	if(location_from == "" || location_from == null || location_from == undefined 
		|| location_to == "" || location_to == null || location_to == undefined){
		Materialize.toast('請輸入地點', 2000);
		return;
	}else{
		console.log(self.gmap.get_location(INPUT_TO_MARKERID));
		console.log(self.gmap.get_location(INPUT_FROM_MARKERID));
		location_from_latlng = self.gmap.get_location(INPUT_FROM_MARKERID);
		location_to_latlng = self.gmap.get_location(INPUT_TO_MARKERID);
	}

	var sdate = $('#post_time_from_date').val();
	
	console.log(sdate);
	if(sdate == "" || sdate == null || sdate == undefined){
		Materialize.toast('請輸入時間', 2000);
		return;
	}else {
		var split_sdate = sdate.split('-');
		var syear = split_sdate[0];
		var smonth = POST_MONTH[parseInt(split_sdate[1])];
		var sday = split_sdate[2];
		sdate = smonth +' '+ sday + ', ' +syear + ' '
	}

	var edate = sdate;

	var shour = $('#post_time_from_hour').val();
	console.log(shour);

	var sminute = $('#post_time_from_minute').val();
	console.log(sminute);

	if(shour == "" || shour == null || shour == undefined
		|| sminute == "" || sminute == null || sminute == undefined 
		|| parseInt(shour) < 0 || parseInt(shour) >= 24 
		|| parseInt(sminute) < 0 || parseInt(sminute) >=60 ){
		Materialize.toast('請輸入時間', 2000);
		return;
	}else{
		if(parseInt(shour) < 10 ){
			shour = "0"+shour;
		}

		if(parseInt(sminute) < 10){
			sminute = "0"+sminute;
		}
		sdate = sdate + shour + ':' + sminute + ':00';
	}

	var ehour = shour;
	console.log(ehour);

	var eminute = sminute;

	edate = edate + ehour + ':' + eminute + ':59';

	if(!self.check_if_date_invalid(sdate,edate)){
		return;
	}

	var vehicle = $('#post_vehicle').val();
	console.log(vehicle);

	if(vehicle == "" || vehicle == null || vehicle == undefined){
		Materialize.toast('請輸入交通方式', 2000);
		return;
	}

	var people_number = $('#post_people_number').val();

	if(people_number == "" || people_number == null || people_number == undefined || people_number < 1){
		Materialize.toast('請輸入人數', 2000);
		return;
	}

	var bonus_response = $('#post_bonus_response').val();

	if(bonus_response == "" || bonus_response == null || bonus_response == undefined){
		Materialize.toast('請輸入回饋方式', 2000);
		return;
	}

	var others = $('#post_other_message').val();

	var peroid = [];
	if(!$("#post_only_ontime").prop("checked")) {
	    $("input[name='post_peroid']").each(function() {
	        if($(this).prop("checked")){
	        	console.log($(this).val())
	        	peroid.push($(this).val());
	        };
	    });
	}

	var end_peroid = "";
	if(peroid.length != 0){
		end_peroid = smonth +' '+ ((self.is_spectial_Feb(syear) && smonth == 2)? 29 : POST_MONTH_DAYS[parseInt(split_sdate[1])]) + ', ' +syear + ' ' + shour + ':' + sminute + ':00';
	}

	var now_time = new Date();
	var POST_UTIL = new Util();

	var data = {};
	var other_message = {};

	other_message[POST_UTIL.OTHER_MESSAGE_KEY.GENDER] = gender;
	other_message[POST_UTIL.OTHER_MESSAGE_KEY.FACEBOOK_ID] = $('#facebook_userid').html();
	other_message[POST_UTIL.OTHER_MESSAGE_KEY.FACEBOOK_NAME] = $('#facebook_name').html();
	other_message[POST_UTIL.OTHER_MESSAGE_KEY.POST_EMAIL] = post_email;
	other_message[POST_UTIL.OTHER_MESSAGE_KEY.LOCATION_FROM] = location_from;
	other_message[POST_UTIL.OTHER_MESSAGE_KEY.LOCATION_FROM_LATLNG] = location_from_latlng;
	other_message[POST_UTIL.OTHER_MESSAGE_KEY.LOCATION_TO] = location_to;
	other_message[POST_UTIL.OTHER_MESSAGE_KEY.LOCATION_TO_LATLNG] = location_to_latlng;
	other_message[POST_UTIL.OTHER_MESSAGE_KEY.BONUS_RESPONSE] = bonus_response ;
	other_message[POST_UTIL.OTHER_MESSAGE_KEY.PEOPLE_NUMBER] = people_number;
	other_message[POST_UTIL.OTHER_MESSAGE_KEY.OTHERS] = others;
	other_message[POST_UTIL.OTHER_MESSAGE_KEY.PEROID] = peroid;
	other_message[POST_UTIL.OTHER_MESSAGE_KEY.POST_TIME] = now_time.getTime();
	other_message[POST_UTIL.OTHER_MESSAGE_KEY.PASSENGER] = [];
	other_message[POST_UTIL.OTHER_MESSAGE_KEY.MAJOR] = major;
	other_message[POST_UTIL.OTHER_MESSAGE_KEY.VEHICAL] = vehicle;

	data[POST_UTIL.ROOT_DATA_KEY.FUNCTION_TYPE] = POST_UTIL.FUNCTION_TYPE_KEY.ADD_TO_CALANDER;
	data[POST_UTIL.ROOT_DATA_KEY.EVENT_TITLE] =  type;
	data[POST_UTIL.ROOT_DATA_KEY.START] = sdate;
	data[POST_UTIL.ROOT_DATA_KEY.END] = edate;
	data[POST_UTIL.ROOT_DATA_KEY.PEROID] = peroid;
	data[POST_UTIL.ROOT_DATA_KEY.END_PEROID] = end_peroid;
	data[POST_UTIL.ROOT_DATA_KEY.OTHER_MESSAGE] = other_message;



		

		// var data = {
		// 	function_type : "get_event_forday",
		// 	date : (smonth +' '+ ((self.is_spectial_Feb(syear) && smonth == 2)? 29 : POST_MONTH_DAYS[parseInt(split_sdate[1])]) + ', ' +syear)
		// }

		// var data={
		// 	function_type : "delete_to_calander",
		// 	facebook_id : "test",
		// 	start : smonth +' '+ ((self.is_spectial_Feb(syear) && smonth == 2)? 29 : POST_MONTH_DAYS[parseInt(split_sdate[1])] + ', ' +syear + ' ' + '12:00:00'),
		// 	end : smonth +' '+ ((self.is_spectial_Feb(syear) && smonth == 2)? 29 : POST_MONTH_DAYS[parseInt(split_sdate[1])] + ', ' +syear + ' ' + '12:01:00'),
		// 	peroid :[]
		// }
	eventcallback(data);
}
	

Post_controller.prototype.is_spectial_Feb = function(year){
	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}


Post_controller.prototype.check_if_date_invalid =function(from,to){
	var from_date = new Date(from);
	var to_date = new Date(to);

	var now = new Date();

	if(from_date.getTime() < (now.getTime()-1000*120)){
		Materialize.toast('時間已經過了', 2000);
		return false;
	}

	if(to_date.getTime() < from_date.getTime()){
		Materialize.toast('時間錯了', 2000);
		return false;
	}
	return true;
}