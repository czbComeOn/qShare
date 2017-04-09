package edu.gmxx.share.vo;

import edu.gmxx.share.domain.Transpond;
import edu.gmxx.share.domain.User;

/**
 * Created by BIN on 2017/3/31.
 */
public class TranspondVo {
    private Transpond transpond;

    /**
     * 原分享者信息
     */
    private User user;

    public TranspondVo(){

    }

    public TranspondVo(Transpond transpond, User user) {
        this.transpond = transpond;
        this.user = user;
    }

    public Transpond getTranspond() {
        return transpond;
    }

    public void setTranspond(Transpond transpond) {
        this.transpond = transpond;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
