<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
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
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/blueimp-gallery.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/blueimp-gallery-indicator.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/blueimp-gallery-video.css">
    <script data-main="${pageContext.request.contextPath}/resources/js/main"
            src="${pageContext.request.contextPath}/resources/js/require.min.js"></script>
    <script>
        require(['jquery', 'qshare/index', 'utils/app-dialog'], function($, share){
            share.init();
        });
    </script>
</head>
<body>
<div class="qshare-container">
    <div id="toTop" class="to-top" title="返回顶部">
        <img src="${pageContext.request.contextPath}/resources/img/top.png" alt="">
    </div>
    <!-- start login -->
    <jsp:include page="common/login.jsp"/>
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
                <c:if test="${fn:length(shareTypes) <= 4}">
                    <c:forEach items="${shareTypes}" var="shareType">
                        <li class="share-nav">
                            <a href="javascript:void(0);" name="${shareType.id}">${shareType.name}</a>
                        </li>
                    </c:forEach>
                </c:if>
                <%--超过4个用更多隐藏--%>
                <c:if test="${fn:length(shareTypes) > 4}">
                    <c:forEach items="${shareTypes}" var="shareType" begin="0" end="3">
                        <li class="share-nav">
                            <a href="javascript:void(0);" name="${shareType.shareTypeId}">${shareType.shareTypeName}</a>
                        </li>
                    </c:forEach>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        更多...
                        <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu more-type">
                        <c:forEach items="${shareTypes}" var="shareType" begin="4">
                            <li class="share-nav">
                                <a href="#" name="${shareType.shareTypeId}">${shareType.shareTypeName}</a>
                            </li>
                        </c:forEach>
                    </ul>
                </li>
                </c:if>
                <c:if test="${user == null}">
                    <li><a id="login" href="javascript:void(0);" name="login">立即登录</a></li>
                </c:if>
                <c:if test="${user != null}">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <c:if test="${user.portraitPath != null}">
                                <img class="nav-user-portrait" src="${user.portraitPath}"/>
                            </c:if>
                            <c:if test="${user.portraitPath == null}">
                                <img class="nav-user-portrait" src="${pageContext.request.contextPath}/resources/img/portrait.jpg"/>
                            </c:if>
                            <div class="nav-user-nickname">
                                ${user.nickname}
                            </div>
                            <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu">
                            <c:if test="${user.userType != 'NORMAL'}">
                                <li><a href="manage.do"><i class="fa fa-sign-in">&nbsp;</i>进入后台</a></li>
                            </c:if>
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
            <div class="col-md-4 myleft" style="padding:0;">
                <c:if test="${user == null}">
                    <div class="myleft-n unlogin panel panel-info" style="padding:0;margin-bottom:0;">
                        <div class="panel-body user-portrait">
                            <a class="login-tab" href="javascript:void(0);" title="点击登录">
                                <img class="fl imgr mrg-r-10 portrait" src="${pageContext.request.contextPath}/resources/img/portrait.jpg">
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
                    <div class="myleft-n user-portrait" id="crop-avatar">
                        <a href="myHome.do?account=${user.account}" title="个人主页">
                            <c:choose>
                                <c:when test="${user.portraitPath != null && acc.portraitPath != ''}">
                                    <img class="fl imgr mrg-r-10 portrait" src="${pageContext.request.contextPath}/${user.portraitPath}">
                                </c:when>
                                <c:otherwise>
                                    <img class="fl imgr mrg-r-10 portrait" src="${pageContext.request.contextPath}/resources/img/portrait.jpg">
                                </c:otherwise>
                            </c:choose>
                        </a>
                        <div class="user-info fl">
                            <h4><a class="nickname" href="myHome.do?account=${user.account}" title="个人主页">${user.nickname}</a></h4>
                            <div class="addr">
                                <i class="fa fa-map-marker"></i>
                                <c:choose>
                                    <c:when test="${user.region == null || user.region == ''}">未知</c:when>
                                    <c:otherwise>${user.region}</c:otherwise>
                                </c:choose>
                            </div>
                        </div>
                        <div class="cf"></div>
                    </div>
                    <div class="cf"></div>
                    <div class="myleft-n">
                        <ul class="list-group" style="margin-bottom:0;">
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
                        <!-- 显示最近三条好友动态 -->
                        <div class="panel panel-info" style="margin-top:10px;">
                            <div class="panel-heading">
                                <i class="fa fa-heart"></i> 好友动态
                            </div>
                            <div class="panel-body">
                                <c:choose>
                                    <c:when test="${friendShareVos != null && fn:length(friendShareVos) > 0}">
                                        <c:forEach items="${friendShareVos}" var="friendShareVo">
                                            <div class="friend-dynamic">
                                                <a href="myHome.do?account=${friendShareVo.user.account}" style="font-weight:bold;">${friendShareVo.user.nickname}</a>：
                                                <c:if test="${friendShareVo.transpondVo != null}">
                                                    <span style="color:#ab8d8d;">[转]</span>
                                                    <a href="viewShare.do?shareId=${friendShareVo.share.shareId}" target="_blank">${friendShareVo.transpondVo.transpond.reason}</a>
                                                </c:if>
                                                <c:if test="${friendShareVo.transpondVo == null}">
                                                    <a href="viewShare.do?shareId=${friendShareVo.share.shareId}" target="_blank">${friendShareVo.share.shareTitle}</a>
                                                </c:if>
                                            </div>
                                        </c:forEach>
                                    </c:when>
                                    <c:otherwise>
                                        <div class="friend-dynamic" style="text-align:center;">
                                            暂时没有动态
                                        </div>
                                    </c:otherwise>
                                </c:choose>
                            </div>
                        </div>
                    </div>
                    <div class="cf"></div>
                    <div class="myleft-n">
                        <!-- 显示最近三条关注动态 -->
                        <div class="panel panel-info" style="margin-bottom:0;">
                            <div class="panel-heading">
                                <i class="fa fa-link"></i> 关注动态
                            </div>
                            <div class="panel-body">
                                <c:choose>
                                    <c:when test="${attentionShareVos != null && fn:length(attentionShareVos) > 0}">
                                        <c:forEach items="${attentionShareVos}" var="attentionShareVo">
                                            <div class="friend-dynamic">
                                                <a href="myHome.do?account=${attentionShareVo.user.account}" style="font-weight:bold;">${attentionShareVo.user.nickname}</a>：
                                                <c:if test="${attentionShareVo.transpondVo != null}">
                                                    <span style="color:#ab8d8d;">[转]</span>
                                                    <a href="viewShare.do?shareId=${attentionShareVo.share.shareId}" target="_blank">${attentionShareVo.transpondVo.transpond.reason}</a>
                                                </c:if>
                                                <c:if test="${attentionShareVo.transpondVo == null}">
                                                    <a href="viewShare.do?shareId=${attentionShareVo.share.shareId}" target="_blank">${attentionShareVo.share.shareTitle}</a>
                                                </c:if>
                                            </div>
                                        </c:forEach>
                                    </c:when>
                                    <c:otherwise>
                                        <div class="attention-dynamic" style="text-align:center;">
                                            暂时没有动态
                                        </div>
                                    </c:otherwise>
                                </c:choose>
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
                                <%--<div class="btn-group">--%>
                                    <div class="btn-group" id="shareType">
                                        <button class="btn btn-info dropdown-toggle share-type-btn" name="qt" data-toggle="dropdown">
                                            <span class="share-type-text">其他</span>&nbsp;<span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu share-type" style="background:#fff;">
                                            <c:forEach items="${shareTypes}" var="shareType">
                                                <li><a href="javascript:void(0);" name="${shareType.shareTypeId}">${shareType.shareTypeName}</a></li>
                                            </c:forEach>
                                        </ul>
                                    </div>

                                    <div class="btn-group" id="visibility">
                                        <button class="btn btn-info dropdown-toggle visibility-type-btn" name="all" data-toggle="dropdown">
                                            <span class="visibility-type-text">公开</span>&nbsp;<span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu visibility-type" style="background:#fff;">
                                            <li><a name="all" href="javascript:void(0);"><i class="fa fa-globe"></i> 公开</a></li>
                                            <li><a name="friend" href="javascript:void(0);"><i class="fa fa-heart"></i> 好友可见</a></li>
                                            <li><a name="self" href="javascript:void(0);"><i class="fa fa-lock"></i> 仅自己可见</a></li>
                                        </ul>
                                    </div>
                                <%--</div>--%>
                                <button class="btn btn-info" id="sendInfoBtn" type="submit">发布</button>
                            </div>
                            <!-- end footer right -->
                        </div>
                        <!-- end panel footer -->
                    </div>
                </form>
                </c:if>
                <!-- end 分享 panel -->

                <!-- start 分享信息搜索 -->
                <div id="searchBox">
                    <div class="panel panel-info myright-n share-search">
                        <div class="panel-body">
                            <input class="form-control search-text" type="text" placeholder="搜你想要" />
                            <button id="searchBtn" class="btn btn-primary">
                                <i class="fa fa-search"></i><span class="search-btn-text"> 搜索</span>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- end 分享信息搜索 -->

                <div class="panel panel-default" id="loadMore">
                    <div class="panel-body">
                        <div class="load-more" style="display: none;text-align: center;">点击加载更多 <i class="fa fa-angle-double-down"></i></div>
                        <div class="in-load" style="text-align: center;">正在加载数据 <img style="width:20px; height:20px;" src="${pageContext.request.contextPath}/resources/img/loading.gif" alt=""></div>
                        <div class="load-finish" style="display: none;text-align: center;">没有更多了</div>
                    </div>
                </div>

                <div id="blueimp-gallery" class="blueimp-gallery">
                    <div class="slides"></div>
                    <h3 class="title"></h3>
                    <a class="prev">‹</a>
                    <a class="next">›</a>
                    <a class="close">×</a>
                    <a class="play-pause"></a>
                    <ol class="indicator"></ol>
                </div>
            </div>
            <!-- end right -->
        </div>
    </div>

    <jsp:include page="common/footer.jsp"/>
</div>
</body>
</html>