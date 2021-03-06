


$( document ).ready(function() {

    console.log("ready");
    

	var util = new Util();
    var calendar_controller = new Calander_controller('calander-days','calander-slider-month','calander-slider-year');
    var post_controller = new Post_controller('post_button');
    var about_controller = new About_controller();
    var timeline_controller = new Timeline_controller('timeline-class-month');
    var module_google_script = new Module_google_script();
    var profile_controller = new Profile_controller('profile-today','profile-month')
    

   

    $(window).resize(resize_event);

    function resize_event() {
        if($( window ).width() > 700){
            $('.mobile-menu').addClass('disable-mobile-menu');
            $('.menu-card').unbind('click');
            $('.menu-card').click(menu_clickevent);
            console.log("menu-card");
        }else{
            $('.mobile-menu').removeClass('disable-mobile-menu');
            $('.fixed-action-btn').unbind('click');
            $('.fixed-action-btn').click(function(){
                if($('.fixed-action-btn').hasClass('active')){
                    $('.fixed-action-btn').closeFAB();
                }else{
                    $('.fixed-action-btn').openFAB();
                }
                
            })
            // $(".button-mobile-collapse").sideNav();
            $('.mobile-menu-item').unbind('click');
            $('.mobile-menu-item').click(menu_clickevent);
            console.log("mobile-menu-item");
        }            
    }

    resize_event();



    function menu_clickevent(){
        var template = './templates/'+$(this).attr('id')+'.html';
        console.log($(this).attr('id')+','+template);

        var self = this;

        $('.context').load(template,function(){
            
            $('.fixed-action-btn').closeFAB();
            // document.getElementById("facebook_name").click();
            switch($(self).attr('id')){
                case 'calander':{                    
                    calendar_controller.set_today_and_sync();
                    calendar_controller.set_calander_template(calendar_controller.year,calendar_controller.month,calander_set_calander_template_callback,calander_search_event_callback)

                    function calander_set_calander_template_callback(){
                        
                        $(".root-background").css('height','0xp');
                        $(".root-background").height(0);
                        $(".root-background").css('height',($( document ).height()-$( '.logo-bird' ).height())+'px');



                        util.set_block();
                        module_google_script.get_event_for_month(calendar_controller.year,calendar_controller.month,calander_get_event_for_month_callback);
                    };

                    function calander_get_event_for_month_callback(res){
                            console.log("2")
                            if(res != null){
                                // console.log(calander_search_event_callback);
                                calendar_controller.calander_refresh_tag(res,calander_search_event_callback);
                                calendar_controller.set_data(res);                                
                            }else{
                                Materialize.toast('出錯了', 2000);
                            }

                            

                            util.set_unblock();
                            
                    }

                    function calander_search_event_callback(res){
                        $('.tag-enableclick').unbind("click");
                        $('.tag-enableclick').click({ parmas1 :res },function(event){
                            var information_block = new Information_block();
                            var tag_self  = this;        
                            information_block.show_block(event['data']['parmas1'],$(this).data('tagcounter'),$(this).data('facebookid'),$(this).data('posttime'),function(data){
                                if(data != undefined){
                                    util.set_block();
                                    module_google_script.event_send(data,function(res){
                                        if(res != '200'){
                                            if(res == 1001){
                                            var google_send_email = new Google_gmail_send();
                                                google_send_email.send(event['data']['parmas1'],'join',$(tag_self).data('tagcounter'),$(tag_self).data('facebookid'),$(tag_self).data('posttime'),$('#facebook_userid').html());
                                            }else if(res == 1002){
                                                var google_send_email = new Google_gmail_send();
                                                google_send_email.send(event['data']['parmas1'],'unjoin',$(tag_self).data('tagcounter'),$(tag_self).data('facebookid'),$(tag_self).data('posttime'),$('#facebook_userid').html());
                                            }else{
                                                if(res == 4001){
                                                    Materialize.toast('人數滿了，下次請早', 2000);
                                                }else{
                                                    Materialize.toast('出錯了2', 2000);
                                                }
                                            }                                            
                                        }
                                        util.set_unblock();
                                        calendar_controller.set_calander_template(calendar_controller.year,calendar_controller.month,calander_set_calander_template_callback,calander_search_event_callback);
                                        var now_time = new Date();
                                        util.set_block();
                                        module_google_script.get_event_for_month(calendar_controller.year,calendar_controller.month,calander_get_event_for_month_callback);
                                    });
                                }                                    
                            });

                        })
                    }
                    console.log("calander");
                    var now_time = new Date();
                    util.set_block();
                    module_google_script.get_event_for_month(now_time.getYear()+1900,now_time.getMonth(),calander_get_event_for_month_callback);

                    
                    }
                    break;
                case 'timeline':{
                    timeline_controller.set_today_and_sync();
                    util.set_block();
                    module_google_script.get_event_for_during(new Date(timeline_controller.long_time),1,timeline_get_event_for_during_callback);

                    function timeline_get_event_for_during_callback(res){
                        console.log('========== callback ==============');
                        util.set_unblock();
                        if(res == null){
                            Materialize.toast('出錯了', 2000); 
                            return;                              
                        }
                        timeline_controller.set_template_month_item(res,timeline_search_callback,timeline_month_select_event_callback,timeline_set_template_month_item_callback);
                        $(".root-background").css('height','0xp');
                        $(".root-background").height(0);
                        $(".root-background").css('height',($( document ).height()-$( '.logo-bird' ).height())+'px');
                    }

                    function timeline_search_callback(res){
                        $('.timeline-month-item').unbind("click");
                        $('.timeline-month-item').click({ parmas1 :res },function(event){
                            var information_block = new Information_block();
                            var tag_self = this;                       
                            information_block.show_block(event['data']['parmas1'],$(this).data('tagcounter'),$(this).data('facebookid'),$(this).data('posttime'),function(data){
                                if(data != undefined){
                                    util.set_block();
                                    module_google_script.event_send(data,function(res){
                                        if(res != '200'){
                                            if(res == 1001){
                                            var google_send_email = new Google_gmail_send();
                                                google_send_email.send(event['data']['parmas1'],'join',$(tag_self).data('tagcounter'),$(tag_self).data('facebookid'),$(tag_self).data('posttime'),$('#facebook_userid').html());
                                            }else if(res == 1002){
                                                var google_send_email = new Google_gmail_send();
                                                google_send_email.send(event['data']['parmas1'],'unjoin',$(tag_self).data('tagcounter'),$(tag_self).data('facebookid'),$(tag_self).data('posttime'),$('#facebook_userid').html());
                                            }else{
                                                if(res == 4001){
                                                    Materialize.toast('人數滿了，下次請早', 2000);
                                                }else{
                                                    Materialize.toast('出錯了2', 2000);
                                                }
                                            }                                            
                                        }
                                        util.set_unblock();
                                        var now_time = new Date();
                                        util.set_block();
                                        module_google_script.get_event_for_during(new Date(timeline_controller.long_time),timeline_controller.month_value,timeline_get_event_for_during_callback);
                                    });
                                }else{
                                    Materialize.toast('出錯了', 2000);
                                }                                  
                            });

                        })
                    }

                    function timeline_month_select_event_callback(tmp_value){
                        util.set_block();
                        module_google_script.get_event_for_during(new Date(timeline_controller.long_time),tmp_value,timeline_get_event_for_during_callback);
                    }

                    function timeline_set_template_month_item_callback(res){
                        $('.timeline-month-item').unbind("click");
                        $('.timeline-month-item').click({ parmas1 :res },function(event){
                            var information_block = new Information_block(); 
                            var tag_self = this;            
                            information_block.show_block(event['data']['parmas1'],$(this).data('tagcounter'),$(this).data('facebookid'),$(this).data('posttime'),function(data){
                                if(data != undefined){
                                    util.set_block();
                                    module_google_script.event_send(data,function(res){
                                        if(res != '200'){
                                            if(res == 1001){
                                            var google_send_email = new Google_gmail_send();
                                                google_send_email.send(event['data']['parmas1'],'join',$(tag_self).data('tagcounter'),$(tag_self).data('facebookid'),$(tag_self).data('posttime'),$('#facebook_userid').html());
                                            }else if(res == 1002){
                                                var google_send_email = new Google_gmail_send();
                                                google_send_email.send(event['data']['parmas1'],'unjoin',$(tag_self).data('tagcounter'),$(tag_self).data('facebookid'),$(tag_self).data('posttime'),$('#facebook_userid').html());
                                            }else{
                                                if(res == 4001){
                                                    Materialize.toast('人數滿了，下次請早', 2000);
                                                }else{
                                                    Materialize.toast('出錯了2', 2000);
                                                }
                                            }                                            
                                        }
                                        util.set_unblock();
                                        var now_time = new Date();
                                        util.set_block();
                                        module_google_script.get_event_for_during(new Date(timeline_controller.long_time),timeline_controller.month_value,timeline_get_event_for_during_callback);
                                    });
                                }else{
                                    Materialize.toast('出錯了', 2000);
                                }                                    
                            });

                        })
                    }
                    
                }break;

                case 'post':{
                    post_controller.init(init_callback);
                    function init_callback(send_data){
                        console.log(JSON.stringify(send_data));
                        util.set_block();
                        module_google_script.event_send(send_data,function(res){
                             if(res == null){
                                Materialize.toast('出錯了', 2000);
                             }else{
                                Materialize.toast('設定成功', 2000);
                             }
                             util.set_unblock();
                             post_controller.reset_value();
                        });
                    }
                    }
                    break;
                case 'profile':{
                    profile_controller.set_today_and_sync();
                    util.set_block();
                    module_google_script.get_event_for_day(new Date(profile_controller.long_time),profile_get_event_for_day_callback);
                    module_google_script.get_event_for_during(new Date(profile_controller.long_time),1,profile_get_event_for_during_callback);

                    function profile_get_event_for_day_callback(res){
                        util.set_unblock();
                        if(res == null){
                            Materialize.toast('出錯了', 2000); 
                            return;                              
                        }

                        profile_controller.set_template_today_item(res,profile_set_template_today_item_callback);
                        $(".root-background").css('height','0xp');
                        $(".root-background").height(0);
                        $(".root-background").css('height',($( document ).height()-$( '.logo-bird' ).height())+'px');
                    }

                    function profile_set_template_today_item_callback(res){
                        $('.profile-today-item').unbind("click");
                        $('.profile-today-item').click({ parmas1 :res },function(event){
                            var information_block = new Information_block();
                            var tag_self = this;
                            information_block.show_block(event['data']['parmas1'],$(this).data('tagcounter'),$(this).data('facebookid'),$(this).data('posttime'),function(data){
                                if(data != undefined){
                                    util.set_block();
                                    module_google_script.event_send(data,function(res){
                                        if(res != '200'){
                                            if(res == 1001){
                                            var google_send_email = new Google_gmail_send();
                                                google_send_email.send(event['data']['parmas1'],'join',$(tag_self).data('tagcounter'),$(tag_self).data('facebookid'),$(tag_self).data('posttime'),$('#facebook_userid').html());
                                            }else if(res == 1002){
                                                var google_send_email = new Google_gmail_send();
                                                google_send_email.send(event['data']['parmas1'],'unjoin',$(tag_self).data('tagcounter'),$(tag_self).data('facebookid'),$(tag_self).data('posttime'),$('#facebook_userid').html());
                                            }else{
                                                if(res == 4001){
                                                    Materialize.toast('人數滿了，下次請早', 2000);
                                                }else{
                                                    Materialize.toast('出錯了2', 2000);
                                                }
                                            }                                            
                                        }
                                        util.set_unblock();
                                        var now_time = new Date();
                                        util.set_block();
                                        module_google_script.get_event_for_day(new Date(profile_controller.long_time),profile_get_event_for_day_callback);
                                    });
                                }else{
                                    Materialize.toast('出錯了3', 2000);
                                }                                     
                            });

                        })
                    }

                    function profile_get_event_for_during_callback(res){
                        console.log('========== callback ==============');
                        util.set_unblock();
                        if(res == null){
                            Materialize.toast('出錯了4', 2000); 
                            return;                              
                        }
                        profile_controller.set_template_month_item(res,profile_month_select_event_callback,profile_set_template_month_item_callback);
                        $(".root-background").css('height','0xp');
                        $(".root-background").height(0);
                        $(".root-background").css('height',($( document ).height()-$( '.logo-bird' ).height())+'px');
                       
                    }

                    function profile_set_template_month_item_callback(res){
                        $('.profile-month-item').unbind("click");
                        $('.profile-month-item').click({ parmas1 :res },function(event){
                            var information_block = new Information_block();
                            var tag_self = this;
                            information_block.show_block(event['data']['parmas1'],$(this).data('tagcounter'),$(this).data('facebookid'),$(this).data('posttime'),function(data){
                                if(data != undefined){
                                    util.set_block();
                                    module_google_script.event_send(data,function(res){
                                        if(res != '200'){
                                            if(res == 1001){
                                            var google_send_email = new Google_gmail_send();
                                                google_send_email.send(event['data']['parmas1'],'join',$(tag_self).data('tagcounter'),$(tag_self).data('facebookid'),$(tag_self).data('posttime'),$('#facebook_userid').html());
                                            }else if(res == 1002){
                                                var google_send_email = new Google_gmail_send();
                                                google_send_email.send(event['data']['parmas1'],'unjoin',$(tag_self).data('tagcounter'),$(tag_self).data('facebookid'),$(tag_self).data('posttime'),$('#facebook_userid').html());
                                            }else{
                                                if(res == 4001){
                                                    Materialize.toast('人數滿了，下次請早', 2000);
                                                }else{
                                                    Materialize.toast('出錯了2', 2000);
                                                }
                                                
                                            }                                            
                                        }
                                        util.set_unblock();
                                        var now_time = new Date();
                                        util.set_block();
                                        module_google_script.get_event_for_during(new Date(profile_controller.long_time),profile_controller.month_value,profile_get_event_for_during_callback);
                                    });
                                }else{
                                    Materialize.toast('出錯了6', 2000);
                                }                                     
                            });

                        })
                    }

                    function profile_month_select_event_callback(tmp_value){
                        util.set_block();
                        module_google_script.get_event_for_during(new Date(profile_controller.long_time),tmp_value,profile_get_event_for_during_callback);
                    }
                    
                    }
                    break;

                case 'about':{
                        about_controller.manager_click(function(){
                            var fb_sdk = new Fb_sdk();
                            fb_sdk.send_message(["100000244681661"]);
                        })                        
                    }
                    break;
            }

            $(".root-background").css('height',($( document ).height()-$( '.logo-bird' ).height())+'px');
        });
        $(".root-background").css('height','0xp');
        $(".root-background").height(0);    
    }

    // const EVENT_TITLE = { post_have_seat:"我有位子",post_find_seat:"我找司機",post_together_seat:"找人共乘"}
    // const GENDER = { boy:"男", girl:"女"}

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

// var observeDOM = (function(){
//     var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
//         eventListenerSupported = window.addEventListener;

//     return function(obj, callback){
//         if( MutationObserver ){
//             // define a new observer
//             var obs = new MutationObserver(function(mutations, observer){
//                 if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
//                     callback();
//             });
//             // have the observer observe foo for changes in children
//             obs.observe( obj, { childList:true, subtree:true });
//         }
//         else if( eventListenerSupported ){
//             obj.addEventListener('DOMNodeInserted', callback, false);
//             obj.addEventListener('DOMNodeRemoved', callback, false);
//         }
//     }
// })();

// // Observe a specific DOM element:
// observeDOM( document.getElementById('context') ,function(){ 
//     $('.fixed-action-btn').removeClass('active');
// });




