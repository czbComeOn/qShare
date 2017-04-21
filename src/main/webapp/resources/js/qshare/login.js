/**
 * 初始化登录组件
 * Created by BIN on 2017/4/4.
 */
define(['utils/messager', 'bootstrap', 'bootstrapValidator', 'utils/app-dialog'], function($messager){
    var login = {};

    /**
     * 开启验证信息
     */
    login.validator = function(){
        // 登录验证信息
        $('#loginForm').bootstrapValidator({
            message: '登录信息无效',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                account: {
                    validators: {
                        notEmpty: {
                            message: '账号不能为空'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z][a-zA-Z0-9]*$/,
                            message: '账号只能由数字和字母组成，且不能以数字开头'
                        },
                        stringLength: {
                            min: 3,
                            max: 18,
                            message: '账号必须3-18个字符'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        stringLength: {
                            min: 3,
                            max: 18,
                            message: '密码必须3-18个字符'
                        },
                        different: {
                            field: 'account',
                            message: '密码不能与账号相同'
                        }
                    }
                }
            }
        }).submit(function () {return false});

        // 注册信息验证
        $('#registerForm').bootstrapValidator({
            message: '注册信息无效',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                rAccount: {
                    validators: {
                        notEmpty: {
                            message: '账号不能为空'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z][a-zA-Z0-9]*$/,
                            message: '账号只能由数字和字母组成，且不能以数字开头'
                        },
                        stringLength: {
                            min: 3,
                            max: 18,
                            message: '账号必须3-18个字符'
                        },
                        remote: {
                            url: 'checkUser.do',
                            message: '账号已存在',
                            type: 'POST'
                        }
                    }
                },
                rPassword: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        stringLength: {
                            min: 3,
                            max: 18,
                            message: '密码必须3-18个字符'
                        },
                        different: {
                            field: 'rAccount',
                            message: '密码不能与账号相同'
                        }
                    }
                },
                againPassword: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        stringLength: {
                            min: 3,
                            max: 18,
                            message: '密码必须3-18个字符'
                        },
                        different: {
                            field: 'rAccount',
                            message: '密码不能与账号相同'
                        },
                        identical: {
                            field: 'rPassword',
                            message: '两次输入的密码不一样'
                        }
                    }
                }
            }
        }).submit(function () {return false});

        // 密码重置验证
        $('#resetPwdForm').bootstrapValidator({
            message: '密码重置无效',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                phoneNum: {
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
                resetAccount: {
                    validators: {
                        notEmpty: {
                            message: '账号不能为空'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z][a-zA-Z0-9]*$/,
                            message: '账号只能由数字和字母组成，且不能以数字开头'
                        },
                        stringLength: {
                            min: 3,
                            max: 18,
                            message: '账号必须3-18个字符'
                        }
                    }
                }
            }
        }).submit(function () {return false});
    }

    /**
     * 显示登录弹窗
     */
    login.show = function(){
        $('.login-box-all').css('margin-left', '0');
        $('.login-box-show').parent().show();
        $('.login-box-show').slideDown();
        $('.login-box-all').find('form').each(function () {
            this.reset();
            $(this).find('i').hide();
            $(this).find('button[type="submit"]').attr('disabled', 'disabled');
        });
    }

    /**
     * 登录验证
     */
    login.login = function(){
        $('#loginBtn').attr('disabled', 'disabled');
        if(!$('#account').val()){
            $('#loginBtn').removeAttr('disabled');
            $messager.warning('账号不能为空');
        } else if(!$('#password').val()){
            $('#loginBtn').removeAttr('disabled');
            $messager.warning('密码不能为空');
        } else{
            // 提交登录信息
            $.ajax({
                url: 'login.do',
                data: {'account':$('#account').val(), 'password':$('#password').val()},
                dataType: 'json',
                type: 'post',
                success: function(result){
                    if(result.msg == 'success'){
                        $messager.success('登录成功');
                        location.reload();
                    } else{
                        $messager.error(result.msg);
                    }
                    $('#loginBtn').removeAttr('disabled');
                },
                error: function(){
                    $messager.warning('服务器出错！');
                }
            });
        }
    }

    /**
     * 注册验证
     */
    login.register = function(){
        $('#registerBtn').attr('disabled', 'disabled');
        if(!$('#rAccount').val()){
            $('#registerBtn').removeAttr('disabled');
            $messager.warning('账号不能为空');
        } else if(!$('#rPassword').val() || !$('#againPassword').val()){
            $('#registerBtn').removeAttr('disabled');
            $messager.warning('密码不能为空');
        } else{
            if ($('#againPassword').val() === $('#rPassword').val()) {
                $('.login-box-show').slideUp('normal', 'swing', function(){
                    $('.login-box-show').parent().hide()
                });
                $('html, body').animate({scrollTop: 0}, 'slow');
                // 弹窗提示用户输入手机验证
                new PhoneValidation(login, $(this), {'account': $('#rAccount').val(), 'password': $('#againPassword').val()});
            } else {
                $('#registerBtn').removeAttr('disabled');
                $messager.warning('两次输入的密码不一样');
            }
        }
    }

    login.resetPwd = function(){
        var resetAccount = $('#resetAccount').val();
        if(!resetAccount){
            $messager.warning('请输入账号');
        } else if(!/^[a-zA-Z][a-zA-Z0-9]*$/.test(resetAccount)){
            $messager.warning('账号只能由字母和数字组成，且不能以数字开头');
        } else if(resetAccount.length < 3 || resetAccount > 18){
            $messager.warning('账号必须3-18个字符');
        } else{
            // 后台验证账号，并通过账号对应的手机，向手机发送验证码
            $.ajax({
                url: 'user/resetPassword.do',
                data: {'account': resetAccount},
                type: 'post',
                dataType: 'json',
                success: function(result){
                    if(result.msg == 'success'){
                        $('.login-box-show').slideUp('normal', 'swing', function(){
                            $('.login-box-show').parent().hide();
                        });
                        new ResetPwdDialog(login, $('#resetBtn'), result.user, result.code);
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
     * 修改密码
     */
    login.changePwd = function(){
        $.ajax({
            url: 'user/getUserData.do',
            type: 'post',
            dataType: 'json',
            success: function(result){
                if(result.msg == 'success'){
                    new ChangePwdDialog(result.userData, $('#changePwd'));
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

    login.loginEvent = function(){
        var that = this;

        // 登录验证
        $('#loginBtn').on('click', that.login);
        // 注册验证
        $('#registerBtn').on('click', that.register);
        // 重置密码
        $('#resetBtn').on('click', login.resetPwd);

        // 关闭登录窗口
        $('.close-login').on('click', function () {
            $('.login-box-show').slideUp('normal', 'swing', function(){
                $('.login-box-show').parent().hide();
            });
        });

        // 登录、注册、密码重置切换事件
        $('#loginToRegister').on('click', function () {
            $('.login-box-all').css('margin-left', '-320px');
            return false;
        });
        $('#loginToReset').on('click', function () {
            $('.login-box-all').css('margin-left', '-640px');
            return false;
        });
        $('#registerToLogin').on('click', function () {
            $('.login-box-all').css('margin-left', '0');
            return false;
        });
        $('#resetToRegister').on('click', function () {
            $('.login-box-all').css('margin-left', '-320px');
            return false;
        });
        $('#resetToLogin').on('click', function () {
            $('.login-box-all').css('margin-left', '0');
            return false;
        });
    }

    login.init = function(){
        this.validator();
        this.loginEvent();
    }

    /**
     * 手机验证对话框
     * @constructor
     */
    var PhoneValidation = function (instance, target, info) {
        this.instance = instance;
        this.target = target;
        this.info = info;
        this.init();
    }

    PhoneValidation.prototype = {
        init: function () {
            var that = this;
            var option = {
                title: '用户注册手机验证',
                saveBtn: false,
                mode: that.paintComponent()
            };
            this.target.openModalDialog(option);
        },
        /**
         * 绘制弹窗内容
         * @returns {*|jQuery|HTMLElement}
         */
        paintComponent: function () {
            var $html = $('<div class="container">' +
                '<div class="col-sm-8 col-md-6 col-lg-5">' +
                '   <form class="form-horizontal" id="phoneValidationForm">' +
                        '<div class="form-group">' +
                            '<label for="regPhone" class="col-xs-12 col-sm-3 control-label">手机：</label>' +
                            '<div class="col-xs-7 col-sm-5">' +
                                '<input class="form-control" id="regPhone" name="regPhone" type="number" placeholder="手机号码">' +
                            '</div>' +
                            '<div class="col-xs-5 col-sm-4">' +
                                '<button class="btn btn-primary" id="sendCode" disabled type="submit" title="点击向手机发送验证码">发送验证码</button>' +
                            '</div>' +
                        '</div>' +
                    '</form>' +
                    '<form class="form-horizontal" id="codeForm">' +
                        '<div class="form-group">' +
                            '<label class="control-label col-xs-12 col-sm-3" for="code">验证码：</label>' +
                            '<div class="col-xs-12 col-sm-9">' +
                                '<input class="form-control" id="code" name="code" type="number" placeholder="请输入验证码">' +
                            '</div>' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<button class="btn btn-primary col-xs-offset-0 col-xs-12 col-sm-offset-1 col-sm-11" id="submitRegister" type="submit">确认</button>' +
                        '</div>' +
                    '</form>' +
                '</div>' +
            '</div>');

            this.$phoneValidationForm = $html.find('#phoneValidationForm');
            this.$codeForm = $html.find('#codeForm');
            this.$regPhone = $html.find('#regPhone');
            this.$sendCode = $html.find('#sendCode');
            this.$code = $html.find('#code');
            this.$submitRegisterBtn = $html.find('#submitRegister');

            this.initValidation();
            this.initEvent();

            return $html;
        },
        /**
         * 初始化手机号码格式验证
         */
        initValidation: function () {
            // 密码重置验证
            this.$phoneValidationForm.bootstrapValidator({
                message: '密码重置无效',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    regPhone: {
                        validators: {
                            notEmpty: {
                                message: '手机号码不能为空'
                            },
                            regexp: {
                                regexp: /^1[3|5|7|8][0-9]{9}$/,
                                message: '手机号码格式不正确'
                            }
                        }
                    }
                }
            }).submit(function () {return false});
            // 禁用表单提交，改用ajax提交
            this.$codeForm.submit(function () {return false});
        },
        initEvent: function () {
            var that = this;
            // 发送验证码
            this.$sendCode.on('click', function () {
                that.$sendCode.attr('disabled', 'disabled');
                that.currCode = that.getCode();
                that.$regPhone.attr('readonly', 'readonly');
                var t = 60;
                // 倒计时重新发送
                that.setInterval = setInterval(function () {
                    that.$sendCode.text('(' + --t + ') 秒后重发');
                    if (t < 0) {
                        clearInterval(that.setInterval);
                        that.$regPhone.removeAttr('readonly');
                        that.$sendCode.removeAttr('disabled');
                        that.$sendCode.text('发送验证码');
                    }
                }, 1000);

                // 自动填写验证码
                that.$code.val(that.currCode);
            });

            this.$submitRegisterBtn.on('click', function () {
                that.$submitRegisterBtn.attr('disabled', 'disabled');
                that.info.phone = that.$regPhone.val();
                if(!that.info.phone){
                    that.$submitRegisterBtn.removeAttr('disabled');
                    $messager.warning('手机号码不能为空！');
                } else if(!that.$code.val()){
                    that.$submitRegisterBtn.removeAttr('disabled');
                    $messager.warning('请输入验证码！');
                } else if(that.$code.val() != that.currCode){
                    that.$submitRegisterBtn.removeAttr('disabled');
                    $messager.warning('验证码输入有误！');
                } else{
                    $.ajax({
                        url: 'register.do',
                        type: 'post',
                        async: false,
                        data: that.info,
                        dataType: 'json',
                        success: function (result) {
                            if (result.msg.toLowerCase() == 'success') {
                                that.target.closeDialog();
                                $messager.success('用户注册成功！<a id="rightAwayLogin">点击立即登录</a>', 5000);
                                $('#rightAwayLogin').on('click', function(){
                                    $('#account').val(that.info.account);
                                    $('#password').val(that.info.password);
                                    that.instance.login();
                                });
                            } else {
                                $messager.error(result.msg);
                            }
                            that.$submitRegisterBtn.removeAttr('disabled');
                        }
                    });
                }
            });
        },
        /**
         * 获取验证码
         */
        getCode: function () {
            var code = '';
            for (var i = 0; i < 4; i++) {
                code += Math.floor(Math.random() * 10);
            }
            return code;
        }
    }

    /**
     * 修改密码
     * @param userData
     * @param target
     * @constructor
     */
    var ChangePwdDialog = function(userData, target, url){
        this.userData = userData;
        this.target = target;
        this.url = url;
        this.init();
    }

    ChangePwdDialog.prototype = {
        init: function () {
            var that = this;
            var option = {
                title: '修改密码',
                saveBtn: false,
                closeBtn: false,
                mode: that.paintComponent()
            };
            this.target.openModalDialog(option);
            this.initData();
            this.validation();
        },
        /**
         * 绘制弹窗内容
         * @returns {*|jQuery|HTMLElement}
         */
        paintComponent: function () {
            var that = this;
            var $html = $('<div>' +
                '<form class="form-horizontal" id="changePwdForm">' +
                    '<input id="account" name="account" type="hidden"/>' +
                    '<div id="oldPwdBox" class="form-group">' +
                        '<label for="oldPassword" class="col-xs-4 control-label">原密码：</label>' +
                        '<div class="col-xs-8">' +
                            '<input class="form-control" id="oldPassword" name="oldPassword" type="password" placeholder="请输入原密码">' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="newPassword" class="col-xs-4 control-label">新密码：</label>' +
                        '<div class="col-xs-8">' +
                            '<input class="form-control" id="newPassword" name="newPassword" type="password" placeholder="请输入新密码">' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="againPassword" class="col-xs-4 control-label">再次输入：</label>' +
                        '<div class="col-xs-8">' +
                            '<input class="form-control" id="againPassword" name="againPassword" type="password" placeholder="请再次输入密码">' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<button class="col-xs-offset-1 col-xs-4 btn btn-primary" id="okBtn" type="submit">确定</button>' +
                        '<button class="col-xs-offset-2 col-xs-4 btn btn-primary" id="cancelBtn">取消</button>' +
                    '</div>' +
                '</form>' +
            '</div>');

            if(this.url){
                $html.find('#oldPwdBox').hide();
            }
            this.$oldPassword = $html.find('#oldPassword');
            this.$newPassword = $html.find('#newPassword');
            this.$againPassword = $html.find('#againPassword');
            this.$account = $html.find('#account');

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
        validation: function(){
            $('#changePwdForm').bootstrapValidator({
                message: '密码无效',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    oldPassword: {
                        validators: {
                            notEmpty: '密码不能为空',
                            stringLength: {
                                min: 3,
                                max: 18,
                                message: '密码必须为3-18个字符'
                            }
                        }
                    },
                    newPassword: {
                        validators: {
                            notEmpty: '密码不能为空',
                            stringLength: {
                                min: 3,
                                max: 18,
                                message: '密码必须为3-18个字符'
                            },
                            different: {
                                field: 'oldPassword',
                                message: '新密码不能与原密码相同'
                            },
                        }
                    },
                    againPassword: {
                        validators: {
                            notEmpty: '密码不能为空',
                            stringLength: {
                                min: 3,
                                max: 18,
                                message: '密码必须为3-18个字符'
                            },
                            different: {
                                field: 'oldPassword',
                                message: '新密码不能与原密码相同'
                            },
                            identical: {
                                field: 'newPassword',
                                message: '两次输入的密码不同'
                            }
                        }
                    }
                }
            }).submit(function(){return false;});
        },
        save: function(){
            var that = this;
            var data = {'account': that.$account.val(), 'newPassword': that.$newPassword.val(), 'againPassword': that.$againPassword.val()};
            if(!this.url){
                data.oldPassword = that.$oldPassword.val();
            }
            $.ajax({
                url: that.url ? that.url:'user/changePassword.do',
                type: 'post',
                data: data,
                dataType: 'json',
                success: function(result){
                    if(result.msg == 'success'){
                        if(that.url){
                            $messager.success('密码重置成功');
                        } else{
                            $messager.success('密码修改成功');
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
        },
        initData: function(){
            this.$account.val(this.userData.account);
        }
    }

    /**
     * 忘记密码重置
     * @param instance
     * @param target
     * @param user
     * @param code
     * @constructor
     */
    var ResetPwdDialog = function(instance, target, user, code){
        this.instance = instance;
        this.target = target;
        this.user = user;
        this.code = code;
        this.init();
    }

    ResetPwdDialog.prototype = {
        init: function () {
            var that = this;
            var option = {
                title: '密码重置',
                saveBtn: false,
                mode: that.paintComponent()
            };
            this.target.openModalDialog(option);
            this.initData();
        },
        /**
         * 绘制弹窗内容
         * @returns {*|jQuery|HTMLElement}
         */
        paintComponent: function () {
            var that = this;
            var $html = $('<div>' +
                '<div class="row">' +
                    '<label id="resetPhone" class="col-xs-7 control-label"></label>' +
                    '<div class="col-xs-5">' +
                        '<button class="btn btn-primary" id="sendCode" disabled type="submit" title="重新发送">重新发送</button>' +
                    '</div>' +
                '</div>' +
                '<div class="row" style="margin-top:10px;">' +
                    '<label class="control-label col-xs-4 col-sm-2" for="code">验证码：</label>' +
                    '<div class="col-xs-8">' +
                        '<input class="form-control" id="code" name="code" type="number" placeholder="请输入验证码">' +
                    '</div>' +
                '</div>' +
                '<div class="row mrg-t-10" style="margin-top:10px;padding:0 15px;">' +
                    '<button class="btn btn-primary col-xs-12" id="okBtn" type="submit">确认</button>' +
                '</div>' +
            '</div>');

            this.$resetPhone = $html.find('#resetPhone');
            this.$sendCode = $html.find('#sendCode');
            this.$code = $html.find('#code');
            this.$sendCode.on('click', function(){
                $.ajax({
                    url: 'user/resetPassword.do',
                    data: {'account': that.user.account},
                    type: 'post',
                    dataType: 'json',
                    success: function(result){
                        if(result.msg == 'success'){
                            that.$sendCode.attr('disablde', 'disabled');
                            $messager.success('验证码已发送');
                            that.code = result.code;
                            that.sendCode();
                        } else{
                            that.$sendCode.removeAttr('disabled');
                            $messager.error(result.msg);
                        }
                    },
                    error: function(){
                        that.$sendCode.removeAttr('disabled');
                        $messager.warning('服务器出错');
                    }
                });
            });
            this.$okBtn = $html.find('#okBtn');
            this.$okBtn.on('click', function(){
                that.$okBtn.attr('disabled', 'disabled');
                if(!that.$code.val()){
                    $messager.warning('请输入验证码');
                    that.$okBtn.removeAttr('disabled');
                }  else if(!/^\d{6}$/.test(that.$code.val())){
                    $messager.warning('验证码必须为6位数字');
                    that.$okBtn.removeAttr('disabled');
                } else{
                    // 后台验证验证码输入是否正确
                    $.ajax({
                        url: 'user/doCodeChcek.do',
                        data: {'code': that.$code.val(), 'phone':that.user.phone},
                        type: 'post',
                        dataType: 'json',
                        success: function(result){
                            if(result.msg == 'success'){
                                that.$okBtn.removeAttr('disabled');
                                that.target.closeDialog();
                                new ChangePwdDialog(that.user, $('#changePwd'), 'user/doResetPwd.do');
                            } else{
                                $messager.error(result.msg);
                                that.$okBtn.removeAttr('disabled');
                            }
                        },
                        error: function(){
                            $messager.warning('服务器出错');
                            that.$okBtn.removeAttr('disabled');
                        }
                    });
                }
            });

            return $html;
        },
        initData: function(){
            var phone = this.user.phone;
            this.$resetPhone.text('已向手机 ' + phone.substring(0,3) + '***' + phone.substring(phone.length-4) + '发送验证码');
            this.sendCode();
        },
        sendCode: function() {
            var that = this;
            var i = 60;
            this.$code.val(this.code);
            this.interval = setInterval(function(){
                that.$sendCode.text('重新发送(' + i + ')');
                if(i-- <= 0){
                    clearInterval(that.interval);
                    that.$sendCode.text('重新发送').removeAttr('disabled');
                }
            }, 1000);
        }
    }

    return login;
});