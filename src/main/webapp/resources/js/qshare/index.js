define(['utils/messager', 'utils/common', 'qshare/login', 'utils/app-dialog','jquery/jquery.sinaEmotion', 'bootstrap', 'bootstrapValidator',
        , 'jquery/snowfall.jquery', 'utils/upload-progress']
    , function ($messager, comm, login) {
    var CURRENT_PAGE_NUMBER = 1;
    var home_ent; // 加载入口
    var share = {};

    /*
     * 剩余字数统计
     * 注意 最大字数只需要在放数字的节点哪里直接写好即可 如：<var class="word">200</var>
     */
    share.statInputNum = function (textArea, numItem) {
        var max = numItem.text(), curLength;

        if(textArea[0]){
            textArea[0].setAttribute("maxlength", max);
            curLength = textArea.val().length;
            numItem.text(max - curLength);
            textArea.on('input propertychange', function () {
                numItem.text(max - $(this).val().length);
            });
        }
    }

    /**
     * 显示花瓣背景
     */
    share.showHuaban = function () {
        $(document).snowfall({
            image: "resources/img/huaban.png",
            flakeCount: 20,
            minSize: 5,
            maxSize: 22
        });
    }

    /**
     * 显示背景雪花
     */
    share.showSnow = function () {
        var d = "<div class='snow'>❅<div>"
        this.setInterval = setInterval(function () {
            var f = $(document).width();
            var e = Math.random() * f - 100;
            var o = 0.3 + Math.random();
            var fon = 10 + Math.random() * 30;
            var l = e - 100 + 200 * Math.random();
            var k = 2000 + 5000 * Math.random();
            $(d).clone().appendTo(".snowbg").css({
                left: e + "px",
                opacity: o,
                "font-size": fon,
            }).animate({
                top: "400px",
                left: l + "px",
                opacity: 0.2,
            }, k, "linear", function () {
                $(this).remove()
            });
        }, 200);
    }

    /**
     * 分享信息验证
     * @return {[type]} [description]
     */
    share.validator = function () {
        var that = this;
        // 发布信息验证
        $('#shareForm').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                shareTheme: {
                    validators: {
                        notEmpty: {
                            message: '分享主题不能为空'
                        },
                        stringLength: {
                            min: 3,
                            max: 20,
                            message: '主题必须3-20个字'
                        }
                    }
                },
                shareContent: {
                    validators: {
                        notEmpty: {
                            message: '分享内容不能为空'
                        }
                    }
                }
            }
        }).submit(function () { return false});
    }

    /**
     * 获取评论盒子
     * @param title
     * @param btnText
     * @param type eval/replay
     * @param event
     * @returns {*|jQuery|HTMLElement}
     */
    share.getEvalBox = function(title, btnText, type, event){
        var $evalBox = $('<div class="add-eval-box" style="display:none;">' +
            '<textarea class="add-eval-content form-control" placeholder="说点什么吧..." style="resize:none;"></textarea>' +
            '<button class="add-eval-btn btn btn-primary" style="margin-top:5px;">发表</button>' +
        '</div>');

        $evalBox.attr('tag', type);
        $evalBox.find('textarea').attr('placeholder', title ? title : '说点什么吧...');
        $evalBox.find('button').text(btnText ? btnText : '发表').on('click', event);

        return $evalBox;
    }

    share.deleteEval = function(evalId, evalItem){
        var that = this;
        $.confirmDialog({
            title: '确认删除评论？',
            okCall: function(){
                $.ajax({
                    url: 'share/deleteEval.do',
                    data:{'evalId': evalId},
                    type:'post',
                    dataType:'json',
                    async: false,
                    success: function(result){
                        if(result.msg == 'success'){
                            evalItem.remove();
                            $messager.success('删除成功');
                        } else if(result.msg == 'OFFLINE'){
                            $messager.warning('用户未登录');
                            that.showLogin();
                        } else{
                            $messager.error(result.msg);
                        }
                    },
                    error: function(){
                        $messager.warning('服务器出错');
                    }
                });
            }
        });
    }

    share.reply = function(evalInfo, footer, replyBox, currUser){
        var that = this;
        if(footer.find('.add-eval-box').size() == 1 && footer.find('.add-eval-box').attr('tag') == 'reply'){
            footer.find('.add-eval-box').slideUp('normal', 'swing', function(){
                $('.add-eval-box').remove();
            });
        } else{
            $('.add-eval-box').remove();
            var $replyEval = this.getEvalBox('回复：' + evalInfo.evalUser.nickname, '回复', 'reply', function(){
                // 回复内容
                var evalContent = $replyEval.find('.add-eval-content').val();
                if(!evalContent){
                    $messager.warning('回复内容不能为空');
                } else if(evalContent.length > 50){
                    $messager.warning('回复内容不能超过50个字符');
                } else{
                    $.ajax({
                        url: 'share/reply.do',
                        data: {'evalId': evalInfo.eval.evalId, 'replyUserId': evalInfo.evalUser.userId, 'evalContent': evalContent},
                        type: 'post',
                        dataType: 'json',
                        success: function(result){
                            if(result.msg == 'success'){
                                that.addReplyItem(result.replyInfo, currUser, replyBox);

                                footer.find('.add-eval-box').remove();
                                $messager.success('回复成功');
                            } else if(result.msg == 'OFFLINE'){
                                $messager.warning('用户未登录');
                                that.showLogin();
                            } else{
                                $messager.error(result.msg);
                            }
                        },
                        error: function(){
                            $messager.warning('服务器出错');
                        }
                    });
                }
            });
            footer.append($replyEval);
            $replyEval.slideDown();
        }
    }

    /**
     * 添加回复项
     * @param replyInfo
     * @param currUser
     * @param replyBox
     */
    share.addReplyItem = function(replyInfo, currUser, replyBox){
        var that = this;
        // 添加回复
        var $evalSubItem = $('<li>' +
                '<div class="eval-sub-portrait"></div>' +
                '<div class="eval-sub-content"></div>' +
            '</li>');
        // 回复列表头像
        var $evalSubPortrait = $evalSubItem.find('.eval-sub-portrait');
        // 回复内容
        var $evalSubContent = $evalSubItem.find('.eval-sub-content');
        var portraitPath = replyInfo.evalUser.portraitPath ? replyInfo.evalUser.portraitPath
                : 'resources/img/header/portrait.jpg';
        $('<img/>').attr('src',portraitPath).appendTo($evalSubPortrait);
        $('<a href="myHome.do?account=' + replyInfo.evalUser.account + '" style="text-decoration: none;"></a>')
            .text(replyInfo.evalUser.nickname).appendTo($evalSubContent);
        $evalSubContent.append('&nbsp;回复&nbsp;');
        $('<a href="myHome.do?account=' + replyInfo.replyUser.account + '" style="text-decoration: none;"></a>')
            .text(replyInfo.replyUser.nickname).appendTo($evalSubContent);
        $evalSubContent.append('：').append(replyInfo.eval.evalContent);

        // 回复工具栏
        var $replyTool = $('<div class="reply-tool"></div>').appendTo($evalSubContent);
        $('<span style="color:#bfabab;"></span>').text(comm.getTime(replyInfo.eval.createTime)).appendTo($replyTool);

        if(currUser) {
            // 删除
            if (currUser.userId == replyInfo.evalUser.userId) {
                var $delBtn = $('<a class="eval-delete" href="javascript:void(0);" title="删除"></a>')
                    .append($('<i class="fa fa-trash"></i>')).appendTo($replyTool);
                $evalSubItem.find('.eval-sub-content').hover(function () {
                    $delBtn.show();
                }, function () {
                    $delBtn.hide();
                });
                // 确定删除回复
                $replyTool.find('.eval-delete').on('click', function () {
                    that.deleteEval(replyInfo.eval.evalId, $evalSubItem);
                });
            } else {
                // 回复
                var $replyBtn = $('<a class="eval-reply" href="javascript:void(0);" title="回复"></a>')
                    .append($('<i class="fa fa-commenting"></i>')).appendTo($replyTool);
                $evalSubItem.find('.eval-sub-content').hover(function () {
                    $replyBtn.show();
                }, function () {
                    $replyBtn.hide();
                });
                // 回复
                $replyTool.find('.eval-reply').on('click', function () {
                    that.reply(replyInfo, $(this).parents('.panel-footer'), replyBox, currUser);
                });
            }
        }
        replyBox.append($evalSubItem);
    }

    /**
     * 获取评论项
     * @param evalInfo 评论信息
     * @param currUser 当前在线用户
     * @returns {*|jQuery|HTMLElement}
     */
    share.getEvalItem = function(evalInfo, currUser){
        var that = this;
        // 评论列表项
        var $evalItem = $('<li>' +
            '<div class="eval-portrait"></div>' +
            '<div class="eval-content"></div>' +
            '<div class="reply-box" style="display:block;">' +
                '<ul style="list-style: none;"></ul>' +
            '</div>' +
        '</li>');

        var portraitPath = evalInfo.evalUser.portraitPath ? evalInfo.evalUser.portraitPath
            : 'resources/img/header/portrait.jpg';
        $('<img/>').attr({'src': portraitPath})
            .appendTo($evalItem.find('.eval-portrait'));
        var $evalContent = $evalItem.find('.eval-content');
        // 评论者昵称
        $('<a href="myHome.do?account=' + evalInfo.evalUser.account + '" style="text-decoration: none;"></a>')
            .text(evalInfo.evalUser.nickname).appendTo($evalContent);
        // 评论内容
        $evalContent.append('：').append(evalInfo.eval.evalContent);
        // 工具栏
        var $evalTool = $('<div class="eval-tool"></div>').appendTo($evalContent);
        // 评论时间
        $('<span style="color:#bfabab;"></span>').text(comm.getTime(evalInfo.eval.createTime)).appendTo($evalTool);

        var $replyBox = $evalItem.find('.reply-box ul');
        // 操作按钮
        if(currUser){
            // 删除
            if(currUser.userId == evalInfo.evalUser.userId || currUser.userId == evalInfo.shareUser.userId){
                var $delBtn = $('<a class="eval-delete" href="javascript:void(0);" title="删除"></a>')
                    .append($('<i class="fa fa-trash"></i>')).appendTo($evalTool);
                $evalItem.find('.eval-content').hover(function(){
                    $delBtn.show();
                }, function(){
                    $delBtn.hide();
                });
                // 确定删除评论
                $evalTool.find('.eval-delete').on('click', function(){
                    that.deleteEval(evalInfo.eval.evalId, $evalItem);
                });
            }
            if(currUser.userId != evalInfo.evalUser.userId) {
                // 回复
                var $replyBtn = $('<a class="eval-reply" href="javascript:void(0);" title="回复"></a>')
                    .append($('<i class="fa fa-commenting"></i>')).appendTo($evalTool);
                $evalItem.find('.eval-content').hover(function(){
                    $replyBtn.show();
                }, function(){
                    $replyBtn.hide();
                });
                // 回复
                $evalTool.find('.eval-reply').on('click', function(){
                    that.reply(evalInfo, $(this).parents('.panel-footer'), $replyBox, currUser);
                });
            }
        }

        // 添加回复内容
        $.ajax({
            url: 'share/getReplyEval.do',
            data: {'evalId': evalInfo.eval.evalId},
            type: 'post',
            dataType: 'json',
            success: function(result){
                if(result.msg == 'success'){
                    if(result.replyEvals && result.replyEvals.length > 0){
                        for(var i in result.replyEvals){
                            that.addReplyItem(result.replyEvals[i], currUser, $replyBox);
                        }
                    }
                } else{
                    $messager.error(result.msg);
                }
            },
            error: function(){
                $messager.warning('服务器出错');
            }
        });

        return $evalItem;
    }

    /**
     * 初始化评论
     * @param shareId
     * @param evalBox 存放评论信息盒子
     * @param currUser 当前在线用户
     */
    share.loadShareEval = function(shareId, evalBox, currUser){
        var that = this;
        $.ajax({
            url: 'share/getEval.do',
            data: {'shareId':shareId},
            type: 'post',
            dataType: 'json',
            success: function(result){
                if(result.msg == 'success'){
                    if(result.evals && result.evals.length > 0){
                        for(var i in result.evals){
                            evalBox.append(that.getEvalItem(result.evals[i], currUser));
                        }
                    }
                } else{
                    $messager.error(result.msg);
                }
            },
            error: function(){
                $messager.warning('服务器出错');
            }
        });
    }

    /**
     * 获取用户分享信息面板
     * @param user 发布者
     * @param share 信息内容
     * @param currUser 当前操作用户
     * @param transpondInfo 转发内容
     * @param transpondCount 被转发量
     * @returns {*|jQuery|HTMLElement}
     */
    share.getSharePanel = function (user, share,collects, currUser, transpondInfo, transpondCount) {
        var that = this, i;
        var $panel = $('<div class="panel myright-n share-info"></div>');
        var $title = $('<div class="panel-heading"></div>').appendTo($panel);
        var $body = $('<div class="panel-body"></div>').appendTo($panel);

        // 转发内容
        if(transpondInfo){
            var $transpondContent = $('<div class="transpond-content"></div>').appendTo($body);
            $transpondContent.append($('<a href="javascript:void(0);"></a>').text(transpondInfo.nickname + '：'));
            $transpondContent.append($('<a href="javascript:void(0);"></a>').text(share.shareTitle));
        }
        // 分享内容
        $('<div class="share-content-box"></div>').html(AnalyticEmotion(share.shareContent)).appendTo($body);
        // 分享图片
        if(share.imgInfo){
            var $shareImg = $('<div class="share-img-box"></div>').appendTo($body);
            var imgInfos = share.imgInfo.split(',');
            for(i in imgInfos){
                $('<img class="share-img-info" />').attr({'src': imgInfos[i]}).appendTo($shareImg);
            }
        }
        // 分享视频
        if(share.videoPath){
            var $shareVideoBox = $('<div class="share-video-box"></div>').appendTo($body);
            var $shareVideo = $('<video width="300" height="180" controls></video>').appendTo($shareVideoBox);
            $shareVideo.attr({'src': share.videoPath, 'poster': 'resources/img/player.jpg'});
        }

        var $footer = $('<div class="panel-footer"></div>').appendTo($panel);

        // 头像
        var src = user.portraitPath ? user.portraitPath : 'resources/img/header/portrait.jpg';
        var $titleLeft = $('<a href="javascript:void(0);" class="pull-left"><img src="' + src + '" alt=""></a>');
        var $titleCenter = $('<div class="title-center"></div>');
        // 标记为转发
        if(transpondInfo){
            $titleCenter.append($('<span style="color:#a7a9b7">[转] </span>'));
        }
        $titleCenter.append($('<a href="myHome.do?account=' + user.account + '"></a>').html(user.nickname + '：'));
        $titleCenter.append($('<a href="viewShare.do?shareId=' + share.shareId +'"></a>').html(transpondInfo?transpondInfo.transpond.reason:share.shareTitle));
        $titleCenter.append($('<small>' + comm.getTime(share.createTime, 'yyyy-MM-dd HH:mm') + '</small>'));

        // 右上角删除、关闭按钮
        var $titleRight = $('<div class="title-right fr"></div>').css('font-size', '16px');
        var $deleteShare = $('<a class="delete-share"></a>').attr({'id':share.shareId, 'href':'javascript:void(0);', 'title':'删除'})
            .append($('<i class="fa fa-trash"></i>'));
        var $closeShare = $('<a class="close-share"></a>').attr({'href':'javascript:void(0);', 'title':'关闭'}).css({'margin-left': '10px'})
            .append($('<i class="fa fa-remove">'));
        if(currUser && currUser.userId == share.userId){
            $titleRight.append($deleteShare);
        }
        $titleRight.append($closeShare);

        $title.append($titleLeft);
        $title.append($titleCenter);
        $title.append($titleRight);

        // 右下角操作栏
        var $tool = $('<div class="footer-tool">' +
            '<span class="share-info-type"></span>' +
            '<a class="thumb-up" href="javascript:void(0);" title="给TA点赞"></a>' +
            '<a class="collect" href="javascript:void(0);" title="喜欢就收藏吧"></a>' +
            '<a class="transpond" href="javascript:void(0);" title="分享给你的好友"><i class="fa fa-share-square-o"></i>转发</a>' +
            '<a class="eval" href="javascript:void(0);" title="说点什么吧..."><i class="fa fa-commenting"></i>评论</a>' +
        '</div>');

        // 分享信息类型
        var $shareType = $tool.find('.share-info-type');
        switch(share.shareTypeId){
            case 'dm': $shareType.text('动漫'); break;
            case 'dy': $shareType.text('电影'); break;
            case 'ly': $shareType.text('旅游'); break;
            case 'hy': $shareType.text('户外'); break;
            case 'ms': $shareType.text('美食'); break;
            case 'qg': $shareType.text('情感'); break;
            case 'sh': $shareType.text('生活'); break;
            case 'yd': $shareType.text('运动'); break;
            case 'yl': $shareType.text('娱乐'); break;
            case 'zy': $shareType.text('综艺'); break;
            case 'qt': $shareType.text('其他'); break;
            default: $shareType.text('其他'); break;
        }

        // 点赞数、转发数
        var $thumbTranspond = $('<div class="thumb-transpond">' +
            '<i class="fa fa-thumbs-up"></i><span><em class="thumb-count">0</em>&nbsp;赞&nbsp;&nbsp;</span>' +
            '<i class="fa fa-share-square tc"></i><span class="tc"><em class="transpond-count">0</em>&nbsp;转发</span>' +
        '</div>');

        // 初始化评论信息
        var $evalBox = $('<ul class="show-eval-box" style="list-style:none;"></ul>');
        this.loadShareEval(share.shareId, $evalBox, currUser);

        $footer.append($tool);
        $footer.append($thumbTranspond);
        $footer.append($evalBox);

        // 初始化点赞按钮
        var $thumb = $tool.find('.thumb-up');
        if(!currUser || !currUser.userId){
            $thumb.html('<i class="fa fa-thumbs-o-up"></i>点赞');
        } else{
            var upIds = share.thumbUpId;
            $thumbTranspond.find('.thumb-count').text(upIds ? upIds.split(',').length:0);
            if(upIds && comm.contains(upIds.split(','), currUser.userId)){
                $thumb.html('<i class="fa fa-thumbs-up"></i>取消赞');
            } else{
                $thumb.html('<i class="fa fa-thumbs-o-up"></i>点赞');
            }
        }

        // 初始化收藏按钮
        var $collect = $tool.find('.collect');
        if(!currUser || !currUser.userId){
            $collect.html('<i class="fa fa-star-o"></i>收藏');
        } else{
            if(collects){
                var collect = false;
                for(i in collects){
                    if(collects[i].userId == currUser.userId){
                        collect = true;
                        break;
                    }
                }
                $collect.html(collect ? '<i class="fa fa-star"></i>取消收藏' : '<i class="fa fa-star-o"></i>收藏');
            } else{
                $collect.html('<i class="fa fa-star-o"></i>收藏');
            }
        }

        // 初始化转发
        if(transpondInfo){
            $thumbTranspond.find('.tc').remove();
        } else{
            $thumbTranspond.find('.transpond-count').text(transpondCount ? transpondCount : 0);
        }

        //-------------事件处理----------
        // 点赞
        $tool.find('.thumb-up').on('click', function(){
            if(!currUser || !currUser.userId){
                $messager.warning('用户未登录');
                that.showLogin();
                return false;
            }
            var $i = $thumb.find('i');
            $i.animate({
                fontSize: '1.6em'
            }, 300, 'swing', function(){
                $i.animate({
                    fontSize: '1em'
                }, 300, 'swing', function(){
                    // 改变数据库点赞状态
                    $.ajax({
                        url: 'share/thumbUp.do',
                        data: {'shareId': share.shareId},
                        dataType: 'json',
                        async: false,
                        type: 'post',
                        success: function(result){
                            if(result.msg == 'success'){
                                // 如果已点赞则取消赞，否则进行点赞
                                if($i.hasClass('fa-thumbs-up')){
                                    $thumb.empty();
                                    $thumb.html('<i class="fa fa-thumbs-o-up"></i>点赞');
                                    // 赞数-1
                                    $thumbTranspond.find('.thumb-count').text(parseInt($thumbTranspond.find('.thumb-count').text()) - 1);
                                } else{
                                    $thumb.empty();
                                    $thumb.html('<i class="fa fa-thumbs-up"></i>取消赞');
                                    // 赞数+1
                                    $thumbTranspond.find('.thumb-count').text(parseInt($thumbTranspond.find('.thumb-count').text()) + 1);
                                }
                            } else if(result.msg == 'OFFLINE'){
                                $messager.warning('用户未登录');
                                that.showLogin();
                            } else{
                                $messager.error(result.msg);
                            }
                        },
                        error: function(){
                            $messager.warning('服务器出错！');
                        }
                    });
                });
            });
        });
        // 收藏
        $tool.find('.collect').on('click', function(){
            if(!currUser || !currUser.userId){
                $messager.warning('用户未登录');
                that.showLogin();
                return false;
            }
            var $i = $collect.find('i');
            $i.animate({
                fontSize: '1.6em'
            }, 300, 'swing', function(){
                $i.animate({
                    fontSize: '1em'
                }, 300, 'swing', function(){
                    // 改变数据库点赞状态
                    $.ajax({
                        url: 'share/collect.do',
                        data: {'shareId': share.shareId},
                        dataType: 'json',
                        async: false,
                        type: 'post',
                        success: function(result){
                            if(result.msg == 'success'){
                                // 如果已点赞则取消赞，否则进行点赞
                                if($i.hasClass('fa-star')){
                                    $collect.empty();
                                    $('#collectCount').text(parseInt($('#collectCount').text()) - 1);
                                    $collect.html('<i class="fa fa-star-o"></i>收藏');
                                } else{
                                    $collect.empty();
                                    $('#collectCount').text(parseInt($('#collectCount').text()) + 1)
                                    $collect.html('<i class="fa fa-star"></i>取消收藏');
                                }
                            } else if(result.msg == 'OFFLINE'){
                                $messager.warning('用户未登录');
                                that.showLogin();
                            } else{
                                $messager.error(result.msg);
                            }
                        },
                        error: function(){
                            $messager.warning('服务器出错！');
                        }
                    });
                });
            });
        });
        // 转发
        $tool.find('.transpond').on('click', function(){
            if(!currUser || !currUser.userId){
                $messager.warning('用户未登录');
                that.showLogin();
                return false;
            }
            // 弹出转发框
            new TranspondDialog(that, $(this), share, $thumbTranspond.find('.transpond-count'));
        });
        // 评论
        $tool.find('.eval').on('click', function(){
            if(!currUser || !currUser.userId){
                $messager.warning('用户未登录');
                that.showLogin();
                return false;
            }

            // 判断是否已打开评论
            if($footer.find('.add-eval-box').size() == 1 && $footer.find('.add-eval-box').attr('tag') == 'eval'){
                $footer.find('.add-eval-box').slideToggle();
            } else{
                $('.add-eval-box').remove();
                var $addEval = that.getEvalBox('说点什么吧...', '发表', 'eval', function(){
                    var evalContent = $addEval.find('.add-eval-content').val();
                    if(!evalContent){
                        $messager.warning('评论内容不能为空');
                    } else if(evalContent.length > 50){
                        $messager.warning('评论内容不能超过50个字符');
                    } else{
                        $.ajax({
                            url: 'share/eval.do',
                            data: {'shareId': share.shareId, 'shareUserId': user.userId, 'evalContent': evalContent},
                            type: 'post',
                            dataType: 'json',
                            success: function(result){
                                if(result.msg == 'success'){
                                    $evalBox.append(that.getEvalItem(result.evalInfo, currUser));
                                    $addEval.find('.add-eval-content').val('');
                                    $footer.find('.add-eval-box').slideToggle();
                                    $messager.success('评论成功');
                                } else if(result.msg == 'OFFLINE'){
                                    $messager.warning('用户未登录');
                                    that.showLogin();
                                } else{
                                    $messager.error(result.msg);
                                }
                            },
                            error: function(){
                                $messager.warning('服务器出错');
                            }
                        });
                    }
                });
                $footer.append($addEval);
                $addEval.slideDown();
            }
        });

        // 关闭不看该动态
        $closeShare.on('click', function () {
            $panel.slideUp('normal', 'swing', function(){
                $panel.remove();
            });
        });
        // 删除分享
        $deleteShare.on('click', function(){
            $.confirmDialog({
                title: '确认删除该分享信息？',
                okCall: function(){
                    $.ajax({
                        url: 'share/delete.do',
                        data: {'shareId': $deleteShare.attr('id')},
                        type: 'post',
                        dataType: 'json',
                        success: function(result){
                            if(result.msg == 'success'){
                                $panel.slideUp('normal', 'swing', function(){
                                    $panel.remove();
                                });
                                $messager.success('删除成功！');
                                $('#shareCount').text(parseInt($('#shareCount').text()) - 1);
                            } else if(result.msg == 'OFFLINE'){
                                that.showLogin();
                                $messager.warning('用户未登录');
                            } else{
                                $messager.error(result.msg);
                            }
                        },
                        error: function(){
                            $messager.warning('服务器出错');
                        }
                    });
                }
            });
        });

        return $panel;
    }

    /**
     * 多图片上传
     */
    share.uploadImg = function(){
        var that = this;

        // 包装表单数据
        var formData = new FormData();
        for(var i in this.imgFiles){
            formData.append('files', this.imgFiles[i]);
        }
        $.openProgress(0);

        $.ajax({
            url: 'file/uploadImgs.do',
            type: 'post',
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false,
            xhr: function(){
                var xhr = $.ajaxSettings.xhr();
                if(xhr.upload){
                    xhr.upload.addEventListener('progress', function(event){
                        var loaded = event.loaded;	//已经上传大小情况
                        var tot = event.total;		//附件总大小
                        var per = Math.floor(100*loaded/tot);  //已经上传的百分比
                        $.openProgress(per);
                    }, false);
                    return xhr;
                }
            },
            success: function(result){
                $.openProgress(100);
                setTimeout(function(){
                    $.closeProgress();
                }, 1000);
                if(result.msg == 'success'){
                    that.addShare(result.filePaths, null);
                } else{
                    $messager.error(result.msg);
                }
            },
            error: function(){
                $.closeProgress();
                $messager.warning('服务器出错');
            }
        });
    }

    /**
     * 上传视频
     */
    share.uploadVideo = function(){
        var that = this;
        var formData = new FormData();
        formData.append('file', this.videoFile);

        $.openProgress(0);
        // 将文件上传至服务器
        $.ajax({
            url: 'file/uploadVideo.do',
            type: 'post',
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false,
            xhr: function(){
                var xhr = $.ajaxSettings.xhr();
                if(xhr.upload){
                    xhr.upload.addEventListener('progress', function(event){
                        var loaded = event.loaded;	//已经上传大小情况
                        var tot = event.total;		//附件总大小
                        var per = Math.floor(100*loaded/tot);  //已经上传的百分比
                        $.openProgress(per, '正在上传视频 ' + parseFloat(loaded/1000).toFixed(0) + 'k / ' + parseFloat(tot/1000).toFixed(0) + 'k');
                    }, false);
                    return xhr;
                }
            },
            success: function (result) {
                $.openProgress(100);
                setTimeout(function(){
                    $.closeProgress();
                }, 1000);
                if(result.msg == 'success'){
                    that.addShare(null, result.filePath);
                } else{
                    $messager.error(result.msg);
                }
            },
            error: function () {
                $.closeProgress();
                $messager.warning('服务器出错');
            }
        });
    }

    /**
     * 发布分享信息
     * @return {[type]} [description]
     */
    share.sendInfo = function () {
        var that = this;
        // 主题信息
        var theme = $('#shareTheme').val();
        // 分享内容
        var content = $('#shareContent').val();
        // 信息类别
        var shareType = $('#shareType .share-type-btn').attr('name');
        shareType = !shareType ? 'qt':shareType;
        // 可见性
        var visibleType = $('#visibility .visibility-type-btn').attr('name');
        visibleType = !visibleType ? 'all':visibleType;

        if(!theme || !content){
            $messager.warning('信息输入不能为空！');
        } else if (theme.length >= 3 && theme.length <= 20) {
            // 不能同时上传图片和文件
            if(this.videoFile && this.imgFiles && this.imgFiles.length > 0){
                $messager.warning('不能同时上传图片和视频');
                return false;
            }

            // 上传图片
            if(this.imgFiles && this.imgFiles.length > 0){
                that.uploadImg();
            } else if(this.videoFile){
                // 没有图片，则上传视频
                that.uploadVideo();
            } else{
                // 没有视频直接分享信息
                that.addShare(null, null);
            }
        } else{
            $messager.warning('分享主题必须3-20个字符');
        }
    }

    /**
     * 新增分享
     * @param filePaths
     * @param videoPath
     */
    share.addShare = function(filePaths, videoPath){
        var that = this;
        // 主题信息
        var theme = $('#shareTheme').val();
        // 分享内容
        var content = $('#shareContent').val();
        // 信息类别
        var shareType = $('#shareType .share-type-btn').attr('name');
        shareType = !shareType ? 'qt':shareType;
        // 可见性
        var visibleType = $('#visibility .visibility-type-btn').attr('name');
        visibleType = !visibleType ? 'all':visibleType;

        // 将分享信息提交到后台验证
        $.ajax({
            url: 'share/addShare.do',
            data: {'shareTitle': theme, 'shareContent':content, 'shareTypeId':shareType
                , 'visible':visibleType, 'imgInfo':filePaths ? filePaths.join(',') : null
                , 'videoPath': videoPath ? videoPath : null},
            type: 'post',
            async: false,
            dataType: 'json',
            success: function(result){
                if(result.msg == 'success'){
                    // 发布成功
                    that.$sharePanel.after(that.getSharePanel(result.userInfo, result.shareInfo, null, result.userInfo));

                    $('#shareForm')[0].reset();
                    $('#shareTheme').parent('.form-group').removeClass('has-success has-feedback');
                    $('#shareTheme').next('i').removeClass('glyphicon glyphicon-ok');
                    $('#shareContent').parent('.form-group').removeClass('has-success has-feedback');
                    $('#shareContent').next('i').removeClass('glyphicon glyphicon-ok');
                    $('#shareTheme').val('');
                    $('#shareContent').val('');

                    $('#shareForm').find('.word').text(200);

                    $('#dlg_insertImg').remove();
                    $('.add-video').remove();
                    that.videoFile = null;
                    that.imgFiles = [];
                    $('#shareCount').text(parseInt($('#shareCount').text()) + 1);
                    $messager.success('分享成功');
                } else if(result.msg == 'OFFLINE'){
                    $messager.warning('用户未登录');
                    that.showLogin();
                } else{
                    $messager.error(result.msg);
                }
            },
            error: function(){
                $messager.warning('服务器出错！');
            }
        });
    }

    /**
     * 退出登录
     */
    share.logout = function(){
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

    share.showLogin = function () {
        login.show();
    }

    share.initEvent = function () {
        var that = this;
        $('#changePwd').on('click', login.changePwd);
        $('#logout').on('click', that.logout);
        // 选择图片
        $('#insertImg').click(function () {
            // 弹窗选择图片
            new InsertImgDialog(that, $(this));
        });

        // 选择小视频
        $('#insertVideo').click(function () {
            $('#insertVideoFile').trigger('click');
        });

        $('#insertVideoFile').on('change', function(){
            $('#wordCount .add-video').remove();
            this.videoFile = null;
            if($.trim(this.files[0].type).indexOf('video/') != 0){
                $messager.warning('只能选择视频文件');
                return false;
            }

            // 文件大小不能超过30M
            if(this.files[0].size > 50000000){
                $messager.warning('文件不能超过50M');
                return false;
            }

            that.videoFile = this.files[0];
            // 预览选择的小视频
            var $addVideo = $('<div class="add-video"></div>');
            $('<video width="300" height="180" controls></video>')
                .attr({'src':window.URL.createObjectURL(that.videoFile), 'poster':'resources/img/player.jpg'}).appendTo($addVideo);
            var $removeVideo = $('<span class="glyphicon glyphicon-remove remove-video" id="removeVideo" title="删除"></span>').appendTo($addVideo);

            $('#wordCount').append($addVideo);

            $removeVideo.on('click', function(){
                $addVideo.slideUp('normal', 'swing', function(){
                    $addVideo.remove();
                });
                that.videoFile = null;
            });
        });

        // 设置类型:默认其他
        $('#shareType ul li').find('a').click(function () {
            $('#shareType .share-type-btn').attr('name', $(this).attr('name'));
            $('#shareType .share-type-text').text($(this).text());
        });

        // 设置可见性
        $('#visibility ul li').find('a').click(function () {
            $('#visibility .visibility-type-btn').attr('name', $(this).attr('name'));
            $('#visibility .visibility-type-text').text($(this).text());
        });

        // 发布信息验证
        $('#sendInfoBtn').on('click', function () {
            that.sendInfo();
            setTimeout(function () {
                $('#sendInfoBtn').removeAttr('disabled');
            }, 500);
        });

        // 显示登录窗口
        $('.login-tab').on('click', share.showLogin);

        // 选择显示的分享信息类型
        $('.show-share-type').find('.share-nav').each(function(){
            $(this).on('click', function(){
                CURRENT_PAGE_NUMBER = 1;
                $('.myright').find('.share-info').remove();
                that.loadShareInfo($(this).children('a').attr('name'));

                if(document.body.clientWidth < 768){
                    $('.navbar-toggle').trigger('click');
                }

                $('.load-more').unbind('click');
                $('.load-more').on('click', function(){
                    that.loadShareInfo();
                });
            });
        });

        // 点击加载更多
        $('.load-more').on('click', function(){
            that.loadShareInfo();
        });
    }

    share.initNum = function(){
        CURRENT_PAGE_NUMBER = 1;
    }

    /**
     * @param shareType 分享类型
     * @param account 当前账户
     * @param loadType 加载类型 全部信息、收藏信息
     * @param ent 加载入口 主页、个人主页:home
     */
    share.loadShareInfo = function(shareType, account, loadType, ent){
        var that = this;
        home_ent = ent;

        if(!shareType){
            $('.show-share-type').find('li.active').each(function(){
                if($(this).children('a') && $(this).children('a').attr('name')){
                    shareType = $(this).children('a').attr('name');
                    return false;
                }
            });
        }

        // 开始加载
        $('#loadMore .in-load').show();
        $('#loadMore .load-more, #loadMore .load-finish').hide();

        var url = 'share/loadShare.do';
        var data = {'type':shareType, 'account':account, 'pageNumber': CURRENT_PAGE_NUMBER};

        if(loadType == 'collect'){
            url = 'share/getCollectShare.do';
            data = {'pageNumber': CURRENT_PAGE_NUMBER};
        }

        setTimeout(function(){
            $.ajax({
                url: url,
                type: 'get',
                data: data,
                dataType: 'json',
                async: false,
                success: function(result){
                    if(result.msg == 'success'){
                        // 当前选择的分享信息类型
                        $('.show-share-type').find('li').removeClass('active');
                        $('.show-share-type').children('li').each(function(){
                            if($(this).children('a').attr('name') == result.shareTypeId){
                                $(this).addClass('active');
                            }
                        });
                        $('.more-type').children('li').each(function(){
                            if($(this).children('a').attr('name') == result.shareTypeId){
                                $(this).addClass('active');
                                $('.more-type').parent().addClass('active');
                            }
                        });

                        CURRENT_PAGE_NUMBER = parseInt(result.page.pageNumber) + 1;
                        if(CURRENT_PAGE_NUMBER > result.page.totalPages){
                            $('#loadMore .load-more').hide();
                            $('#loadMore .in-load').hide();
                            $('#loadMore .load-finish').show();
                            $('.load-more').unbind('click');
                        } else{
                            $('#loadMore .load-more').show();
                            $('#loadMore .in-load').hide();
                            $('#loadMore .load-finish').hide();
                        }

                        that.showShareInfo(result.shares, result.userInfo);
                    } else{
                        $messager.error(result.msg);
                    }
                },
                error: function(){
                    $messager.warning('服务器出错');
                }
            });
        }, 500);
    }

    /**
     * 显示分享信息
     * @param shares
     */
    share.showShareInfo = function(shares, currUser){
        for(var i in shares){
            $('#loadMore').before(this.getSharePanel(shares[i].user, shares[i].share, shares[i].collects, currUser, shares[i].transpondVo, shares[i].transpondCount));
        }
        // 加载完毕
        $('#startLoad').hide();
        $('#loadOver').show();
    }

    /**
     * 置顶事件
     */
    share.toTop = function(){
        // 窗体滚动事件
        $(window).scroll(function(){
            if($(window).scrollTop() > 300){$('#toTop').show();} else{$('#toTop').hide();}
        });

        // 置顶
        $('#toTop').on('click', function(){
            $('html,body').animate({scrollTop: 0}, 'normal', 'swing', function(){
                $('#toTop').hide();
            });
        });
    }

    /**
     * 初始化
     * @return {[type]} [description]
     */
    share.init = function () {
        var that = this;
        this.validator();
        this.initEvent();
        this.toTop();

        login.init();

        // 随机使用雪花背景或花瓣背景
        // if(Math.floor(Math.random()*10) % 2 == 0){
        //     this.showSnow();
        // } else{
        //     this.showHuaban();
        // }

        this.$sharePanel = $('#sharePanel');

        //先选出 textarea 和 统计字数 dom 节点
        this.statInputNum($("#wordCount").find("textarea"), $("#wordCount").find(".word"));

        // 选择表情
        $('#face').SinaEmotion($('.emotion'));
        setTimeout(function(){
            that.loadShareInfo();
        }, 2000);
    }

    // -----------------弹窗-----------------
    var TranspondDialog = function(instance, target, share, transpondCount){
        this.instance = instance;
        this.target = target;
        this.share = share;
        this.transpondCount = transpondCount;
        this.init();
    }

    TranspondDialog.prototype = {
        init: function(){
            var that = this;
            var option = {
                hasheader: false,
                modalId: 'transpond',
                mode: that.paintComponent()
            };
            this.target.openModalDialog(option);
        },
        paintComponent: function(){
            var that = this;
            var $html = $('<div>' +
                '<div style="width:100%;">' +
                    '<textarea class="form-control" id="reason" style="width:100%; margin-bottom:10px;resize:none;" placeholder="请填写转发理由"></textarea>' +
                '</div>' +
                '<div style="text-align: right;">' +
                    '<button class="btn btn-primary" id="okBtn" style="margin-right:20px;">确定</button>' +
                    '<button class="btn btn-info" id="cancelBtn">取消</button>' +
                '</div>' +
            '</div>');

            this.$reason = $html.find('#reason');
            $html.find('#cancelBtn').on('click', function(){
                that.target.closeDialog();
            });

            $html.find('#okBtn').on('click', function(){
                $.ajax({
                    async: false,
                    url: 'share/transpond.do',
                    data: {'shareId': that.share.shareId, 'reason':that.$reason.val()},
                    type: 'post',
                    dataType: 'json',
                    success: function(result){
                        if(result.msg == 'success'){
                            if(home_ent != 'home'){
                                that.instance.$sharePanel.after(that.instance.getSharePanel(result.userInfo, result.shareInfo, null, result.userInfo, result.transpondInfo));
                                that.transpondCount.text(parseInt(that.transpondCount.text()) + 1);
                            }
                            $messager.success('转发成功！');
                            that.target.closeDialog();
                        } else if(result.msg == 'OFFLINE'){
                            $messager.warning('用户未登录');
                            that.instance.showLogin();
                            that.target.closeDialog();
                        } else{
                            $messager.error(result.msg);
                            that.target.closeDialog();
                        }
                    },
                    error: function(){
                        that.target.closeDialog();
                        $messager.warning('服务器出错');
                    }
                })
            });
            return $html;
        }
    }

    var InsertImgDialog = function(instance, target){
        this.instance = instance;
        this.target = target;
        this.init();
    }

    InsertImgDialog.prototype = {
        init: function(){
            var that = this;
            var option = {
                title: '添加图片',
                saveBtn: false,
                mode: that.paintComponent()
            };
            this.target.openModalDialog(option);
            this.initEvent();
        },
        paintComponent: function(){
            var $html = $('<div>' +
                '<div style="height:20px;">' +
                    '共 <em class="img-num">0</em> 张，还可添加 <em class="img-remain">9</em> 张' +
                    '<button class="btn btn-info fr" id="removeAll" title="清空选择图片">' +
                        '<i class="fa fa-trash"></i> 清空' +
                    '</button>' +
                '</div>' +
                '<div class="add-img-box">' +
                    '<div class="add-img-btn">' +
                        '<i class="fa fa-cloud-upload"></i>' +
                        '<input id="addImg" type="file" capture="camera" multiple />' +
                    '</div>' +
                '</div>' +
            '</div>');

            return $html;
        },
        addImg: function(file){
            var that = this;
            // 如果添加9张图片就不能继续添加
            if($('.img-remain').text() == 0){
                $('.add-img-btn').hide();
                return false;
            }

            if(!that.instance.imgFiles){
                that.instance.imgFiles = [];
            }
            if($.trim(file.type).indexOf('image/') != 0){
                $messager.warning('只能选择图片');
                return false;
            }
            that.instance.imgFiles.push(file);

            var $imgDiv = $('<div class="add-img"></div>');
            var $img = $('<img style="width:80px; height:80px;"/>');
            var $removeImg = $('<span class="glyphicon glyphicon-remove remove-img"></span>');
            $img.attr({'src':window.URL.createObjectURL(file), 'title':'删除'});

            $imgDiv.append($img);
            $imgDiv.append($removeImg);
            $('.add-img-box').prepend($imgDiv);

            // 添加移除事件
            $removeImg.on('click', function(){
                $imgDiv.remove();
                that.refreshImgNum();
                for(var i in that.instance.imgFiles){
                    if(file == that.instance.imgFiles[i]){
                        that.instance.imgFiles.splice(i, 1);
                    }
                }
            });
            this.refreshImgNum();
        },
        initEvent: function(){
            var that = this, i;
            $('#addImg').on('change', function(){
                for(i = 0; i < this.files.length; i++){
                    that.addImg(this.files[i]);
                }

                $(this).val('');
            });

            // 清空图片
            $('#removeAll').on('click', function(){
                $('.add-img-box').find('.add-img').remove();
                that.refreshImgNum();
                that.instance.imgFiles = [];
            });
        },
        refreshImgNum: function(){
            // 计算图片个数
            var imgNum = $('.add-img-box .add-img').size();
            $('.img-num').text(imgNum);
            $('.img-remain').text(9 - imgNum);
            if(imgNum < 9){
                $('.add-img-btn').show();
            } else{
                $('.add-img-btn').hide();
            }
        }
    }

    return share;
});