package edu.gmxx.share.dao;

import edu.gmxx.share.domain.User;
import edu.gmxx.share.dto.ShareDTO;
import edu.gmxx.share.dto.UserDTO;
import edu.gmxx.share.utils.PageModel;

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

    /**
     * 根据收藏信息获取用户信息
     * @param shareDto
     * @return
     */
    List<User> getUserIdByCollectShare(ShareDTO shareDto);

    /**
     * 根据账号模糊查找用户
     * @param userDto
     * @return
     */
    List<User> searchAccount(UserDTO userDto);

    /**
     * 根据昵称模糊查找用户
     * @param userDto
     * @return
     */
    List<User> searchNickname(UserDTO userDto);

    /**
     * 获取账号查询结果记录数
     * @param user
     * @return
     */
    int searchAccountCount(User user);

    /**
     * 获取昵称查询结果记录数
     * @param user
     * @return
     */
    int searchNicknameCount(User user);

    /**
     * 获取所有用户
     * @return
     */
    int getAllUserCount(String userId);

    List<User> getAllUserByPage(UserDTO userDTO);
}