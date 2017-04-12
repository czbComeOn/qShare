package edu.gmxx.share.vo;

import edu.gmxx.share.domain.Inform;
import edu.gmxx.share.domain.User;

/**
 * Created by BIN on 2017/4/12.
 */
public class InformVo {
    /**
     * 举报信息
     */
    private Inform inform;

    /**
     * 举报者
     */
    private User auser;

    /**
     * 被举报者
     */
    private User buser;

    /**
     * 审核人
     */
    private User auditUser;

    public InformVo(){

    }

    public InformVo(Inform inform, User auser, User buser, User auditUser) {
        this.inform = inform;
        this.auser = auser;
        this.buser = buser;
        this.auditUser = auditUser;
    }

    public Inform getInform() {
        return inform;
    }

    public void setInform(Inform inform) {
        this.inform = inform;
    }

    public User getAuser() {
        return auser;
    }

    public void setAuser(User auser) {
        this.auser = auser;
    }

    public User getBuser() {
        return buser;
    }

    public void setBuser(User buser) {
        this.buser = buser;
    }

    public User getAuditUser() {
        return auditUser;
    }

    public void setAuditUser(User auditUser) {
        this.auditUser = auditUser;
    }
}
