<%--
  Created by IntelliJ IDEA.
  User: BIN
  Date: 2017/4/11
  Time: 16:05
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
    <title>轻.分享 - 后台管理</title>
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/resources/img/qshare.ico">

    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/toastr.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/font-awesome.min.css">

    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/animate.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/my-dialog.css">
    <script data-main="${pageContext.request.contextPath}/resources/js/main"
            src="${pageContext.request.contextPath}/resources/js/require.min.js"></script>
    <script>
        require(['jquery', 'qshare/manage'], function($, manage){
            manage.init();
        });
    </script>
</head>
<body class="fixed-sidebar full-height-layout gray-bg" style="overflow:hidden">
    <div id="wrapper">
        <!--左侧导航开始-->
        <nav class="navbar-default navbar-static-side" role="navigation">
            <div class="nav-close"><i class="fa fa-times-circle"></i>
            </div>
            <div class="sidebar-collapse">
                <ul class="nav" id="side-menu">
                    <li class="nav-header">
                        <div class="dropdown profile-element">
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                <span class="clear">
                                    <a class="block m-t-xs" href="index.do" style="font-size:20px;" title="轻.分享主页">
                                        <i class="fa fa-share-alt"></i>
                                        <strong class="font-bold">轻.分享</strong>
                                    </a>
                                </span>
                            </a>
                        </div>
                        <div class="logo-element"><a href="index.do" title="轻.分享主页"><i class="fa fa-share-alt"></i></a></div>
                    </li>
                    <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                        <span class="ng-scope">控制台</span>
                    </li>
                    <li>
                        <a href="myHome.do?account=${user.account}" target="_blank" title="我的主页">
                            <i class="fa fa-home"></i>
                            <span class="nav-label">我的主页</span>
                        </a>
                    </li>
                    <li>
                        <a class="J_menuItem" href="userManage.do" title="用户管理">
                            <i class="fa fa-user-md"></i>
                            <span class="nav-label">用户管理</span>
                        </a>
                    </li>
                    <li>
                        <a class="J_menuItem" href="informManage.do" title="举报管理">
                            <i class="fa fa-cog"></i>
                            <span class="nav-label">举报管理</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <!--左侧导航结束-->
        <!--右侧导航开始-->
        <div id="page-wrapper" class="gray-bg dashbard-1">
            <div class="row border-bottom">
                <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                    <div class="navbar-header">
                        <a class="navbar-minimalize minimalize-styl-2 btn btn-info " href="javascript:void(0);">
                            <i class="fa fa-bars"></i>
                        </a>
                    </div>
                </nav>
            </div>
            <div class="row J_mainContent" id="content-main">
                <iframe id="J_iframe" width="100%" height="100%" src="userManage.do" frameborder="0"></iframe>
            </div>
        </div>
        <!--右侧导航结束-->
    </div>
</body>
</html>
