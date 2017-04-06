/**
 * Created by BIN on 2017/4/3.
 */
define(['qshare/login', 'qshare/index', 'utils/messager', 'utils/common', 'utils/app-dialog', 'bootstrap', 'bootstrapValidator'],
    function(login, share, $messager, comm){
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
     * 显示收藏信息
     */
    home.showCollect = function(){
        $('.myright').find('.share-info').remove();
        share.initNum();
        share.loadShareInfo('all', home_acc, 'collect');

        $('#loadMore').show();
        $('.load-more').unbind('click');
        // 点击加载更多分享
        $('.load-more').on('click', function(){
            share.loadShareInfo('all', home_acc, 'collect');
        });
    }

    /**
     * 显示关注信息
     */
    home.showAttention = function(){
        $('.myright').find('.share-info').remove();
        $('#loadMore').hide();
    }

    /**
     * 显示好友列表
     */
    home.showFriend = function(){
        $('.myright').find('.share-info').remove();
        $('#loadMore').hide();
    }

    /**
     * 显示我的分享
     */
    home.showShare = function(){
        $('.myright').find('.share-info').remove();
        share.initNum();
        share.loadShareInfo('all', home_acc);

        $('#loadMore').show();
        $('.load-more').unbind('click');
        // 点击加载更多分享
        $('.load-more').on('click', function(){
            share.loadShareInfo('all', home_acc);
        });
    }

    home.initEvent = function(){
        var that = this;

        $('#logout').on('click', that.logout);
        $('#login').on('click', login.show);
        $('#changeData').on('click', that.changeData);
        $('#changePwd').on('click', login.changePwd);

        // 切换nav
        $('.show-home').find('.home-tab a').on('click', function(){
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
                        '<input class="form-control" id="constellation" name="constellation" placeholder="请选择星座"/>' +
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

            $html.find('#saveData').on('click', function(){
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
                        }, 300);
                    } else if(result.msg == 'OFFLINE'){
                        $messager.warning('用户未登录');
                        that.target.closeDialog();
                        login.show();
                    } else{
                        $messager.error(result.msg);
                    }
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
                                regexp: /^1[3|4|5|7|8][0-9]{9}$/,
                                message: '手机号码格式不正确'
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
            this.$birthday.val(comm.getTime(this.userData.birthday, 'yyyy-MM-dd'));
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

    return home;
});