package edu.gmxx.share.service;

import edu.gmxx.share.domain.Inform;
import edu.gmxx.share.domain.ShareType;
import edu.gmxx.share.domain.User;
import edu.gmxx.share.utils.PageModel;
import edu.gmxx.share.vo.InformVo;

import java.util.List;
import java.util.Map;

/**
 * 后台管理接口
 * Created by BIN on 2017/4/12.
 */
public interface IManageService {
    /**
     * 锁定用户
     * @param userId
     * @param time 锁定时间：单位/小时
     * @return
     */
    Map<String,Object> lockUser(String userId, long time);

    /**
     * 解锁用户
     * @param userId
     * @return
     */
    Map<String,Object> unlockUser(String userId);

    /**
     * 分页获取举报信息
     *
     * @param auditStatus
     * @param page
     * @return
     */
    List<InformVo> getInformDataByStatus(String auditStatus, PageModel page);

    /**
     * 审核举报信息
     * @param user
     * @param inform
     * @return
     */
    Map<String,Object> auditUser(User user, Inform inform);

    /**
     * 添加管理员
     * @param userId
     * @return
     */
    Map<String,Object> addAdmin(String userId);

    /**
     * 删除管理员
     * @param userId
     * @return
     */
    Map<String,Object> cancelAdmin(String userId);

    /**
     * 添加分享信息类别
     * @param shareType
     * @return
     */
    Map<String, Object> addShareType(ShareType shareType);

    /**
     * 删除分享信息类别
     * @param shareTypeId
     * @return
     */
    Map<String,Object> deleteShareType(String shareTypeId);

    /**
     * 修改分享信息类别
     * @param shareType
     * @return
     */
    Map<String,Object> updateShareType(ShareType shareType);
}
