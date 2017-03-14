package edu.gmxx.share.dao;

import edu.gmxx.share.domain.Eval;

public interface EvalMapper {
    int deleteByPrimaryKey(String evalId);

    int insert(Eval record);

    int insertSelective(Eval record);

    Eval selectByPrimaryKey(String evalId);

    int updateByPrimaryKeySelective(Eval record);

    int updateByPrimaryKeyWithBLOBs(Eval record);

    int updateByPrimaryKey(Eval record);
}