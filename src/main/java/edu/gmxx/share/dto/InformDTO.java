package edu.gmxx.share.dto;

import edu.gmxx.share.domain.Inform;
import edu.gmxx.share.utils.PageModel;

/**
 * Created by BIN on 2017/4/12.
 */
public class InformDTO {
    /**
     * 举报信息
     */
    private Inform inform;

    /**
     * 分页数据
     */
    private PageModel page;

    public InformDTO(){

    }

    public InformDTO(Inform inform, PageModel page) {
        this.inform = inform;
        this.page = page;
    }

    public Inform getInform() {
        return inform;
    }

    public void setInform(Inform inform) {
        this.inform = inform;
    }

    public PageModel getPage() {
        return page;
    }

    public void setPage(PageModel page) {
        this.page = page;
    }
}
