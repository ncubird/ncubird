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
		console.log(name);
		if(name == "" || name == null || name == undefined){
			Materialize.toast('請輸入姓名', 4000)
			return;
		}
		var major = $("#gender").val();
		if(major == "性別"){
			Materialize.toast('請輸入性別', 4000)
		}

		var location_from = $('#location_from').val();
		var location_to = $('#location_to').val();
	})
}