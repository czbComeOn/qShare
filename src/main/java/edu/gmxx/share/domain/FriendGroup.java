package edu.gmxx.share.domain;

public class FriendGroup {
    /**
     * 分组ID
     */
    private String groupId;

    /**
     * 所属用户id
     */
    private String userId;

    /**
     * 分组名称
     */
    private String groupName;

    /**
     * 分组序号
     */
    private Integer num;

    /**
     * 分组ID
     * @return group_id 分组ID
     */
    public String getGroupId() {
        return groupId;
    }

    /**
     * 分组ID
     * @param groupId 分组ID
     */
    public void setGroupId(String groupId) {
        this.groupId = groupId == null ? null : groupId.trim();
    }

    /**
     * 所属用户id
     * @return user_id 所属用户id
     */
    public String getUserId() {
        return userId;
    }

    /**
     * 所属用户id
     * @param userId 所属用户id
     */
    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    /**
     * 分组名称
     * @return group_name 分组名称
     */
    public String getGroupName() {
        return groupName;
    }

    /**
     * 分组名称
     * @param groupName 分组名称
     */
    public void setGroupName(String groupName) {
        this.groupName = groupName == null ? null : groupName.trim();
    }

    /**
     * 分组序号
     * @return num 分组序号
     */
    public Integer getNum() {
        return num;
    }

    /**
     * 分组序号
     * @param num 分组序号
     */
    public void setNum(Integer num) {
        this.num = num;
    }
}