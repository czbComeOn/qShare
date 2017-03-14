package edu.gmxx.share.dao;

import edu.gmxx.share.domain.Transpond;

public interface TranspondMapper {
    int deleteByPrimaryKey(String transpondId);

    int insert(Transpond record);

    int insertSelective(Transpond record);

    Transpond selectByPrimaryKey(String transpondId);

    int updateByPrimaryKeySelective(Transpond record);

    int updateByPrimaryKey(Transpond record);
}