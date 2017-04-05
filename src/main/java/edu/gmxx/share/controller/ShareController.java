package edu.gmxx.share.controller;

import edu.gmxx.share.domain.Eval;
import edu.gmxx.share.domain.Share;
import edu.gmxx.share.domain.Transpond;
import edu.gmxx.share.domain.User;
import edu.gmxx.share.service.IShareService;
import edu.gmxx.share.utils.PageModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by BIN on 2017/3/21.
 */
@Controller
@RequestMapping("share")
public class ShareController {
    @Autowired
    private IShareService shareService;

    /**
     * 新增分享信息
     * @return
     */
    @RequestMapping(value = "addShare.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addShare(Share share, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        // 判断用户是否存在
        User user = (User) session.getAttribute("user");

        // 用户未登录
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return shareService.addShare(share, user);
    }

    /**
     * 加载分享信息
     * @param type
     * @param page
     * @param session
     * @return
     */
    @RequestMapping("loadShare.do")
    @ResponseBody
    public Map<String, Object> loadShare(String type, String account, PageModel page, HttpSession session){
        User user = (User) session.getAttribute("user");

        // 保存当前请求的信息类型
        if(StringUtils.isEmpty(type)){
            type = (String) session.getAttribute("shareTypeId");
        }
        if(StringUtils.isEmpty(type)){
            type = "all";
        }
        session.setAttribute("shareTypeId", type);

        return shareService.getShareByType(type, account, user, page);
    }

    /**
     * 获取收藏的分享信息
     * @param session
     * @return
     */
    @RequestMapping("getCollectShare.do")
    @ResponseBody
    public Map<String, Object> getCollectShare(PageModel page, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();
        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        return shareService.getCollectShare(user.getUserId(), page);
    }

    /**
     * 删除分享信息
     * @param shareId
     * @return
     */
    @RequestMapping(value="delete.do")
    @ResponseBody
    public Map<String, Object> delete(String shareId, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        // 如果用户未登录则操作失败
        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }
        return shareService.delete(shareId);
    }

    /**
     * 分享信息点赞
     * @param shareId
     * @param session
     * @return
     */
    @RequestMapping(value="thumbUp.do")
    @ResponseBody
    public Map<String, Object> thumbUp(String shareId, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        // 如果用户未登录则操作失败
        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        result = shareService.thumbUp(shareId, user.getUserId());
        return result;
    }

    /**
     * 分享信息收藏
     * @param shareId
     * @param session
     * @return
     */
    @RequestMapping(value="collect.do")
    @ResponseBody
    public Map<String, Object> collect(String shareId, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        // 如果用户未登录则操作失败
        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        result = shareService.collect(shareId, user.getUserId());
        return result;
    }

    /**
     * 转发分享
     * @param transpond
     * @param session
     * @return
     */
    @RequestMapping(value="transpond.do")
    @ResponseBody
    public Map<String, Object> transpond(Transpond transpond, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        // 如果用户未登录则操作失败
        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        result = shareService.transpond(transpond, user);
        return result;
    }

    /**
     * 评论分享信息
     * @param eval
     * @param session
     * @return
     */
    @RequestMapping(value="eval.do")
    @ResponseBody
    public Map<String, Object> eval(Eval eval, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        // 如果用户未登录则操作失败
        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        result = shareService.eval(eval, user);
        return result;
    }

    /**
     * 回复评论
     * @param eval
     * @param session
     * @return
     */
    @RequestMapping(value="reply.do")
    @ResponseBody
    public Map<String, Object> reply(Eval eval, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        // 如果用户未登录则操作失败
        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        result = shareService.reply(eval, user);
        return result;
    }

    /**
     * 删除评论信息
     * @param evalId
     * @param session
     * @return
     */
    @RequestMapping(value="deleteEval.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deleteEval(String evalId, HttpSession session){
        Map<String, Object> result = new HashMap<String, Object>();

        // 如果用户未登录则操作失败
        User user = (User) session.getAttribute("user");
        if(user == null){
            result.put("msg", "OFFLINE");
            return result;
        }

        result = shareService.deleteEval(evalId, user);
        return result;
    }

    /**
     * 获取评论信息
     * @param shareId
     * @return
     */
    @RequestMapping(value="getEval.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getEval(String shareId){
        return shareService.getEval(shareId);
    }

    /**
     * 获取回复内容
     * @param evalId
     * @return
     */
    @RequestMapping(value="getReplyEval.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getReplyEval(String evalId){
        return shareService.getReply(evalId);
    }
}
