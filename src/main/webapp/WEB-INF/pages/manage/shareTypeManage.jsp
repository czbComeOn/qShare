<%--
  Created by IntelliJ IDEA.
  User: BIN
  Date: 2017/4/23
  Time: 22:27
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
    <title>轻.分享 - 分享类别管理</title>
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
        require(['jquery', 'qshare/typeManage', 'utils/app-dialog'], function($, type){
            type.init();
        });
    </script>
</head>
<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>分享类别管理</h5>
                    <a class="fr" id="addShareType" href="#" style="text-decoration:none;">
                        <i class="fa fa-plus"></i> 新增类别
                    </a>
                </div>
                <div class="ibox-content">
                    <table class="footable table table-stripped toggle-arrow-tiny default breakpoint
                        no-paging footable-loaded" id="shareTypeTable" style="margin-bottom:0;">
                        <thead>
                            <tr>
                                <th class="footable-visible">类别编码</th>
                                <th class="footable-visible">类别名称</th>
                                <th class="footable-visible">类别编号</th>
                                <th class="footable-visible">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <c:forEach items="${shareTypes}" var="shareType">
                                <tr>
                                    <td class="share-type-id">${shareType.shareTypeId}</td>
                                    <td class="share-type-name">${shareType.shareTypeName}</td>
                                    <td class="type-num">${shareType.typeNum}</td>
                                    <td>
                                        <c:if test="${shareType != null && shareType.shareTypeId != 'qt'}">
                                            <a class="update-share-type mrg-r-10" href="#" title="修改"><i class="fa fa-edit"></i></a>
                                            <a class="delete-share-type" href="#" title="删除"><i class="fa fa-trash"></i></a>
                                        </c:if>
                                    </td>
                                </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>

