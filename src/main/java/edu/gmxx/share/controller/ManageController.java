package edu.gmxx.share.controller;

import edu.gmxx.share.domain.Inform;
import edu.gmxx.share.domain.ShareType;
import edu.gmxx.share.domain.User;
import edu.gmxx.share.service.IManageService;
import edu.gmxx.share.utils.PageModel;
import edu.gmxx.share.vo.InformVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 后台管理
 * Created by BIN on 2017/4/11.
 */
@RequestMapping("manage")
@Controller
public class ManageController {
    @Autowired
    private IManageService manageService;

    /**
     * 锁定用户
     * @param userId
     * @param time
     * @param session
     * @return
     */
    @RequestMapping(value="lockUser.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> lockUser(String userId, int time, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }
        result = manageService.lockUser(userId, time);
        result.put("currUser", user);

        return result;
    }

    /**
     * 解锁用户
     * @param userId
     * @param session
     * @return
     */
    @RequestMapping(value="unlockUser.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> unlockUser(String userId, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        result = manageService.unlockUser(userId);
        result.put("currUser", user);

        return result;
    }

    /**
     * 分页获取举报信息
     * @param page
     * @param session
     * @return
     */
    @RequestMapping(value="getInformDataByStatus.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getInformDataByStatus(String auditStatus, PageModel page, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        List<InformVo> informVos = manageService.getInformDataByStatus(auditStatus, page);
        result.put("page", page);
        result.put("auditStatus", auditStatus);
        result.put("informVos", informVos);
        result.put("currUser", user);
        result.put("msg", "success");

        return result;
    }

    /**
     * 对用户进行审核
     * @param inform
     * @param session
     * @return
     */
    @RequestMapping(value="auditUser.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> auditUser(Inform inform, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return manageService.auditUser(user, inform);
    }

    /**
     * 将用户升级为管理员
     * @param userId
     * @param session
     * @return
     */
    @RequestMapping(value="addAdmin.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addAdmin(String userId, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return manageService.addAdmin(userId);
    }

    /**
     * 取消管理员
     * @param userId
     * @param session
     * @return
     */
    @RequestMapping(value="cancelAdmin.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> cancelAdmin(String userId, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return manageService.cancelAdmin(userId);
    }

    @RequestMapping(value="addShareType.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addShareType(ShareType shareType, HttpSession session) {
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return manageService.addShareType(shareType);
    }

    /**
     * 删除分享用户类型
     * @param shareTypeId
     * @param session
     * @return
     */
    @RequestMapping(value="deleteShareType.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deleteShareType(String shareTypeId, HttpSession session) {
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return manageService.deleteShareType(shareTypeId);
    }

    /**
     * 修改分享信息类别
     * @param shareType
     * @param session
     * @return
     */
    @RequestMapping(value="updateShareType.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateShareType(ShareType shareType, HttpSession session) {
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return manageService.updateShareType(shareType);
    }
}
