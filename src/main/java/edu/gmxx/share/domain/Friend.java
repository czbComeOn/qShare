package edu.gmxx.share.domain;

public class Friend {
    private String friendId;

    private String aUserId;

    private String bUserId;

    private String groupId;

    private Byte isFriend;

    private Byte isAttention;

    public String getFriendId() {
        return friendId;
    }

    public void setFriendId(String friendId) {
        this.friendId = friendId == null ? null : friendId.trim();
    }

    public String getaUserId() {
        return aUserId;
    }

    public void setaUserId(String aUserId) {
        this.aUserId = aUserId == null ? null : aUserId.trim();
    }

    public String getbUserId() {
        return bUserId;
    }

    public void setbUserId(String bUserId) {
        this.bUserId = bUserId == null ? null : bUserId.trim();
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId == null ? null : groupId.trim();
    }

    public Byte getIsFriend() {
        return isFriend;
    }

    public void setIsFriend(Byte isFriend) {
        this.isFriend = isFriend;
    }

    public Byte getIsAttention() {
        return isAttention;
    }

    public void setIsAttention(Byte isAttention) {
        this.isAttention = isAttention;
    }
}