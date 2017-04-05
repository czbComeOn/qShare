package edu.gmxx.share.controller;

import edu.gmxx.share.domain.User;
import edu.gmxx.share.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * 用户信息操作
 * Created by BIN on 2017/4/3.
 */
@RequestMapping("user")
@Controller
public class UserController {
    @Autowired
    private IUserService userService;

    /**
     * 获取修改前的用户数据
     * @param session
     * @return
     */
    @RequestMapping(value="getUserData.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getUserData(HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        User userData = userService.getUserByAccount(user.getAccount());
        result.put("userData", userData);
        result.put("msg", "success");

        return result;
    }

    /**
     * 修改用户信息
     * @param userData
     * @param session
     * @return
     */
    @RequestMapping(value="changeData.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> changeData(User userData, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        result = userService.updateUserData(user, userData);
        // 如果修改成功则更新session数据
        if(result.get("msg").toString().equals("success")){
            User newData = (User) result.get("newData");
            session.setAttribute("user", newData);
        }

        return result;
    }

    /**
     * 修改密码
     * @param account
     * @param oldPassword
     * @param newPassword
     * @param session
     * @return
     */
    @RequestMapping(value="changePassword.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> changePassword(String account, String oldPassword, String newPassword
            , String againPassword, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        result = userService.updatePassword(user, account, oldPassword, newPassword, againPassword);
        // 如果修改成功则更新session数据
        if(result.get("msg").toString().equals("success")){
            User newData = (User) result.get("newData");
            session.setAttribute("user", newData);
        }
        return result;
    }
}
