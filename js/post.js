function Post_controller(post_button_id){
	this.post_button_id = post_button_id;
}

Post_controller.prototype.init = function(eventcallback){
	Materialize.updateTextFields();
	$('select').material_select();


	$('#post_only_ontime').unbind('click');
	$('#post_only_ontime').click(function(){
		if($("#post_only_ontime").prop("checked")) {
		    $("input[name='post_peroid']").each(function() {
		        $(this).prop("disable", "disabled");
		    });
		} else {
		     $("input[name='post_peroid']").each(function() {
		        $(this).prop("disabled", "");
		    });           
		}
	})

	this.event_post_button_onclick(eventcallback)
}

const POST_MONTH = ['null','January','February','March','April','May','June','July','August','September','October','November' ,'December'];

Post_controller.prototype.event_post_button_onclick = function(eventcallback){
	$('#'+this.post_button_id).unbind('click');
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

		var shour = $('#post_time_form_hour').val();
		console.log(shour);

		var sminute = $('#post_time_form_minute').val();
		console.log(sminute);

		if(shour == "" || shour == null || shour == undefined
			|| sminute == "" || sminute == null || sminute == undefined){
			Materialize.toast('請輸入時間', 2000);
			return;
		}else{
			sdate = sdate + shour + ':' + sminute + ':00 GMT+8';
		}

		var edate = $('#post_time_to_date').val();
		console.log(edate);

		if(edate == "" || edate == null || edate == undefined){
			Materialize.toast('請輸入時間', 2000);
			return;
		}else {
			var split_edate = edate.split('-');
			var eyear = split_edate[0];
			var emonth = POST_MONTH[parseInt(split_edate[1])];
			var eday = split_edate[2];
			edate = emonth +' '+ eday + ', ' +eyear + ' '
		}

		var ehour = $('#post_time_to_hour').val();
		console.log(ehour);

		var eminute = $('#post_time_to_minute').val();
		console.log(eminute);

		if(ehour == "" || ehour == null || ehour == undefined
			|| eminute == "" || eminute == null || eminute == undefined){
			Materialize.toast('請輸入時間', 2000);
			return;
		}else{
			edate = edate + ehour + ':' + eminute + ':00 GMT+8';
		}

		if(check_if_date_invalid(sdate,edate)){
			return;
		}

		var vehicle = $('#post_vehicle').val();
		console.log(vehicle);

		if(vehicle == "" || vehicle == null || vehicle == undefined){
			Materialize.toast('請輸入交通方式', 2000);
			return;
		}

		var people_number = $('#post_people_number').val();

		if(people_number == "" || people_number == null || people_number == undefined){
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
		if($("#post_only_ontime").prop("checked")) {
		    $("input[name='post_peroid']").each(function() {
		        if($(this).prop("checked")){
		        	peroid.push($(this).prop("value"));
		        };
		    });
		}

		var data = {
			event_title : type,
			start : sdate,
			end : edate,
			peroid : peroid,
			other_message :{
				function_type : "add_to_calander",
				gender : gender,
				facebook_id : "test",
				location_from : location_from,
				location_to : location_to,
				bonus_response : bonus_response,
				people_number : people_number,
				others : others,
				passenger: []
			}
		}
		eventcallback(data);
	})
}

function check_if_date_invalid(from,to){
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