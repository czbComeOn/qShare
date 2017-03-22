package edu.gmxx.share.domain;

public class Eval {
    /**
     * 评论ID
     */
    private String evalId;

    /**
     * 分享主题ID
     */
    private String shareId;

    /**
     * 评论者id
     */
    private String userId;

    /**
     * [{userId:'用户id',nickname:'昵称',time:评论时间,content:'内容'}]
     */
    private String evalContent;

    /**
     * 评论ID
     * @return eval_id 评论ID
     */
    public String getEvalId() {
        return evalId;
    }

    /**
     * 评论ID
     * @param evalId 评论ID
     */
    public void setEvalId(String evalId) {
        this.evalId = evalId == null ? null : evalId.trim();
    }

    /**
     * 分享主题ID
     * @return share_id 分享主题ID
     */
    public String getShareId() {
        return shareId;
    }

    /**
     * 分享主题ID
     * @param shareId 分享主题ID
     */
    public void setShareId(String shareId) {
        this.shareId = shareId == null ? null : shareId.trim();
    }

    /**
     * 评论者id
     * @return user_id 评论者id
     */
    public String getUserId() {
        return userId;
    }

    /**
     * 评论者id
     * @param userId 评论者id
     */
    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    /**
     * [{userId:'用户id',nickname:'昵称',time:评论时间,content:'内容'}]
     * @return eval_content [{userId:'用户id',nickname:'昵称',time:评论时间,content:'内容'}]
     */
    public String getEvalContent() {
        return evalContent;
    }

    /**
     * [{userId:'用户id',nickname:'昵称',time:评论时间,content:'内容'}]
     * @param evalContent [{userId:'用户id',nickname:'昵称',time:评论时间,content:'内容'}]
     */
    public void setEvalContent(String evalContent) {
        this.evalContent = evalContent == null ? null : evalContent.trim();
    }
}