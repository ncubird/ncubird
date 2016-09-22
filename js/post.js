function Post_controller(post_button_id){
	this.post_button_id = post_button_id;
}

Post_controller.prototype.init = function(eventcallback){
	Materialize.updateTextFields();
	$('select').material_select();
	this.event_post_button_onclick(eventcallback)
}

Post_controller.prototype.event_post_button_onclick = function(eventcallback){
	$('#'+this.post_button_id).unbind('click');
	$('#'+this.post_button_id).click(function(){
		var name = $('#post-name').val();
		if(name == "" || name == null || name == undefined){
			Materialize.toast('請輸入姓名', 2000);
			return;
		}

		var major = $("#major").val();
		if(major == "" || major == null || major == undefined){
			Materialize.toast('請輸入系所或職業', 2000);
			return;
		}

		var gender = $("#gender").val();
		if(gender == "性別"){
			Materialize.toast('請輸入性別', 2000);
			return;
		}

		var location_from = $('#location_from').val();
		var location_to = $('#location_to').val();

		if(location_from == "" || location_from == null || location_from == undefined 
			|| location_to == "" || location_to == null || location_to == undefined){
			Materialize.toast('請輸入地點', 2000);
			return;
		}

		var sdate = $('#time_from_date').val();
		console.log(sdate);

		var shour = $('#time_form_hour').val();
		console.log(shour);

		var sminute = $('#time_form_minute').val();
		console.log(sminute);

		var edate = $('#time_to_date').val();
		console.log(edate);

		var ehour = $('#time_to_hour').val();
		console.log(ehour);

		var eminute = $('#time_to_minute').val();
		console.log(eminute);

		var vehicle = $('#vehicle').val();
		console.log(vehicle);

		if(vehicle == "" || vehicle == null || vehicle == undefined){
			Materialize.toast('請輸入交通方式', 2000);
			return;
		}

		var people_number = $('#people_number').val();

		if(people_number == "" || people_number == null || people_number == undefined){
			Materialize.toast('請輸入人數', 2000);
			return;
		}

		var bonus_response = $('#bonus_response').val();

		if(bonus_response == "" || bonus_response == null || bonus_response == undefined){
			Materialize.toast('請輸入回饋方式', 2000);
			return;
		}

		var other_message = $('#other_message').val();
	})
}