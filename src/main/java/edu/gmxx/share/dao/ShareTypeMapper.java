package edu.gmxx.share.dao;

import edu.gmxx.share.domain.ShareType;

import java.util.List;

public interface ShareTypeMapper {
    int deleteByPrimaryKey(String shareTypeId);

    int insert(ShareType record);

    int insertSelective(ShareType record);

    ShareType selectByPrimaryKey(String shareTypeId);

    int updateByPrimaryKeySelective(ShareType record);

    int updateByPrimaryKey(ShareType record);

    /**
     * 获取所有分享信息类别
     * @return
     */
    List<ShareType> getAllShareType();
}