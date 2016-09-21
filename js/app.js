

$( document ).ready(function() {
	var util = new Util();

    $('.menu-card').click(function(){
    	var template = util.get_template_byID($(this).attr('id'));
    	console.log($(this).attr('id')+','+template);

        switch($(this).attr('id')){
            case 'calander':{
                var canalnder_contoller = new Calander_controller('calander-days','calander-slider-month','calander-slider-year');
                canalnder_contoller.set_today_and_sync();
                canalnder_contoller.set_calander_template(canalnder_contoller.year,canalnder_contoller.month);
            }
            break;
        }

    	$('.context').load(template,function(){
    		$(".root-background").css('height',($( document ).height()-$( '.logo-bird' ).height())+'px');
    	});
    	$(".root-background").css('height','0xp');
    	$(".root-background").height(0);   	
    });
});