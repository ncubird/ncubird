function Fb_sdk(){

}

Fb_sdk.prototype.send_message = function(facebook_id){
  FB.ui({
        method:'send',
        app_id:'177786062658873', 
        name: 'Send Private Message',
        to:[facebook_id]
    });
}



  
