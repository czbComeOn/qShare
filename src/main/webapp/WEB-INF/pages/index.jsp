<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang=""zh>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
    <title>轻.分享 - 主页</title>
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/resources/img/qshare.ico">

    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrapValidator.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap-select.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/toastr.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/jquery.sinaEmotion.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/my.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/my-dialog.css">
    <script data-main="${pageContext.request.contextPath}/resources/js/main" src="${pageContext.request.contextPath}/resources/js/require.min.js"></script>
    <script>
        require(['jquery', 'qshare/index'], function($, share){
            share.init();
            $('#logout').on('click', share.logout);
        });
    </script>
</head>
<body>
<div class="qshare-container snowbg">
    <!-- start login -->
    <div class="login-container">
        <div class="login-box-show">
            <div class="login-box-all" style="width: 960px;">
                <div class="login-box panel fl" style="width: 300px;">
                    <div class="panel-heading">
                        <div class="fl" style="font-family: monospace; font-weight: bold; color: rgba(67,124,173,.63);">轻.分享 - 登录</div>
                        <a class="fr close-login" id="closeLogin" href="javascript:void(0);" style="color: rgba(67,124,173,.63);" title="关闭"><span class="glyphicon glyphicon-remove"></span></a>
                    </div>
                    <div class="panel-body">
                        <form id="loginForm">
                            <div class="form-group">
                                <input class="form-control" id="account" name="account" type="text" data-bv-trigger="keyup" placeholder="账号/邮箱" style="letter-spacing: 1px;" />
                            </div>
                            <div class="form-group">
                                <input class="form-control" id="password" name="password" type="password" data-bv-trigger="keyup" placeholder="密码" style="letter-spacing: 4px;" />
                            </div>
                            <div class="checkbox">
                                <label><input type="checkbox" style="height: auto;">记住密码</label>
                            </div>
                            <div class="btn-box">
                                <button class="btn btn-primary" id="loginBtn" type="submit">登录</button>
                                <button class="btn btn-info" id="loginToRegister">没有账号？注册</button>
                                <button class="btn btn-info" id="loginToReset">忘记密码？重置</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="register-box panel fl" style="width: 300px;">
                    <div class="panel-heading">
                        <div class="fl" style="font-family: monospace; font-weight: bold; color: rgba(67,124,173,.63);">轻.分享 - 注册</div>
                        <a class="fr close-login" href="javascript:void(0);" style="color: rgba(67,124,173,.63);" title="关闭"><span class="glyphicon glyphicon-remove"></span></a>
                    </div>
                    <div class="panel-body">
                        <form id="registerForm">
                            <div class="form-group">
                                <input class="form-control" id="rAccount" name="rAccount" type="text" data-bv-trigger="keyup" placeholder="账号/邮箱" style="letter-spacing: 1px;" />
                            </div>
                            <div class="form-group">
                                <input class="form-control" id="rPassword" name="rPassword" type="password" data-bv-trigger="keyup" placeholder="密码" style="letter-spacing: 4px;" />
                            </div>
                            <div class="form-group">
                                <input class="form-control" id="againPassword" name="againPassword" type="password" data-bv-trigger="keyup" placeholder="确认密码" style="letter-spacing: 4px;" />
                            </div>
                            <div class="btn-box">
                                <button class="btn btn-primary" id="registerBtn" type="submit">注册</button>
                                <button class="btn btn-info" id="registerToLogin">已有账号？登录</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="reset-box panel fl" style="width: 300px;">
                    <div class="panel-heading">
                        <div class="fl" style="font-family: monospace; font-weight: bold; color: rgba(67,124,173,.63);">轻.分享 - 找回密码</div>
                        <a class="fr close-login" href="javascript:void(0);" style="color: rgba(67,124,173,.63);" title="关闭"><span class="glyphicon glyphicon-remove"></span></a>
                    </div>
                    <div class="panel-body">
                        <form id="resetPwdForm">
                            <div class="form-group">
                                <input class="form-control" id="phoneNum" name="phoneNum" type="text" data-bv-trigger="keyup" placeholder="手机号码" style="letter-spacing: 1px;" />
                            </div>
                            <div class="btn-box">
                                <button class="btn btn-primary" id="resetBtn" type="submit">重置</button>
                                <button class="btn btn-info" id="resetToRegister">没有账号？注册</button>
                                <button class="btn btn-info" id="resetToLogin">已有账号？登录</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--end login-->

    <!-- start nav -->
    <div class="navbar navbar-default qshare-header">
        <div class="navbar-header">
            <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <div class="qshare-logo"><a href="" title="主页"><img src="${pageContext.request.contextPath}/resources/img/qshare-logo.png" alt="..."></a></div>
        </div>
        <div class="collapse navbar-collapse navbar-responsive-collapse">
            <ul class="nav navbar-nav show-share-type">
                <li class="active"><a href="#" name="all" data-toggle="tab">全部</a></li>
                <li><a href="#" name="zx" data-toggle="tab">最新</a></li>
                <li><a href="#" name="zr" data-toggle="tab"><span class="glyphicon glyphicon-fire" style="color:red;"></span> 最热</a></li>
                <li><a href="#" name="sh" data-toggle="tab">生活</a></li>
                <li><a href="#" name="yl" data-toggle="tab">娱乐</a></li>
                <li><a href="#" name="yd" data-toggle="tab">运动</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        更多...
                        <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu more-type">
                        <li><a href="#" name="hw" data-toggle="tab">户外</a></li>
                        <li><a href="#" name="ly" data-toggle="tab">旅游</a></li>
                        <li><a href="#" name="ms" data-toggle="tab">美食</a></li>
                        <li><a href="#" name="qg" data-toggle="tab">情感</a></li>
                        <li><a href="#" name="dy" data-toggle="tab">电影</a></li>
                        <li><a href="#" name="zy" data-toggle="tab">综艺</a></li>
                        <li><a href="#" name="dm" data-toggle="tab">动漫</a></li>
                        <li><a href="#" name="qt" data-toggle="tab">其他</a></li>
                    </ul>
                </li>
                <c:if test="${user != null}">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <span class="glyphicon glyphicon-user"></span>
                            用户
                            <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="#" data-toggle="tab"><span class="glyphicon glyphicon-home">&nbsp;</span>个人主页</a></li>
                            <li><a id="logout" href="#" data-toggle="tab"><span class="glyphicon glyphicon-log-out">&nbsp;</span>退出登录</a></li>
                        </ul>
                    </li>
                </c:if>
            </ul>
        </div>
    </div>
    <!-- end nav -->

    <!-- 轻分享主内容 -->
    <div class="container qshare-main top60 bot50">
        <div class="row mym">
            <!-- left -->
            <div class="col-md-4 myleft">
                <c:if test="${user == null}">
                    <div class="myleft-n unlogin panel panel-info" style="margin-top: 10px;">
                        <div class="panel-body">
                            <a class="login-tab" href="javascript:void(0);" title="点击登录">
                                <img class="fl imgr imgr20 tou" src="${pageContext.request.contextPath}/resources/img/header/hzw.jpg">
                            </a>
                            <div class="user-info fl">
                                <h4><a class="login-tab" href="javascript:void(0);" title="点击登录">未登录</a></h4>
                            </div>
                        </div>
                        <div class="panel-footer">
                            快登录和我们一起分享你的那些事吧
                        </div>
                    </div>
                </c:if>
                <c:if test="${user != null}">
                    <div class="myleft-n mrg20">
                        <a href="javascript:void(0);" title="点击更换头像">
                            <img class="fl imgr imgr20 tou" src="${pageContext.request.contextPath}/resources/img/lf.jpg">
                        </a>
                        <div class="user-info fl">
                            <h4><a href="javascript:void(0);" title="个人主页" class="nickname">${user.nickname}</a></h4>
                            <div class="addr" style="color:#b8ecfa">
                                <span class="glyphicon glyphicon-map-marker"></span>
                                ${user.region}
                            </div>
                        </div>
                        <div class="cf"></div>
                    </div>
                    <div class="cf"></div>
                    <div class="myleft-n">
                        <ul class="list-group">
                            <li class="list-group-item list-group-item-primary">
                                <span class="badge" style="background:#ef5c5c;">9</span>
                                <a href="#"><span class="glyphicon glyphicon-heart"></span> 好友</a>
                            </li>
                            <li class="list-group-item list-group-item-info">
                                <span class="badge" style="background:#ced834;">10</span>
                                <a href="#"><span class="glyphicon glyphicon-link"></span> 关注</a>
                            </li>
                            <li class="list-group-item list-group-item-primary">
                                <span class="badge" style="background:#3e97c1;">10</span>
                                <a href="#"><span class="glyphicon glyphicon-star"></span> 我的收藏</a>
                            </li>
                            <li class="list-group-item list-group-item-info">
                                <span class="badge" style="background:#b994a5;">10</span>
                                <a href="#"><span class="glyphicon glyphicon-share"></span> 我的分享</a>
                            </li>
                        </ul>
                    </div>
                    <div class="cf"></div>
                    <div class="myleft-n">
                        <div class="panel panel-info">
                            <div class="panel-heading">
                                <span class="glyphicon glyphicon-heart-empty"></span> 好友动态
                            </div>
                            <div class="panel-body">
                                <div class="friend-dyn">
                                    张三
                                </div>
                                <div class="friend-dyn">
                                    李四
                                </div>
                                <div class="friend-dyn">
                                    王五
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cf"></div>
                    <div class="myleft-n">
                        <div class="panel panel-info">
                            <div class="panel-heading">
                                <span class="glyphicon glyphicon-link"></span> 关注动态
                            </div>
                            <div class="panel-body">
                                <div class="friend-dyn">
                                    张三
                                </div>
                                <div class="friend-dyn">
                                    李四
                                </div>
                                <div class="friend-dyn">
                                    王五
                                </div>
                            </div>
                        </div>
                    </div>
                </c:if>
            </div>
            <!-- end left -->
            <!-- right -->
            <div class="col-md-8 myright">
                <!-- start 分享panel -->
                <c:if test="${user != null}">
                <form id="shareForm" action="#">
                    <div class="panel panel-info myright-n share-panel" id="sharePanel">
                        <div class="panel-heading">
                            分享你的那些事
                        </div>
                        <div class="panel-body">
                            <div class="wordCount" id="wordCount">
                                <div class="form-group">
                                    <input class="share-theme form-control" id="shareTheme" name="shareTheme" type="text" required data-bv-trigger="keyup" data-bv-notempty-message="主题不能为空" placeholder="分享主题" />
                                </div>
                                <div class="form-group">
                                    <textarea class="share-content emotion form-control" id="shareContent" name="shareContent" placeholder="分享内容"></textarea>
                                    <span class="wordwrap"><var class="word">200</var>/200</span>
                                </div>
                            </div>
                        </div>
                        <!-- footer -->
                        <div class="panel-footer">
                            <!-- footer left -->
                            <div class="footer-left fl">
                                <a class="emotion-img" id="face" href="javascript:void(0);">
                                    <img src="${pageContext.request.contextPath}/resources/img/huanglianwx_thumb.gif" height="22" width="22">
                                </a>
                                <a class="insert-attachment" id="insertImg" href="javascript:void(0);" style="font-size:16px;">	<span class="glyphicon glyphicon-picture"></span>图片
                                </a>
                                <a class="insert-attachment" id="insertVideo" href="javascript:void(0);" style="font-size:16px;">	<span class="glyphicon glyphicon-picture"></span>视频
                                </a>
                            </div>
                            <!-- end footer left -->
                            <!-- footer right -->
                            <div class="footer-right fr">
                                <div class="btn-group">
                                    <div class="btn-group" id="shareType">
                                        <button class="btn btn-info dropdown-toggle share-type-btn" name="qt" data-toggle="dropdown">
                                            <span class="share-type-text">其他</span>&nbsp;<span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu share-type">
                                            <li><a href="javascript:void(0);" name="sh">生活</a></li>
                                            <li><a href="javascript:void(0);" name="yl">娱乐</a></li>
                                            <li><a href="javascript:void(0);" name="yd">运动</a></li>
                                            <li><a href="javascript:void(0);" name="hw">户外</a></li>
                                            <li><a href="javascript:void(0);" name="lv">旅游</a></li>
                                            <li><a href="javascript:void(0);" name="ms">美食</a></li>
                                            <li><a href="javascript:void(0);" name="qg">情感</a></li>
                                            <li><a href="javascript:void(0);" name="dy">电影</a></li>
                                            <li><a href="javascript:void(0);" name="zy">综艺</a></li>
                                            <li><a href="javascript:void(0);" name="dm">动漫</a></li>
                                            <li><a href="javascript:void(0);" name="qt">其他</a></li>
                                        </ul>
                                    </div>

                                    <div class="btn-group" id="visibility">
                                        <button class="btn btn-info dropdown-toggle visibility-type-btn" name="all" data-toggle="dropdown">
                                            <span class="visibility-type-text">公开</span>&nbsp;<span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu visibility-type">
                                            <li><a name="all" href="javascript:void(0);"><span class="glyphicon glyphicon-globe"></span> 公开</a></li>
                                            <li><a name="friend" href="javascript:void(0);"><span class="glyphicon glyphicon-heart"></span> 好友可见</a></li>
                                            <li><a name="self" href="javascript:void(0);"><span class="glyphicon glyphicon-lock"></span> 仅自己可见</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <button class="btn btn-info" id="sendInfoBtn" type="submit">发布</button>
                            </div>
                            <!-- end footer right -->
                        </div>
                        <!-- end panel footer -->
                    </div>
                </form>
                </c:if>
                <!-- end 分享 panel -->
                <%--<div class="panel panel-default myright-n share-info">
                    <div class="panel-heading">
                        <a href="#" class="pull-left">
                            <img src="${pageContext.request.contextPath}/resources/img/sl.jpg" alt="">
                        </a>
                        <div class="title-center">
                            <a href="javascript:void(0);">索隆：</a>
                            <a href="javascript:void(0);" title="点击查看详情">哈哈</a>
                            <small>2017年3月10日</small>
                        </div>
                    </div>
                    <div class="panel-body">
                        哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈。。。
                    </div>
                    <div class="panel-footer">
                        <div class="footer-tool fr">
                            <a href="javascript:void(0);"><span class="glyphicon glyphicon-thumbs-up"></span>点赞</a>
                            <a href="javascript:void(0);"><span class="glyphicon glyphicon-star-empty"></span>收藏</a>
                            <a href="javascript:void(0);"><span class="glyphicon glyphicon-share"></span>转发</a>
                            <a href="javascript:void(0);"><span class="glyphicon glyphicon-comment"></span>评论</a>
                        </div>
                    </div>
                </div>--%>

                <div class="panel panel-default load-more">
                    <div class="panel-body" id="loadOver" style="display: none;text-align: center;">点击加载更多 <span class="glyphicon glyphicon-chevron-down"></span></div>
                    <div class="panel-body" id="startLoad" style="text-align: center;">
                        正在加载数据 <img style="width:20px; height:20px;" src="${pageContext.request.contextPath}/resources/img/loading.gif" alt="">
                    </div>
                </div>
            </div>
            <!-- end right -->
        </div>
    </div>

    <!-- 版权信息 -->
    <div class="qshare-footer">
        <footer>
            Copyright 2017 国脉信息学院 软件1302 陈志斌 版权所有
        </footer>
    </div>
</div>
</body>
</html>