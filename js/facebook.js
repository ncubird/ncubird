function Fb_sdk(){

}

Fb_sdk.prototype.send_message = function(facebook_id){
  // FB.ui({
  //       method:'send',
  //       app_id:'177786062658873',
  //       link:'https://ncubird.github.io/ncubird/',
  //       name: 'Send Private Message',
  //       to:facebook_id
  //   });

  if (navigator.userAgent.indexOf("Mobi") > -1){
      window.location.assign("#page-2");
  } else {
      window.location.replace("https://www.facebook.com/dialog/send?" + 
                              "app_id=177786062658873" + 
                              "&link=https://ncubird.github.io/ncubird/" + 
                              "&redirect_uri=https://ncubird.github.io/ncubird/"+
                              "&to="+JSON.stringify(facebook_id);
      );
  }
}



  
