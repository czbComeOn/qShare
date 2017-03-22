package edu.gmxx.share.domain;

import java.util.Date;

public class Transpond {
    /**
     * 转发Id
     */
    private String transpondId;

    /**
     * 分享信息Id
     */
    private String shareId;

    /**
     * 转发时间
     */
    private Date transpondTime;

    /**
     * 转发理由
     */
    private String reason;

    /**
     * 转发者Id
     */
    private String userId;

    /**
     * 转发Id
     * @return transpond_id 转发Id
     */
    public String getTranspondId() {
        return transpondId;
    }

    /**
     * 转发Id
     * @param transpondId 转发Id
     */
    public void setTranspondId(String transpondId) {
        this.transpondId = transpondId == null ? null : transpondId.trim();
    }

    /**
     * 分享信息Id
     * @return share_id 分享信息Id
     */
    public String getShareId() {
        return shareId;
    }

    /**
     * 分享信息Id
     * @param shareId 分享信息Id
     */
    public void setShareId(String shareId) {
        this.shareId = shareId == null ? null : shareId.trim();
    }

    /**
     * 转发时间
     * @return transpond_time 转发时间
     */
    public Date getTranspondTime() {
        return transpondTime;
    }

    /**
     * 转发时间
     * @param transpondTime 转发时间
     */
    public void setTranspondTime(Date transpondTime) {
        this.transpondTime = transpondTime;
    }

    /**
     * 转发理由
     * @return reason 转发理由
     */
    public String getReason() {
        return reason;
    }

    /**
     * 转发理由
     * @param reason 转发理由
     */
    public void setReason(String reason) {
        this.reason = reason == null ? null : reason.trim();
    }

    /**
     * 转发者Id
     * @return user_id 转发者Id
     */
    public String getUserId() {
        return userId;
    }

    /**
     * 转发者Id
     * @param userId 转发者Id
     */
    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }
}