/**
 * 生成video播放器
 * Created by BIN on 2017/3/29.
 */
define(['jquery', 'jwplayer'], function($){
    $.fn.player = function(file){
        var player = jwplayer($(this).attr('id')).setup({
            'flashplayer': 'resources/js/jwplayer/jwplayer.flash.swf',
            'image': 'resources/img/player.jpg',
            'id': 'playerID',
            'width': '100%',
            'aspectratio':'10:6',
            'file': file
        });
    }
});