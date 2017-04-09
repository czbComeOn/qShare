package edu.gmxx.share.controller;

import edu.gmxx.share.domain.Friend;
import edu.gmxx.share.domain.FriendGroup;
import edu.gmxx.share.domain.Inform;
import edu.gmxx.share.domain.User;
import edu.gmxx.share.service.IUserService;
import edu.gmxx.share.utils.PageModel;
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

    /**
     * 获取分组信息
     * @param session
     * @return
     */
    @RequestMapping(value="getGroup.do",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getGroup(HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return userService.getGroup(user);
    }

    /**
     * 获取分组下的好友信息
     * @param group
     * @param session
     * @return
     */
    @RequestMapping(value="getFriend.do",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getFriend(FriendGroup group, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return userService.getFriend(user, group);
    }

    /**
     * 添加好友
     * @param account
     * @param session
     * @return
     */
    @RequestMapping(value="addFriend.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addFriend(String account, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return userService.addFriend(user, account);
    }

    /**
     * 添加关注
     * @param account
     * @param session
     * @return
     */
    @RequestMapping(value="addAttention.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addAttention(String account, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return userService.addAttention(user, account);
    }

    /**
     * 取消关注
     * @param account
     * @param session
     * @return
     */
    @RequestMapping(value="deleteAttention.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deleteAttention(String account, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return userService.deleteAttention(user, account);
    }

    /**
     * 删除好友
     * @param friendId
     * @param session
     * @return
     */
    @RequestMapping(value="deleteFriend.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deleteFriend(String friendId, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return userService.deleteFriendById(friendId);
    }

    /**
     * 创建新分组
     * @param group
     * @param session
     * @return
     */
    @RequestMapping(value="createGroup.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> createGroup(FriendGroup group, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }
        group.setUserId(user.getUserId());

        return userService.createGroup(group);
    }

    /**
     * 删除分组，分组内的好友将移至默认分组内
     * @param group
     * @param session
     * @return
     */
    @RequestMapping(value="deleteGroup.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deleteGroup(FriendGroup group, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }
        group.setUserId(user.getUserId());

        return userService.deleteFriendGroup(group);
    }

    /**
     * 修改分组信息
     * @param group
     * @param session
     * @return
     */
    @RequestMapping(value = "updateGroup.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateGroup(FriendGroup group, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return userService.updateGroup(group);
    }

    /**
     * 根据账号模糊查找用户
     * @param account
     * @param session
     * @return
     */
    @RequestMapping(value="searchAccount.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> searchAccount(String account, PageModel page, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return userService.searchAccount(user, account, page);
    }

    /**
     * 根据昵称模糊查找用户
     * @param nickname
     * @param session
     * @return
     */
    @RequestMapping(value="searchNickname.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> searchNickname(String nickname, PageModel page, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return userService.searchNickname(user, nickname, page);
    }

    /**
     * 修改好友分组
     * @param friend
     * @param session
     * @return
     */
    @RequestMapping(value="changeGroup.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> changeGroup(Friend friend, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return userService.changeGroup(user, friend);
    }

    /**
     * 获取我关注和我被关注的用户个数
     * @param session
     * @return
     */
    @RequestMapping(value="getAttentionCount.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getAttentionCount(HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        result.put("meAttentionWhoCount", userService.getMeAttentionWhoCount(user.getUserId()));
        result.put("whoAttentionMeCount", userService.getWhoAttentionMeCount(user.getUserId()));
        result.put("msg", "success");

        return result;
    }

    /**
     * 获取被我关注的用户
     * @param page
     * @param session
     * @return
     */
    @RequestMapping(value="getMeAttentionWho.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getMeAttentionWho(PageModel page, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return userService.getMeAttentionWho(user.getUserId(), page);
    }

    /**
     * 获取关注的我用户
     * @param page
     * @param session
     * @return
     */
    @RequestMapping(value="getWhoAttentionMe.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getWhoAttentionMe(PageModel page, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return userService.getWhoAttentionMe(user.getUserId(), page);
    }

    /**
     * 举报用户
     * @param userId
     * @param session
     * @return
     */
    @RequestMapping(value="informUser.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> informUser(Inform inform, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }
        return userService.informUser(user, inform);
    }
}
