package edu.gmxx.share.dao;

import edu.gmxx.share.domain.ShareType;

public interface ShareTypeMapper {
    int deleteByPrimaryKey(String shareTypeId);

    int insert(ShareType record);

    int insertSelective(ShareType record);

    ShareType selectByPrimaryKey(String shareTypeId);

    int updateByPrimaryKeySelective(ShareType record);

    int updateByPrimaryKey(ShareType record);
}