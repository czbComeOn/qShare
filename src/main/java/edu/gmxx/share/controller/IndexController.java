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
 * 轻分享 - 登录控制层
 *
 * @author 3138907243 陈志斌
 */
@Controller
public class IndexController {
	@Autowired
	private IUserService userService;

	@RequestMapping("index.do")
	public String index(){
		return "index";
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
        }

		return result;
	}

	@RequestMapping(value = "logout.do")
	public String logout(HttpSession session){
        User user = (User) session.getAttribute("user");
        userService.logout(user);
        session.removeAttribute("user");

        return "redirect:index.do";
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
}
