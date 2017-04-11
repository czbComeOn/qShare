<%--
  Created by IntelliJ IDEA.
  User: BIN
  Date: 2017/4/11
  Time: 13:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
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
                            <input class="form-control" id="account" name="account" type="text" data-bv-trigger="keyup" placeholder="账号" style="letter-spacing: 1px;" />
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
                            <input class="form-control" id="resetAccount" name="resetAccount" type="text" data-bv-trigger="keyup" placeholder="请输入账号" style="letter-spacing: 1px;" />
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
