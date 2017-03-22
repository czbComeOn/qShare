package edu.gmxx.share.dao;

import edu.gmxx.share.domain.Share;
import edu.gmxx.share.domain.ShareWithBLOBs;
import edu.gmxx.share.domain.User;
import edu.gmxx.share.dto.ShareDTO;

import java.util.List;

public interface ShareMapper {
    int deleteByPrimaryKey(String shareId);

    int insert(ShareWithBLOBs record);

    int insertSelective(ShareWithBLOBs record);

    ShareWithBLOBs selectByPrimaryKey(String shareId);

    int updateByPrimaryKeySelective(ShareWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(ShareWithBLOBs record);

    int updateByPrimaryKey(Share record);

    /**
     * 根据分享信息类型获取信息
     * @param type
     * @return
     */
    List<ShareWithBLOBs> getShareByType(ShareDTO share);

    /**
     * 获取分享信息记录数
     * @param share
     * @return
     */
    int getShareCount(Share share);
}