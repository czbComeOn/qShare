package edu.gmxx.share.utils;

/**
 * 分页模型
 * Created by BIN on 2017/3/21.
 */
public class PageModel {
    private int pageNumber;

    private int pageSize;

    private int totalRecord;

    public int getPageNumber() {
        return pageNumber < 1 ? 1:(pageNumber > getTotalPages() ? getTotalPages() : pageNumber);
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getTotalRecord() {
        return totalRecord;
    }

    public void setTotalRecord(int totalRecord) {
        this.totalRecord = totalRecord;
    }

    /**
     * 获取总页数
     * @return
     */
    public int getTotalPages(){
        return ((int)Math.floor(totalRecord/pageSize)) + (totalRecord % pageSize == 0? 0:1);
    }

    /**
     * 获取当前序号
     * @return
     */
    public int getCurrentCount(){
        return (pageNumber - 1) * pageSize;
    }
}
