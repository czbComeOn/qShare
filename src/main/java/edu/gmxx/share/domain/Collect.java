package edu.gmxx.share.domain;

public class Collect {
    /**
     * 收藏信息ID
     */
    private String collectId;

    /**
     * 收藏的用户ID
     */
    private String userId;

    /**
     * 收藏主题ID
     */
    private String shareId;

    public Collect(){

    }

    public Collect(String collectId){
        this.collectId = collectId;
    }

    public Collect(String shareId, String userId){
        this.shareId = shareId;
        this.userId = userId;
    }

    public Collect(String collectId, String shareId, String userId){
        this.collectId = collectId;
        this.shareId = shareId;
        this.userId = userId;
    }

    /**
     * 收藏信息ID
     * @return collect_id 收藏信息ID
     */
    public String getCollectId() {
        return collectId;
    }

    /**
     * 收藏信息ID
     * @param collectId 收藏信息ID
     */
    public void setCollectId(String collectId) {
        this.collectId = collectId == null ? null : collectId.trim();
    }

    /**
     * 收藏的用户ID
     * @return user_id 收藏的用户ID
     */
    public String getUserId() {
        return userId;
    }

    /**
     * 收藏的用户ID
     * @param userId 收藏的用户ID
     */
    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    /**
     * 收藏主题ID
     * @return share_id 收藏主题ID
     */
    public String getShareId() {
        return shareId;
    }

    /**
     * 收藏主题ID
     * @param shareId 收藏主题ID
     */
    public void setShareId(String shareId) {
        this.shareId = shareId == null ? null : shareId.trim();
    }
}