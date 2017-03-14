package edu.gmxx.share.domain;

public class ShareWithBLOBs extends Share {
    private String imgInfo;

    private String transpondUserId;

    private String thumbUpId;

    public String getImgInfo() {
        return imgInfo;
    }

    public void setImgInfo(String imgInfo) {
        this.imgInfo = imgInfo == null ? null : imgInfo.trim();
    }

    public String getTranspondUserId() {
        return transpondUserId;
    }

    public void setTranspondUserId(String transpondUserId) {
        this.transpondUserId = transpondUserId == null ? null : transpondUserId.trim();
    }

    public String getThumbUpId() {
        return thumbUpId;
    }

    public void setThumbUpId(String thumbUpId) {
        this.thumbUpId = thumbUpId == null ? null : thumbUpId.trim();
    }
}