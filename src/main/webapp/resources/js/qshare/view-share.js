/**
 * Created by BIN on 2017/4/9.
 */
define(['qshare/login', 'qshare/index', 'utils/messager', 'jquery/jquery.sinaEmotion', 'bootstrap',
        'jquery/jquery.blueimp-gallery', 'bootstrapValidator'],
    function(login, share, $messager){
    var CURR_SHARE; // 当前分享信息
    var CURR_USER; // 当前用户信息
    var view = {};

    // 初始化分享信息
    view.initShareInfo = function(){
        var $showEvalBox = $('.show-eval-box');
        share.loadShareEval(CURR_SHARE.shareId, $showEvalBox, CURR_USER);
    }

    /**
     * 初始化事件
     */
    view.initEvent = function(){
        $('#login').on('click', login.show);

        // 点赞
        $('.thumb-up').on('click', function(){
            share.addThumbUp(CURR_SHARE.shareId, $(this), CURR_USER);
        });

        // 收藏
        $('.collect').on('click', function(){
            share.addCollect(CURR_SHARE.shareId, $(this), CURR_USER);
        });

        // 转发
        $('.transpond').on('click', function(){
            share.homeEnt();
            share.addTranspond(CURR_SHARE.shareId, $(this), CURR_USER);
        })

        // 评论
        $('.footer-tool .eval').on('click', function(){
            share.addEvalInfo(CURR_SHARE.shareId, CURR_SHARE.userId, $('#currShare .panel-footer'), $('.show-eval-box'), $(this), CURR_USER);
        });

        // 退出登录
        $('#logout').on('click', function(){
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
        });

        // 修改密码
        $('#changePwd').on('click', login.changePwd);
    }

    view.init = function(share, user){
        var that = this;
        CURR_SHARE = share;
        CURR_USER = user;
        this.initEvent();
        login.init();

        that.initShareInfo();
        setTimeout(function(){
            $('.share-content-box').html(AnalyticEmotion(share.shareContent));
        }, 500);
    }

    return view;
})