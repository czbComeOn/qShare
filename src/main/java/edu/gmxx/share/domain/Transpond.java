package edu.gmxx.share.domain;

import java.util.Date;

public class Transpond {
    private String transpondId;

    private String shareId;

    private Date transpondTime;

    private String reason;

    private String userId;

    public String getTranspondId() {
        return transpondId;
    }

    public void setTranspondId(String transpondId) {
        this.transpondId = transpondId == null ? null : transpondId.trim();
    }

    public String getShareId() {
        return shareId;
    }

    public void setShareId(String shareId) {
        this.shareId = shareId == null ? null : shareId.trim();
    }

    public Date getTranspondTime() {
        return transpondTime;
    }

    public void setTranspondTime(Date transpondTime) {
        this.transpondTime = transpondTime;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason == null ? null : reason.trim();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }
}