function Fb_sdk(){

}

Fb_sdk.prototype.send_message = function(facebook_id){
  FB.ui({
        app_id:'177786062658873',
        to:facebook_id
    });
}



  
