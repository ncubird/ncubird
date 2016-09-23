function Calander_controller(calander_class,title_year_class,title_month_class){
	var self = this;
	this.offset = 0;
	this.now;
	this.year;
	this.month;
	this.day;
	this.date;
	this.hour;
	this.title_year_class = title_year_class;
	this.title_month_class = title_month_class;
	this.calander_class = calander_class;
	this.search_type = "all";
	this.search_info = "all";;
	this.tmp_data;
}

const MONTH = ['January','February','March','April','May','June','July','August','September','October','November' ,'December'];
const WEEK = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
const MONTH_DAYS = [31,28,31,30,31,30,31,31,30,31,30,31];

Calander_controller.prototype.set_today_and_sync = function(){
	var now = new Date();
	this.now = now;
	this.year = now.getYear()+1900;
	this.month = now.getMonth();
	this.hour = now.getHours();
	this.day = now.getDay();
	this.date = now.getDate();
}

Calander_controller.prototype.set_data = function(data){
	this.tmp_data = data;
}

Calander_controller.prototype.is_spectial_Feb = function(year){
	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

Calander_controller.prototype.generate_offset = function (year,month) {
	var target_point = new Date(year,month,1);
	console.log(target_point.getDay());
	this.offset = target_point.getDay();
}

Calander_controller.prototype.set_calander_template = function (year,month,event_callback) {
	this.generate_offset(year,month);
	this.search_type = $("#calander_search_type").val();
	this.search_info = $("#calander_search_info").val();
	
	console.log('---'+year+'==='+month+','+this.offset);
	if($('.'+this.calander_class) != undefined){
		console.log($('.'+this.calander_class));
		$('.'+this.calander_class).html("");
		for(var i=0;i<this.offset;i++){
			$('.'+this.calander_class).html($('.'+this.calander_class).html() + this.template_calander_classlebox());
		}

		for(var i=1;i<=MONTH_DAYS[month];i++){
			$('.'+this.calander_class).html($('.'+this.calander_class).html() + this.template_calander_box(year,month,i));
		}

		if(month == 1 && this.is_spectial_Feb(year)){
			$('.'+this.calander_class).html($('.'+this.calander_class).html() + this.template_calander_box(year,month,29));
		}
	}

	this.set_today();
	this.set_click_event(event_callback)

	
}

Calander_controller.prototype.set_click_event = function(event_callback){
	var self = this;
	$('.calander-slider-right').unbind("click");
	$('.calander-slider-right').click(function(){
		self.change_month(1);
		self.set_calander_template(self.year,self.month,event_callback);
		event_callback();
		
	})

	$('.calander-slider-left').unbind("click");
	$('.calander-slider-left').click(function(){
		self.change_month(-1);
		self.set_calander_template(self.year,self.month,event_callback);
		event_callback();
	})

	("#calander_search_type").off('change')
	$("#calander_search_type").on('change',function(){
		this.search_type = $("#calander_search_type").val();
		self.calander_refresh_tag(this.tmp_data);
	})

	$("#calander_search_info").off('change')
	$("#calander_search_info").on('change',function(){
		this.search_info = $("#calander_search_info").val();
		self.calander_refresh_tag(this.tmp_data);
	})

	$('.'+this.title_year_class).html(this.year);
	$('.'+this.title_month_class).html(MONTH[this.month]);
}

Calander_controller.prototype.template_calander_classlebox = function(){
	return "<li>"
		    +"</li>"
}


Calander_controller.prototype.template_calander_box = function(year,month,day){
	return "<li>"
			  	+"<div class=\"card calander-day-panel\">"
		  			+"<div class=\"calander-day-panel-text\">"+day+"</div>"
		  		+"</div>"
			  	+"<div class=\"card calander-day-item\" id=\"calender-"+year+'-'+month+'-'+day+"\">"			  		
			  	+"</div>"
		    +"</li>"
}

Calander_controller.prototype.template_calander_tag = function(facebook_id,toast_message,message){
	return "<div class=\"tooltipped chip calander-day-people-chip\" data-position=\"bottom\" data-delay=\"50\" data-tooltip=\""+toast_message+"\">"
			  	+"<img class=\"calander-day-people-photo circle\" src=\"https://graph.facebook.com/"+facebook_id+"/picture\" />"
			  	+message
			+"</div>"
}

Calander_controller.prototype.set_calander_tag = function(year,month,day,facebook_id,toast_message,message){
	if($('#'+"calender-"+year+'-'+month+'-'+day) != undefined){
		$('#'+"calender-"+year+'-'+month+'-'+day).html($('#'+"calender-"+year+'-'+month+'-'+day).html()+this.template_calander_tag(facebook_id,toast_message,message));
	}
}

Calander_controller.prototype.change_month = function(add_or_minutes){

	

	if(add_or_minutes > 0){
		if(this.month ==11 ){
			this.year++;
			this.month = 0;
		}else{
			this.month++;
		}		
	}else if(add_or_minutes <0 ){
		if(this.month == 0){
			this.year--;
			this.month = 11;
		}else{
			this.month--;
		}		
	}

	

}

const EVENT_TITLE = { post_have_seat:"我有位子",post_find_seat:"我找司機",post_together_seat:"找人共乘"}
const GENDER = { boy:"男", girl:"女"}
Calander_controller.prototype.calander_refresh_tag = function(res){

	for(var i=1;i<=((this.is_spectial_Feb(this.year) && this.month == 1)? 29 : MONTH_DAYS[this.month]) ;i++){
		$('#'+"calender-"+this.year+'-'+this.month+'-'+i).html("");
	}


	for(var i=0;i<res.length;i++){
        console.log("====== addtag ======");
        var start_time = new Date(res[i]['start']);
        var end_time = new Date(res[i]['end']);
        var other_message = res[i]['other_message'];
        var message = undefined;
        if(this.search_type != 'all'){               
            message = other_message[this.search_type] + '\n';                
        }else{
            message = '我是' + GENDER[other_message['gender']] + '生，' +  '想從' + other_message['location_from'] + '做到' + other_message['location_to'] + '，坐一次' + other_message['bonus_response'];     
        }

        if(message != undefined){
            if(this.search_type != 'all'){
                if(this.search_type == res[i]['event_title']){
                    this.set_calander_tag(start_time.getYear()+1900,start_time.getMonth(),start_time.getDate(),other_message['facebook_id'],message,other_message['gender']);
                }
            }else{
                this.set_calander_tag(start_time.getYear()+1900,start_time.getMonth(),start_time.getDate(),other_message['facebook_id'],EVENT_TITLE[message,res[i]['event_title']]);
            }
        }                        
        
    }
    $('.tooltipped').tooltip({delay: 50});
    $('select').material_select();
}

Calander_controller.prototype.set_today = function(){
	var now_time = new Date();
	if($('#'+"calender-"+(now_time.getYear()+1900)+'-'+now_time.getMonth()+'-'+now_time.getDate()) != undefined){
		$('#'+"calender-"+(now_time.getYear()+1900)+'-'+now_time.getMonth()+'-'+now_time.getDate()).addClass("calander-today");
	}	
}