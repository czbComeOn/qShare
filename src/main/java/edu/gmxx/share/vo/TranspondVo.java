package edu.gmxx.share.vo;

import edu.gmxx.share.domain.Transpond;

/**
 * Created by BIN on 2017/3/31.
 */
public class TranspondVo {
    private Transpond transpond;

    /**
     * 原分享者昵称
     */
    private String nickname;

    public TranspondVo(){

    }

    public TranspondVo(Transpond transpond) {
        this.transpond = transpond;
    }

    public TranspondVo(String nickname) {
        this.nickname = nickname;
    }

    public TranspondVo(Transpond transpond, String nickname) {
        this.transpond = transpond;
        this.nickname = nickname;
    }

    public Transpond getTranspond() {
        return transpond;
    }

    public void setTranspond(Transpond transpond) {
        this.transpond = transpond;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
