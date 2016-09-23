function Post_controller(post_button_id){
	this.post_button_id = post_button_id;
	this.gmap;
}

const INPUT_FROM_MARKERID = 'from';
const INPUT_TO_MARKERID = 'to';

Post_controller.prototype.init = function(eventcallback){
	Materialize.updateTextFields();
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
		    $('#post_people_number').val("2");
		    $('#post_people_number').prop("disabled", "disabled");
		} else {
		    $('#post_people_number').prop("disabled", "");
		}
	})

	console.log(document.getElementById('post_map'));

	this.gmap = new Google_map('post_map');
	this.gmap.add_marker(INPUT_FROM_MARKERID,'post_location_from','pin-green.png');
	this.gmap.add_marker(INPUT_TO_MARKERID,'post_location_to','pin-red.png');



	
	this.event_post_button_onclick(eventcallback)
}

const POST_MONTH = ['null','January','February','March','April','May','June','July','August','September','October','November' ,'December'];
const POST_MONTH_DAYS = [0,31,28,31,30,31,30,31,31,30,31,30,31];

Post_controller.prototype.event_post_button_onclick = function(eventcallback){
	$('#'+this.post_button_id).unbind('click');
	var self = this;
	$('#'+this.post_button_id).click(function(){

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
			|| parseInt(shour) < 0 || parseInt(sminute) >= 24 
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

		if(people_number == "" || people_number == null || people_number == undefined || people_number < 2){
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

		var data = {
			function_type : "add_to_calander",
			event_title : type,
			start : sdate,
			end : edate,
			peroid : peroid,
			end_peroid : end_peroid,
			other_message :{				
				gender : gender,
				facebook_id : $('#facebook_userid').html(),
				location_from : location_from,
				location_from_latlng : location_from_latlng,
				location_to : location_to,
				location_to_latlng : location_to_latlng,
				bonus_response : bonus_response,
				people_number : people_number,
				others : others,
				peroid : peroid,
				submit_time : now_time.getTime(),
				passenger: []
			}
		}

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
	})
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