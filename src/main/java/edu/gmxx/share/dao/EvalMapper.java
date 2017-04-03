package edu.gmxx.share.dao;

import edu.gmxx.share.domain.Eval;

import java.util.List;

public interface EvalMapper {
    int deleteByPrimaryKey(String evalId);

    int insert(Eval record);

    int insertSelective(Eval record);

    Eval selectByPrimaryKey(String evalId);

    int updateByPrimaryKeySelective(Eval record);

    int updateByPrimaryKey(Eval record);

    /**
     * 删除回复信息
     * @param evalId
     */
    void deleteByReplyEval(String evalId);

    /**
     * 获取回复
     * @param evalId
     * @return
     */
    List<Eval> getEvalByReplyEval(String evalId);

    /**
     * 根据分享id获取评论
     * @param shareId
     * @return
     */
    List<Eval> getEvalByShareId(String shareId);
}