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
}


const TODAY_20160901={
	year : 2016,
	month : 9,
	week : 4,
	day: 1,
	offset: 4
}

const MONTH = ['January','February','March','April','May','June','July','August','September','October','November' ,'December'];
const WEEK = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
const MONTH_DAYS = [0,31,28,31,30,31,30,31,31,30,31,30,31];

Calander_controller.prototype.set_today_and_sync = function(){
	var now = new Date();
	this.now = now;
	this.year = now.getYear()+1900;
	this.month = now.getMonth();
	this.hour = now.getHours();
	this.day = now.getDay();
	this.date = now.getDate();
}

Calander_controller.prototype.is_spectial_Feb = function(year){
	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

Calander_controller.prototype.generate_offset = function (year,month) {
	var target_point = new Date(year,month,1);
	this.offset = target_point.getDay();
}

Calander_controller.prototype.set_calander_template = function (year,month,root_background) {
	this.generate_offset(year,month);
	var self = this;
	console.log('---'+year+'==='+month+','+this.offset);
	if($('.'+this.calander_class) != undefined){
		console.log($('.'+this.calander_class));
		$('.'+this.calander_class).html("");
		for(var i=0;i<this.offset;i++){
			$('.'+this.calander_class).html($('.'+this.calander_class).html() + this.template_calander_classlebox());
		}

		for(var i=0;i<MONTH_DAYS[month];i++){
			$('.'+this.calander_class).html($('.'+this.calander_class).html() + this.template_calander_box(year,month,i));
		}

		if(month == 2 && this.is_spectial_Feb(year)){
			$('.'+this.calander_class).html($('.'+this.calander_class).html() + this.template_calander_box(year,month,29));
		}
	}

	$('.calander-slider-right').unbind("click");
	$('.calander-slider-right').click(function(){
		self.change_month(1);
		$(".root-background").css('height','0xp');
    	$(".root-background").height(0);
    	$(".root-background").css('height',($( document ).height()-$( '.logo-bird' ).height())+'px');
	})

	$('.calander-slider-left').unbind("click");
	$('.calander-slider-left').click(function(){
		self.change_month(-1);
		$(".root-background").css('height','0xp');
    	$(".root-background").height(0);
    	$(".root-background").css('height',($( document ).height()-$( '.logo-bird' ).height())+'px');
	})
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

Calander_controller.prototype.change_month = function(add_or_minutes){

	

	if(add_or_minutes > 0){
		if(this.month ==12 ){
			this.year++;
			this.month = 1;
		}else{
			this.month++;
		}		
	}else if(add_or_minutes <0 ){
		if(this.month == 1){
			this.year--;
			this.month = 12;
		}else{
			this.month--;
		}		
	}

	this.generate_offset(this.year,this.month);
	this.set_calander_template(this.year,this.month);

	$('.'+this.title_year_class) = this.year;
	$('.'+this.title_month_class) = this.month;
}