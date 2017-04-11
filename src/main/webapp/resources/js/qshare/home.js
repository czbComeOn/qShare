/**
 * Created by BIN on 2017/4/3.
 */
define(['qshare/login', 'qshare/index', 'utils/messager', 'utils/common', 'utils/app-dialog', 'bootstrap', 'bootstrapValidator'],
    function(login, share, $messager, comm){
    var ME_ATTENTION_NUM = 1; // 我关注谁页码
    var WHO_ATTENTION_NUM = 1; // 谁关注我页码
    var SEARCH_ACCOUNT_NUM = 1; // 根据账号查找页码
    var SEARCH_NICKNAME_NUM = 1; // 根据昵称查找页码
    var home_acc; // 当前页面的所属账户
    var home = {};

    /**
     * 退出登录
     */
    home.logout = function(){
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

    /**
     * 修改个人资料
     */
    home.changeData = function(){
        // 获取个人资料
        $.ajax({
            url: 'user/getUserData.do',
            type: 'post',
            dataType: 'json',
            success: function(result){
                if(result.msg == 'success'){
                    new ChangeDataPanel(result.userData, $('#changeData'));
                } else if(result.msg == 'OFFLINE'){
                    $messager.warning('用户未登录');
                    login.show();
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
     * 获取列表样式
     * @param num
     * @returns {*}
     */
    home.listStyle = function (num) {
        num = parseInt(num);
        switch (num%3){
            case 0: return 'list-group-item-info';
            case 1: return 'list-group-item-warning';
            case 2: return 'list-group-item-danger';
            default: return 'list-group-item-info';
        }
    }

    /**
     * 删除好友
     * @param item
     * @param friendVo
     */
    home.deleteFriend = function(item, friendVo){
        $.confirmDialog({
            title: '确定删除好友 <b style="color:#8d8de6;">' + friendVo.user.nickname + '</b>',
            okCall: function(){
                $.ajax({
                    url: 'user/deleteFriend.do',
                    data: {'friendId': friendVo.friend.friendId},
                    type: 'post',
                    dataType: 'json',
                    success: function(result){
                        if(result.msg == 'success'){
                            // 该分组好友数量减1
                            var $badge = item.parents('.friend-group-item').children('.badge');
                            $badge.text(parseInt($badge.text()) - 1);
                            item.slideUp('normal', 'swing', function(){
                                item.remove();
                                $messager.success('删除成功');
                            });
                        } else if(result.msg == 'OFFLINE'){
                            $messager.warning('用户未登录');
                            login.show();
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

    /**
     * 获取好友信息
     * @param friend
     */
    home.getFriendItem = function(friendVo){
        var that = this;
        var $friendItem = $('<li class="list-group-item friend-item"></li>');
        var $row = $('<div class="row"></div>').appendTo($friendItem);

        var img = friendVo.user.portraitPath ? friendVo.user.portraitPath : 'resources/img/header/portrait.jpg';
        $('<div class="col-xs-1 friend-item-portrait"></div>').append($('<img/>').attr('src', img))
            .appendTo($row);

        // 好友信息
        var $friendBox = $('<div class="col-xs-10 friend-box"></div>').appendTo($row);
        $('<div class="col-xs-12"></div>')
            .append($('<a class="friend-info" href="myHome.do?account=' + friendVo.user.account + '" title="TA的主页"></a>').text(friendVo.user.nickname))
            .appendTo($friendBox);

        // TA的分享
        $('<span class="col-xs-7">TA的分享 </span>')
            .append($('<a href="myHome.do?account=' + friendVo.user.account + '" title="查看TA的分享" style="color:#eb7350; text-decoration: none;"></a>')
                .text(friendVo.shareCount)).appendTo($friendBox);

        // 关注
        var $attenBox = $('<span class="col-xs-5"></span>').appendTo($friendBox);
        $('<a href="javascript:void(0);" title="点击关注TA" style="text-decoration: none;">关注TA </a>')
            .append($('<span class="attention-count" style="color:#eb7350;"></span>').text(friendVo.attentionCount)).appendTo($attenBox)
            .on('click', function(){
                $.ajax({
                    url: 'user/addAttention.do',
                    type: 'post',
                    data: {'account': friendVo.user.account},
                    dataType: 'json',
                    success: function(result){
                        if(result.msg == 'success'){
                            $messager.success('关注成功');
                            $attenBox.find('.attention-count').text(parseInt($attenBox.find('.attention-count').text()) + 1);
                        } else if(result.msg == 'AlreadyAttention'){
                            $messager.success('已关注该用户');
                            $('#addAttention').text('取消关注');
                        } else if(result.msg == 'OFFLINE'){
                            $messager.warning('用户未登录');
                            login.show();
                        } else{
                            $messager.error(result.msg);
                        }
                    },
                    error: function(){
                        $messager.warning('服务器出错');
                    }
                }) ;
        });

        // 地区
        $('<span class="col-xs-12"><i class="fa fa-map-marker"></i> </span>')
            .append(friendVo.user.region ? friendVo.user.region : '未知').appendTo($friendBox);

        $row.hover(function(){
            var $opt = $('<div class="fr friend-opt" style="position:absolute;right:0;"></div>');
            // 修改分组
            $('<i class="fa fa-exchange change-group mrg-l-10" id="changeGroup" style="cursor:pointer;" title="修改分组"></i>')
                .on('click', function(){
                    new ChangeGroupDialog(that, $(this), $friendItem, friendVo);
                }).appendTo($opt);
            // 删除好友
            $('<i class="fa fa-trash delete-friend mrg-l-10" style="cursor:pointer;" title="删除好友"></i>')
                .on('click', function(){
                    that.deleteFriend($friendItem, friendVo);
                }).appendTo($opt);
            $row.append($opt);
        }, function(){
            $row.find('.friend-opt').remove();
        });

        return $friendItem;
    }

    /**
     * 分组信息
     * @param group
     * @returns {*|jQuery|HTMLElement}
     */
    home.getFriendGroupItem = function(groupVo, n){
        var that = this;
        // 创建分组
        var $groupItem = $('<li class="list-group-item friend-group-item"></li>');
        $groupItem.addClass(this.listStyle(n));
        $groupItem.attr({'group-num': groupVo.group.num});
        $('<span class="badge" style="background: #98b3da;"></span>').text(groupVo.friendCount).appendTo($groupItem);
        var $tag = $('<i class="fa fa-plus group-tag fr"></i>').appendTo($groupItem);
        var $group = $('<a class="group-name" href="javascript:void(0);"></a>').text(groupVo.group.groupName)
            .appendTo($groupItem);

        if(groupVo.group.num != 0){
            $group.hover(function(){
                $('<i class="fa fa-edit" id="updateGroupName" title="修改分组名称" style="margin-left:20px;"></i>').on('click', function(){
                    new CreateOrUpdateGroupDialog(that, null, $(this), groupVo.group, $group);
                }).appendTo($group);

                $('<i class="fa fa-trash" title="删除分组" style="margin-left:10px;"></i>').on('click', function(){
                    $.confirmDialog({
                        title: '确定删除该分组？',
                        okCall: function(){
                            $.ajax({
                                url: 'user/deleteGroup.do',
                                data: {'groupId': groupVo.group.groupId},
                                type: 'post',
                                async: false,
                                dataType: 'json',
                                success: function(result){
                                    if(result.msg == 'success'){
                                        $groupItem.slideUp('normal', 'swing', function () {
                                            $groupItem.remove();
                                            var defaultGroup = $('.friend-group-item[group-num="0"]');
                                            defaultGroup.children('.badge')
                                                .text(parseInt(defaultGroup.children('.badge').text()) + $groupItem.find('li').size());
                                            $groupItem.find('li').appendTo(defaultGroup.find('.friend-list'));
                                            $messager.success('分组删除成功');
                                        });
                                    } else if(result.msg == 'OFFLINE'){
                                        $messager.warning('用户未登录');
                                        login.show();
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
                }).appendTo($group);
            }, function(){
                $group.find('i').remove();
            });
        }
        var $friendList = $('<ul class="list-group friend-list" style="display:none; margin-bottom:0;"></ul>');

        $friendList.attr({'id':groupVo.group.groupId, 'isinit':0});
        $groupItem.append($friendList);

        // 开启或关闭分组
        $group.on('click', function(){
            // 关闭
            if($tag.hasClass('fa-minus')){
                $tag.removeClass('fa-minus');
                $tag.addClass('fa-plus');
            } else{
                $('.friend-panel').find('.friend-list[id!="' + groupVo.group.groupId + '"]').slideUp();
                $('.group-tag').removeClass('fa-minus');
                $('.group-tag').addClass('fa-plus');
                // 打开
                $tag.removeClass('fa-plus');
                $tag.addClass('fa-minus');
            }

            if($friendList.attr('isinit') == 1){
                $group.next('.friend-list').slideToggle();
            } else{
                // 加载该分组下的好友
                $.ajax({
                    url: 'user/getFriend.do',
                    type: 'post',
                    data: {'groupId': groupVo.group.groupId},
                    dataType: 'json',
                    success: function(result){
                        if(result.msg == 'success'){
                            $friendList.attr('isinit', 1);
                            for(var i in result.friends){
                                $friendList.append(that.getFriendItem(result.friends[i]));
                            }
                            $friendList.slideDown();
                        } else if(result.msg == 'OFFLINE'){
                            $messager.warning('用户未登录');
                            login.show();
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

        return $groupItem;
    }

    /**
     * 获取搜索结果项
     * @param user
     * @returns {*|jQuery|HTMLElement}
     */
    home.getSearchResult = function(user){
        var that = this;
        var $resultItem = $('<div class="search-user-result"></div>');
        var src = user.portraitPath ? user.portraitPath : 'resources/img/header/portrait.jpg';
        $('<img class="search-user-portrait"/>').attr('src', src).appendTo($resultItem);
        $('<a href="myHome.do?account=' + user.account + '" style="margin-left:10px;"></a>').html(user.nickname + '(' + user.account + ')').appendTo($resultItem);

        $resultItem.hover(function(){
            $('<i class="fa fa-plus fr add-user" title="加为好友"></i>').on('click', function(){
                // 添加好友
                var friendVo = that.doAddFriend(user.account);
                var $groupItem = $('.friend-group-item[group-num="0"]');
                $groupItem.find('.badge').text(parseInt($groupItem.find('.badge').text()) + 1);
                if($groupItem.find('ul').attr('isinit') == 1){
                    $groupItem.find('ul').append(that.getFriendItem(friendVo));
                }
                $resultItem.slideUp('normal', 'swing', function(){
                    $resultItem.remove();
                });
            }).appendTo($resultItem);
        }, function(){
            $resultItem.find('.add-user').remove();
        });

        return $resultItem;
    }

    /**
     * 显示搜索结果
     * @param box
     * @param url
     * @param data
     */
    home.showSearchResult = function(box, url, data){
        var that = this;
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            dataType: 'json',
            success: function(result){
                if(result.msg == 'success'){
                    if(result.users.length == 0){
                        box.append($('<div style="text-align: center;margin-top:10px;">没有找到相关结果</div>'));
                    } else{
                        for(var i in result.users){
                            box.append(that.getSearchResult(result.users[i]));
                        }

                        if(result.page.totalPages > data.pageNumber){
                            data.pageNumber = data.pageNumber + 1;
                            $('<div style="text-align:center;cursor:pointer;margin-top:10px;padding-top:10px;border-top:1px solid #ccc;">查看更多</div>').on('click', function(){
                                that.showSearchResult(box, url, data);
                                $(this).remove();
                            }).appendTo(box);
                        }
                    }
                } else if(result.msg == 'OFFLINE'){
                    $messager.warning('用户未登录');
                    login.show();
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
     * 获取关注项
     * @param friendVo
     * @param isAttention
     * @returns {*|jQuery|HTMLElement}
     */
    home.getAttentionItem = function(friendVo, isAttention){
        var that = this;
        var $friendItem = $('<li class="list-group-item friend-item"></li>');
        var $row = $('<div class="row"></div>').appendTo($friendItem);

        var img = friendVo.user.portraitPath ? friendVo.user.portraitPath : 'resources/img/header/portrait.jpg';
        $('<div class="col-xs-1 friend-item-portrait"></div>').append($('<img/>').attr('src', img))
            .appendTo($row);

        // 好友信息
        var $friendBox = $('<div class="col-xs-10 friend-box"></div>').appendTo($row);
        $('<div class="col-xs-12"></div>')
            .append($('<a class="friend-info" href="myHome.do?account=' + friendVo.user.account + '" title="TA的主页"></a>').text(friendVo.user.nickname))
            .appendTo($friendBox);

        // TA的分享
        $('<span class="col-xs-7">TA的分享 </span>')
            .append($('<a href="myHome.do?account=' + friendVo.user.account + '" title="查看TA的分享" style="color:#eb7350; text-decoration: none;"></a>')
                .text(friendVo.shareCount)).appendTo($friendBox);

        // 关注
        var $attenBox = $('<span class="col-xs-5"></span>').appendTo($friendBox);
        if(isAttention){
            // 取消关注
            $('<a href="javascript:void(0);" title="点击取消关注" style="text-decoration: none;">取消关注 </a>')
                .append($('<span class="attention-count" style="color:#eb7350;"></span>').text(friendVo.attentionCount)).appendTo($attenBox)
                .on('click', function(){
                    $.ajax({
                        url: 'user/deleteAttention.do',
                        type: 'post',
                        data: {'account': friendVo.user.account},
                        dataType: 'json',
                        success: function(result){
                            if(result.msg == 'success'){
                                $friendItem.slideUp('normal', 'swing', function(){
                                    $friendItem.remove();
                                    $messager.success('已取消关注');
                                });
                            } else if(result.msg == 'OFFLINE'){
                                $messager.warning('用户未登录');
                                login.show();
                            } else{
                                $messager.error(result.msg);
                            }
                        },
                        error: function(){
                            $messager.warning('服务器出错');
                        }
                    });
                });
        } else{
            // 添加关注
            $('<a href="javascript:void(0);" title="点击关注TA" style="text-decoration: none;">关注TA </a>')
                .append($('<span class="attention-count" style="color:#eb7350;"></span>').text(friendVo.attentionCount)).appendTo($attenBox)
                .on('click', function(){
                    $.ajax({
                        url: 'user/addAttention.do',
                        type: 'post',
                        data: {'account': friendVo.user.account},
                        dataType: 'json',
                        success: function(result){
                            if(result.msg == 'success'){
                                $messager.success('关注成功');
                                $attenBox.find('.attention-count').text(parseInt($attenBox.find('.attention-count').text()) + 1);
                            } else if(result.msg == 'AlreadyAttention'){
                                $messager.success('已关注该用户');
                                $('#addAttention').text('取消关注');
                            } else if(result.msg == 'OFFLINE'){
                                $messager.warning('用户未登录');
                                login.show();
                            } else{
                                $messager.error(result.msg);
                            }
                        },
                        error: function(){
                            $messager.warning('服务器出错');
                        }
                    }) ;
                });
        }

        // 地区
        $('<span class="col-xs-12"><i class="fa fa-map-marker"></i> </span>')
            .append(friendVo.user.region ? friendVo.user.region : '未知').appendTo($friendBox);

        return $friendItem;
    }

    /**
     * 初始化谁关注我
     * @param box
     */
    home.initWhoAttentionMe = function(box){
        var that = this;
        $.ajax({
            url: 'user/getWhoAttentionMe.do',
            data: {'pageNumber': WHO_ATTENTION_NUM},
            type: 'post',
            dataType: 'json',
            success: function(result){
                if(result.msg == 'success'){
                    if(result.friends.length > 0){
                        for(var i in result.friends){
                            box.append(that.getAttentionItem(result.friends[i]));
                        }
                    } else{
                        $('<li style="text-align: center;">暂未被关注</li>')
                            .appendTo(box);
                    }

                    if(result.page.totalPages > WHO_ATTENTION_NUM++){
                        $('<li class="list-group-item" style="text-align:center; cursor:pointer;">点击查看更多 ' +
                            '<i class="fa fa-angle-double-down"></i></li>').on('click', function(){
                            $(this).remove();
                            that.initWhoAttentionMe(box);
                        }).appendTo(box);
                    }
                } else if(result.msg == 'OFFLINE'){
                    $messager.warning('用户未登录');
                    login.show();
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
     * 初始化我关注谁列表
     * @param box
     */
    home.initMeAttentionWho = function(box){
        var that = this;
        $.ajax({
            url: 'user/getMeAttentionWho.do',
            type: 'post',
            data: {'pageNumber': ME_ATTENTION_NUM},
            dataType: 'json',
            success: function(result){
                if(result.msg == 'success'){
                    if(result.friends.length > 0){
                        for(var i in result.friends){
                            box.append(that.getAttentionItem(result.friends[i], true));
                        }
                    } else{
                        $('<li style="text-align: center;">暂无关注的好友</li>')
                            .appendTo(box);
                    }

                    if(result.page.totalPages > ME_ATTENTION_NUM++){
                        $('<li class="list-group-item" style="text-align:center; cursor:pointer;">点击查看更多 ' +
                            '<i class="fa fa-angle-double-down"></i></li>').on('click', function(){
                            $(this).remove();
                            that.initMeAttentionWho(box);
                        }).appendTo(box);
                    }
                } else if(result.msg == 'OFFLINE'){
                    $messager.warning('用户未登录');
                    login.show();
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
     * 显示好友列表
     */
    home.showFriend = function(){
        var that = this;
        $('.myright').find('.share-info, .attention-panel, .friend-panel').remove();
        $('#loadMore').hide();

        // 创建好友信息面板
        var $friendPanel = $('<div class="panel panel-info myright-n friend-panel"></div>').appendTo($('.myright'));
        var $heading = $('<div class="panel-heading">' +
            '我的好友' +
            '<div class="fr">' +
                '<i class="fa fa-refresh refresh-friend mrg-r-10" title="刷新"></i>' +
                '<i class="fa fa-user-plus add-friend" title="添加好友"></i>' +
            '</div>' +
        '</div>').appendTo($friendPanel);
        var $body = $('<div class="panel-body"></div>').appendTo($friendPanel);

        var $firendGroup = $('<ul class="list-group"></ul>').appendTo($body);
        var $createGroup = $('<button class="btn btn-info" id="createGroup"><i class="fa fa-plus"></i> 创建分组</button>').appendTo($body);

        // 刷新
        $heading.find('.refresh-friend').on('click', function(){
            that.showFriend();
        });
        // --添加好友--
        $heading.find('.add-friend').on('click', function(){
            if($('.add-friend-panel').size() == 1){
                $('.add-friend-panel').slideUp('normal', 'swing', function(){
                    $('.add-friend-panel').remove();
                });
            } else{
                // 创建添加面板
                var $addFriendPanel = $('<div class="panel panel-info myright-n friend-panel add-friend-panel" style="display:none;"></div>');
                $('<div class="panel-heading">添加好友</div>')
                    .append($('<i class="fa fa-remove fr" style="cursor:pointer;" title="关闭"></i>').on('click', function(){
                        $addFriendPanel.slideUp('normal', 'swing', function(){
                            $addFriendPanel.remove();
                        });
                    }))
                    .appendTo($addFriendPanel);
                var $addBody = $('<div class="panel-body">' +
                    '<ul class="nav nav-tabs">' +
                        '<li class="active"><a href="#searchAccount" data-toggle="tab">按账号查找</a></li>' +
                        '<li><a href="#searchNickname" data-toggle="tab">按昵称查找</a></li>' +
                    '</ul>' +
                    '<div class="tab-content">' +
                        '<div class="tab-pane fade in active" id="searchAccount">' +
                            '<form><div class="from-group" style="margin-top: 10px;">' +
                                '<div class="col-xs-9 col-sm-10">' +
                                    '<input class="form-control" id="accountValue" required placeholder="请输入账号查找"/>' +
                                '</div>' +
                                '<button class="col-xs-3 col-sm-2 btn btn-primary" id="searchAccountBtn">' +
                                    '<i class="fa fa-search"></i> 查找' +
                                '</button>' +
                            '</div></form>' +
                        '</div>' +
                        '<div class="tab-pane fade" id="searchNickname">' +
                            '<form><div class="from-group" style="margin-top: 10px;">' +
                                '<div class="col-xs-9 col-sm-10">' +
                                    '<input class="form-control" id="nicknameValue" required placeholder="请输入昵称查找"/>' +
                                '</div>' +
                                '<button class="col-xs-3 col-sm-2 btn btn-primary" id="searchNicknameBtn">' +
                                    '<i class="fa fa-search"></i> 查找' +
                                '</button>' +
                            '</div></form>' +
                        '</div>' +
                    '</div>' +
                '</div>').appendTo($addFriendPanel);

                // 禁用表单提交
                $addBody.find('form').submit(function(){return false;});

                // 查找结果
                var $searchResult = $('<div class="col-xs-12 search-result-box"></div>');

                $friendPanel.before($addFriendPanel);
                $addFriendPanel.slideDown();

                // 查找事件
                $addBody.find('#searchAccountBtn').on('click', function(){
                    if($addBody.find('#accountValue').val()){
                        SEARCH_ACCOUNT_NUM = 1;
                        $searchResult.empty();
                        that.showSearchResult($searchResult, 'user/searchAccount.do'
                            , {'account': $addBody.find('#accountValue').val(), 'pageNumber':SEARCH_ACCOUNT_NUM});
                        $searchResult.appendTo($addBody);
                    }
                });

                $addBody.find('#searchNicknameBtn').on('click', function(){
                    if($addBody.find('#nicknameValue').val()){
                        SEARCH_NICKNAME_NUM = 1;
                        $searchResult.empty();
                        that.showSearchResult($searchResult, 'user/searchNickname.do'
                            , {'nickname': $addBody.find('#nicknameValue').val(), 'pageNumber':SEARCH_NICKNAME_NUM});
                        $searchResult.appendTo($addBody);
                    }
                });
            }
        });

        // 初始化分组信息
        $.ajax({
            url: 'user/getGroup.do',
            type: 'post',
            dataType: 'json',
            success: function(result){
                if(result.msg == 'success'){
                    for(var i in result.groups){
                        $firendGroup.append(that.getFriendGroupItem(result.groups[i], i));
                    }
                } else if(result.msg == 'OFFLINE'){
                    $messager.warning('用户未登录');
                    login.show();
                } else{
                    $messager.error(result.msg);
                }
            },
            error: function(){
                $messager.warning('服务器出错');
            }
        });

        // 新建分组
        $createGroup.on('click', function(){
            new CreateOrUpdateGroupDialog(that, $firendGroup, $(this));
        });
    }

    /**
     * 显示关注信息
     */
    home.showAttention = function(){
        ME_ATTENTION_NUM = 1;
        WHO_ATTENTION_NUM = 1;
        var that = this;
        $('.myright').find('.friend-panel, .share-info, .attention-panel').remove();
        $('#loadMore').hide();

        // 创建好友信息面板
        var $attentionPanel = $('<div class="panel panel-info myright-n attention-panel"></div>').appendTo($('.myright'));
        var $heading = $('<div class="panel-heading">我的关注' +
            '<div class="fr"><i class="fa fa-refresh refresh-friend mrg-r-10" title="刷新"></i></div>' +
        '</div>').appendTo($attentionPanel);
        var $body = $('<div class="panel-body">' +
            '<ul class="nav nav-tabs">' +
                '<li class="active"><a id="meAttention" href="#meAttentionWho" data-toggle="tab">我关注谁</a></li>' +
                '<li><a id="whoAttention" href="#whoAttentionMe" data-toggle="tab">谁关注我</a></li>' +
            '</ul>' +
            '<div class="tab-content">' +
                '<div class="tab-pane fade in active" id="meAttentionWho">' +
                    '<ul class="list-group" style="margin:10px 0;list-style:none;"></ul>' +
                '</div>' +
                '<div class="tab-pane fade" id="whoAttentionMe">' +
                    '<ul class="list-group" style="margin:10px 0;list-style:none;"></ul>' +
                '</div>' +
            '</div>' +
        '</div>').appendTo($attentionPanel);

        var $meAttentionWho = $body.find('#meAttentionWho ul');
        var $whoAttentionMe = $body.find('#whoAttentionMe ul');

        $.ajax({
            url: 'user/getAttentionCount.do',
            type: 'post',
            dataType: 'json',
            success: function(result){
                if(result.msg == 'success'){
                    $body.find('#meAttention').append($('<span style="color:#eb7350;"></span>').text(' (' + result.meAttentionWhoCount + ')'));
                    $body.find('#whoAttention').append($('<span style="color:#eb7350;"></span>').text(' (' + result.whoAttentionMeCount + ')'));
                } else if(result.msg == 'OFFLINE'){
                    $messager.warning('用户未登录');
                    login.show();
                } else{
                    $messager.error(result.msg);
                }
            },
            error: function(){
                $messager.warning('服务器出错');
            }
        });

        // 初始化我关注谁
        this.initMeAttentionWho($meAttentionWho);
        this.initWhoAttentionMe($whoAttentionMe);

        // 刷新
        $heading.find('.refresh-friend').on('click', function(){
            that.showAttention();
        });
    }

    /**
     * 显示收藏信息
     */
    home.showCollect = function(){
        $('.myright').find('.friend-panel, .share-info').remove();
        share.initNum();
        share.homeEnt();
        share.loadShareInfo('all', home_acc, 'collect');

        $('#loadMore').show();
        $('.load-more').unbind('click');
        // 点击加载更多分享
        $('.load-more').on('click', function(){
            share.loadShareInfo('all', home_acc, 'collect');
        });
    }

    /**
     * 显示我的分享
     */
    home.showShare = function(){
        $('.myright').find('.friend-panel, .attention-panel, .share-info').remove();
        share.initNum();
        share.homeEnt();
        share.loadShareInfo('all', home_acc, null);

        $('#loadMore').show();
        $('.load-more').unbind('click');
        // 点击加载更多分享
        $('.load-more').on('click', function(){
            share.loadShareInfo('all', home_acc, null);
        });
    }

    /**
     * 添加好友
     * @param account
     */
    home.doAddFriend = function(account){
        var friendVo;
        $.ajax({
            url: 'user/addFriend.do',
            data: {'account': account},
            type: 'post',
            dataType: 'json',
            async: false,
            success: function(result){
                if(result.msg == 'success'){
                    friendVo = result.friendVo;
                    $messager.success('添加成功');
                } else if(result.msg == 'AlreadyFriend'){
                    $messager.success('对方已经是您的好友！');
                } else if(result.msg == 'OFFLINE'){
                    $messager.warning('用户未登录');
                    login.show();
                } else{
                    $messager.error(result.msg);
                }
            },
            error: function(){
                $messager.warning('服务器出错');
            }
        });
        return friendVo;
    }

    /**
     * 初始化事件
     */
    home.initEvent = function(){
        var that = this;

        $('#logout').on('click', that.logout);
        $('#login').on('click', login.show);
        $('#changeData').on('click', that.changeData);
        $('#changePwd').on('click', login.changePwd);

        // 切换nav
        $('.show-home').find('.home-tab a').on('click', function(){
            if(!$(this).parent().hasClass('active')){
                $('.home-tab').removeClass('active');
                $(this).parent().addClass('active');
                if(document.body.clientWidth < 768){
                    $('.navbar-toggle').trigger('click');
                }
                switch ($(this).attr('name')){
                    case 'collect':
                        that.showCollect();
                        break;
                    case 'attention':
                        that.showAttention();
                        break;
                    case 'friend':
                        that.showFriend();
                        break;
                    default:
                        that.showShare();
                }
            }
        });

        $('#addAttention').on('click', function(){
            var url = 'user/addAttention.do';
            if($.trim($('#addAttention').text()) == '取消关注'){
                url = 'user/deleteAttention.do';
            }

            $.ajax({
                url: url,
                data: {'account':home_acc},
                type: 'post',
                dataType: 'json',
                success: function(result){
                    if(result.msg == 'success'){
                        if($.trim($('#addAttention').text()) == '取消关注') {
                            $messager.success('已取消关注');
                            $('#addAttention').text('关注TA');
                        } else if(result.msg == 'OFFLINE'){
                            $messager.warning('用户未登录');
                            login.show();
                        } else{
                            $messager.success('关注成功');
                            $('#addAttention').text('取消关注');
                        }
                    } else if(result.msg == 'AlreadyAttention'){
                        $messager.success('已关注该用户');
                        $('#addAttention').text('取消关注');
                    } else if(result.msg == 'OFFLINE'){
                        $messager.warning('用户未登录');
                        login.show();
                    } else{
                        $messager.error(result.msg);
                    }
                },
                error: function(){
                    $messager.warning('服务器出错');
                }
            });
        });

        // 添加好友
        $('#addFriend').on('click', function(){
            that.doAddFriend(home_acc);
        });

        $('#crop-avatar').hover(function(){
            $('#informUser').show();
        }, function(){
            $('#informUser').hide();
        });

        $('#informUser').on('click', function(){
            new InformUserDialog($(this), $(this).attr('user-id'));
        });
    }

    home.init = function(acc){
        var that = this;
        home_acc = acc;
        this.initEvent();
        login.init();
        setTimeout(function(){
            that.showShare();
        }, 1000);

        share.toTop();
    }

    /**
     * 修改个人资料
     * @param userData
     * @param target
     * @constructor
     */
    var ChangeDataPanel = function(userData, target){
        this.userData = userData;
        this.target = target;
        this.init();
    }

    ChangeDataPanel.prototype = {
        init: function(){
            var that = this;
            var option = {
                title: '修改个人资料',
                saveBtn: false,
                closeBtn: false,
                mode: that.paintComponent()
            };
            this.target.openModalDialog(option);
            this.initUserData();
            this.validator();
        },
        paintComponent: function(){
            var that = this;
            var $html = $('<div><form class="form-horizontal" id="userForm">' +
                '<input id="account" name="account" type="hidden"/>' +
                '<div class="form-group">' +
                    '<label for="name" class="col-xs-4">用户昵称：</label>' +
                    '<div class="col-xs-8">' +
                        '<input class="form-control" id="nickname" name="nickname" placeholder="请输入昵称"/>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="name" class="col-xs-4">真实姓名：</label>' +
                    '<div class="col-xs-8">' +
                        '<input class="form-control" id="name" name="name" placeholder="请输入真实姓名"/>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="phone" class="col-xs-4">手机号码：</label>' +
                    '<div class="col-xs-8">' +
                        '<input class="form-control" id="phone" name="phone" placeholder="请输入手机号码"/>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="email" class="col-xs-4">邮箱：</label>' +
                    '<div class="col-xs-8">' +
                        '<input class="form-control" id="email" type="email" name="email" placeholder="请输入常用邮箱"/>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="region" class="col-xs-4">所在地：</label>' +
                    '<div class="col-xs-8">' +
                        '<input class="form-control" id="region" name="region" placeholder="请填写所在地"/>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="signature" class="col-xs-4">个性签名：</label>' +
                    '<div class="col-xs-8">' +
                        '<textarea class="form-control" id="signature" name="signature" placeholder="请填写个性签名"></textarea>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="notes" class="col-xs-4">个人说明：</label>' +
                    '<div class="col-xs-8">' +
                        '<textarea class="form-control" id="notes" name="notes" placeholder="请填写个人说明"></textarea>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="birthday" class="col-xs-4">出生日期：</label>' +
                    '<div class="col-xs-8">' +
                        '<input class="form-control" type="date" id="birthday" name="birthday" placeholder="请填写出生日期"/>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="constellation" class="col-xs-4">星座：</label>' +
                    '<div class="col-xs-8">' +
                        '<select class="form-control" id="constellation" name="constellation" placeholder="请选择星座">' +
                            '<option value="0">未知</option>' +
                            '<option value="1">水瓶座</option>' +
                            '<option value="2">双鱼座</option>' +
                            '<option value="3">白羊座</option>' +
                            '<option value="4">金牛座</option>' +
                            '<option value="5">双子座</option>' +
                            '<option value="6">巨蟹座</option>' +
                            '<option value="7">狮子座</option>' +
                            '<option value="8">处女座</option>' +
                            '<option value="9">天秤座</option>' +
                            '<option value="10">天蝎座</option>' +
                            '<option value="11">射手座</option>' +
                            '<option value="12">摩羯座</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="hobby" class="col-xs-4">爱好：</label>' +
                    '<div class="col-xs-8">' +
                        '<input class="form-control" id="hobby" name="hobby" placeholder="请填写个人爱好"/>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="bloodType" class="col-xs-4">血型：</label>' +
                    '<div class="col-xs-8">' +
                        '<select class="form-control" id="bloodType" name="bloodType" placeholder="请选择血型">' +
                            '<option value="N">未知</option>' +
                            '<option value="A">A型血</option>' +
                            '<option value="B">B型血</option>' +
                            '<option value="O">O型血</option>' +
                            '<option value="AB">AB型血</option>' +
                            '<option value="OTHER">其他</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="eduInfo" class="col-xs-4">学历信息：</label>' +
                    '<div class="col-xs-8">' +
                        '<select class="form-control" id="eduInfo" name="eduInfo" placeholder="请选择学历信息">' +
                            '<option value="N">未知</option>' +
                            '<option value="A">小学及以下</option>' +
                            '<option value="B">初中</option>' +
                            '<option value="C">高中/中专</option>' +
                            '<option value="D">大学专科</option>' +
                            '<option value="E">大学本科</option>' +
                            '<option value="F">研究生</option>' +
                            '<option value="G">博士及以上</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="graduateInstitutions" class="col-xs-4">毕业院校：</label>' +
                    '<div class="col-xs-8">' +
                        '<input class="form-control" id="graduateInstitutions" name="graduateInstitutions" placeholder="请填写毕业院校"/>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label for="occupation" class="col-xs-4">职业信息：</label>' +
                    '<div class="col-xs-8">' +
                        '<input class="form-control" id="occupation" name="occupation" placeholder="职业信息"/>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<button class="col-xs-offset-1 col-xs-4 btn btn-primary" type="submit" id="saveData">保存</button>' +
                    '<button class="col-xs-offset-2 col-xs-4 btn btn-primary" id="cancelData">取消</button>' +
                '</div>' +
            '</form></div>');

            this.$account = $html.find('#account');
            this.$nickname = $html.find('#nickname');
            this.$name = $html.find('#name');
            this.$phone = $html.find('#phone');
            this.$email = $html.find('#email');
            this.$region = $html.find('#region');
            this.$signature = $html.find('#signature');
            this.$notes = $html.find('#notes');
            this.$birthday = $html.find('#birthday');
            this.$constellation = $html.find('#constellation');
            this.$hobby = $html.find('#hobby');
            this.$bloodType = $html.find('#bloodType');
            this.$eduInfo = $html.find('#eduInfo');
            this.$graduateInstitutions = $html.find('#graduateInstitutions');
            this.$occupation = $html.find('#occupation');

            this.$saveBtn = $html.find('#saveData');
            this.$saveBtn.on('click', function(){
                that.$saveBtn.attr('disabled', 'disabled');
                that.save();
                return false;
            });

            $html.find('#cancelData').on('click', function(){
                that.target.closeDialog();
                return false;
            });

            return $html;
        },
        save: function(){
            var that = this;
            $.ajax({
                url: 'user/changeData.do',
                data: $('#userForm').serialize(),
                type: 'post',
                dataType: 'json',
                success: function(result){
                    if(result.msg == 'success'){
                        $messager.success('修改成功');
                        that.target.closeDialog();
                        setTimeout(function(){
                            window.location.reload();
                        }, 500);
                    } else if(result.msg == 'OFFLINE'){
                        $messager.warning('用户未登录');
                        that.target.closeDialog();
                        login.show();
                    } else{
                        $messager.error(result.msg);
                    }
                    that.$saveBtn.removeAttr('disabled');
                },
                error: function(){
                    $messager.warning('服务器出错');
                }
            });
        },
        /**
         * 用户信息表单验证
         */
        validator: function(){
            $('#userForm').bootstrapValidator({
                message: 'error',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    phone: {
                        validators: {
                            notEmpty: {
                                message: '手机号码不能为空'
                            },
                            regexp: {
                                regexp: /^1[3|5|7|8][0-9]{9}$/,
                                message: '手机号码格式不正确'
                            }
                        }
                    },
                    nickname: {
                        validators: {
                            stringLength: {
                                max: 10,
                                message: '昵称不能超过10个字符'
                            }
                        }
                    },
                    name: {
                        validators: {
                            stringLength: {
                                max: 10,
                                message: '姓名不能超过10个字符'
                            }
                        }
                    },
                    signature: {
                        validators: {
                            stringLength: {
                                max: 50,
                                message: '个性签名不能超过50个字'
                            }
                        }
                    },
                    notes: {
                        validators: {
                            stringLength: {
                                max: 100,
                                message: '个人说明不能超过100个字'
                            }
                        }
                    },
                    graduateInstitutions: {
                        validators: {
                            stringLength: {
                                max: 20,
                                message: '毕业院校不能超过20个字'
                            }
                        }
                    },
                    occupation: {
                        validators: {
                            stringLength: {
                                max: 20,
                                message: '职业信息不能超过20个字'
                            }
                        }
                    }
                }
            }).submit(function(){return false;});
        },
        /**
         * 初始化用户数据
         */
        initUserData: function(){
            var that = this;

            this.$account.val(this.userData.account);
            this.$nickname.val(this.userData.nickname);
            this.$name.val(this.userData.name);
            this.$phone.val(this.userData.phone);
            this.$email.val(this.userData.email);
            this.$birthday.val(this.userData.birthday ? comm.getTime(this.userData.birthday, 'yyyy-MM-dd') : '');
            this.$constellation.val(this.userData.constellation);
            this.$graduateInstitutions.val(this.userData.graduateInstitutions);
            this.$hobby.val(this.userData.hobby);
            this.$notes.val(this.userData.notes);
            this.$occupation.val(this.userData.occupation);
            this.$region.val(this.userData.region);
            this.$signature.val(this.userData.signature);
            this.$bloodType.find('option').each(function(){
                if($(this).val() == that.userData.bloodType){
                    $(this).attr('selected', 'selected');
                }
            });
            this.$eduInfo.find('option').each(function(){
                if($(this).val() == that.userData.eduInfo){
                    $(this).attr('selected', 'selected');
                }
            });
        },
    }

    /**
     * 创建分组
     * @param instance
     * @param box
     * @param target
     * @param groupData
     * @constructor
     */
    var CreateOrUpdateGroupDialog = function(instance, box, target, groupData, item){
        this.instance = instance;
        this.box = box;
        this.target = target;
        this.groupData = groupData;
        this.item = item;
        this.init();
    }

    CreateOrUpdateGroupDialog.prototype = {
        init: function(){
            var that = this;
            var option = {
                title: that.groupData? '修改分组名称' : '创建分组',
                saveBtn: false,
                closeBtn: false,
                width: 300,
                mode: that.paintComponent()
            };
            this.target.openModalDialog(option);
            this.validator();
            if(this.groupData){
                this.initData();
            }
        },
        paintComponent: function(){
            var that = this;
            var $html = $('<div><form class="form-horizontal" id="createGroupForm">' +
                '<div class="form-group">' +
                    '<div class="col-xs-offset-1 col-xs-10">' +
                        '<input class="form-control" id="groupName" name="groupName" placeholder="请输入分组名称"/>' +
                    '</div>' +
                '</div>' +
                '<div class="form-group">' +
                    '<button class="col-xs-offset-2 col-xs-3 btn btn-primary" id="okBtn" disabled type="submit">确定</button>' +
                    '<button class="col-xs-offset-2 col-xs-3 btn btn-primary" id="cancelBtn">取消</button>' +
                '</div>' +
            '</form></div>');

            this.$groupName = $html.find('#groupName');
            this.$okBtn = $html.find('#okBtn');
            this.$okBtn.on('click', function(){
                that.$okBtn.attr('disabled', 'disabled');
                that.save();
                return false;
            });

            $html.find('#cancelBtn').on('click', function(){
                that.target.closeDialog();
                return false;
            });

            return $html;
        },
        validator: function(){
            $('#createGroupForm').bootstrapValidator({
                message: 'error',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    groupName: {
                        validators: {
                            notEmpty: {
                                message: '分组名称不能为空'
                            },
                            stringLength: {
                                max: 20,
                                message: '分组名称不能超过20个字符'
                            }
                        }
                    }
                }
            }).submit(function(){return false;});
        },
        initData: function(){
            // 初始化分组名称
            this.$groupName.val(this.groupData.groupName);
        },
        save: function(){
            var that = this;

            var url = 'user/createGroup.do';
            var data = {'groupName': that.$groupName.val()};

            // 包装数据
            if(this.groupData){
                url = 'user/updateGroup.do';
                data.groupId = this.groupData.groupId;
            }

            $.ajax({
                url: url,
                type: 'post',
                data: data,
                dataType: 'json',
                success: function(result){
                    if(result.msg == 'success'){
                        if(!that.groupData){
                            that.box.append(that.instance.getFriendGroupItem(result.groupVo, 0));
                            $messager.success('分组创建成功');
                        } else{
                            that.item.text(result.group.groupName);
                            $messager.success('修改成功');
                        }
                        that.target.closeDialog();
                    } else if(result.msg == 'OFFLINE'){
                        $messager.warning('用户未登录');
                        that.target.closeDialog();
                        login.show();
                    } else{
                        $messager.error(result.msg);
                    }
                    that.$okBtn.removeAttr('disabled');
                },
                error: function(){
                    $messager.warning('服务器出错');
                }
            });
        }
    }

    /**
     * 修改好友分组
     * @param instance
     * @param target
     * @param item
     * @param friendVo
     * @constructor
     */
    var ChangeGroupDialog = function(instance, target, item, friendVo){
        this.instance = instance;
        this.target = target;
        this.item = item;
        this.friendVo = friendVo;
        this.init();
        this.initData();
    }

    ChangeGroupDialog.prototype = {
        init: function(){
            var that = this;
            var option = {
                title: '修改好友分组',
                saveBtn: false,
                closeBtn: false,
                width: 300,
                mode: that.paintComponent()
            };
            this.target.openModalDialog(option);
            this.initData();
        },
        paintComponent: function(){
            var that = this;
            var $html = $(
                '<div class="row">' +
                    '<div class="col-xs-offset-1 col-xs-10">' +
                        '<select class="form-control" id="groupId" placeholder="请选择分组"></select>' +
                    '</div>' +
                '</div>' +
                '<div class="row" style="margin-top:20px;">' +
                    '<button class="col-xs-offset-2 col-xs-3 btn btn-primary" id="okBtn">确定</button>' +
                    '<button class="col-xs-offset-2 col-xs-3 btn btn-primary" id="cancelBtn">取消</button>' +
                '</div>');

            this.$groupBox = $html.find('#groupId');
            this.$okBtn = $html.find('#okBtn');
            this.$okBtn.on('click', function(){
                that.$okBtn.attr('disabled', 'disabled');
                that.save();
                return false;
            });

            $html.find('#cancelBtn').on('click', function(){
                that.target.closeDialog();
                return false;
            });

            return $html;
        },
        save: function(){
            var that = this;
            $.ajax({
                url: 'user/changeGroup.do',
                data: {'friendId': that.friendVo.friend.friendId, 'groupId':that.$groupBox.val()},
                type: 'post',
                dataType: 'json',
                success: function(result){
                    if(result.msg == 'success'){
                        // 与原来分组一样
                        if(that.$groupBox.val() != that.friendVo.friend.groupId){
                            $('.friend-list').each(function(){
                                var box = $(this);
                                // 判断该分组是否已加载
                                if(box.attr('id') == that.$groupBox.val()){
                                    var num = parseInt(that.item.parents('.friend-group-item').children('.badge').text());
                                    that.item.parents('.friend-group-item').children('.badge').text(num - 1);
                                    box.parent().children('.badge').text(parseInt(box.parent().children('.badge').text()) + 1);
                                    if(box.attr('isinit') == 0){
                                        that.item.slideUp('normal', 'swing', function(){
                                            that.item.remove();
                                        });
                                    } else{
                                        that.item.slideUp('normal', 'swing', function(){
                                            box.append(that.instance.getFriendItem(that.friendVo));
                                            that.item.remove();
                                        });
                                    }
                                    return false;
                                }
                            });
                        }

                        $messager.success('分组修改成功');
                        that.target.closeDialog();
                    } else if(result.msg == 'OFFLINE'){
                        $messager.warning('用户未登录');
                        login.show();
                    } else{
                        $messager.error(result.msg);
                    }
                    that.$okBtn.removeAttr('disabled');
                },
                error: function(){
                    $messager.warning('服务器出错');
                }
            });
        },
        initData: function(){
            var that = this;
            $.ajax({
                url: 'user/getGroup.do',
                type: 'post',
                dataType: 'json',
                success: function(result){
                    if(result.msg == 'success'){
                        that.$groupBox.empty();
                        for(var i in result.groups){
                            var opt = $('<option></option>').val(result.groups[i].group.groupId)
                                .text(result.groups[i].group.groupName);
                            if(result.groups[i].group.groupId == that.friendVo.friend.groupId){
                                opt.attr({'selected': 'selected'});
                            }
                            opt.appendTo(that.$groupBox);
                        }
                    } else if(result.msg == 'OFFLINE'){
                        $messager.warning('用户未登录');
                        login.show();
                    } else{
                        $messager.error(result.msg);
                    }
                },
                error: function(){
                    $messager.warning('服务器出错');
                }
            });
        }
    }

    /**
     * 举报用户
     * @param target
     * @param userId
     * @constructor
     */
    var InformUserDialog = function(target, userId){
        this.target = target;
        this.userId = userId;
        this.init();
    }

    InformUserDialog.prototype = {
        init: function(){
            var that = this;
            var option = {
                title: '举报',
                saveBtn: false,
                closeBtn: false,
                mode: that.paintComponent()
            };
            this.target.openModalDialog(option);
        },
        paintComponent: function(){
            var that = this;
            var $html = $(
                '<div class="row">' +
                    '<div class="col-xs-12">' +
                        '<textarea class="form-control" id="informContent" name="informContent"' +
                            'placeholder="请填写举报内容" required></textarea>' +
                    '</div>' +
                '</div>' +
                '<div class="row" style="margin-top:20px;">' +
                    '<div class="col-xs-12">' +
                        '<button class="btn btn-primary fr" style="width:80px;" id="cancelBtn">取消</button>' +
                        '<button class="btn btn-primary fr mrg-r-10" style="width:80px;" id="okBtn">确定</button>' +
                    '</div>' +
                '</div>');

            this.$informContent = $html.find('#informContent');
            that.$okBtn = $html.find('#okBtn');
            $html.find('#okBtn').on('click', function(){
                that.$okBtn.attr('disabled', 'disabled');
                if(!that.$informContent.val()){
                    $messager.warning('举报内容不能为空！');
                    that.$okBtn.removeAttr('disabled');
                } else if(that.$informContent.val().length > 50){
                    $messager.warning('举报内容不能超过50个字符！');
                } else{
                    $.ajax({
                        url: 'user/informUser.do',
                        type: 'post',
                        data: {'buserId': that.userId, 'informContent': that.$informContent.val()},
                        dataType: 'json',
                        success: function(result){
                            if(result.msg == 'success'){
                                $messager.success('举报成功！');
                                that.target.closeDialog();
                            } else if(result.msg == 'OFFLINE'){
                                $messager.warning('用户未登录');
                                login.show();
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

            $html.find('#cancelBtn').on('click', function(){
                that.target.closeDialog();
            });

            return $html;
        }
    }

    return home;
});