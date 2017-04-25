package edu.gmxx.share.controller;

import edu.gmxx.share.domain.Collect;
import edu.gmxx.share.domain.ShareType;
import edu.gmxx.share.domain.User;
import edu.gmxx.share.service.IShareService;
import edu.gmxx.share.service.IUserService;
import edu.gmxx.share.utils.MyStringUtil;
import edu.gmxx.share.vo.EvalVo;
import edu.gmxx.share.vo.ShareVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 轻分享 - 页面入口
 *
 * @author 3138907243 陈志斌
 */
@Controller
public class IndexController {
	@Autowired
	private IUserService userService;
	@Autowired
	private IShareService shareService;

	/**
	 * 系统主页
	 * @return
	 */
	@RequestMapping("index.do")
	public ModelAndView index(HttpSession session){
		ModelAndView view = new ModelAndView("index");

		User user = (User) session.getAttribute("user");
		if(user != null){
			view.addObject("friendCount", userService.getFriendCountByUser(user.getUserId()));
			view.addObject("attentionCount", userService.getMeAttentionWhoCount(user.getUserId()));
			view.addObject("shareCount", shareService.getShareCountByUser(user.getUserId()));
			view.addObject("collectCount", shareService.getCollectCountByUser(user.getUserId()));

			// 获取最近好友动态
			view.addObject("friendShareVos", shareService.getFriendDynamic(user));

			// 获取最近关注动态
			view.addObject("attentionShareVos", shareService.getAttentionDynamic(user));
		}

		// 加载分享信息类型存放到session
		List<ShareType> shareTypes = shareService.getAllShareType();
		view.addObject("shareTypes", shareTypes);

		return view;
	}

	/**
	 * 用户登录
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "login.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> login(User user, HttpSession session){
        Map<String, Object> result = userService.login(user);

        String msg = (String) result.get("msg");
        // 登录成功记录信息到session里面
        if("success".equalsIgnoreCase(msg)){
            User account = (User) result.get("user");
            session.setAttribute("user", account);
			if("admin".equalsIgnoreCase(account.getUserType())){
				result.put("userType", "admin");
			}
        }

		return result;
	}

	/**
	 * 退出登录
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "logout.do")
	@ResponseBody
	public Map<String, Object> logout(HttpSession session){
		Map<String, Object> result = new HashMap<String, Object>();
        User user = (User) session.getAttribute("user");

		if(user != null){
			userService.logout(user);
		}
		session.removeAttribute("user");
		result.put("msg", "success");

        return result;
    }

	/**
	 * 用户注册
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "register.do", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> register(User user){
        return userService.register(user);
	}

	/**
	 * 验证用户是否存在
	 * @param rAccount
	 * @return
	 */
	@RequestMapping(value = "checkUser.do", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> checkUser(String rAccount){
		Map<String, Object> result = new HashMap<String, Object>();
		User user = userService.getUserByAccount(rAccount);
		if(user == null){
			result.put("valid", true);
		} else{
			result.put("valid", false);
		}

		return result;
    }

	/**
	 * 个人主页
	 * @param account
	 * @return
	 */
	@RequestMapping(value="myHome.do")
	public ModelAndView myHome(String account, HttpSession session){
		ModelAndView view = new ModelAndView("myHome");

		User user = (User) session.getAttribute("user");

        User acc = userService.getUserByAccount(account);
        view.addObject("acc", acc);
		view.addObject("shareCount", userService.getShareCountByUser(acc.getUserId()));

        if(user != null){
            view.addObject("isAttention", userService.isAttention(user.getUserId(), acc.getUserId()));
            view.addObject("isFriend", userService.abUserIsFriend(user.getUserId(), acc.getUserId()));
        }

		return view;
	}

    /**
     * 查看分享详情
     * @param shareId
     * @param session
     * @return
     */
	@RequestMapping(value="viewShare.do")
	public ModelAndView viewShare(String shareId, HttpSession session){
        ModelAndView view = new ModelAndView("viewShare");

        User user = (User) session.getAttribute("user");

		// 获取分享信息
		ShareVo shareVo = shareService.getShareVoByShareId(shareId);

        String imgInfo = shareVo.getShare().getImgInfo();

		view.addObject("shareVo", shareVo);
        if(!StringUtils.isEmpty(imgInfo)){
            view.addObject("imgs", MyStringUtil.stringsToList(imgInfo.split(",")));
        }

        String thumbId = shareVo.getShare().getThumbUpId();
        List<String> thumbs = MyStringUtil.stringsToList(StringUtils.isEmpty(thumbId) ? new String[0] : thumbId.split(","));
        view.addObject("thumbs", thumbs);

        if(user != null){
            // 是否已点赞
            for(String thumb : thumbs){
                if(thumb.equals(user.getUserId())){
                    view.addObject("thumb", true);
                    break;
                }
            }

            // 是否已收藏
            List<Collect> collects = shareVo.getCollects();
            for(Collect collect : collects){
                if(user.getUserId().equals(collect.getUserId())){
                    view.addObject("collect", true);
                    break;
                }
            }
        }

        // 评论数
        Map<String, Object> result = shareService.getEval(shareId);
        if("success".equals(result.get("msg"))){
            List<EvalVo> evalVos = (List<EvalVo>) result.get("evals");
            view.addObject("evalVos", evalVos);
        }

        return view;
    }

	/**
	 * 进入管理员后台
	 * @return
	 */
	@RequestMapping(value="manage.do")
    public ModelAndView manageIndex(HttpSession session){
		ModelAndView view = new ModelAndView("manage/manageIndex");

		User user = (User) session.getAttribute("user");
		if(user == null){
			view.setViewName("redirect:index.do");
			return view;
		}

		view.addObject("manageUser", user);
		if("NORMAL".equalsIgnoreCase(user.getUserType())){
			view.setViewName("redirect:index.do");
		}

		return view;
	}

	/**
	 * 重定向到主页
	 * @return
	 */
	@RequestMapping(value="redirectIndex.do")
	public String redirectIndex(){
		return "redirect:index.do";
	}

	/**
	 * 用户管理
	 * @param session
	 * @return
	 */
	@RequestMapping(value="userManage.do")
	public ModelAndView userManage(HttpSession session){
		ModelAndView view = new ModelAndView("manage/userManage");

		User user = (User) session.getAttribute("user");
		if(user == null){
			view.setViewName("redirect:index.do");
			return view;
		}

		return view;
	}

	/**
	 * 举报信息管理
	 * @param session
	 * @return
	 */
	@RequestMapping(value="informManage.do")
	public ModelAndView informManage(HttpSession session){
		ModelAndView view = new ModelAndView("manage/informManage");

		User user = (User) session.getAttribute("user");
		if(user == null){
			view.setViewName("redirect:index.do");
			return view;
		}

		return view;
	}

	/**
	 * 分享类别管理
	 * @param session
	 * @return
	 */
	@RequestMapping(value="shareTypeManage.do")
	public ModelAndView shareTypeManage(HttpSession session){
		ModelAndView view = new ModelAndView("manage/shareTypeManage");

		User user = (User) session.getAttribute("user");
		if(user == null){
			view.setViewName("redirect:index.do");
			return view;
		}

        List<ShareType> shareTypes = shareService.getAllShareType();
        view.addObject("shareTypes", shareTypes);

        return view;
	}
}
