package edu.gmxx.share.service;

import edu.gmxx.share.domain.Friend;
import edu.gmxx.share.domain.FriendGroup;
import edu.gmxx.share.domain.Inform;
import edu.gmxx.share.domain.User;
import edu.gmxx.share.utils.PageModel;

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
     * @param currUser
     */
    Map<String, Object> updateUserData(User currUser, User userData);

    int updateUserById(User user);

    /**
     * 修改密码
     * @param user
     * @param account
     * @param oldPassword
     * @param newPassword
     * @param againPassword
     * @return
     */
    Map<String,Object> updatePassword(User user, String account, String oldPassword, String newPassword, String againPassword);

    /**
     * 获取分组信息
     * @param user
     * @return
     */
    Map<String,Object> getGroup(User user);

    /**
     * 获取分组下的好友信息
     * @param user
     * @param group
     * @return
     */
    Map<String,Object> getFriend(User user, FriendGroup group);

    /**
     * 删除好友信息
     * @param auserId
     * @param buserId
     * @return
     */
    Map<String,Object> deleteFriend(String auserId, String buserId);

    /**
     * 单方向添加新好友
     * @param user
     * @param account
     * @return
     */
    Map<String,Object> addFriend(User user, String account);

    /**
     * 单方向删除好友
     * @param friendId
     * @return
     */
    Map<String,Object> deleteFriendById(String friendId);

    /**
     * 创建新分组
     * @param user
     * @param group
     * @return
     */
    Map<String,Object> createGroup(FriendGroup group);

    /**
     * 删除分组，将分组内的好友移至默认分组
     * @param group
     * @return
     */
    Map<String,Object> deleteFriendGroup(FriendGroup group);

    /**
     * 修改分组信息
     * @param group
     * @return
     */
    Map<String,Object> updateGroup(FriendGroup group);

    /**
     * 获取好友数量
     * @param userId
     * @return
     */
    int getFriendCountByUser(String userId);

    /**
     * 获取被关注数量
     * @param userId
     * @return
     */
    int getAttentionCountByUser(String userId);

    /**
     * 是否已关注
     * @param auserId
     * @param buserId
     * @return
     */
    boolean isAttention(String auserId, String buserId);

    /**
     * 是否为好友
     * @param auserId
     * @param buserId
     * @return
     */
    boolean isFriend(String auserId, String buserId);

    /**
     * 添加关注
     * @param user
     * @param account
     * @return
     */
    Map<String,Object> addAttention(User user, String account);

    /**
     * 取消关注
     * @param user
     * @param account
     * @return
     */
    Map<String,Object> deleteAttention(User user, String account);

    /**
     * 根据账号模糊查找用户
     * @param user
     * @param account
     * @param page
     * @return
     */
    Map<String,Object> searchAccount(User user, String account, PageModel page);

    /**
     * 根据昵称模糊查找用户
     * @param user
     * @param nickname
     * @param page
     * @return
     */
    Map<String,Object> searchNickname(User user, String nickname, PageModel page);

    /**
     * 修改分组
     *
     * @param user
     * @param friend
     * @return
     */
    Map<String,Object> changeGroup(User user, Friend friend);

    /**
     * 获取被我关注的用户信息
     * @param userId
     * @param page
     * @return
     */
    Map<String,Object> getMeAttentionWho(String userId, PageModel page);

    /**
     * 获取关注我的用户信息
     * @param userId
     * @param page
     * @return
     */
    Map<String,Object> getWhoAttentionMe(String userId, PageModel page);

    /**
     * 获取我关注的用户个数
     * @param userId
     * @return
     */
    int getMeAttentionWhoCount(String userId);

    /**
     * 获取关注我的用户个数
     * @param userId
     * @return
     */
    int getWhoAttentionMeCount(String userId);

    Map<String,Object> informUser(User user, Inform inform);
}
