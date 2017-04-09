package edu.gmxx.share.vo;

import edu.gmxx.share.domain.FriendGroup;

/**
 * Created by BIN on 2017/4/6.
 */
public class FriendGroupVo {
    private FriendGroup group;

    /**
     * 分组好友个数
     */
    private int friendCount;

    public FriendGroupVo(){

    }

    public FriendGroupVo(FriendGroup group, int friendCount) {
        this.group = group;
        this.friendCount = friendCount;
    }

    public FriendGroup getGroup() {
        return group;
    }

    public void setGroup(FriendGroup group) {
        this.group = group;
    }

    public int getFriendCount() {
        return friendCount;
    }

    public void setFriendCount(int friendCount) {
        this.friendCount = friendCount;
    }
}
