<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
    <title>轻.分享 - 个人主页</title>
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
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/home.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/my-dialog.css">
    <script data-main="${pageContext.request.contextPath}/resources/js/main"
            src="${pageContext.request.contextPath}/resources/js/require.min.js"></script>
    <script>
        require(['jquery', 'qshare/home', 'utils/cropper.min', 'utils/sitelogo'],
                function($, home){
            home.init('${acc.account}');
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
                <div class="login-box panel fl" style="width: 300px;">
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
            <ul class="nav navbar-nav show-home">
                <li><a href="index.do" name="index"><i class="fa fa-home"></i> 主页</a></li>
                <c:if test="${user != null && acc.userId == user.userId}">
                    <li class="active home-tab"><a href="javascript:void(0);" name="share"><i class="fa fa-share-alt"></i> 我的分享</a></li>
                    <li class="home-tab"><a href="javascript:void(0);" name="collect"><i class="fa fa-star"></i> 我的收藏</a></li>
                    <li class="home-tab"><a href="javascript:void(0);" name="friend"><i class="fa fa-heart"></i> 好友列表</a></li>
                    <li class="home-tab"><a href="javascript:void(0);" name="attention"><i class="fa fa-link"></i> 关注好友</a></li>
                </c:if>
                <c:if test="${user == null || acc.userId != user.userId}">
                    <li class="active"><a href="javascript:void(0);" name="share"><i class="fa fa-share-alt"></i> TA的分享</a></li>
                </c:if>
                <c:if test="${user == null}">
                    <li><a id="login" href="javascript:void(0);" name="login">立即登录</a></li>
                </c:if>
                <c:if test="${user != null && acc.userId != user.userId}">
                    <li><a href="myHome.do?account=${user.account}"><i class="fa fa-home">&nbsp;</i>我的主页</a></li>
                </c:if>
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
                <div class="myleft-n mrg20" id="crop-avatar">
                    <c:if test="${user != null && acc.userId == user.userId}">
                        <div class="avatar-view" title="点击更换头像">
                            <c:choose>
                                <c:when test="${acc.portraitPath != null}">
                                    <img class="fl imgr mrg-r-20 portrait" src="${pageContext.request.contextPath}/${acc.portraitPath}">
                                </c:when>
                                <c:otherwise>
                                    <img class="fl imgr mrg-r-20 portrait" src="${pageContext.request.contextPath}/resources/img/header/portrait.jpg">
                                </c:otherwise>
                            </c:choose>
                        </div>
                    </c:if>
                    <c:if test="${user == null || acc.userId != user.userId}">
                        <div>
                            <c:choose>
                                <c:when test="${acc.portraitPath != null}">
                                    <img class="fl imgr mrg-r-20 portrait" src="${pageContext.request.contextPath}/${acc.portraitPath}">
                                </c:when>
                                <c:otherwise>
                                    <img class="fl imgr mrg-r-20 portrait" src="${pageContext.request.contextPath}/resources/img/header/portrait.jpg">
                                </c:otherwise>
                            </c:choose>
                        </div>
                    </c:if>
                    <div class="user-info fl">
                        <h4><a class="nickname" href="myHome.do?account=${acc.account}" title="个人主页">${acc.nickname}</a></h4>
                        <div class="addr" style="color:#b8ecfa">
                            <i class="fa fa-map-marker"></i>
                            <c:choose>
                                <c:when test="${acc.region == null || acc.region == ''}">未知</c:when>
                                <c:otherwise>${acc.region}</c:otherwise>
                            </c:choose>
                        </div>
                    </div>
                    <div class="cf"></div>
                </div>
                <div class="cf"></div>
                <div class="myleft-n">
                        <div class="panel panel-info">
                            <div class="panel-heading" style="text-align: center;">
                                个人资料
                            </div>
                            <div class="panel-body user-info">
                                <ul class="list-group">
                                    <li class="list-group-item list-group-item-info">
                                        <div>真实姓名：</div>
                                        <div class="acc-name">
                                            <c:if test="${acc.name == null || acc.name == ''}">
                                                未知
                                            </c:if>
                                            <c:if test="${acc.name != null && acc.name != ''}">
                                                ${acc.name}
                                            </c:if>
                                        </div>
                                    </li>
                                    <li class="list-group-item list-group-item-warning">
                                        <div>个性签名：</div>
                                        <div class="acc-signature">
                                            <c:if test="${acc.signature == null || acc.signature == ''}">
                                                无
                                            </c:if>
                                            <c:if test="${acc.signature != null && acc.signature != ''}">
                                                ${acc.signature}
                                            </c:if>
                                        </div>
                                    </li>
                                    <li class="list-group-item list-group-item-danger">
                                        <div>个人说明：</div>
                                        <div class="acc-notes">
                                            <c:if test="${acc.notes == null || acc.notes == ''}">
                                                无
                                            </c:if>
                                            <c:if test="${acc.notes != null && acc.notes != ''}">
                                                ${acc.notes}
                                            </c:if>
                                        </div>
                                    </li>
                                    <li class="list-group-item list-group-item-text">
                                        <div>生日：</div>
                                        <div>
                                            <c:if test="${acc.birthday == null}">
                                                未知
                                            </c:if>
                                            <c:if test="${acc.birthday != null}">
                                                <fmt:formatDate value="${acc.birthday}" var="birthday" pattern="yyyy年 MM月 dd日" />
                                                ${birthday}
                                            </c:if>
                                        </div>
                                    </li>
                                    <li class="list-group-item list-group-item-info">
                                        <div>星座：</div>
                                        <div>
                                            <c:choose>
                                                <c:when test="${acc.constellation == 1}">水瓶座</c:when>
                                                <c:when test="${acc.constellation == 2}">双鱼座</c:when>
                                                <c:when test="${acc.constellation == 3}">白羊座</c:when>
                                                <c:when test="${acc.constellation == 4}">金牛座</c:when>
                                                <c:when test="${acc.constellation == 5}">双子座</c:when>
                                                <c:when test="${acc.constellation == 6}">巨蟹座</c:when>
                                                <c:when test="${acc.constellation == 7}">狮子座</c:when>
                                                <c:when test="${acc.constellation == 8}">处女座</c:when>
                                                <c:when test="${acc.constellation == 9}">天秤座</c:when>
                                                <c:when test="${acc.constellation == 10}">天蝎座</c:when>
                                                <c:when test="${acc.constellation == 11}">射手座</c:when>
                                                <c:when test="${acc.constellation == 12}">摩羯座</c:when>
                                                <c:otherwise>未知</c:otherwise>
                                            </c:choose>
                                        </div>
                                    </li>
                                    <li class="list-group-item list-group-item-warning">
                                        <div>爱好：</div>
                                        <div>
                                            <c:if test="${acc.hobby == null || acc.hobby == ''}">
                                                无
                                            </c:if>
                                            <c:if test="${acc.hobby != null && acc.hobby != ''}">
                                                ${acc.hobby}
                                            </c:if>
                                        </div>
                                    </li>
                                    <li class="list-group-item list-group-item-danger">
                                        <div>学历：</div>
                                        <div>
                                            <c:choose>
                                                <c:when test="${acc.eduInfo == 'A'}">小学及以下</c:when>
                                                <c:when test="${acc.eduInfo == 'B'}">初中</c:when>
                                                <c:when test="${acc.eduInfo == 'C'}">高中/中专</c:when>
                                                <c:when test="${acc.eduInfo == 'D'}">大学专科</c:when>
                                                <c:when test="${acc.eduInfo == 'E'}">大学本科</c:when>
                                                <c:when test="${acc.eduInfo == 'F'}">研究生</c:when>
                                                <c:when test="${acc.eduInfo == 'G'}">博士及以上</c:when>
                                                <c:otherwise>未知</c:otherwise>
                                            </c:choose>
                                        </div>
                                    </li>
                                    <li class="list-group-item list-group-item-text">
                                        <div>毕业院校：</div>
                                        <div class="acc-graduate">
                                            <c:if test="${acc.graduateInstitutions == null || acc.graduateInstitutions == ''}">
                                                未知
                                            </c:if>
                                            <c:if test="${acc.graduateInstitutions != null && acc.graduateInstitutions != ''}">
                                                ${acc.graduateInstitutions}
                                            </c:if>
                                        </div>
                                    </li>
                                    <li class="list-group-item list-group-item-info">
                                        <div>职业：</div>
                                        <div class="acc-occupation">
                                            <c:if test="${acc.occupation == null || acc.occupation == ''}">
                                                未知
                                            </c:if>
                                            <c:if test="${acc.occupation != null && acc.occupation != ''}">
                                                ${acc.occupation}
                                            </c:if>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <c:if test="${user != null}">
                                <div class="panel-footer">
                                    <c:if test="${acc.userId != user.userId}">
                                        <c:if test="${isAttention == true}">
                                            <button class="btn btn-info" id="addAttention" style="width:49%;">取消关注</button>
                                        </c:if>
                                        <c:if test="${isAttention == false}">
                                            <button class="btn btn-info" id="addAttention" style="width:49%;">关注TA</button>
                                        </c:if>
                                        <button class="btn btn-info" id="addFriend" style="width:49%;">加为好友</button>
                                    </c:if>
                                    <c:if test="${acc.userId == user.userId}">
                                        <button class="btn btn-info" id="changeData" style="width:100%;">
                                            <i class="fa fa-edit"></i> 修改资料
                                        </button>
                                    </c:if>
                                </div>
                            </c:if>
                        </div>
                    </div>
            </div>
            <!-- end left -->
            <!-- right -->
            <div class="col-md-8 myright">
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

<div class="modal fade" id="avatar-modal" aria-hidden="true" aria-labelledby="avatar-modal-label" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form class="avatar-form" action="file/uploadPortrait.do" enctype="multipart/form-data" method="post">
                <div class="modal-header">
                    <button class="close" data-dismiss="modal" type="button">&times;</button>
                    <h4 class="modal-title" id="avatar-modal-label">更换头像</h4>
                </div>
                <div class="modal-body">
                    <div class="avatar-body">
                        <div class="avatar-upload">
                            <input class="avatar-src" name="avatar_src" type="hidden">
                            <input class="avatar-data" name="avatarData" type="hidden">
                            <label for="avatarInput">图片上传</label>
                            <input class="avatar-input" id="avatarInput" type="file" name="file"
                                   capture="camera"/>
                        </div>
                        <div class="row">
                            <div class="col-md-9">
                                <div class="avatar-wrapper"></div>
                            </div>
                            <div class="col-md-3">
                                <div class="avatar-preview preview-lg"></div>
                                <div class="avatar-preview preview-md"></div>
                                <div class="avatar-preview preview-sm"></div>
                            </div>
                        </div>
                        <div class="row avatar-btns">
                            <div class="col-md-9">
                                <%--<div class="btn-group">
                                    <button class="btn" data-method="rotate" data-option="-90" type="button" title="Rotate -90 degrees"><i class="fa fa-undo"></i> 向左旋转</button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn" data-method="rotate" data-option="90" type="button" title="Rotate 90 degrees"><i class="fa fa-repeat"></i> 向右旋转</button>
                                </div>--%>
                            </div>
                            <div class="col-md-3">
                                <button class="btn btn-success btn-block avatar-save" type="submit"><i class="fa fa-save"></i> 保存修改</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>