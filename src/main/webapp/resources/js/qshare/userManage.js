/**
 * Created by BIN on 2017/4/11.
 */
define(['utils/messager', 'utils/common', 'qshare/content', 'jquery/jquery.Paginator.min', 'bootstrap'],
    function($messager, comm){
    var um = {
        USER_TYPE: '',
        USER_STATUS: '',
        SEARCH_TEXT: ''
    };

    /**
     * 渲染分页
     */
    um.loadpage = function(page) {
        var that = this;
        $.jqPaginator('#pagination', {
            totalPages: parseInt(page.totalPages ? page.totalPages : 1),
            visiblePages: 10, // 最多可以显示的页码数
            currentPage: page.pageNumber ? page.pageNumber : 1,
            first: '<li class="first"><a href="javascript:void(0);" title="首页"><i class="fa fa-angle-double-left"></i></a></li>',
            prev: '<li class="prev"><a href="javascript:void(0);" title="上一页"><i class="fa fa-angle-left"></i></a></li>',
            next: '<li class="next"><a href="javascript:void(0);" title="下一页"><i class="fa fa-angle-right"></i></a></li>',
            last: '<li class="last"><a href="javascript:void(0);" title="末页"><i class="fa fa-angle-double-right"></i></a></li>',
            page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
            onPageChange: function (num, type) {
                if (type == "change") {
                    that.loadData(num);
                }
            }
        });
    }

    /**
     * 分页加载数据
     * @param num
     */
    um.loadData = function(num) {
        var that = this;
        $.ajax({
            url: 'user/getAllUserByPage.do',
            type: 'post',
            data: {'account': um.SEARCH_TEXT, 'userType': um.USER_TYPE, 'status': um.USER_STATUS,
                'pageNumber': num, 'pageSize': $('#PageSize').val()},
            dataType: 'json',
            success: function(result){
                if(result.msg == 'success'){
                    $('#userDataBox').empty();
                    for(var i in result.users){
                        $('#userDataBox').append(that.getUserItem(result.users[i], result.currUser));
                    }
                    // 加载分页
                    that.loadpage(result.page);
                } else if(result.msg == 'OFFLINE'){
                    location.href = 'redirectIndex.do';
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
     * 锁定用户
     * @param $item
     * @param user
     * @param currUser
     */
    um.lockUser = function($item, user, currUser, isHome){
        new LockUserDialog(this, $item, user, currUser, isHome);
    }

    /**
     * 解锁用户
     * @param $item
     * @param user
     * @param currUser
     */
    um.unlockUser = function($item, user, currUser, isHome){
        var that = this;
        $.confirmDialog({
            title: '确定解锁用户 <b style="color:#6a8fd4;">' + user.nickname + '</b>',
            okCall: function(){
                $.ajax({
                    url: 'manage/unlockUser.do',
                    data: {'userId': user.userId},
                    type: 'post',
                    dataType: 'json',
                    success: function(result){
                        if(result.msg == 'success'){
                            $messager.success('解锁成功');
                            if(!isHome){
                                $item.unbind(); // 解绑事件
                                $item.find('.status').html('<i class="fa fa-futbol-o mrg-r-10"></i>离线');
                                animationHover($item, 'pulse', function(){
                                    if(currUser.userType == 'SUPERADMIN' && result.user.userType != 'SUPERADMIN'){
                                        if(result.user.userType == 'NORMAL'){
                                            $('<i class="fa fa-user-md fr set-admin-user" style="cursor:pointer;margin:5px 10px 0 0;" title="设置为管理员"></i>').on('click', function(){
                                                that.addAdmin($item, result.user, currUser);
                                            }).prependTo($item);
                                        } else if(user.userType == 'ADMIN'){
                                            $('<i class="fa fa-user-times fr set-admin-user" style="cursor:pointer;margin:5px 10px 0 0;" title="取消管理员"></i>').on('click', function(){
                                                that.cancelAdmin($item, result.user, currUser);
                                            }).prependTo($item);
                                        }
                                    }
                                    $('<i class="fa fa-lock fr lock-user" style="cursor:pointer;margin:5px 10px 0 0;" title="锁定用户"></i>').on('click', function(){
                                        that.lockUser($item, result.user, currUser);
                                    }).prependTo($item);
                                }, function(){
                                    $item.find('.lock-user, .set-admin-user').remove();
                                });
                            }
                        } else if(result.msg == 'OFFLINE') {
                            $messager.warning('用户未登录');
                            window.location.href = 'index.do';
                        } else {
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
     * 设置为管理员
     * @param $item
     * @param user
     * @param currUser
     */
    um.addAdmin = function($item, user, currUser){
        var that = this;
        $.confirmDialog({
            title: '确定将用户 <b style="color:#6a8fd4;">' + user.nickname + '</b> 设置为管理员',
            okCall: function(){
                $.ajax({
                    url: 'manage/addAdmin.do',
                    type: 'post',
                    data: {'userId':user.userId},
                    dataType: 'json',
                    success: function(result){
                        if(result.msg == 'success'){
                            $item.find('.user-nickname').text(result.user.nickname + '(管理员)');
                            $item.unbind(); // 解绑事件
                            animationHover($item, 'pulse', function(){
                                if(currUser.userType == 'SUPERADMIN' && result.user.userType != 'SUPERADMIN'){
                                    $('<i class="fa fa-user-times fr set-admin-user" style="cursor:pointer;margin:5px 10px 0 0;" title="取消管理员"></i>').on('click', function(){
                                        that.cancelAdmin($item, result.user, currUser);
                                    }).prependTo($item);
                                }
                                if(result.user.status == 'LOCK'){
                                    $('<i class="fa fa-unlock fr lock-user" style="cursor:pointer;margin:5px 10px 0 0;" title="解锁用户"></i>').on('click', function(){
                                        that.unlockUser($item, result.user, currUser);
                                    }).prependTo($item);
                                } else{
                                    $('<i class="fa fa-lock fr lock-user" style="cursor:pointer;margin:5px 10px 0 0;" title="锁定用户"></i>').on('click', function(){
                                        that.lockUser($item, result.user, currUser);
                                    }).prependTo($item);
                                }
                            }, function(){
                                $item.find('.lock-user, .set-admin-user').remove();
                            });
                            $messager.success('已设置为管理员');
                        } else if(result.msg == 'OFFLINE') {
                            $messager.warning('用户未登录');
                            window.location.href = 'index.do';
                        } else {
                            $messager.error(result.msg);
                        }
                    },
                    error: function(){
                        $messager.warning('服务器出错')
                    }
                });
            }
        });
    }

    /**
     * 取消管理员
     * @param $item
     * @param user
     * @param currUser
     */
    um.cancelAdmin = function($item, user, currUser){
        var that = this;
        $.confirmDialog({
            title: '确定取消用户 <b style="color:#6a8fd4;">' + user.nickname + '</b> 的管理员权限',
            okCall: function(){
                $.ajax({
                    url: 'manage/cancelAdmin.do',
                    type: 'post',
                    data: {'userId':user.userId},
                    dataType: 'json',
                    success: function(result){
                        if(result.msg == 'success'){
                            $item.find('.user-nickname').text(result.user.nickname);
                            $item.unbind(); // 解绑事件
                            animationHover($item, 'pulse', function(){
                                if(currUser.userType == 'SUPERADMIN' && result.user.userType != 'SUPERADMIN'){
                                    $('<i class="fa fa-user-md fr set-admin-user" style="cursor:pointer;margin:5px 10px 0 0;" title="设置为管理员"></i>').on('click', function(){
                                        that.addAdmin($item, result.user, currUser);
                                    }).prependTo($item);
                                }
                                if(result.user.status == 'LOCK'){
                                    $('<i class="fa fa-unlock fr lock-user" style="cursor:pointer;margin:5px 10px 0 0;" title="解锁用户"></i>').on('click', function(){
                                        that.unlockUser($item, result.user, currUser);
                                    }).prependTo($item);
                                } else{
                                    $('<i class="fa fa-lock fr lock-user" style="cursor:pointer;margin:5px 10px 0 0;" title="锁定用户"></i>').on('click', function(){
                                        that.lockUser($item, result.user, currUser);
                                    }).prependTo($item);
                                }
                            }, function(){
                                $item.find('.lock-user, .set-admin-user').remove();
                            });
                            $messager.success('已取消管理员权限');
                        } else if(result.msg == 'OFFLINE') {
                            $messager.warning('用户未登录');
                            window.location.href = 'index.do';
                        } else {
                            $messager.error(result.msg);
                        }
                    },
                    error: function(){
                        $messager.warning('服务器出错')
                    }
                });
            }
        });
    }

    /**
     * 包装用户数据
     * @param user
     * @param currUser
     * @returns {*|jQuery|HTMLElement}
     */
    um.getUserItem = function(user, currUser){
        var that = this;
        var $item = $('<div class="col-sm-4">' +
            '<div class="contact-box">' +
                '<a href="javascript:void(0);">' +
                    '<div class="col-sm-4">' +
                        '<div class="text-center">' +
                            '<div class="user-portrait-box">' +
                                '<img alt="image" class="img-circle m-t-xs img-responsive user-portrait" ' +
                                    'src="resources/img/portrait.jpg">' +
                            '</div>' +
                            '<div class="m-t-xs font-bold user-acc"></div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-sm-8">' +
                        '<a class="to-home" title="查看TA的主页" href="myHome.do?account='+ user.account +'" target="_blank">' +
                            '<strong class="user-nickname"></strong>' +
                        '</a>' +
                        '<p class="region"><i class="fa fa-map-marker"></i>&nbsp;</p>' +
                        '<address>' +
                        '</address>' +
                    '</div>' +
                    '<div class="clearfix"></div>' +
                '</a>' +
            '</div>' +
        '</div>');

        if(user.portraitPath){
            $item.find('.user-portrait').attr({'src':user.portraitPath});
        }
        $item.find('.user-acc').text(user.account);
        if(user.userType == 'ADMIN'){
            $item.find('.user-nickname').text(user.nickname + '(管理员)');
        } else if(user.userType == 'SUPERADMIN'){
            $item.find('.user-nickname').text(user.nickname + '(超级管理员)');
        } else{
            $item.find('.user-nickname').text(user.nickname);
        }

        // 用户基本数据
        $item.find('.occupation').text('职业：' + (user.occupation ? user.occupation : '未知'));
        $item.find('.region').append(user.region ? user.region : '未知');
        $item.find('address').append($('<div class="status"></div>').html('<i class="fa fa-futbol-o mrg-r-10"></i>'
            + (user.status == 'OFFLINE'? '离线' : (user.status == 'ONLINE' ?
                '<span style="color:#00e;">在线</span>'
                : '<span style="color:#e00;cursor:pointer;" title="' + comm.getTime(user.unlockTime) + ' 解锁">锁定</span>'))));
        $item.find('address').append($('<div title="真实姓名"></div>').html('<i class="fa fa-user mrg-r-10"></i>' + (user.name ? user.name : '未知')));
        $item.find('address').append($('<div title="电子邮箱"></div>').html('<i class="fa fa-envelope mrg-r-10"></i>' + (user.email ? user.email : '未知')));
        $item.find('address').append($('<div title="联系方式"></div>').html('<i class="fa fa-phone mrg-r-10"></i>' + (user.phone ? user.phone : '未知')));
        $item.find('address').append($('<div title="最近登录时间"></div>').html('<i class="fa fa-clock-o mrg-r-10"></i>' + comm.getTime(user.lastTime)));

        if(currUser.userType == 'SUPERADMIN' || (currUser.userType == 'ADMIN' && user.userType == 'NORMAL')){
            // 事件
            animationHover($item, 'pulse', function(){
                if(currUser.userType == 'SUPERADMIN' && user.userType != 'SUPERADMIN'){
                    if(user.userType == 'NORMAL'){
                        $('<i class="fa fa-user-md fr set-admin-user" style="cursor:pointer;margin:5px 10px 0 0;" title="设置为管理员"></i>').on('click', function(){
                            that.addAdmin($item, user, currUser);
                        }).prependTo($item);
                    } else if(user.userType == 'ADMIN'){
                        $('<i class="fa fa-user-times fr set-admin-user" style="cursor:pointer;margin:5px 10px 0 0;" title="取消管理员"></i>').on('click', function(){
                            that.cancelAdmin($item, user, currUser);
                        }).prependTo($item);
                    }
                }
                if(user.status == 'LOCK'){
                    $('<i class="fa fa-unlock fr lock-user" style="cursor:pointer;margin:5px 10px 0 0;" title="解锁用户"></i>').on('click', function(){
                        that.unlockUser($item, user, currUser);
                    }).prependTo($item);
                } else{
                    $('<i class="fa fa-lock fr lock-user" style="cursor:pointer;margin:5px 10px 0 0;" title="锁定用户"></i>').on('click', function(){
                        that.lockUser($item, user, currUser);
                    }).prependTo($item);
                }
            }, function(){
                $item.find('.lock-user,.set-admin-user').remove();
            });
        } else{
            animationHover($item, 'pulse');
        }

        return $item;
    }

    um.initEvent = function(){
        var that = this;
        // 搜索用户
        $('#searchUserBox .user-search-text').keydown(function(){
            um.SEARCH_TEXT = $('#searchUserBox').find('.user-search-text').val();
            that.loadData(1);
        });
        $('#searchBtn').on('click', function(){
            um.SEARCH_TEXT = $('#searchUserBox').find('.user-search-text').val();
            that.loadData(1);
        });

        // 用户类型搜索
        $('#userTypeSelect').on('change', function(){
            um.USER_TYPE = $(this).val();
            that.loadData(1);
        });

        // 状态搜索
        $('#statusSelect').on('change', function(){
            um.USER_STATUS = $(this).val();
            that.loadData(1);
        });
    }

    /**
     * 初始化函数
     */
    um.init = function(){
        // 初始化第一页数据
        this.loadData(1);
        this.initEvent();
    }

    // 弹窗
    var LockUserDialog = function(instance, item, user, currUser, isHome){
        this.instance = instance;
        this.item = item;
        this.target = item;
        this.user = user;
        this.currUser = currUser;
        this.isHome = isHome;
        this.init();
    }

    LockUserDialog.prototype = {
        init: function(){
            var that = this;
            var option = {
                title: '锁定用户',
                saveBtn: false,
                closeBtn: false,
                width: 300,
                mode: that.paintComponent()
            }
            this.target.attr('id', 'lockTime');
            this.target.openModalDialog(option);
        },
        paintComponent: function(){
            var that = this;
            var $html = $('<div class="row">' +
                '<div class="col-xs-12">' +
                    '<select class="form-control" id="lockTime" value="24" placeholder="请选择锁定时间">' +
                        '<option value="24">1天</option>' +
                        '<option value="72">3天</option>' +
                        '<option value="168">7天</option>' +
                        '<option value="360">15天</option>' +
                        '<option value="720">1个月</option>' +
                        '<option value="2208">3个月</option>' +
                        '<option value="4392">6个月</option>' +
                        '<option value="8760">1年</option>' +
                    '</select>' +
                '</div>' +
            '</div>' +
            '<div class="row" style="margin-top:20px;">' +
                '<div class="col-xs-12">' +
                    '<button class="btn btn-primary fr" style="width:80px;" id="cancelBtn">取消</button>' +
                    '<button class="btn btn-primary fr mrg-r-10" style="width:80px;" id="okBtn">确定</button>' +
                '</div>' +
            '</div>');

            $html.find('#okBtn').on('click', function(){
                $.ajax({
                    url: 'manage/lockUser.do',
                    data: {'userId': that.user.userId, 'time': $html.find('#lockTime').val()},
                    type: 'post',
                    dataType: 'json',
                    success: function(result){
                        if(result.msg == 'success'){
                            $messager.success('锁定成功');
                            if(!that.isHome){
                                that.item.unbind(); // 解绑事件
                                that.item.find('.status').html('<i class="fa fa-futbol-o mrg-r-10"></i><span style="color:#e00;cursor:pointer;" title="' + comm.getTime(result.user.unlockTime) + ' 解锁">锁定</span>');
                                animationHover(that.item, 'pulse', function(){
                                    if(that.currUser.userType == 'SUPERADMIN' && result.user.userType != 'SUPERADMIN'){
                                        if(result.user.userType == 'NORMAL'){
                                            $('<i class="fa fa-user-md fr set-admin-user" style="cursor:pointer;margin:5px 10px 0 0;" title="设置为管理员"></i>').on('click', function(){
                                                that.instance.addAdmin(that.item, result.user, that.currUser);
                                            }).prependTo(that.item);
                                        } else if(result.user.userType == 'ADMIN'){
                                            $('<i class="fa fa-user-times fr set-admin-user" style="cursor:pointer;margin:5px 10px 0 0;" title="取消管理员"></i>').on('click', function(){
                                                that.instance.cancelAdmin(that.item, result.user, that.currUser);
                                            }).prependTo(that.item);
                                        }
                                    }
                                    $('<i class="fa fa-unlock fr lock-user" style="cursor:pointer;margin:5px 10px 0 0;" title="解锁用户"></i>').on('click', function(){
                                        that.instance.unlockUser(that.item, result.user, that.currUser);
                                    }).prependTo(that.item);
                                }, function(){
                                    that.item.find('.lock-user, .set-admin-user').remove();
                                });
                                that.target.removeAttr('id');
                            }
                            that.target.closeDialog();
                        } else if(result.msg == 'OFFLINE') {
                            $messager.warning('用户未登录');
                            window.location.href = 'index.do';
                        } else {
                            $messager.error(result.msg);
                        }
                    },
                    error: function(){
                        $messager.warning('服务器出错');
                    }
                });
            });

            $html.find('#cancelBtn').on('click', function(){
                that.target.closeDialog();
                that.target.removeAttr('id');
            });

            return $html;
        }
    }

    return um;
})