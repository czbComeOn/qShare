package edu.gmxx.share.dto;

import edu.gmxx.share.domain.Share;
import edu.gmxx.share.domain.User;
import edu.gmxx.share.utils.PageModel;

/**
 * Created by BIN on 2017/3/21.
 */
public class ShareDTO {
    private Share share;

    private PageModel page;

    /**
     * 当前操作用户
     */
    private User user;

    public ShareDTO(){

    }

    public ShareDTO(Share share, PageModel page){
        this.share = share;
        this.page = page;
    }

    public ShareDTO(Share share, PageModel page, User user){
        this.share = share;
        this.page = page;
        this.user = user;
    }

    public Share getShare() {
        return share;
    }

    public void setShare(Share share) {
        this.share = share;
    }

    public PageModel getPage() {
        return page;
    }

    public void setPage(PageModel page) {
        this.page = page;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
