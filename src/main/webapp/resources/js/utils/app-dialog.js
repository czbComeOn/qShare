/**
 * Created by BIN on 2017/3/19.
 */
define(['jquery', 'bootstrap', 'jquery/jquery-ui'], function($){
    var dialog = {
        opt: {
            hasheader: true, // 是否显示标题栏
            title: '标题',  // 标题内容
            width: null,  // 弹窗宽度
            height: null, // 弹窗高度
            closeBtn: true, // 是否显示关闭按钮
            saveBtn: true, // 是否显示保存按钮
            closeText: '关闭',  // 关闭按钮提示
            saveText: '确定', // 保存按钮提示
            mode: '弹窗内容',  // 弹窗面板内容
            url: null,  // 弹窗加载页面地址
        },
        callback:{
            closeEvent: null,
            saveEvent: null,
            // beforeClose: null,
            // afterClose: null,
            // afterSave: null
        }
    }

    /**
     * 初始化弹窗属性
     * @param option
     */
    dialog.initOption = function(option){
        this.modalId = option.modalId;
        this.opt.hasheader = option.hasheader == false ? false : true;
        this.opt.title = option.title ? option.title : '标题';
        this.opt.width = option.width ? option.width : null;
        this.opt.height = option.height ? option.height : null;
        this.opt.closeBtn = option.closeBtn == false ? false : true;
        this.opt.saveBtn = option.saveBtn == false ? false : true;
        this.opt.closeText = option.closeText ? option.closeText : '关闭';
        this.opt.saveText = option.saveText ? option.saveText : '确定';
        this.opt.mode = option.mode ? option.mode : '';
        this.opt.url = option.url ? option.url : '';
    }

    /**
     * 初始化事件
     * @param option
     */
    dialog.initEvent = function(option){
        var that = this;
        this.callback.closeEvent = option.closeEvent ? option.closeEvent : function(){
            that.current_dlg.slideUp('normal', 'swing', function(){
                $('.modal-dialog-back').remove();
                $('body').css('overflow','auto');
            });
        };
        this.callback.saveEvent = option.saveEvent ? option.saveEvent : function(){
            that.current_dlg.slideUp('normal', 'swing', function(){
                $('.modal-dialog-back').remove();
                $('body').css('overflow','auto');
            });
        };

        this.current_dlg.find('.dlg-btn').unbind('click');
        this.current_dlg.find('.modal-close').on('click', that.callback.closeEvent);
        this.current_dlg.find('.modal-save').on('click', that.callback.saveEvent);
    }

    /**
     * 初始化默认关闭方法
     */
    dialog.initClose = function(){
        this.current_dlg.slideUp('normal', 'swing', function(){
            $('.modal-dialog-back').remove();
            $('body').css('overflow','auto');
        });
    }

    /**
     * 初始化默认保存方法
     */
    dialog.initSave = function(){
        this.current_dlg.slideUp('normal', 'swing', function(){
            $('.modal-dialog-back').remove();
            $('body').css('overflow','auto');
        });
    }

    dialog.open = function(option){
        this.initOption(option);

        var $dialog = $('#' + dialog.modalId);
        // 如果弹窗存在直接显示
        if(!$dialog || $dialog.size() == 0){
            var $dlg = $('<div class="modal" style="overflow-x:hidden;overflow-y:auto;">' +
                '<div class="modal-dialog my-dialog">' +
                    '<div class="modal-content"></div>' +
                '</div>' +
            '</div>').attr({'id': dialog.modalId}).appendTo($('body'));
            $dialog = $('#' + dialog.modalId);
            var $modal = $dialog.find('.modal-dialog');
            var $content = $dialog.find('.modal-content');

            if(dialog.opt.width && dialog.opt.width > 0){
                $modal.css({'width': dialog.opt.width, 'margin': '100px auto'});
            }
            if(dialog.opt.height && dialog.opt.height > 0){
                $modal.css({'width': dialog.opt.height});
            }

            // 模态弹窗头
            var $modalHeader = $('<div class="modal-header" style="color: #66787d"></div>');
            // 添加拖拽事件
            $dlg.draggable({handle:'.modal-header'});

            // 是否显示关闭按钮
            if(dialog.opt.closeBtn){
                this.$close = $('<i class="dlg-btn fa fa-remove modal-close" title="关闭"></i>').appendTo($modalHeader);
                if(dialog.opt.closeText){
                    this.$close.attr('title', dialog.opt.closeText);
                }
            }
            // 是否显示保存按钮
            if(dialog.opt.saveBtn){
                this.$save = $('<i class="dlg-btn fa fa-save modal-save" title="确定"></i>').appendTo($modalHeader);
                if(dialog.opt.saveText){
                    this.$save.attr('title', dialog.opt.saveText);
                }
            }

            this.$title = $('<h4 class="modal-title">标题</h4>').appendTo($modalHeader);
            this.$title.html(dialog.opt.title);

            // 模态弹窗实体
            var $modalBody = $('<div class="modal-body"></div>');
            if(dialog.opt.url){
                $('<iframe></iframe>').attr('src',dialog.opt.url).appendTo($modalBody);
            } else{
                if(typeof dialog.opt.mode == 'object'){
                    $modalBody.append(dialog.opt.mode);
                } else{
                    $modalBody.html(dialog.opt.mode);
                }
            }


            // 是否显示头部
            if(dialog.opt.hasheader){
                $content.append($modalHeader);
            }
            $content.append($modalBody);

            $('body').css({'overflow':'hidden'});
        }

        this.current_dlg = $dialog;
        this.initEvent(option);

        // 创建模糊层
        $('<div class="modal-dialog-back"></div>').appendTo($('body'));

        $dialog.slideDown(500);
    }

    /**
     * 隐藏当前模态弹窗
     */
    $.fn.hideDialog = function(){
        var $dialog = $('#' + 'dlg_' + this.attr('id'));
        $dialog.slideUp('normal', 'swing', function(){
            $('.modal-dialog-back').remove();
            $('body').css('overflow','auto');
        });
    }

    /**
     * 关闭并销毁弹窗
     */
    $.fn.closeDialog = function(){
        var $dialog = $('#' + dialog.modalId);
        $dialog.slideUp('normal', 'swing', function(){
            $('.modal-dialog-back').remove();
            $dialog.remove();
            $('body').css('overflow','auto');
        });
    }

    /**
     * 开启弹窗
     * @param option
     */
    $.fn.openModalDialog = function(option){
        if(!option.modalId){
            option.modalId = 'dlg_' + this.attr('id');
        }

        if(!option.modalId){
            throw new Error(this + '组件必须包含id属性');
        } else{
            return dialog.open(option);
        }
    }

    /**
     * 提示是否确认操作
     * @param option
     */
    function showConfirm(option){
        var $confirmDialog = $('<div class="modal" id="confirmDialog">' +
            '<div class="modal-dialog my-dialog">' +
                '<div class="modal-content">' +
                    '<div class="modal-header" style="color: #66787d"><h4 class="modal-title">提示信息</h4></div>' +
                    '<div class="modal-body" style="text-align: right;">' +
                        '<button class="btn btn-primary" id="okBtn" style="margin-right:20px;">确定</button>' +
                        '<button class="btn btn-info" id="cancelBtn">取消</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>');

        // 创建模糊层
        $('<div class="modal-dialog-back"></div>').appendTo($('body'));

        $confirmDialog.find('.modal-dialog').css({'width': option.width, 'margin': '100px auto'});
        $confirmDialog.find('.modal-title').html(option.title);
        $confirmDialog.find('#okBtn').text(option.okBtnText).on('click', function(){
            option.okCall();
            confirmOkCall();
        });
        $confirmDialog.find('#cancelBtn').text(option.cancelBtnText).on('click', function(){
            option.cancelCall();
            confirmCancelCall();
        });
        $confirmDialog.appendTo($('body')).slideDown();
        // 添加拖拽事件
        $confirmDialog.draggable({handle:'.modal-header'});
    }

    function confirmOkCall(){
        $('#confirmDialog').slideUp('normal', 'swing', function(){
            $('#confirmDialog').remove();
            $('.modal-dialog-back').remove();
        });
    }

    function confirmCancelCall(){
        $('#confirmDialog').slideUp('normal', 'swing', function(){
            $('#confirmDialog').remove();
            $('.modal-dialog-back').remove();
        });
    }

    /**
     * 弹窗确定
     */
    $.confirmDialog = function(option){
        option.title = option.title ? option.title : '提示';
        option.okBtnText = option.okBtnText ? option.okBtnText : '确定';
        option.cancelBtnText = option.cancelBtnText ? option.cancelBtnText : '取消';
        option.okCall = option.okCall ? option.okCall : confirmOkCall;
        option.cancelCall = option.cancelCall ? option.cancelCall : confirmCancelCall;
        option.width = option.width ? option.width : 300;
        showConfirm(option);
    }

    return dialog;
})