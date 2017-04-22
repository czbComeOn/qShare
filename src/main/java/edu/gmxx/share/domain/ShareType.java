package edu.gmxx.share.domain;

public class ShareType {
    /**
     * 类别ID
     */
    private String shareTypeId;

    /**
     * 类别名称（生活、运动、户外、旅游等，默认：其他OTHER）
     */
    private String shareTypeName;

    /**
     * 类别顺序编号
     */
    private int typeNum;

    /**
     * 类别ID
     * @return share_type_id 类别ID
     */
    public String getShareTypeId() {
        return shareTypeId;
    }

    /**
     * 类别ID
     * @param shareTypeId 类别ID
     */
    public void setShareTypeId(String shareTypeId) {
        this.shareTypeId = shareTypeId == null ? null : shareTypeId.trim();
    }

    /**
     * 类别名称（生活、运动、户外、旅游等，默认：其他OTHER）
     * @return share_type_name 类别名称（生活、运动、户外、旅游等，默认：其他OTHER）
     */
    public String getShareTypeName() {
        return shareTypeName;
    }

    /**
     * 类别名称（生活、运动、户外、旅游等，默认：其他OTHER）
     * @param shareTypeName 类别名称（生活、运动、户外、旅游等，默认：其他OTHER）
     */
    public void setShareTypeName(String shareTypeName) {
        this.shareTypeName = shareTypeName == null ? null : shareTypeName.trim();
    }

    public int getTypeNum() {
        return typeNum;
    }

    public void setTypeNum(int typeNum) {
        this.typeNum = typeNum;
    }
}