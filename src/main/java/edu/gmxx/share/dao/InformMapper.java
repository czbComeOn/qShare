package edu.gmxx.share.dao;

import edu.gmxx.share.domain.Inform;

public interface InformMapper {
    int deleteByPrimaryKey(String informId);

    int insert(Inform record);

    int insertSelective(Inform record);

    Inform selectByPrimaryKey(String informId);

    int updateByPrimaryKeySelective(Inform record);

    int updateByPrimaryKey(Inform record);
}