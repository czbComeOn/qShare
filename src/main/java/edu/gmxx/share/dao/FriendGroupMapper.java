package edu.gmxx.share.dao;

import edu.gmxx.share.domain.FriendGroup;

public interface FriendGroupMapper {
    int deleteByPrimaryKey(String groupId);

    int insert(FriendGroup record);

    int insertSelective(FriendGroup record);

    FriendGroup selectByPrimaryKey(String groupId);

    int updateByPrimaryKeySelective(FriendGroup record);

    int updateByPrimaryKey(FriendGroup record);
}