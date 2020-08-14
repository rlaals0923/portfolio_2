$(function(){
    
    var win_w = $(window).width();
    $(window).on('resize', function(){
        win_w = $(this).width();
        if(win_w >=1024){
            $('#gnb>li>a').off('click');
            $('.sub').removeAttr('style');
            $('nav').removeClass('on');            
        }  
    });
    
    $('.toggle').on('click', function(){
        $('#header nav').toggleClass('on');
    });
    
    
    $('#gnb').on('mouseenter', function(){
        if(win_w>=1024){
            $('.sub').stop(true,true).slideDown(500);
            $('.bgGnb').stop(true, true).slideDown(300);
        }else{
            $('#gnb>li>a').off('click');
            $('#gnb>li>a').on('click', function(){
                $('.sub').stop().slideUp();
                $(this).next('ul').stop().slideToggle();
            });
        }
    });
    
    $('#gnb').on('mouseleave', function(){
        if(win_w>=1024){
            $('.sub').stop(true, true).slideUp();
            $('.bgGnb').stop(true, true).slideUp();
        }
    });
    
    var i = 0;  
    var timer;
    var slide_cnt = $('.slide_box>li').length;
    var tmp_html = '';
    var prev_i;
    var next_i;
        
    $('.slide_box>li').each(function(num){
        $(this).css('left', (num * 100) + '%');
//        tmp_html += '<a href="#"></a>'
    });    
    
//    $('.navi').html(tmp_html);
    
    
    function slide_move(){
        $('.slide_box').stop().animate({left : (i * -100) + '%'}, 1000);
        navi_update();
        //btn_update();
    }
    
    function navi_update(){
        $('.navi').children('a').eq(i).addClass('on').siblings().removeClass('on');
        
    }
    
    function btn_update($btn, index){
        var img_src = ''; 
        img_src = "../img/" + index + ".jpg";       
        $btn.children('img').attr('src', img_src);      
    }
    
    function prev_index(index){
        index = (index == 0) ? slide_cnt : index;
        index--;
        return index;
    }
    
    function next_index(index){
        index++;
        index = (index == slide_cnt) ? 0 : index;
        return index;
    }
    
    function prev_move(){
        i = prev_index(i);
        slide_move();
        btn_update($('.btn_prev'), prev_index(i));      
    }
    
    function next_move(){
        i = next_index(i);
        slide_move();
         btn_update($('.btn_next'), next_index(i));     
    }
    

    function start_timer(){
        timer = setInterval(next_move, 2000);
    }
    
    function stop_timer(){
        clearInterval(timer);
    }

    $('.btn_prev').on('click', prev_move);
    $('.btn_next').on('click', next_move);
    
    $('.navi').on('click', 'a', function(){
        i = $(this).index();
        slide_move();
    });
    
    $('.frame').on({
        'mouseenter' : stop_timer,
        'mouseleave' : start_timer
    });

    start_timer(); 
    $('.navi').children('a').first().trigger('click');
    
    
    
 
    
});