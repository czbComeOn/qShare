package edu.gmxx.share.controller;

import edu.gmxx.share.domain.User;
import edu.gmxx.share.service.ILoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * 轻分享 - 登录控制层
 *
 * @author 3138907243 陈志斌
 */
@Controller
public class LoginController {
	@Autowired
	private ILoginService loginService;

	@RequestMapping("main.do")
	public ModelAndView main(String userId){
		ModelAndView view = new ModelAndView("login");
//		Map<String, Object> result = loginService.login("1");

		User user = new User();
		user.setUserId(userId);
		user.setName("张三");
		view.addObject(user);
		return view;
	}

	@RequestMapping("login.do")
	public ModelAndView login(String userId){
		ModelAndView view = new ModelAndView("login");
		User user = (User) loginService.login(userId).get("user");
		view.addObject(user);
		return view;
	}
}
