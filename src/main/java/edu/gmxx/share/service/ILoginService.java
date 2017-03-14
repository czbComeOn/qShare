package edu.gmxx.share.service;

import java.util.Map;

/**
 * 登录服务接口
 *
 * @author 陈志斌
 */
public interface ILoginService {
    Map<String, Object> login(String userId);
}
