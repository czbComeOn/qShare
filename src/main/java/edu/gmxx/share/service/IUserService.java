package edu.gmxx.share.service;

import edu.gmxx.share.domain.User;

import java.util.Map;

/**
 * 登录、注册服务接口
 *
 * @author 陈志斌
 */
public interface IUserService {
    Map<String, Object> login(User user);

    /**
     * 用户注册
     * @param user
     * @return
     */
    Map<String, Object> register(User user);

    /**
     * 根据账号获取用户信息
     * @param account
     * @return
     */
    User getUserByAccount(String account);

    /**
     * 退出登录，改变用户状态
     * @param user
     */
    void logout(User user);

    /**
     * 修改用户信息
     * @param user
     */
    int updateUserById(User user);
}
