package edu.gmxx.share.domain;

import java.util.Date;

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
     * 分享者ID
     */
    private String shareUserId;

    /**
     * 最初评论时间
     */
    private Date createTime;

    /**
     * 回复评论Id
     */
    private String replyEvalId;

    /**
     * 回复用户ID
     */
    private String replyUserId;

    /**
     * 评论/回复内容
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
     * 分享者ID
     * @return share_user_id 分享者ID
     */
    public String getShareUserId() {
        return shareUserId;
    }

    /**
     * 分享者ID
     * @param shareUserId 分享者ID
     */
    public void setShareUserId(String shareUserId) {
        this.shareUserId = shareUserId == null ? null : shareUserId.trim();
    }

    /**
     * 最初评论时间
     * @return create_time 最初评论时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 最初评论时间
     * @param createTime 最初评论时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 回复评论Id
     * @return reply_eval_id 回复评论Id
     */
    public String getReplyEvalId() {
        return replyEvalId;
    }

    /**
     * 回复评论Id
     * @param replyEvalId 回复评论Id
     */
    public void setReplyEvalId(String replyEvalId) {
        this.replyEvalId = replyEvalId == null ? null : replyEvalId.trim();
    }

    /**
     * 回复用户ID
     * @return reply_user_id 回复用户ID
     */
    public String getReplyUserId() {
        return replyUserId;
    }

    /**
     * 回复用户ID
     * @param replyUserId 回复用户ID
     */
    public void setReplyUserId(String replyUserId) {
        this.replyUserId = replyUserId == null ? null : replyUserId.trim();
    }

    /**
     * 评论/回复内容
     * @return eval_content 评论/回复内容
     */
    public String getEvalContent() {
        return evalContent;
    }

    /**
     * 评论/回复内容
     * @param evalContent 评论/回复内容
     */
    public void setEvalContent(String evalContent) {
        this.evalContent = evalContent == null ? null : evalContent.trim();
    }
}