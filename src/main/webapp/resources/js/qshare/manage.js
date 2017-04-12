/**
 * Created by BIN on 2017/4/11.
 */
define(['jquery/jquery.metisMenu', 'jquery/jquery.slimscroll.min', 'qshare/hAdmin'], function(){
    var manage = {};

    manage.initEvent = function(){
        $('.J_menuItem').on('click',function(){
            var url = $(this).attr('href');
            $("#J_iframe").attr('src',url);
            return false;
        });
    }

    manage.init = function(){
        this.initEvent();
    }

    return manage;
});