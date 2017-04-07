package edu.gmxx.share.vo;

import edu.gmxx.share.domain.Collect;
import edu.gmxx.share.domain.Share;
import edu.gmxx.share.domain.User;

import java.util.List;

/**
 * Created by BIN on 2017/3/22.
 */
public class ShareVo {
    private Share share;

    /**
     * 转发量
     */
    private int transpondCount;

    private User user;

    /**
     * 收藏列表
     */
    private List<Collect> collects;

    /**
     * 转发
     */
    private TranspondVo transpondVo;

    public ShareVo(){

    }

    public ShareVo(Share share, User user){
        this.share = share;
        this.user = user;
    }

    public ShareVo(Share share, User user, List<Collect> collects) {
        this.share = share;
        this.user = user;
        this.collects = collects;
    }

    public ShareVo(Share share, User user, List<Collect> collects, TranspondVo transpondVo) {
        this.share = share;
        this.user = user;
        this.collects = collects;
        this.transpondVo = transpondVo;
    }

    public ShareVo(Share share, User user, List<Collect> collects, TranspondVo transpondVo, int transpondCount) {
        this.share = share;
        this.user = user;
        this.collects = collects;
        this.transpondVo = transpondVo;
        this.transpondCount = transpondCount;
    }

    public Share getShare() {
        return share;
    }

    public void setShare(Share share) {
        this.share = share;
    }

    public int getTranspondCount() {
        return transpondCount;
    }

    public void setTranspondCount(int transpondCount) {
        this.transpondCount = transpondCount;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Collect> getCollects() {
        return collects;
    }

    public void setCollects(List<Collect> collects) {
        this.collects = collects;
    }

    public TranspondVo getTranspondVo() {
        return transpondVo;
    }

    public void setTranspondVo(TranspondVo transpondVo) {
        this.transpondVo = transpondVo;
    }
}
