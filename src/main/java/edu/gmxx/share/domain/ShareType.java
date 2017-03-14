package edu.gmxx.share.domain;

public class ShareType {
    private String shareTypeId;

    private String shareTypeName;

    public String getShareTypeId() {
        return shareTypeId;
    }

    public void setShareTypeId(String shareTypeId) {
        this.shareTypeId = shareTypeId == null ? null : shareTypeId.trim();
    }

    public String getShareTypeName() {
        return shareTypeName;
    }

    public void setShareTypeName(String shareTypeName) {
        this.shareTypeName = shareTypeName == null ? null : shareTypeName.trim();
    }
}