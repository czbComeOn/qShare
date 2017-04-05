/**
 * Created by BIN on 2017/3/24.
 */
define(['jquery', 'bootstrap'], function($){
    $.extend({
        /**
         * 打开上传进度
         * @param val 当前进度百分比
         * @param text 显示文本
         */
        openProgress: function(val, text){
            var $prog = $('.upload-progress');
            if(!$prog || $prog.size() == 0){
                $prog = $('<div class="upload-progress"></div>').appendTo($('body'));
                $('<div class="progress progress-striped active">' +
                    '<div class="progress-bar progress-bar-info" style="width: 0;">' +
                    '</div>' +
                '</div>').appendTo($prog);
                $('<div class="progress-text" style="color:#fff;text-align:center;"></div>').appendTo($prog);
            }
            $prog.find('.progress-bar').css({width: val+'%'});
            if(text){
                $prog.find('.progress-text').text(text);
            }
        },
        // 关闭进度
        closeProgress: function(){
            $('.upload-progress').remove();
        }
    });
})