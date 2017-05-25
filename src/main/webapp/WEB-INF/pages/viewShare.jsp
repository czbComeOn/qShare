<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
    <title>轻.分享 - 详情</title>
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/resources/img/qshare.ico">

    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/toastr.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/jquery.sinaEmotion.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/font-awesome.min.css">

    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/my.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/my-dialog.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/blueimp-gallery.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/blueimp-gallery-indicator.css">
    <script data-main="${pageContext.request.contextPath}/resources/js/main"
            src="${pageContext.request.contextPath}/resources/js/require.min.js"></script>
    <script>
        require(['jquery', 'qshare/view-share', 'utils/app-dialog'], function($, view){
            view.init({'shareId': '${shareVo.share.shareId}',
                'shareContent': '${shareVo.share.shareContent}',
                'userId': <c:choose>
                            <c:when test="${shareVo.transpondVo != null}">'${shareVo.transpondVo.transpond.userId}'</c:when>
                            <c:otherwise>'${shareVo.share.userId}'</c:otherwise>
                        </c:choose>},
                {'userId': '${user.userId}', 'nickname': '${user.nickname}', 'account': '${user.account}'});
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
                <li class="share-nav"><a href="index.do" name="all"><i class="fa fa-home"></i> 主页</a></li>
                <c:if test="${user == null}">
                    <li><a id="login" href="javascript:void(0);" name="login">立即登录</a></li>
                </c:if>
                <c:if test="${user != null}">
                    <li><a href="myHome.do?account=${user.account}"><i class="fa fa-home">&nbsp;</i>我的主页</a></li>
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

    <!-- 轻分享详情 -->
    <div class="container qshare-main top60 bot50">
        <div class="row">
            <!-- right -->
            <div class="col-md-12">
                <div class="panel myright-n share-info" id="currShare">
                    <div class="panel-heading">
                        <a href="javascript:void(0);" class="pull-left">
                            <c:if test="${shareVo.user.portraitPath == null}">
                                <img src="resources/img/portrait.jpg" alt="">
                            </c:if>
                            <c:if test="${shareVo.user.portraitPath != null}">
                               <img src="${shareVo.user.portraitPath}" alt="">
                            </c:if>
                        </a>
                        <div class="title-center">
                            <c:if test="${shareVo.transpondVo != null}">
                                <span style="color:#a7a9b7">[转] </span>
                                <a class="user-title" href="myHome.do?account=${shareVo.user.account}" title="查看Ta的主页">${shareVo.user.nickname}</a>：
                                <a href="viewShare.do?shareId=${shareVo.share.shareId}">${shareVo.transpondVo.transpond.reason}</a>
                            </c:if>
                            <c:if test="${shareVo.transpondVo == null}">
                                <a class="user-title" href="myHome.do?account=${shareVo.user.account}" title="查看Ta的主页">${shareVo.user.nickname}</a>：
                                <a href="viewShare.do?shareId=${shareVo.share.shareId}">${shareVo.share.shareTitle}</a>
                            </c:if>
                            <fmt:formatDate value="${shareVo.share.createTime}" var="createTime" pattern="yyyy-MM-dd HH:mm" />
                            <small>${createTime}</small>
                        </div>
                        <div class="title-right fr" style="font-size: 16px;">
                            <c:if test="${user != null && user.userId == shareVo.user.userId}">
                                <a class="delete-share" href="javascript:void(0);" title="删除"><i class="fa fa-trash"></i></a>
                            </c:if>
                        </div>
                    </div>
                    <div class="panel-body">
                        <c:if test="${shareVo.transpondVo != null}">
                            <div class="transpond-content">
                                <a class="user-title" href="myHome.do?account=${shareVo.transpondVo.user.account}"
                                   style="font-weight:bold;">${shareVo.transpondVo.user.nickname}：</a>
                                <a href="viewShare.do?shareId=${shareVo.transpondVo.transpond.shareId}">${shareVo.share.shareTitle}</a>
                            </div>
                        </c:if>
                        <div class="share-content-box">
                        </div>
                        <c:if test="${imgs != null && fn:length(imgs) > 0}">
                            <div class="share-img-box">
                                <c:forEach items="${imgs}" var="img">
                                    <a href="${img}" data-gallery=""><img class="share-img-info" src="${img}"/></a>
                                </c:forEach>
                            </div>
                        </c:if>
                        <c:if test="${shareVo.share.videoPath != null && shareVo.share.videoPath != ''}">
                            <div class="share-video-box">
                                <video width="300" height="180" controls src="${shareVo.share.videoPath}"
                                       poster="resources/img/player.jpg"></video>
                            </div>
                        </c:if>
                    </div>
                    <div class="panel-footer">
                        <div class="footer-tool">
                            <%--分享信息类别--%>
                            <c:choose>
                                <c:when test="${shareVo.share.shareTypeId == 'dm'}"><span class="share-info-type">动漫</span></c:when>
                                <c:when test="${shareVo.share.shareTypeId == 'dy'}"><span class="share-info-type">电影</span></c:when>
                                <c:when test="${shareVo.share.shareTypeId == 'ly'}"><span class="share-info-type">旅游</span></c:when>
                                <c:when test="${shareVo.share.shareTypeId == 'hw'}"><span class="share-info-type">户外</span></c:when>
                                <c:when test="${shareVo.share.shareTypeId == 'ms'}"><span class="share-info-type">美食</span></c:when>
                                <c:when test="${shareVo.share.shareTypeId == 'qg'}"><span class="share-info-type">情感</span></c:when>
                                <c:when test="${shareVo.share.shareTypeId == 'sh'}"><span class="share-info-type">生活</span></c:when>
                                <c:when test="${shareVo.share.shareTypeId == 'yd'}"><span class="share-info-type">运动</span></c:when>
                                <c:when test="${shareVo.share.shareTypeId == 'yl'}"><span class="share-info-type">娱乐</span></c:when>
                                <c:when test="${shareVo.share.shareTypeId == 'zy'}"><span class="share-info-type">综艺</span></c:when>
                                <c:when test="${shareVo.share.shareTypeId == 'qt'}"><span class="share-info-type">其他</span></c:when>
                                <c:otherwise><span class="share-info-type">其他</span></c:otherwise>
                            </c:choose>
                            <a class="thumb-up" href="javascript:void(0);" title="给TA点赞">
                                <c:if test="${thumb}">
                                    <i class="fa fa-thumbs-up"></i><span class="thumb-text">取消赞</span>
                                </c:if>
                                <c:if test="${thumb == null || !thumb}">
                                    <i class="fa fa-thumbs-o-up"></i><span class="thumb-text">点赞</span>
                                </c:if>
                                <c:if test="${thumbs != null}">
                                    <em class="thumb-count">${fn:length(thumbs)}</em>
                                </c:if>
                                <c:if test="${thumbs == null}">
                                    <em class="thumb-count">0</em>
                                </c:if>
                            </a>
                            <a class="collect" href="javascript:void(0);" title="喜欢就收藏吧">
                                <c:if test="${collect}">
                                    <i class="fa fa-star"></i><span class="collect-text">取消收藏</span>
                                </c:if>
                                <c:if test="${collect == null || !collect}">
                                    <i class="fa fa-star-o"></i><span class="collect-text">收藏</span>
                                </c:if>
                                <em class="collect-count">${fn:length(shareVo.collects)}</em>
                            </a>
                            <a class="transpond" href="javascript:void(0);" title="分享给你的好友">
                                <i class="fa fa-share-square-o"></i><span class="transpond-text">转发</span>
                                <em class="transpond-count">${shareVo.transpondCount}</em>
                            </a>
                            <a class="eval" href="javascript:void(0);" title="说点什么吧...">
                                <i class="fa fa-commenting"></i><span class="eval-text">评论</span>
                                <em class="eval-count">${fn:length(evalVos)}</em>
                            </a>
                        </div>
                        <ul class="show-eval-box">
                            <%--<c:forEach items="${evalVos}" var="evalVo">
                                <li class="eval-item" evalId="${evalVo.eval.evalId}">
                                    <div class="eval-portrait">
                                        <c:if test="${evalVo.evalUser.portraitPath == null}">
                                            <img src="resources/img/portrait.jpg" alt="">
                                        </c:if>
                                        <c:if test="${evalVo.evalUser.portraitPath != null}">
                                            <img src="${evalVo.evalUser.portraitPath}" alt="">
                                        </c:if>
                                    </div>
                                    <div class="eval-content">
                                        <a class="eval-user-nickname" href="myHome.do?account=${evalVo.evalUser.account}"
                                           userId="${evalVo.evalUser.userId}" style="text-decoration: none;">
                                            ${evalVo.evalUser.nickname}
                                        </a>：${evalVo.eval.evalContent}
                                        <div class="eval-tool">
                                            <fmt:formatDate value="${evalVo.eval.createTime}" var="evalTime" pattern="yyyy-MM-dd HH:mm"/>
                                            <span style="color:#bfabab;">${evalTime}</span>
                                            <c:if test="${user != null}">
                                                <c:choose>
                                                    &lt;%&ndash; 评论者可以对此进行删除 &ndash;%&gt;
                                                    <c:when test="${user.userId == evalVo.evalUser.userId}">
                                                        <a class="eval-reply" evalId="${evalVo.eval.evalId}" href="javascript:void(0);" title="删除" style="display: none;">
                                                            <i class="fa fa-trash"></i>
                                                        </a>
                                                    </c:when>
                                                    &lt;%&ndash; 分享者可进行删除或者回复 &ndash;%&gt;
                                                    <c:when test="${user.userId == evalVo.shareUser.userId}">
                                                        <a class="eval-reply" evalId="${evalVo.eval.evalId}" href="javascript:void(0);" title="删除" style="display: none;">
                                                            <i class="fa fa-trash"></i>
                                                        </a>
                                                        <a class="eval-reply" evalId="${evalVo.eval.evalId}" href="javascript:void(0);" title="回复" style="display: none;">
                                                            <i class="fa fa-commenting"></i>
                                                        </a>
                                                    </c:when>
                                                    &lt;%&ndash; 其他过客只能进行回复 &ndash;%&gt;
                                                    <c:otherwise>
                                                        <a class="eval-reply" evalId="${evalVo.eval.evalId}" href="javascript:void(0);" title="回复" style="display: none;">
                                                            <i class="fa fa-commenting"></i>
                                                        </a>
                                                    </c:otherwise>
                                                </c:choose>
                                            </c:if>
                                        </div>
                                    </div>
                                </li>
                            </c:forEach>--%>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- end right -->

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
    </div>

    <jsp:include page="common/footer.jsp"/>
</div>
</body>
</html>