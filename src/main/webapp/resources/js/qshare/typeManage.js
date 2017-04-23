/**
 * Created by BIN on 2017/4/23.
 */
define(['utils/messager', 'qshare/content'], function($messager){
    var type = {};

    /**
     * 获取分享类型
     * @param shareType
     * @returns {*|jQuery}
     */
    type.getShareType = function(shareType){
        var $item = $('<div class="type-item"></div>');
        $('<div class="type-item-text"></div>').text(shareType.shareTypeName).appendTo($item);

        animationHover($item, 'pulse', function(){
            if(shareType.typeNum != 0){
                $('<i class="fa fa-trash-o fr mrg-r-5 mrg-t-5" style="cursor:pointer;" title="删除分享类别"></i>')
                    .on('click', function(){
                    $messager.success('删除');
                }).appendTo($item);
                $('<i class="fa fa-edit fr mrg-r-5 mrg-t-5" style="cursor:pointer;" title="修改类别名称"></i>').on('click', function(){
                    $messager.success('修改');
                }).appendTo($item);
            } else{
                $item.attr('title', '默认类型');
            }
        }, function(){
            $item.find('i').remove();
        });

        return $item;
    }

    /**
     * 加载全部分享类别
     */
    type.loadShareType = function(){
        var that = this;
        $.ajax({
            url: 'share/getAllShareType.do',
            type: 'post',
            dataType: 'json',
            success: function(shareTypes){
                for(var i in shareTypes){
                    $('#shareTypeData').append(that.getShareType(shareTypes[i]));
                }
            },
            error: function(){
                $messager.warning('服务器出错');
            }
        });
    }

    type.initEvent = function(){
        $('#addShareType').on('click', function(){
            $messager.success('新增');
        });
    }

    type.init = function(){
        this.initEvent();
        this.loadShareType();
    }

    return type;
})