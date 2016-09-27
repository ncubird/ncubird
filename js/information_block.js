function Information_block(){
	
}


Information_block.prototype.show_block = function(data,facebook_id,post_time,callback) {
	// body...
	var self = this;
	var INFO_UTIL = new Util();
	var INFO_EVENT_TITLE = { post_have_seat:"我有位子",post_find_seat:"我找司機",post_together_seat:"找人共乘"};
	const INFO_MONTH_DAYS = [31,28,31,30,31,30,31,31,30,31,30,31];
	for(var i=0;i<data.length;i++){
		var other_message = data[i][INFO_UTIL.ROOT_DATA_KEY.OTHER_MESSAGE];
		console.log(JSON.stringify(data[i][INFO_UTIL.ROOT_DATA_KEY.OTHER_MESSAGE]) + '\n' +facebook_id + '\n' + post_time);
		if(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.FACEBOOK_ID] == facebook_id && other_message[INFO_UTIL.OTHER_MESSAGE_KEY.POST_TIME] == post_time){
			$('.blockmodal-infomation-titleimg').attr("src","https://graph.facebook.com/"+facebook_id+"/picture?type=large");
			$('.blockmodal-infomation-type').html(INFO_EVENT_TITLE[data[i][INFO_UTIL.ROOT_DATA_KEY.EVENT_TITLE]]);
			$('.blockmodal-infomation-name').html(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.FACEBOOK_NAME]);

			$('.blockmodal-infomation-deletebtn').addClass('btn-disable');
			if(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.FACEBOOK_ID] == $('#facebook_userid').html()){
				console.log("@@@@@@@@@@test@@@@@@@@@@");
				$('.blockmodal-infomation-deletebtn').removeClass('btn-disable');
			}

			$('.blockmodal-infomation-major').html(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.MAJOR]);
			$('.blockmodal-infomation-gender').html(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.GENDER]);

			$('.blockmodal-infomation-post-email').html(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.POST_EMAIL]);

			$('.blockmodal-infomation-location-from').html(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.LOCATION_FROM]);
			$('.blockmodal-infomation-location-to').html(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.LOCATION_TO]);

			

			var time = new Date(data[i][INFO_UTIL.ROOT_DATA_KEY.START]);
			$('.blockmodal-infomation-time').html((time.getYear()+1900) + '/' + (time.getMonth()+1) + '/' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds());
			$('.blockmodal-infomation-vehical').html(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.VEHICAL]);			
			$('.blockmodal-infomation-people-number').html(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.PEOPLE_NUMBER]);
			$('.blockmodal-infomation-bouns-response').html(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.BONUS_RESPONSE]);

			$('.blockmodal-infomation').css('display','table');

			$(".blockmodal-infomation").css('height','0xp');
            $(".blockmodal-infomation").height(0);
            $(".blockmodal-infomation").css('height',$( document ).height()+'px');

            var context_height = $("#information_context").height();
            var offset = $( document ).height() - context_height;
            $(".blockmodal-infomation").css('padding-top',(offset/3 - 32)+'px');
            $(".blockmodal-infomation").css('padding-bottom',(2*offset/3 - 32)+'px');

			var gmap = new Google_map('block_map');
			console.log(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.LOCATION_FROM_LATLNG]);
			if(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.LOCATION_FROM_LATLNG] != "" && other_message[INFO_UTIL.OTHER_MESSAGE_KEY.LOCATION_FROM_LATLNG] != undefined && other_message[INFO_UTIL.OTHER_MESSAGE_KEY.LOCATION_FROM_LATLNG] != null){
				gmap.set_marker('from','pin-green.png',other_message[INFO_UTIL.OTHER_MESSAGE_KEY.LOCATION_FROM_LATLNG]);
			}
			if(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.LOCATION_TO_LATLNG] != "" && other_message[INFO_UTIL.OTHER_MESSAGE_KEY.LOCATION_TO_LATLNG] != undefined && other_message[INFO_UTIL.OTHER_MESSAGE_KEY.LOCATION_TO_LATLNG] != null){
				gmap.set_marker('to','pin-red.png',other_message[INFO_UTIL.OTHER_MESSAGE_KEY.LOCATION_TO_LATLNG]);
			}
			

			$('.blockmodal-infomation-bouns-joinpeople').html("");
			var passenger = other_message[INFO_UTIL.OTHER_MESSAGE_KEY.PASSENGER];
			$('.blockmodal-infomation-unjoinbtn').addClass('btn-disable');
			for(var j=0;j<passenger.length;j++){
				$('.blockmodal-infomation-bouns-joinpeople').html($('.blockmodal-infomation-bouns-joinpeople').html()+ this.template_passenger_item(passenger[j]));
				if(passenger[j] == $('#facebook_userid').html()){
					$('.blockmodal-infomation-unjoinbtn').removeClass('btn-disable');
				}
			}


			$('.blockmodal-infomation-contectpassenger').addClass('btn-disable');
			if(passenger.length > 0 ){
				if(facebook_id == $('#facebook_userid').html()){
					if (navigator.userAgent.indexOf("Mobi") < 0){ //computer
						$('.blockmodal-infomation-contectpassenger').removeClass('btn-disable');
						$('.blockmodal-infomation-contectpassenger').unbind('click');
						$('.blockmodal-infomation-contectpassenger').click(function(){
							var fb_sdk = new Fb_sdk();			
							fb_sdk.send_message(passenger);
							
						});
					}
				}
			}

			
			// if (navigator.userAgent.indexOf("Mobi") > -1){
				// $('.blockmodal-infomation-contectposter').addClass('btn-disable');
			// }

			$('.blockmodal-infomation-contectposter').unbind('click');
			$('.blockmodal-infomation-contectposter').click(function(){
				if (navigator.userAgent.indexOf("Mobi") < 0){
					var fb_sdk = new Fb_sdk();				
					fb_sdk.send_message([facebook_id]);
				}else{
					var fb_sdk = new Fb_sdk();
					fb_sdk.link_poster(other_message[INFO_UTIL.OTHER_MESSAGE_KEY.FACEBOOK_ID] );
				}
			})
			
			$('.blockmodal-infomation-cancelbtn').unbind('click');
			$('.blockmodal-infomation-cancelbtn').click(function(){
				$('.blockmodal-infomation').css('display','none');

			});
			console.log(data[i]);

			$('.blockmodal-infomation-joinbtn').unbind('click');
			$('.blockmodal-infomation-joinbtn').click({ parmas1 : facebook_id , parmas2 : data[i] , parmas3 : other_message },function(tmp){
				$('.blockmodal-infomation').css('display','none');
				if(facebook_id  == $('#facebook_userid').html()){
					Materialize.toast('不能自己載自己', 2000);
					callback(undefined);
					return;
				}
				console.log(tmp['data']['parmas2']);
				var send_data = {};
				send_data[INFO_UTIL.ROOT_DATA_KEY.FUNCTION_TYPE] = INFO_UTIL.FUNCTION_TYPE_KEY.JOIN_EVENT;
				send_data[INFO_UTIL.ROOT_DATA_KEY.POST_FACEBOOK_ID] = tmp['data']['parmas1'];
				send_data[INFO_UTIL.ROOT_DATA_KEY.JOIN_FACEBOOK_ID] = $('#facebook_userid').html();

				var time = new Date(tmp['data']['parmas2'][INFO_UTIL.ROOT_DATA_KEY.START]);

				var send_starttime = new Date(time.getYear()+1900,time.getMonth(),1,0,0,0);
				var send_endtime = new Date(time.getYear()+1900,time.getMonth(),((self.is_spectial_Feb(time.getYear()) && time.getMonth() == 1)? 29 : INFO_MONTH_DAYS[time.getMonth()]),23,59,00);
				console.log(time.getYear()+' '+time.getMonth())
				send_data[INFO_UTIL.ROOT_DATA_KEY.START] = send_starttime.getTime();
				send_data[INFO_UTIL.ROOT_DATA_KEY.END] = send_endtime.getTime();
				send_data[INFO_UTIL.ROOT_DATA_KEY.POST_TIME] = tmp['data']['parmas3'][INFO_UTIL.OTHER_MESSAGE_KEY.POST_TIME];
				console.log(JSON.stringify(send_data));
				callback(send_data);
			});

			$('.blockmodal-infomation-unjoinbtn').unbind('click');
			$('.blockmodal-infomation-unjoinbtn').click({ parmas1 : facebook_id , parmas2 : data[i] , parmas3 : other_message },function(tmp){
				$('.blockmodal-infomation').css('display','none');
				if(facebook_id  == $('#facebook_userid').html()){
					Materialize.toast('出錯了2', 2000);
					callback(undefined);
					return;
				}
				console.log(tmp['data']['parmas2']);
				var send_data = {};
				send_data[INFO_UTIL.ROOT_DATA_KEY.FUNCTION_TYPE] = INFO_UTIL.FUNCTION_TYPE_KEY.UNJOIN_EVENT;
				send_data[INFO_UTIL.ROOT_DATA_KEY.POST_FACEBOOK_ID] = tmp['data']['parmas1'];
				send_data[INFO_UTIL.ROOT_DATA_KEY.JOIN_FACEBOOK_ID] = $('#facebook_userid').html();

				var time = new Date(tmp['data']['parmas2'][INFO_UTIL.ROOT_DATA_KEY.START]);

				var send_starttime = new Date(time.getYear()+1900,time.getMonth(),1,0,0,0);
				var send_endtime = new Date(time.getYear()+1900,time.getMonth(),((self.is_spectial_Feb(time.getYear()) && time.getMonth() == 1)? 29 : INFO_MONTH_DAYS[time.getMonth()]),23,59,00);
				console.log(time.getYear()+' '+time.getMonth())
				send_data[INFO_UTIL.ROOT_DATA_KEY.START] = send_starttime.getTime();
				send_data[INFO_UTIL.ROOT_DATA_KEY.END] = send_endtime.getTime();
				send_data[INFO_UTIL.ROOT_DATA_KEY.POST_TIME] = tmp['data']['parmas3'][INFO_UTIL.OTHER_MESSAGE_KEY.POST_TIME];
				console.log(JSON.stringify(send_data));
				callback(send_data);
			});

			$('.blockmodal-infomation-deletebtn').unbind('click');
			$('.blockmodal-infomation-deletebtn').click({ parmas1 : facebook_id , parmas2 : data[i] , parmas3 : other_message },function(tmp){
				$('.blockmodal-infomation').css('display','none');
				// if(facebook_id  == $('#facebook_userid').html()){
				// 	Materialize.toast('出錯了', 2000);
				// 	callback(undefined);
				// }
				var peroid = [];
				if(tmp['data']['parmas3']['peroid'].length > 0){
					if (confirm("要刪除整個週期嗎？") == true) {
				        peroid = tmp['data']['parmas3']['peroid'];
				    }
				}
				//console.log(tmp['data']['parmas2']);
				var send_data = {};
				send_data[INFO_UTIL.ROOT_DATA_KEY.FUNCTION_TYPE] = INFO_UTIL.FUNCTION_TYPE_KEY.DELETE_TO_CALANDER;
				send_data[INFO_UTIL.ROOT_DATA_KEY.FACEBOOK_ID] = $('#facebook_userid').html();

				var time = new Date(tmp['data']['parmas2'][INFO_UTIL.ROOT_DATA_KEY.START]);

				var send_starttime = new Date(time.getYear()+1900,time.getMonth(),1,0,0,0);
				var send_endtime = new Date(time.getYear()+1900,time.getMonth(),((self.is_spectial_Feb(time.getYear()) && time.getMonth() == 1)? 29 : INFO_MONTH_DAYS[time.getMonth()]),23,59,00);
				console.log(time.getYear()+' '+time.getMonth())
				send_data[INFO_UTIL.ROOT_DATA_KEY.START] = send_starttime.getTime();
				send_data[INFO_UTIL.ROOT_DATA_KEY.END] = send_endtime.getTime();
				send_data[INFO_UTIL.ROOT_DATA_KEY.POST_TIME] = tmp['data']['parmas3'][INFO_UTIL.OTHER_MESSAGE_KEY.POST_TIME];
				send_data[INFO_UTIL.ROOT_DATA_KEY.PEROID] = peroid;
				console.log(JSON.stringify(send_data));
				callback(send_data);
			});

			$('.blockmodal-infomation-copytext').unbind('click');
			$('.blockmodal-infomation-copytext').click({ parmas1 : facebook_id , parmas2 : data[i] , parmas3 : other_message },function(tmp){
				var INFO_COPY_UTIL = new Util();
				INFO_COPY_UTIL.html2clipboard(INFO_COPY_UTIL.html2clipboard_template(tmp['data']['parmas2']));
				Materialize.toast('已經複製到剪貼簿', 2000);
			});

			window.onclick = function(event) {
			    if (event.target == document.getElementsByClassName("blockmodal-infomation")[0]) {
			        $('.blockmodal-infomation').css('display','none');
			    }
			}
			return ;
		}
	}
};

Information_block.prototype.template_passenger_item = function(facebook_id){
	return "<img class=\"blockmodal-infomation-passenger-item\" src=\"https://graph.facebook.com/"+facebook_id+"/picture\" data-facebookid=\""+facebook_id+"\"></img>";
}

Information_block.prototype.is_spectial_Feb = function(year){
	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}