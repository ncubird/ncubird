


$( document ).ready(function() {

    console.log("ready");
    var fb_sdk = new Fb_sdk();

	var util = new Util();
    var calendar_controller = new Calander_controller('calander-days','calander-slider-month','calander-slider-year');
    var post_controller = new Post_controller('post_button');
    var about_controller = new About_controller('post_button');
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
                        module_google_script.get_event_for_month(calendar_controller.year,calendar_controller.month,function(res){
                            calander_add_tag(res);
                        });
                    });
                    console.log("calander");
                    var now_time = new Date();
                    module_google_script.get_event_for_month(now_time.getYear()+1900,now_time.getMonth(),function(res){
                        calander_add_tag(res);
                    });

                    
                    }
                    break;

                case 'post':{
                    post_controller.init(function(send_data){
                        console.log(JSON.stringify(send_data));
                        module_google_script.event_add(send_data);
                    });
                    }
                    break;

                case 'about':{
                        about_controller.test(function(){
                            fb_sdk.send_message($('#facebook_userid').text());
                        })                        
                    }
                    break;
            }

            $(".root-background").css('height',($( document ).height()-$( '.logo-bird' ).height())+'px');
    	});
    	$(".root-background").css('height','0xp');
    	$(".root-background").height(0);   	
    });

    function calander_add_tag(res){
        for(var i=0;i<res.length;i++){
            console.log("====== addtag ======");
            var start_time = new Date(res['start']);
            var end_time = new Date(res['end']);
            console.log(res['other_message']);
            var other_message = JSON.parse(res['other_message']);                            
            calendar_controller.set_calander_tag(start_time.getYear()+1900,start_time.getMonth()+1,start_time.getDate()+1,other_message['facebook_id'],res['event_title']);
        }
    }

});

