package edu.gmxx.share.interceptor;

import edu.gmxx.share.domain.User;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 用户操作拦截器
 * Created by BIN on 2017/3/26.
 */
public class LoginInterceptor implements HandlerInterceptor {
    private String[] passUrl = new String[]{"qShare/index.do", "qShare/myHome.do", "qShare/viewShare.do",
            "qShare/login.do", "qShare/register.do", "qShare/logout.do", "qShare/checkUser.do",
            "share/loadShare.do"};

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
        HttpSession session = request.getSession();
        // 判断用户是否登录
        User user = (User) session.getAttribute("user");
        String url = request.getRequestURI();
        if(user == null){
            boolean passing = false;
            for(String pass : passUrl){
                if(url.contains(pass)){
                    passing = true;
                    break;
                }
            }

            // 进行登录验证
            if(!passing){
                response.sendRedirect("index.do");
            }
        }

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object o, Exception e) throws Exception {

    }
}
