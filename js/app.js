

$( document ).ready(function() {
	var util = new Util();
    $('.menu-card').click(function(){
    	var template = util.get_template_byID($(this).attr('id'));
    	console.log($(this).attr('id')+','+template);
    	$('.context').load(template);
    	$(".root-background").css('height',($( window ).height()+256)+'px');
    });
});