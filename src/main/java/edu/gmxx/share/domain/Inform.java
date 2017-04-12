package edu.gmxx.share.domain;

import java.util.Date;

public class Inform {
    /**
     * 举报ID
     */
    private String informId;

    /**
     * 举报者
     */
    private String auserId;

    /**
     * 被举报者ID
     */
    private String buserId;

    /**
     * 举报时间
     */
    private Date createTime;

    /**
     * 审核人：审核被举报用户是否发布违规内容，并进行处理
     */
    private String auditUserId;

    /**
     * 审核时间
     */
    private Date auditTime;

    /**
     * LOCK：锁定用户，NORMAL：正常
     */
    private String auditStatus;

    /**
     * 举报内容
     */
    private String informContent;

    /**
     * 审核信息备注
     */
    private String auditRemark;

    public Inform(){

    }

    public Inform(String auditStatus){
        this.auditStatus = auditStatus;
    }

    /**
     * 举报ID
     * @return inform_id 举报ID
     */
    public String getInformId() {
        return informId;
    }

    /**
     * 举报ID
     * @param informId 举报ID
     */
    public void setInformId(String informId) {
        this.informId = informId == null ? null : informId.trim();
    }

    /**
     * 举报者
     * @return auser_id 举报者
     */
    public String getAuserId() {
        return auserId;
    }

    /**
     * 举报者
     * @param auserId 举报者
     */
    public void setAuserId(String auserId) {
        this.auserId = auserId == null ? null : auserId.trim();
    }

    /**
     * 被举报者ID
     * @return buser_id 被举报者ID
     */
    public String getBuserId() {
        return buserId;
    }

    /**
     * 被举报者ID
     * @param buserId 被举报者ID
     */
    public void setBuserId(String buserId) {
        this.buserId = buserId == null ? null : buserId.trim();
    }

    /**
     * 举报时间
     * @return create_time 举报时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 举报时间
     * @param createTime 举报时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 审核人：审核被举报用户是否发布违规内容，并进行处理
     * @return audit_user_id 审核人：审核被举报用户是否发布违规内容，并进行处理
     */
    public String getAuditUserId() {
        return auditUserId;
    }

    /**
     * 审核人：审核被举报用户是否发布违规内容，并进行处理
     * @param auditUserId 审核人：审核被举报用户是否发布违规内容，并进行处理
     */
    public void setAuditUserId(String auditUserId) {
        this.auditUserId = auditUserId == null ? null : auditUserId.trim();
    }

    /**
     * 审核时间
     * @return audit_time 审核时间
     */
    public Date getAuditTime() {
        return auditTime;
    }

    /**
     * 审核时间
     * @param auditTime 审核时间
     */
    public void setAuditTime(Date auditTime) {
        this.auditTime = auditTime;
    }

    /**
     * LOCK：锁定用户，NORMAL：正常
     * @return audit_status LOCK：锁定用户，NORMAL：正常
     */
    public String getAuditStatus() {
        return auditStatus;
    }

    /**
     * LOCK：锁定用户，NORMAL：正常
     * @param auditStatus LOCK：锁定用户，NORMAL：正常
     */
    public void setAuditStatus(String auditStatus) {
        this.auditStatus = auditStatus == null ? null : auditStatus.trim();
    }

    /**
     * 举报内容
     * @return inform_content 举报内容
     */
    public String getInformContent() {
        return informContent;
    }

    /**
     * 举报内容
     * @param informContent 举报内容
     */
    public void setInformContent(String informContent) {
        this.informContent = informContent == null ? null : informContent.trim();
    }

    public String getAuditRemark() {
        return auditRemark;
    }

    public void setAuditRemark(String auditRemark) {
        this.auditRemark = auditRemark;
    }
}