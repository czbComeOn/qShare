package edu.gmxx.share.vo;

import edu.gmxx.share.domain.Eval;
import edu.gmxx.share.domain.User;

/**
 * Created by BIN on 2017/4/1.
 */
public class EvalVo {
    private Eval eval;

    /**
     * 信息分享者
     */
    private User shareUser;

    /**
     * 操作者
     */
    private User evalUser;

    /**
     * 回复用户
     */
    private User replyUser;

    public EvalVo(){

    }

    public EvalVo(Eval eval){
        this.eval = eval;
    }

    public EvalVo(Eval eval, User shareUser, User evalUser, User replyUser) {
        this.eval = eval;
        this.shareUser = shareUser;
        this.evalUser = evalUser;
        this.replyUser = replyUser;
    }

    public Eval getEval() {
        return eval;
    }

    public void setEval(Eval eval) {
        this.eval = eval;
    }

    public User getShareUser() {
        return shareUser;
    }

    public void setShareUser(User shareUser) {
        this.shareUser = shareUser;
    }

    public User getEvalUser() {
        return evalUser;
    }

    public void setEvalUser(User evalUser) {
        this.evalUser = evalUser;
    }

    public User getReplyUser() {
        return replyUser;
    }

    public void setReplyUser(User replyUser) {
        this.replyUser = replyUser;
    }
}
