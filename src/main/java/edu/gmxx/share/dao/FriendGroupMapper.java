package edu.gmxx.share.dao;

import edu.gmxx.share.domain.FriendGroup;

import java.util.List;

public interface FriendGroupMapper {
    int deleteByPrimaryKey(String groupId);

    int insert(FriendGroup record);

    int insertSelective(FriendGroup record);

    FriendGroup selectByPrimaryKey(String groupId);

    int updateByPrimaryKeySelective(FriendGroup record);

    int updateByPrimaryKey(FriendGroup record);

    /**
     * 根据用户id获取分组列表
     * @param userId
     * @return
     */
    List<FriendGroup> getGroupByUserId(String userId);

    /**
     * 获取用户的默认分组
     * @param userId
     * @return
     */
    FriendGroup getDefaultGroup(String userId);

    /**
     * 获取分组个数
     * @param userId
     * @return
     */
    int getGroupCountByUser(String userId);
}