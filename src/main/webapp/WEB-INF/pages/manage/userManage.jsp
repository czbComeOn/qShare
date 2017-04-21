<%--
  Created by IntelliJ IDEA.
  User: BIN
  Date: 2017/4/11
  Time: 18:45
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
    <title>轻.分享 - 用户管理</title>
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/resources/img/qshare.ico">

    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/toastr.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/animate.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/my-dialog.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/font-awesome.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/my.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/manage.css">
    <script data-main="${pageContext.request.contextPath}/resources/js/main"
            src="${pageContext.request.contextPath}/resources/js/require.min.js"></script>
    <script>
        require(['jquery', 'qshare/userManage', 'utils/app-dialog'], function($, um){
            um.init();
        });
    </script>
</head>
<body class="gray-bg">
    <div class="wrapper wrapper-content animated fadeInRight">
        <form class="form-horizontal" id="searchUserForm" action="#">
            <div class="row mrg-b-10" id="searchBox">
                <div class="col-sm-3 mrg-b-10">
                    <label for="userType">用户类型：</label>
                    <div class="user-type-select">
                        <select class="form-control" id="userTypeSelect">
                            <option value="">全部</option>
                            <option value="ADMIN">管理员</option>
                            <option value="NORMAL">普通用户</option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-3 col-sm-offset-1 mrg-b-10">
                    <label for="status">用户状态：</label>
                    <div class="user-status-select">
                        <select class="form-control" id="statusSelect">
                            <option value="">全部</option>
                            <option value="ONLINE">在线</option>
                            <option value="OFFLINE">离线</option>
                            <option value="LOCK">锁定</option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-4 col-sm-offset-1 mrg-b-10">
                    <input class="form-control user-search-text" type="text" placeholder="账号/昵称" />
                    <button class="btn btn-primary" type="submit"><i class="fa fa-search"></i></button>
                </div>
            </div>
        </form>
        <div class="row" id="userDataBox">
        </div>
        <div class="row" style="text-align:center;">
            <ul class="pagination" id="pagination">
            </ul>
            <input type="hidden" id="PageSize" value="9"/>
        </div>
    </div>
</body>
</html>
