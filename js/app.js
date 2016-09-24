


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
                    calendar_controller.set_calander_template(calendar_controller.year,calendar_controller.month,set_calander_template_function)

                    var set_calander_template_function =function (){
                        
                        $(".root-background").css('height','0xp');
                        $(".root-background").height(0);
                        $(".root-background").css('height',($( document ).height()-$( '.logo-bird' ).height())+'px');



                        util.set_block();
                        module_google_script.get_event_for_month(calendar_controller.year,calendar_controller.month,function(res){
                            if(res != null){
                                calendar_controller.calander_refresh_tag(res);
                                calendar_controller.set_data(res);                                
                            }else{
                                Materialize.toast('出錯了', 2000);
                            }

                            $('.tag-enableclick').unbind("click");
                            $('.tag-enableclick').click(function(){
                                var information_block = new Information_block();
                                information_block.show_block(res,$(this).data('facebookid'),$(this).data('posttime'),function(data){
                                    util.set_block();
                                    module_google_script.event_send(data,function(res){
                                        if(res == null){
                                            Materialize.toast('出錯了', 2000);
                                        }
                                        util.set_unblock();
                                        calendar_controller.set_calander_template(calendar_controller.year,calendar_controller.month,set_calander_template_function);
                                    });
                                });

                            })

                            util.set_unblock();
                            
                        });
                    };
                    console.log("calander");
                    var now_time = new Date();
                    util.set_block();
                    module_google_script.get_event_for_month(now_time.getYear()+1900,now_time.getMonth(),function(res){
                        if(res != null){
                            calendar_controller.calander_refresh_tag(res);
                            calendar_controller.set_data(res);
                        }else{
                            Materialize.toast('出錯了', 2000);
                        }

                        $('.tag-enableclick').unbind("click");
                        $('.tag-enableclick').click(function(){
                            console.log('======= click =======');
                            var information_block = new Information_block();
                            information_block.show_block(res,$(this).data('facebookid'),$(this).data('posttime'),function(data){
                                util.set_block();
                                console.log(data);
                                module_google_script.event_send(data,function(res){
                                    if(res == null){
                                        Materialize.toast('出錯了', 2000);
                                    }
                                    util.set_unblock();
                                    calendar_controller.set_calander_template(calendar_controller.year,calendar_controller.month,set_calander_template_function);
                                });
                            });
                            
                        })
                        util.set_unblock();
                    });

                    
                    }
                    break;

                case 'post':{
                        post_controller.init(function(send_data){
                            console.log(JSON.stringify(send_data));
                            util.set_block();
                            module_google_script.event_send(send_data,function(res){
                                 if(res == null){
                                    Materialize.toast('出錯了', 2000);
                                 }
                                 util.set_unblock();
                            });
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

    const EVENT_TITLE = { post_have_seat:"我有位子",post_find_seat:"我找司機",post_together_seat:"找人共乘"}
    const GENDER = { boy:"男", girl:"女"}

    // function calander_add_tag(res){
    //     for(var i=0;i<res.length;i++){
    //         console.log("====== addtag ======");
    //         var start_time = new Date(res[i]['start']);
    //         var end_time = new Date(res[i]['end']);
    //         var other_message = res[i]['other_message'];
    //         var message = undefined;
    //         if(calendar_controller.search_type != 'all'){               
    //             message = other_message[calendar_controller.search_type] + '\n';                
    //         }else{
    //             message = '我是' + GENDER[other_message['gender']] + '生，' +  '想從' + other_message['location_from'] + '做到' + other_message['location_to'] + '，坐一次' + other_message['bonus_response'];     
    //         }

    //         if(message != undefined){
    //             if(calendar_controller.search_type != 'all'){
    //                 if(calendar_controller.search_type == res[i]['event_title']){
    //                     calendar_controller.set_calander_tag(start_time.getYear()+1900,start_time.getMonth(),start_time.getDate(),other_message['facebook_id'],message,other_message['gender']);
    //                 }
    //             }else{
    //                 calendar_controller.set_calander_tag(start_time.getYear()+1900,start_time.getMonth(),start_time.getDate(),other_message['facebook_id'],EVENT_TITLE[message,res[i]['event_title']]);
    //             }
    //         }                        
            
    //     }
    //     $('.tooltipped').tooltip({delay: 50});
    //     $('select').material_select();
    // }

});

