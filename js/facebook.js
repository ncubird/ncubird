function Fb_sdk(){

}

Fb_sdk.prototype.init = function() {
  var self = this;
  // body...
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '177786062658873',
      xfbml      : true,
      version    : 'v2.7'
    });

    FB.login(function(response) {
        if (response.authResponse) {         
          FB.api('/me', function(response) {
             console.log('Good to see you, ' + response.name + '.');
           });
        } else {
           $('.cssroot').html("請先登入");
        }
    }{scope: 'public_profile,email,user_likes'});


  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

 
};

Fb_sdk.prototype.statusChangeCallback = function(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
}

Fb_sdk.prototype.checkLoginState = function () {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
}

  
