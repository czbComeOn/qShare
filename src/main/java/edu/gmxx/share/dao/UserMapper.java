package edu.gmxx.share.dao;

import edu.gmxx.share.domain.User;
import edu.gmxx.share.dto.ShareDTO;

import java.util.List;

public interface UserMapper {
    /**
     * 根据主键删除用户信息
     * @param userId
     * @return
     */
    int deleteByPrimaryKey(String userId);

    /**
     * 插入一条用户信息
     * @param record
     * @return
     */
    int insert(User record);

    /**
     * 去空插入用户信息
     * @param record
     * @return
     */
    int insertSelective(User record);

    /**
     * 根据主键获取用户信息
     * @param userId
     * @return
     */
    User selectByPrimaryKey(String userId);

    /**
     * 去空更新用户信息
     * @param record
     * @return
     */
    int updateByPrimaryKeySelective(User record);

    /**
     * 全部更新用户信息
     * @param record
     * @return
     */
    int updateByPrimaryKey(User record);

    /**
     * 根据账户查找用户
     * @param account
     * @return
     */
    User selectUserByAccount(String account);

    /**
     * 根据手机号码查找用户
     * @param phone
     * @return
     */
    User selectUserByPhone(String phone);

    /**
     * 根据账号或邮箱获取用户信息
     * @param account
     * @param email
     * @return
     */
    User getUserByAccountOrEmail(String account);

    /**
     * 获取用户id列表
     * @param shareVo
     * @return
     */
    List<User> getUserIdByType(ShareDTO shareDto);

    /**
     * 根据账号获取用户信息
     * @param account
     * @return
     */
    User getUserByAccount(String account);
}