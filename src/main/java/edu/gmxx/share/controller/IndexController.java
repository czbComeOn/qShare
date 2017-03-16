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
public class IndexController {
	@Autowired
	private ILoginService loginService;

	@RequestMapping("index.do")
	public String index(){
		return "index";
	}

	public ModelAndView login(User user){
		ModelAndView view = new ModelAndView("login");

		return view;
	}

	public ModelAndView register(User user){
		ModelAndView view = new ModelAndView("register");

		return view;
	}
}
