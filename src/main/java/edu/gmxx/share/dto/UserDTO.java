package edu.gmxx.share.dto;

import edu.gmxx.share.domain.User;
import edu.gmxx.share.utils.PageModel;

/**
 * Created by BIN on 2017/4/7.
 */
public class UserDTO {
    private User user;

    private PageModel page;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PageModel getPage() {
        return page;
    }

    public void setPage(PageModel page) {
        this.page = page;
    }
}
