package edu.gmxx.share.vo;

import edu.gmxx.share.domain.Friend;
import edu.gmxx.share.domain.User;

/**
 * 好友视图视图类
 * Created by BIN on 2017/4/6.
 */
public class FriendVo {
    private Friend friend;

    /**
     * 好友数据
     */
    private User user;

    /**
     * 好友分享数
     */
    private int shareCount;

    /**
     * 好友被关注数
     */
    private int attentionCount;

    public FriendVo(){

    }

    public FriendVo(Friend friend, User user){
        this.friend = friend;
        this.user = user;
    }

    public FriendVo(Friend friend, User user, int shareCount, int attentionCount){
        this.friend = friend;
        this.user = user;
        this.shareCount = shareCount;
        this.attentionCount = attentionCount;
    }

    public Friend getFriend() {
        return friend;
    }

    public User getUser() {
        return user;
    }

    public void setFriend(Friend friend) {
        this.friend = friend;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getShareCount() {
        return shareCount;
    }

    public void setShareCount(int shareCount) {
        this.shareCount = shareCount;
    }

    public int getAttentionCount() {
        return attentionCount;
    }

    public void setAttentionCount(int attentionCount) {
        this.attentionCount = attentionCount;
    }
}
