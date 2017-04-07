package edu.gmxx.share.domain;

public class Friend {
    /**
     * 好友关系ID
     */
    private String friendId;

    /**
     * 拥有该好友列表
     */
    private String auserId;

    /**
     * 被加为好友的用户
     */
    private String buserId;

    /**
     * 所属分组ID
     */
    private String groupId;

    /**
     * 
     */
    private Byte isFriend;

    /**
     * 是否为关注关系
     */
    private Byte isAttention;

    /**
     * 好友关系ID
     * @return friend_id 好友关系ID
     */
    public String getFriendId() {
        return friendId;
    }

    /**
     * 好友关系ID
     * @param friendId 好友关系ID
     */
    public void setFriendId(String friendId) {
        this.friendId = friendId == null ? null : friendId.trim();
    }

    /**
     * 拥有该好友列表
     * @return auser_id 拥有该好友列表
     */
    public String getAuserId() {
        return auserId;
    }

    /**
     * 拥有该好友列表
     * @param auserId 拥有该好友列表
     */
    public void setAuserId(String auserId) {
        this.auserId = auserId == null ? null : auserId.trim();
    }

    /**
     * 被加为好友的用户
     * @return buser_id 被加为好友的用户
     */
    public String getBuserId() {
        return buserId;
    }

    /**
     * 被加为好友的用户
     * @param buserId 被加为好友的用户
     */
    public void setBuserId(String buserId) {
        this.buserId = buserId == null ? null : buserId.trim();
    }

    /**
     * 所属分组ID
     * @return group_id 所属分组ID
     */
    public String getGroupId() {
        return groupId;
    }

    /**
     * 所属分组ID
     * @param groupId 所属分组ID
     */
    public void setGroupId(String groupId) {
        this.groupId = groupId == null ? null : groupId.trim();
    }

    /**
     * 
     * @return is_friend 
     */
    public Byte getIsFriend() {
        return isFriend;
    }

    /**
     * 
     * @param isFriend 
     */
    public void setIsFriend(Byte isFriend) {
        this.isFriend = isFriend;
    }

    /**
     * 是否为关注关系
     * @return is_attention 是否为关注关系
     */
    public Byte getIsAttention() {
        return isAttention;
    }

    /**
     * 是否为关注关系
     * @param isAttention 是否为关注关系
     */
    public void setIsAttention(Byte isAttention) {
        this.isAttention = isAttention;
    }
}