package edu.gmxx.share.dao;

import edu.gmxx.share.domain.Friend;
import edu.gmxx.share.dto.UserDTO;

import java.util.List;

public interface FriendMapper {
    int deleteByPrimaryKey(String friendId);

    int insert(Friend record);

    int insertSelective(Friend record);

    Friend selectByPrimaryKey(String friendId);

    int updateByPrimaryKeySelective(Friend record);

    int updateByPrimaryKey(Friend record);

    /**
     * 根据分组获取好友信息
     * @param groupId
     * @return
     */
    List<Friend> getFriendByGroupId(String groupId);

    /**
     * 获取分组下的好友数
     * @param groupId
     * @return
     */
    int getFriendCountByGroup(String groupId);

    /**
     * 双向删除好友信息
     * @param friend
     */
    int deleteFriend(Friend friend);

    /**
     * 是否已有该好友
     * @param friend
     * @return
     */
    int getFriendByUser(Friend friend);

    /**
     * 获取好友个数
     * @param userId
     * @return
     */
    int getFriendCountByUser(String userId);

    /**
     * 根据a、b两用户判断是否已关注
     * @param friend
     * @return
     */
    Friend getAttentionByABUser(Friend friend);

    /**
     * 根据a、b两用户判断是否为好友关系
     * @param friend
     * @return
     */
    Friend getFriendByABUser(Friend friend);

    /**
     * 获取被我关注的好友记录数
     * @param userId
     * @return
     */
    int getMeAttentionWhoCount(String userId);

    /**
     * 获取被我关注的好友信息
     * @param userDTO
     * @return
     */
    List<Friend> getMeAttentionWho(UserDTO userDTO);

    /**
     * 获取关注我的好友记录数
     * @param userId
     * @return
     */
    int getWhoAttentionMeCount(String userId);

    /**
     * 获取关注我的好友信息
     * @param userDTO
     * @return
     */
    List<Friend> getWhoAttentionMe(UserDTO userDTO);
}