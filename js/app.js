

$( document ).ready(function() {
	var util = new Util();
    var canalnder_contoller = new Calander_controller('calander-days','calander-slider-month','calander-slider-year');
    $('.menu-card').click(function(){
    	var template = util.get_template_byID($(this).attr('id'));
    	console.log($(this).attr('id')+','+template);

        var self = this;

    	$('.context').load(template,function(){
    		

            switch($(self).attr('id')){
                case 'calander':{                    
                    canalnder_contoller.set_today_and_sync();
                    canalnder_contoller.set_calander_template(canalnder_contoller.year,canalnder_contoller.month,function(){
                        $(".root-background").css('height','0xp');
                        $(".root-background").height(0);
                        $(".root-background").css('height',($( document ).height()-$( '.logo-bird' ).height())+'px');
                        canalnder_contoller.set_calander_tag(2016,8,20,100000244681661,"test");
                    });
                    console.log("calander");
                    canalnder_contoller.set_calander_tag(2016,8,20,100000244681661,"test");
                    
                }
                break;
            }

            $(".root-background").css('height',($( document ).height()-$( '.logo-bird' ).height())+'px');
    	});
    	$(".root-background").css('height','0xp');
    	$(".root-background").height(0);   	
    });


    var module_google_script = Module_google_script();
    module_google_script.test();
});