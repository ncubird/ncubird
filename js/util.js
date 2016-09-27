function Util(){
	this.OTHER_MESSAGE_KEY = OTHER_MESSAGE_KEY;
	this.ROOT_DATA_KEY = ROOT_DATA_KEY;
	this.FUNCTION_TYPE_KEY = FUNCTION_TYPE_KEY;
}

// var TEMPLATE = [
// 	{
// 		_id : "main",
// 		template : "./templates/home.html"
// 	},
// 	{
// 		_id : "calander",
// 		template : "./templates/calander.html"
// 	},
// 	{
// 		_id : "timelime",
// 		template : "./templates/timelime.html"
// 	},
// 	{
// 		_id : "post",
// 		template : "./templates/post.html"
// 	},
// 	{
// 		_id : "profile",
// 		template : "./templates/profile.html"
// 	},
// 	{
// 		_id : "about",
// 		template : "./templates/about.html"
// 	}

// ]

var OTHER_MESSAGE_KEY = {
	FACEBOOK_ID : 'facebook_id',
	FACEBOOK_NAME : 'facebook_name',
	GENDER : 'gender',
	LOCATION_FROM : 'location_from',
	LOCATION_FROM_LATLNG : 'location_from_latlng',
	LOCATION_TO : 'location_to',
	LOCATION_TO_LATLNG : 'location_to_latlng',
	BONUS_RESPONSE : 'bonus_response',
	PEOPLE_NUMBER : 'people_number',
	OTHERS : 'others',
	PEROID : 'peroid',
	POST_TIME : 'post_time',
	PASSENGER : 'passenger',
	MAJOR : 'major',
	VEHICAL : 'vehical'
}

var ROOT_DATA_KEY = {
	FUNCTION_TYPE : 'function_type',
	EVENT_TITLE : 'event_title',
	START : 'start',
	END : 'end',
	PEROID : 'peroid',
	END_PEROID : 'end_peroid',
	OTHER_MESSAGE : 'other_message',
	POST_FACEBOOK_ID : 'post_facebook_id',
	JOIN_FACEBOOK_ID : 'join_facebook_id',
	FACEBOOK_ID : 'facebook_id',
	POST_TIME : 'post_time',
	PEROID : 'peroid',
}

var FUNCTION_TYPE_KEY = {
	ADD_TO_CALANDER : 'add_to_calander',
	JOIN_EVENT : 'join_event',
	UNJOIN_EVENT : 'unjoin_event',
	DELETE_TO_CALANDER : 'delete_to_calander'
}


// Util.prototype.get_template_byID = function(id){
// 	for(var i=0;i<TEMPLATE.length;i++){
// 		if(TEMPLATE[i]['_id'] == id){
// 			return TEMPLATE[i]['template'];
// 		}
// 	}
// 	return null;
// }

Util.prototype.set_block = function(){
	$('.blockmodal').css('display','table')
	$(".blockmodal").css('height','0xp');
    $(".blockmodal").height(0);
    $(".blockmodal").css('height',$( document ).height()+'px');
}

Util.prototype.set_unblock = function(){
	$('.blockmodal').css('display','none')
}

Util.prototype.html2clipboard =function (html, el) {
    var tmpEl;
    if (typeof el !== "undefined") {
        // you may want some specific styling for your content - then provide a custom DOM node with classes, inline styles or whatever you want
        tmpEl = el;
    } else {
        // else we'll just create one
        tmpEl = document.createElement("div");

        // since we remove the element immedeately we'd actually not have to style it - but IE 11 prompts us to confirm the clipboard interaction and until you click the confirm button, the element would show. so: still extra stuff for IE, as usual.
        tmpEl.style.opacity = 0;
        tmpEl.style.position = "absolute";
        tmpEl.style.pointerEvents = "none";
        tmpEl.style.zIndex = -1;
    }

    // fill it with your HTML
    tmpEl.innerHTML = html;

    // append the temporary node to the DOM
    document.body.appendChild(tmpEl);

    // select the newly added node
    var range = document.createRange();
    range.selectNode(tmpEl);
    window.getSelection().addRange(range);

    // copy
    document.execCommand("copy");

    // and remove the element immediately
    document.body.removeChild(tmpEl);
}

Util.prototype.html2clipboard_template = function(data){
	var UTIL_EVENT_TITLE = { post_have_seat:"我有位子",post_find_seat:"我找司機",post_together_seat:"找人共乘"};
	var UTIL_GENDER = { boy:"男", girl:"女"}
	var other_message = data[ROOT_DATA_KEY.OTHER_MESSAGE];
	var time = new Date(data[ROOT_DATA_KEY.START]);
	return "<div>[" + UTIL_EVENT_TITLE[data[ROOT_DATA_KEY.EVENT_TITLE]] +"]"
			+"\n" + "時間：" + (time.getMonth()+1) + "/" + time.getDate() + ' ' + time.getHours() +':' + time.getMinutes()
			+"\n" + "搭車地點：" + other_message[OTHER_MESSAGE_KEY.LOCATION_FROM]
			+"\n" + "目的地：" + other_message[OTHER_MESSAGE_KEY.LOCATION_TO]
			+"\n" + "性別：" + GENDER[other_message[OTHER_MESSAGE_KEY.GENDER]]
			+"\n" + "聯絡方式：FB"
			+"\n" + "交通工具：" + other_message[OTHER_MESSAGE_KEY.VEHICAL]
			+"\n" + "回饋方式：" + other_message[OTHER_MESSAGE_KEY.BONUS_RESPONSE]
			+"\n" + "其他：" + other_message[OTHER_MESSAGE_KEY.OTHERS];
}