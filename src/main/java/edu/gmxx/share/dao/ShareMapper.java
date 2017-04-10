package edu.gmxx.share.dao;

import edu.gmxx.share.domain.Share;
import edu.gmxx.share.dto.ShareDTO;

import java.util.List;

public interface ShareMapper {
    int deleteByPrimaryKey(String shareId);

    int insert(Share record);

    int insertSelective(Share record);

    Share selectByPrimaryKey(String shareId);

    int updateByPrimaryKeySelective(Share record);

    int updateByPrimaryKey(Share record);

    /**
     * 根据分享信息类型获取信息
     * @param type
     * @return
     */
    List<Share> getShareByType(ShareDTO share);

    /**
     * 获取分享信息记录数
     * @param share
     * @return
     */
    int getShareCount(Share share);

    /**
     * 获取用户分享信息数量
     * @param userId
     * @return
     */
    int getShareCountByUser(String userId);

    /**
     * 获取收藏的分享信息
     * @param shareDTO
     * @return
     */
    List<Share> getCollectShare(ShareDTO shareDTO);

    /**
     * 获取最近好友动态
     * @param userId
     * @return
     */
    List<Share> getFriendDynamic(ShareDTO shareDTO);

    /**
     * 获取关注好友动态
     * @param shareDTO
     * @return
     */
    List<Share> getAttentionDynamic(ShareDTO shareDTO);
}