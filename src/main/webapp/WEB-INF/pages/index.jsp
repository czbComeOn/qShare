<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh">
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
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/font-awesome.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/cropper.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/sitelogo.css">

    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/my.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/my-dialog.css">
    <script data-main="${pageContext.request.contextPath}/resources/js/main"
            src="${pageContext.request.contextPath}/resources/js/require.min.js"></script>
    <script>
        require(['jquery', 'qshare/index'], function($, share){
            share.init();
        });
    </script>
</head>
<body>
<div class="qshare-container snowbg">
    <div id="toTop" class="to-top" title="返回顶部">
        <img src="${pageContext.request.contextPath}/resources/img/top.png" alt="">
    </div>
    <!-- start login -->
    <div class="login-container">
        <div style="background-color:#000;width:100%;height:100%;opacity:.6;"></div>
        <div class="login-box-show">
            <!-- 登录 -->
            <div class="login-box-all" style="width: 960px;">
                <div class="login-box panel fl" style="width: 300px;background:#fff;">
                    <div class="panel-heading">
                        <div class="fl" style="font-family: monospace; font-weight: bold; color: rgba(67,124,173,.63);">轻.分享 - 登录</div>
                        <a class="fr close-login" id="closeLogin" href="javascript:void(0);" style="color: rgba(67,124,173,.63);" title="关闭"><i class="fa fa-remove"></i></a>
                    </div>
                    <div class="panel-body">
                        <form id="loginForm">
                            <div class="form-group">
                                <input class="form-control" id="account" name="account" type="text" data-bv-trigger="keyup" placeholder="账号/邮箱" style="letter-spacing: 1px;" />
                            </div>
                            <div class="form-group">
                                <input class="form-control" id="password" name="password" type="password" data-bv-trigger="keyup" placeholder="密码" style="letter-spacing: 4px;" />
                            </div>
                            <div class="checkbox" style="display: none;">
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
                <!-- 登录 end -->
                <!-- 注册 -->
                <div class="register-box panel fl" style="width: 300px;">
                    <div class="panel-heading">
                        <div class="fl" style="font-family: monospace; font-weight: bold; color: rgba(67,124,173,.63);">轻.分享 - 注册</div>
                        <a class="fr close-login" href="javascript:void(0);" style="color: rgba(67,124,173,.63);" title="关闭"><i class="fa fa-remove"></i></a>
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
                <!-- 注册 end -->
                <!-- 重置密码 -->
                <div class="reset-box panel fl" style="width: 300px;">
                    <div class="panel-heading">
                        <div class="fl" style="font-family: monospace; font-weight: bold; color: rgba(67,124,173,.63);">轻.分享 - 找回密码</div>
                        <a class="fr close-login" href="javascript:void(0);" style="color: rgba(67,124,173,.63);" title="关闭"><i class="fa fa-remove"></i></a>
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
                <!-- 重置密码 end -->
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
            <div class="qshare-logo">
                <a href="${pageContext.request.contextPath}/index.do" title="主页">
                    <img src="${pageContext.request.contextPath}/resources/img/qshare-logo.png" alt="...">
                </a>
            </div>
        </div>
        <div class="collapse navbar-collapse navbar-responsive-collapse">
            <ul class="nav navbar-nav show-share-type">
                <li class="active share-nav"><a href="javascript:void(0);" name="all">全部</a></li>
                <%--<li class="share-nav"><a href="javascript:void(0);" name="zr"><span class="glyphicon glyphicon-fire" style="color:red;"></span> 最热</a></li>--%>
                <li class="share-nav"><a href="javascript:void(0);" name="sh">生活</a></li>
                <li class="share-nav"><a href="javascript:void(0);" name="yl">娱乐</a></li>
                <li class="share-nav"><a href="javascript:void(0);" name="yd">运动</a></li>
                <li class="share-nav"><a href="javascript:void(0);" name="ly">旅游</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        更多...
                        <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu more-type">
                        <li class="share-nav"><a href="#" name="hw">户外</a></li>
                        <li class="share-nav"><a href="#" name="ms">美食</a></li>
                        <li class="share-nav"><a href="#" name="qg">情感</a></li>
                        <li class="share-nav"><a href="#" name="dy">电影</a></li>
                        <li class="share-nav"><a href="#" name="zy">综艺</a></li>
                        <li class="share-nav"><a href="#" name="dm">动漫</a></li>
                        <li class="share-nav"><a href="#" name="qt">其他</a></li>
                    </ul>
                </li>
                <c:if test="${user != null}">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <c:if test="${user.portraitPath != null}">
                                <img src="${user.portraitPath}" style="width:20px;height:20px;border-radius:50%;" />
                            </c:if>
                            <c:if test="${user.portraitPath == null}">
                                <img src="${pageContext.request.contextPath}/resources/img/header/portrait.jpg" style="width:20px;height:20px;border-radius:50%;" />
                            </c:if>
                            用户
                            <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="myHome.do?account=${user.account}"><i class="fa fa-home">&nbsp;</i>我的主页</a></li>
                            <li><a id="changePwd" href="javascript:void(0);"><i class="fa fa-edit">&nbsp;</i>修改密码</a></li>
                            <li><a id="logout" href="javascript:void(0);"><i class="fa fa-sign-out">&nbsp;</i>退出登录</a></li>
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
                                <img class="fl imgr mrg-r-10 portrait" src="${pageContext.request.contextPath}/resources/img/header/portrait.jpg">
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
                    <div class="myleft-n mrg20" id="crop-avatar">
                        <a href="myHome.do?account=${user.account}" title="个人主页">
                            <c:choose>
                                <c:when test="${user.portraitPath != null}">
                                    <img class="fl imgr mrg-r-10 portrait" src="${pageContext.request.contextPath}/${user.portraitPath}">
                                </c:when>
                                <c:otherwise>
                                    <img class="fl imgr mrg-r-10 portrait" src="${pageContext.request.contextPath}/resources/img/header/portrait.jpg">
                                </c:otherwise>
                            </c:choose>
                        </a>
                        <div class="user-info fl">
                            <h4><a class="nickname" href="myHome.do?account=${user.account}" title="个人主页">${user.nickname}</a></h4>
                            <div class="addr">
                                <i class="fa fa-map-marker"></i>
                                <c:choose>
                                    <c:when test="${user.region == null}">未知</c:when>
                                    <c:otherwise>${user.region}</c:otherwise>
                                </c:choose>
                            </div>
                        </div>
                        <div class="cf"></div>
                    </div>
                    <div class="cf"></div>
                    <div class="myleft-n">
                        <ul class="list-group">
                            <%--<li class="list-group-item list-group-item-info">
                                <span class="badge" style="background: #c4ce90">10</span>
                                <a href="#"><i class="fa fa-envelope"></i> 私信</a>
                            </li>--%>
                            <li class="list-group-item list-group-item-primary">
                                <span class="badge" style="background:#ef5c5c;">
                                    <c:if test="${friendCount != null}">
                                        ${friendCount}
                                    </c:if>
                                    <c:if test="${friendCount == null}">0</c:if>
                                </span>
                                <a href="myHome.do?account=${user.account}"><i class="fa fa-heart"></i> 好友</a>
                            </li>
                            <li class="list-group-item list-group-item-info">
                                <span class="badge" style="background:#ced834;">
                                    <c:if test="${attentionCount != null}">
                                        ${attentionCount}
                                    </c:if>
                                    <c:if test="${attentionCount == null}">0</c:if>
                                </span>
                                <a href="myHome.do?account=${user.account}"><i class="fa fa-link"></i> 关注</a>
                            </li>
                            <li class="list-group-item list-group-item-primary">
                                <span class="badge" id="collectCount" style="background:#3e97c1;">
                                    <c:if test="${collectCount != null}">
                                        ${collectCount}
                                    </c:if>
                                    <c:if test="${collectCount == null}">0</c:if>
                                </span>
                                <a href="myHome.do?account=${user.account}"><i class="fa fa-star"></i> 我的收藏</a>
                            </li>
                            <li class="list-group-item list-group-item-info">
                                <span class="badge" id="shareCount" style="background:#b994a5;">
                                    <c:if test="${shareCount != null}">
                                        ${shareCount}
                                    </c:if>
                                    <c:if test="${shareCount == null}">0</c:if>
                                </span>
                                <a href="myHome.do?account=${user.account}"><i class="fa fa-share-alt"></i> 我的分享</a>
                            </li>
                        </ul>
                    </div>
                    <div class="cf"></div>
                    <div class="myleft-n">
                        <div class="panel panel-info">
                            <div class="panel-heading">
                                <i class="fa fa-heart-o"></i> 好友动态
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
                                <i class="fa fa-link"></i> 关注动态
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
                            一起分享你的那些事
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
                                <a class="emotion-img" id="face" href="javascript:void(0);" style="font-size:16px;"><i class="fa fa-smile-o"></i> 表情</a>
                                <a class="insert-attachment" id="insertImg" href="javascript:void(0);" style="font-size:16px;"><i class="fa fa-picture-o"></i> 图片</a>
                                <a class="insert-attachment" id="insertVideo" href="javascript:void(0);" style="font-size:16px;"><i class="fa fa-video-camera"></i> 视频</a>
                                <input id="insertVideoFile" type="file" capture="camcorder" accept="video/mpeg,video/mp4,video/3gpp,video/MPV,.mkv" title="请选择要分享的视频" style="display:none;"/>
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
                                            <li><a name="all" href="javascript:void(0);"><i class="fa fa-globe"></i> 公开</a></li>
                                            <li><a name="friend" href="javascript:void(0);"><i class="fa fa-heart"></i> 好友可见</a></li>
                                            <li><a name="self" href="javascript:void(0);"><i class="fa fa-lock"></i> 仅自己可见</a></li>
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

                <div class="panel panel-default" id="loadMore">
                    <div class="panel-body">
                        <div class="load-more" style="display: none;text-align: center;">点击加载更多 <i class="fa fa-angle-double-down"></i></div>
                        <div class="in-load" style="text-align: center;">正在加载数据 <img style="width:20px; height:20px;" src="${pageContext.request.contextPath}/resources/img/loading.gif" alt=""></div>
                        <div class="load-finish" style="display: none;text-align: center;">没有更多了</div>
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