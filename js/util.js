function Util(){

}

var TEMPLATE = [
	{
		_id : "main",
		template : "./templates/home.html"
	},
	{
		_id : "calander",
		template : "./templates/calander.html"
	},
	{
		_id : "timelime",
		template : "./templates/timelime.html"
	},
	{
		_id : "post",
		template : "./templates/post.html"
	},
	{
		_id : "profile",
		template : "./templates/profile.html"
	},
	{
		_id : "about",
		template : "./templates/about.html"
	}

]


Util.prototype.get_template_byID = function(id){
	for(var i=0;i<TEMPLATE.length;i++){
		if(TEMPLATE[i]['_id'] == id){
			return TEMPLATE[i]['template'];
		}
	}
	return null;
}

Util.prototype.set_block = function(){
	$('.modal').css('display','block')
}

Util.prototype.set_unblock = function(){
	$('.modal').css('display','none')
}