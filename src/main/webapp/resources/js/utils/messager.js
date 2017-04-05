define(['base/toastr'], function(toastr){
	/*
	 * 消息提示
	 */
	var $messager = {};

	toastr.options = {
        showDuration: 300,
        hideDuration: 500,
        timeOut: 1500,
        positionClass: 'toast-top-center'
    };

    $messager.success = function(msg, timeOut){
        if(timeOut && timeOut > 0){
            toastr.timeOut = timeOut;
        }
    	toastr.success(msg);
    }

    $messager.info = function(msg, timeOut){
        if(timeOut && timeOut > 0){
            toastr.timeOut = timeOut;
        }
    	toastr.info(msg);
    }

    $messager.warning = function(msg, timeOut){
        if(timeOut && timeOut > 0){
            toastr.timeOut = timeOut;
        }
    	toastr.warning(msg);
    }

    $messager.error = function(msg, timeOut){
        if(timeOut && timeOut > 0){
            toastr.timeOut = timeOut;
        }
    	toastr.error(msg);
    }

    return $messager;
})