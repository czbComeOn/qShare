/**
 * Created by BIN on 2017/4/23.
 */
define(['utils/messager', 'bootstrap', 'bootstrapValidator'], function($messager){
    var type = {};

    /**
     * 删除分享类别
     * @param $tr
     */
    type.deleteShareType = function($tr){
        $.confirmDialog({
            title: '确定删除分享类别 <b>' + $tr.find('.share-type-name').text() + '</b> ？',
            okCall: function(){
                $.ajax({
                    url: 'manage/deleteShareType.do',
                    data: {'shareTypeId': $tr.find('.share-type-id').text()},
                    type: 'post',
                    dataType: 'json',
                    success: function(result){
                        if(result.msg == 'success'){
                            $messager.success('删除成功');
                            $tr.slideUp('normal', 'swing', function(){
                                $tr.remove();
                            });
                        } else if(result.msg == 'OFFLINE'){
                            $messager.warning('用户未登录');
                            window.location.href = 'index.do';
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

    type.initEvent = function(){
        var that = this;
        $('#addShareType').on('click', function(){
            new UpdateShareTypeDialog(that, $(this), 'add');
        });

        $('#shareTypeTable').find('.delete-share-type').on('click', function(){
            var $tr = $(this).parents('tr');
            that.deleteShareType($tr);
        });

        $('#shareTypeTable').find('.update-share-type').on('click', function(){
            new UpdateShareTypeDialog(that, $(this), 'update');
        });
    }

    type.init = function(){
        this.initEvent();
    }

    /**
     * 修改或添加分享类别
     * @param instance
     * @param target
     * @param type add：添加，update：修改
     * @constructor
     */
    var UpdateShareTypeDialog = function(instance, target, type){
        this.instance = instance;
        this.target = target;
        this.type = type;
        this.init();
    }

    UpdateShareTypeDialog.prototype = {
        init: function(){
            var that = this;
            var option = {
                title: that.type == 'update' ? '修改分享类别':'添加分享类别',
                saveBtn: false,
                closeBtn: false,
                modalId: 'updateType',
                mode: that.paintComponent()
            }
            this.target.openModalDialog(option);
        },
        paintComponent: function(){
            var that = this;
            var $html = $('<div>' +
                '<form class="form-horizontal" id="updateShareTypeForm">' +
                    '<div class="form-group share-type-id-box">' +
                        '<label class="control-label col-xs-3" for="shareTypeId">类别编码：</label>' +
                        '<div class="col-xs-9">' +
                            '<input class="form-control" type="text" id="shareTypeId" name="shareTypeId">' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label class="control-label col-xs-3" for="shareTypeName">类别名称：</label>' +
                        '<div class="col-xs-9">' +
                            '<input class="form-control" type="text" id="shareTypeName" name="shareTypeName">' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label class="control-label col-xs-3" for="typeNum">类别编号：</label>' +
                        '<div class="col-xs-9">' +
                            '<input class="form-control" id="typeNum" name="typeNum" type="number">' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<button class="btn btn-primary col-xs-offset-1 col-xs-2" id="okBtn" disabled type="submit">确定</button>' +
                        '<button class="btn btn-primary col-xs-offset-6 col-xs-2" id="cancelBtn">取消</button>' +
                    '</div>' +
                '</form>' +
            '</div>');

            if(this.type == 'update'){
                $html.find('.share-type-id-box').hide();
            }
            this.$updateShareTypeForm = $html.find('#updateShareTypeForm');
            this.$shareTypeId = $html.find('#shareTypeId');
            this.$shareTypeName = $html.find('#shareTypeName');
            this.$typeNum = $html.find('#typeNum');
            // 如果是修改则初始化数据
            if(this.type == 'update'){
                this.initData();
            }

            $html.find('#okBtn').on('click', function(){
                that.save();
                return false;
            });
            $html.find('#cancelBtn').on('click', function(){
                that.target.closeDialog();
                return false;
            });
            that.validation();

            return $html;
        },
        initData: function(){
            var $tr = this.target.parents('tr');
            this.$shareTypeId.val($tr.find('.share-type-id').text());
            this.$shareTypeName.val($tr.find('.share-type-name').text());
            this.$typeNum.val($tr.find('.type-num').text());
        },
        save: function(){
            var that = this;

            var url = 'manage/addShareType.do';
            if(this.type == 'update'){
                url = 'manage/updateShareType.do';
            }
            if(!this.$typeNum.val()){
                $messager.warning('类别编号不能为空');
                return false;
            } else if(parseInt(this.$typeNum.val()) >= 100){
                $messager.warning('类别编号必须在1-99之间');
                return false;
            }

            $.ajax({
                url: url,
                type: 'post',
                data: that.$updateShareTypeForm.serialize(),
                dataType: 'json',
                success: function(result){
                    if(result.msg == 'success'){
                        if(that.type == 'update'){
                            that.target.parents('tr').find('.share-type-name').text(result.shareType.shareTypeName);
                            that.target.parents('tr').find('.type-num').text(result.shareType.typeNum);
                            $messager.success('修改成功');
                        } else{
                            var $tr = $('<tr></tr>').appendTo($('#shareTypeTable').find('tbody'));
                            $('<td class="share-type-id"></td>').text(result.shareType.shareTypeId).appendTo($tr);
                            $('<td class="share-type-name"></td>').text(result.shareType.shareTypeName).appendTo($tr);
                            $('<td class="type-num"></td>').text(result.shareType.typeNum).appendTo($tr);

                            // 操作
                            var $opr = $('<td></td>').appendTo($tr);
                            $('<a class="update-share-type mrg-r-10" href="#" title="修改"><i class="fa fa-edit"></i></a>').on('click', function(){
                                new UpdateShareTypeDialog(that.instance, $(this), 'update');
                            }).appendTo($opr);
                            $('<a class="delete-share-type" href="#" title="删除"><i class="fa fa-trash"></i></a>').on('click', function(){
                                that.instance.deleteShareType($tr);
                            }).appendTo($opr);
                            $messager.success('添加成功');
                        }
                        that.target.closeDialog();
                    } else if(result.msg == 'OFFLINE'){
                        $messager.warning('用户未登录');
                        window.location.href = 'index.do';
                    } else{
                        $messager.error(result.msg);
                    }
                },
                error: function(){
                    $messager.warning('服务器出错');
                }
            })
        },
        validation: function(){
            this.$updateShareTypeForm.bootstrapValidator({
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    shareTypeId: {
                        validators: {
                            notEmpty: {
                                message: '类别编码不能为空'
                            },
                            regexp: {
                                regexp: /^[a-zA-Z]{2,5}$/,
                                message: '类别编码必须由2-5个字母组成'
                            }
                        }
                    },
                    shareTypeName: {
                        validators: {
                            notEmpty: {
                                message: '类别名称不能为空'
                            },
                            stringLength: {
                                min: 2,
                                max: 5,
                                message: '类别名称必须由2-5个字符组成'
                            }
                        }
                    },
                    typeNum: {
                        validators: {
                            notEmpty: {
                                message: '类别编号不能为空'
                            },
                            regexp: {
                                regexp: /^([1-9]{1})([0-9]?)/,
                                message: '类别编号必须在1-99之间'
                            }
                        }
                    }
                }
            }).submit(function(){return false;});
        }
    }

    return type;
})