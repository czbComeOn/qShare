package edu.gmxx.share.dao;

import edu.gmxx.share.domain.Friend;

public interface FriendMapper {
    int deleteByPrimaryKey(String friendId);

    int insert(Friend record);

    int insertSelective(Friend record);

    Friend selectByPrimaryKey(String friendId);

    int updateByPrimaryKeySelective(Friend record);

    int updateByPrimaryKey(Friend record);
}