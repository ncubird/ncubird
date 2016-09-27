function Google_gmail_send(){

}


Google_gmail_send.prototype.send = function(data,type,ref_facebook_id,ref_posttime,join_facebook_id){
	var GOOGLE_GMAIL_SEND = new Util();
	for(var i=0;i<data.length;i++){
        var other_message = data[i][GOOGLE_GMAIL_SEND.ROOT_DATA_KEY.OTHER_MESSAGE];
        console.log(JSON.stringify(data[i][GOOGLE_GMAIL_SEND.ROOT_DATA_KEY.OTHER_MESSAGE]) + '\n' +ref_facebook_id + '\n' + ref_posttime);
        if(other_message[GOOGLE_GMAIL_SEND.OTHER_MESSAGE_KEY.FACEBOOK_ID] == ref_facebook_id && other_message[GOOGLE_GMAIL_SEND.OTHER_MESSAGE_KEY.POST_TIME] == ref_posttime){
        	if(other_message[GOOGLE_GMAIL_SEND.OTHER_MESSAGE_KEY.FLAG_POST_EMAIL] == 'enable'){
        		var res = {
        			type : type,
	        		post_email : other_message[GOOGLE_GMAIL_SEND.OTHER_MESSAGE_KEY.POST_EMAIL],
	        		join_facebook_id : join_facebook_id,
	        		data : data[i]
	        	}
	        	console.log(res);

	        	var google_app_url = "https://script.google.com/macros/s/AKfycbyQFFTxWY99VsqXatukwe8aCqRq5mJ_UzfaTtMX-36Av6HbtWA/exec";
	        	$.ajax({
				    url: google_app_url+"?data="+JSON.stringify(res), 
				    type: "GET",   
				    dataType: 'jsonp',
				    cache: false,
				    success: function(response){
				        console.log("success" + JSON.stringify(response));
				        if(response['resultcode'] == 200){
				        	Materialize.toast('已經送出通知', 2000);
				        }else{
				        	console.log("error");
				        }
				    },
				    error: function(response){
				        console.log(response);
				    }   
				});
        	}
        	
        }
    }
}