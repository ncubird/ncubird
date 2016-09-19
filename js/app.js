

$( document ).ready(function() {
	var util = new Util();
    $('.menu-card').click(function(){
    	var template = util.get_template_byID($(this).attr('id'));
    	console.log($(this).attr('id')+','+template);
    	$('.context').load(template,function(){
    		$(".root-background").css('height',($( document ).height()+256)+'px');
    	});
    	$(".root-background").css('height','0xp');
    	$(".root-background").height(0);   	
    });
});