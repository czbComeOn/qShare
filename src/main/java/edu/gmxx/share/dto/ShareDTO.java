package edu.gmxx.share.dto;

import edu.gmxx.share.domain.Share;
import edu.gmxx.share.utils.PageModel;

/**
 * Created by BIN on 2017/3/21.
 */
public class ShareDTO {
    private Share share;

    private PageModel page;

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
}
