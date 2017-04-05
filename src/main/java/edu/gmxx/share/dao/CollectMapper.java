package edu.gmxx.share.dao;

import edu.gmxx.share.domain.Collect;

import java.util.List;

public interface CollectMapper {
    int deleteByPrimaryKey(String collectId);

    int insert(Collect record);

    int insertSelective(Collect record);

    Collect selectByPrimaryKey(String collectId);

    int updateByPrimaryKeySelective(Collect record);

    int updateByPrimaryKey(Collect record);

    /**
     * 根据用户id和分享信息id获取收藏信息
     * @param collect
     * @return
     */
    Collect getCollectByUserAndShare(Collect collect);

    /**
     * 获取分享信息的收藏列表
     * @param shareId
     * @return
     */
    List<Collect> getCollectByShareId(String shareId);

    /**
     * 获取用户收藏分享数
     * @param userId
     * @return
     */
    int getCollectCountByUser(String userId);
}