/**
 * Created by BIN on 2017/4/11.
 */
define(['qshare/login', 'jquery/jquery.metisMenu', 'jquery/jquery.slimscroll.min', 'qshare/hAdmin', 'bootstrap'],
    function(login){
    var manage = {};

    manage.logout = function(){
        $.confirmDialog({
            title: '确定退出登录？',
            okCall: function(){
                $.ajax({
                    url: 'logout.do',
                    dataType: 'json',
                    success: function(){
                        location.reload();
                    },
                    error: function(){
                        location.reload();
                    }
                });
            }
        });
    }

    manage.initEvent = function(){
        $('#logout').on('click', this.logout);
        $('#changePwd').on('click', login.changePwd);

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