package edu.gmxx.share.dao;

import edu.gmxx.share.domain.Share;
import edu.gmxx.share.domain.ShareWithBLOBs;

public interface ShareMapper {
    int deleteByPrimaryKey(String shareId);

    int insert(ShareWithBLOBs record);

    int insertSelective(ShareWithBLOBs record);

    ShareWithBLOBs selectByPrimaryKey(String shareId);

    int updateByPrimaryKeySelective(ShareWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(ShareWithBLOBs record);

    int updateByPrimaryKey(Share record);
}