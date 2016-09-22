
window.onload = function() {
    
}


$( document ).ready(function() {

    console.log("ready");
    var Facebook_sdk = new Fb_sdk();
    Facebook_sdk.init();  

	var util = new Util();
    var calendar_controller = new Calander_controller('calander-days','calander-slider-month','calander-slider-year');
    var post_controller = new Post_controller('post_button');
    var module_google_script = new Module_google_script();
    $('.menu-card').click(function(){
    	var template = util.get_template_byID($(this).attr('id'));
    	console.log($(this).attr('id')+','+template);

        var self = this;

    	$('.context').load(template,function(){
    		

            switch($(self).attr('id')){
                case 'calander':{                    
                    calendar_controller.set_today_and_sync();
                    calendar_controller.set_calander_template(calendar_controller.year,calendar_controller.month,function(){
                        $(".root-background").css('height','0xp');
                        $(".root-background").height(0);
                        $(".root-background").css('height',($( document ).height()-$( '.logo-bird' ).height())+'px');
                        calendar_controller.set_calander_tag(2016,8,20,100000244681661,"test");
                    });
                    console.log("calander");
                    calendar_controller.set_calander_tag(2016,8,20,100000244681661,"test");
                    
                }
                break;

                case 'post':{
                    post_controller.init(function(send_data){
                        console.log(JSON.stringify(send_data));
                        module_google_script.event_add(send_data);
                    });
                }
                break;
            }

            $(".root-background").css('height',($( document ).height()-$( '.logo-bird' ).height())+'px');
    	});
    	$(".root-background").css('height','0xp');
    	$(".root-background").height(0);   	
    });


    
    
});