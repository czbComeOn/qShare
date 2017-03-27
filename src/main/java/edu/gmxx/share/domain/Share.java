package edu.gmxx.share.domain;

import java.util.Date;

public class Share {
    /**
     * 分享ID
     */
    private String shareId;

    /**
     * 分享主题（30个字以内）
     */
    private String shareTitle;

    /**
     * 分享内容（100字以内）
     */
    private String shareContent;

    /**
     * 发布时间
     */
    private Date createTime;

    /**
     * 音乐路径
     */
    private String musicPath;

    /**
     * 视频路径
     */
    private String videoPath;

    /**
     * 分享者ID
     */
    private String userId;

    /**
     * all:所有人可见，friend:仅好友/关注可见，self:仅自己可见
     */
    private String visible;

    /**
     * 信息所属类别,默认:其他
     */
    private String shareTypeId;

    /**
     * 是否被删除 0:已删除,1未删除
     */
    private Integer delStatus;

    /**
     * 图片信息json数组[{imgName:图片名称,imgPath:图片路径}]
     */
    private String imgInfo;

    /**
     * 对该信息进行转发的用户
     */
    private String transpondUserId;

    /**
     * 点赞的用户
     */
    private String thumbUpId;

    public Share(){

    }

    public Share(String shareId, int delStatus){
        this.shareId = shareId;
        this.delStatus = delStatus;
    }

    public Share(String shareTypeId) {
        this.shareTypeId = shareTypeId;
    }

    /**
     * 分享ID
     * @return share_id 分享ID
     */
    public String getShareId() {
        return shareId;
    }

    /**
     * 分享ID
     * @param shareId 分享ID
     */
    public void setShareId(String shareId) {
        this.shareId = shareId == null ? null : shareId.trim();
    }

    /**
     * 分享主题（20个字以内）
     * @return share_title 分享主题（20个字以内）
     */
    public String getShareTitle() {
        return shareTitle;
    }

    /**
     * 分享主题（30个字以内）
     * @param shareTitle 分享主题（30个字以内）
     */
    public void setShareTitle(String shareTitle) {
        this.shareTitle = shareTitle == null ? null : shareTitle.trim();
    }

    /**
     * 分享内容（100字以内）
     * @return share_content 分享内容（100字以内）
     */
    public String getShareContent() {
        return shareContent;
    }

    /**
     * 分享内容（100字以内）
     * @param shareContent 分享内容（100字以内）
     */
    public void setShareContent(String shareContent) {
        this.shareContent = shareContent == null ? null : shareContent.trim();
    }

    /**
     * 发布时间
     * @return create_time 发布时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 发布时间
     * @param createTime 发布时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 音乐路径
     * @return music_path 音乐路径
     */
    public String getMusicPath() {
        return musicPath;
    }

    /**
     * 音乐路径
     * @param musicPath 音乐路径
     */
    public void setMusicPath(String musicPath) {
        this.musicPath = musicPath == null ? null : musicPath.trim();
    }

    /**
     * 视频路径
     * @return video_path 视频路径
     */
    public String getVideoPath() {
        return videoPath;
    }

    /**
     * 视频路径
     * @param videoPath 视频路径
     */
    public void setVideoPath(String videoPath) {
        this.videoPath = videoPath == null ? null : videoPath.trim();
    }

    /**
     * 分享者ID
     * @return user_id 分享者ID
     */
    public String getUserId() {
        return userId;
    }

    /**
     * 分享者ID
     * @param userId 分享者ID
     */
    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    /**
     * all:所有人可见，friend:仅好友/关注可见，self:仅自己可见
     * @return visible all:所有人可见，friend:仅好友/关注可见，self:仅自己可见
     */
    public String getVisible() {
        return visible;
    }

    /**
     * all:所有人可见，friend:仅好友/关注可见，self:仅自己可见
     * @param visible all:所有人可见，friend:仅好友/关注可见，self:仅自己可见
     */
    public void setVisible(String visible) {
        this.visible = visible == null ? null : visible.trim();
    }

    /**
     * 信息所属类别,默认:其他
     * @return share_type_id 信息所属类别,默认:其他
     */
    public String getShareTypeId() {
        return shareTypeId;
    }

    /**
     * 信息所属类别,默认:其他
     * @param shareTypeId 信息所属类别,默认:其他
     */
    public void setShareTypeId(String shareTypeId) {
        this.shareTypeId = shareTypeId == null ? null : shareTypeId.trim();
    }

    /**
     * 是否被删除 0:已删除,1未删除
     * @return del_status 是否被删除 0:已删除,1未删除
     */
    public Integer getDelStatus() {
        return delStatus;
    }

    /**
     * 是否被删除 0:已删除,1未删除
     * @param delStatus 是否被删除 0:已删除,1未删除
     */
    public void setDelStatus(Integer delStatus) {
        this.delStatus = delStatus;
    }

    public String getImgInfo() {
        return imgInfo;
    }

    public void setImgInfo(String imgInfo) {
        this.imgInfo = imgInfo;
    }

    public String getTranspondUserId() {
        return transpondUserId;
    }

    public void setTranspondUserId(String transpondUserId) {
        this.transpondUserId = transpondUserId;
    }

    public String getThumbUpId() {
        return thumbUpId;
    }

    public void setThumbUpId(String thumbUpId) {
        this.thumbUpId = thumbUpId;
    }
}