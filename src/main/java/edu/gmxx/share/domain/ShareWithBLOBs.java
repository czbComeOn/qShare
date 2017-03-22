package edu.gmxx.share.domain;

public class ShareWithBLOBs extends Share {
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

    public ShareWithBLOBs(){
        super();
    }

    public ShareWithBLOBs(String shareTypeId){
        super(shareTypeId);
    }

    /**
     * 图片信息json数组[{imgName:图片名称,imgPath:图片路径}]
     * @return img_info 图片信息json数组[{imgName:图片名称,imgPath:图片路径}]
     */
    public String getImgInfo() {
        return imgInfo;
    }

    /**
     * 图片信息json数组[{imgName:图片名称,imgPath:图片路径}]
     * @param imgInfo 图片信息json数组[{imgName:图片名称,imgPath:图片路径}]
     */
    public void setImgInfo(String imgInfo) {
        this.imgInfo = imgInfo == null ? null : imgInfo.trim();
    }

    /**
     * 对该信息进行转发的用户
     * @return transpond_user_id 对该信息进行转发的用户
     */
    public String getTranspondUserId() {
        return transpondUserId;
    }

    /**
     * 对该信息进行转发的用户
     * @param transpondUserId 对该信息进行转发的用户
     */
    public void setTranspondUserId(String transpondUserId) {
        this.transpondUserId = transpondUserId == null ? null : transpondUserId.trim();
    }

    /**
     * 点赞的用户
     * @return thumb_up_id 点赞的用户
     */
    public String getThumbUpId() {
        return thumbUpId;
    }

    /**
     * 点赞的用户
     * @param thumbUpId 点赞的用户
     */
    public void setThumbUpId(String thumbUpId) {
        this.thumbUpId = thumbUpId == null ? null : thumbUpId.trim();
    }
}