/**
 * Created by BIN on 2017/3/22.
 */
define([], function(){
    var comm = {};

    /**
     * 获取时间
     * @param time
     */
    comm.getTime = function(time, formatter){
        var oDate = new Date(time),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth()+1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds();

        oMonth = parseInt(oMonth) < 10 ? ('0'+oMonth) : oMonth;
        oDay = parseInt(oDay) < 10 ? ('0'+oDay) : oDay;
        oHour = parseInt(oHour) < 10 ? ('0'+oHour) : oHour;
        oMin = parseInt(oMin) < 10 ? ('0'+oMin) : oMin;
        oSen = parseInt(oSen) < 10 ? ('0'+oSen) : oSen;

        switch (formatter){
            case 'yyyy-MM-dd':
                return oYear + '-' + oMonth + '-' + oDay;
            case 'yyyy-MM-dd HH:mm' :
                return oYear + '-' + oMonth + '-' + oDay + ' ' + oHour + ':' + oMin;
            case 'yyyy-MM-dd HH:mm:ss' :
                return oYear + '-' + oMonth + '-' + oDay + ' ' + oHour + ':' + oMin + ':' + oSen;
            default:
                return oYear + '-' + oMonth + '-' + oDay + ' ' + oHour + ':' + oMin;
        }
    }

    /**
     * 判断数组是否包含某一项
     * @param arr
     * @param str
     * @returns {boolean}
     */
    comm.contains = function(arr, str){
        var i;
        for(i in arr){
            if(arr[i] == str){
                return true;
            }
        }
        return false;
    }

    /**
     * 生成随机字符串
     * @param len
     * @returns {string}
     */
    comm.randomString = function(len){
        var i;
        len = len || 32;
        var $chars = 'abcdefghijklmnopqrstuvwxyz';
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    return comm;

});