function Information_block(){

}

Information_block.prototype.show_block = function(data,facebook_id,post_time) {
	// body...
	var INFO_UTIL = new Util();
	var INFO_EVENT_TITLE = { post_have_seat:"我有位子",post_find_seat:"我找司機",post_together_seat:"找人共乘"}
	for(var i=0;i<data.length;i++){
		var other_message = data[i][INFO_UTIL.ROOT_DATA_KEY.OTHER_MESSAGE];
		console.log(JSON.stringify(data[i][INFO_UTIL.ROOT_DATA_KEY.OTHER_MESSAGE]) + '\n' +facebook_id + '\n' + post_time);
		if(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.FACEBOOK_ID] == facebook_id && other_message[INFO_UTIL.OTHER_MESSAGE_KEY.POST_TIME] == post_time){
			$('.blockmodal-infomation-titleimg').attr("src","https://graph.facebook.com/"+facebook_id+"/picture");
			$('.blockmodal-infomation-type').html(INFO_EVENT_TITLE[data[i][INFO_UTIL.ROOT_DATA_KEY.EVENT_TITLE]]);
			$('.blockmodal-infomation-name').html(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.FACEBOOK_NAME]);
			$('.blockmodal-infomation-major').html(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.MAJOR]);
			$('.blockmodal-infomation-gender').html(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.GENDER]);
			$('.blockmodal-infomation-location-from').html(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.LOCATION_FROM]);
			$('.blockmodal-infomation-location-to').html(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.LOCATION_TO]);
			var time = new Date(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.TIME]);
			$('.blockmodal-infomation-time').html(time.getYear() + '/' + (time.getMonth()+1) + '/' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds());
			$('.blockmodal-infomation-vehical').html(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.VEHICAL]);			
			$('.blockmodal-infomation-people-number').html(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.PEOPLE_NUMBER]);
			$('.blockmodal-infomation-bouns-response').html(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.BONUS_RESPONSE]);
			$('.blockmodal-infomation').css('display','table');

			$('.blockmodal-infomation-cancelbtn').click(function(){
				$('.blockmodal-infomation').css('display','none');
			});

			$('.blockmodal-infomation-joinbtn').click(function(){
				$('.blockmodal-infomation').css('display','none');
			});
			return ;
		}
	}
};