package edu.gmxx.share.listener;

import edu.gmxx.share.domain.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;
import java.util.HashMap;
import java.util.Map;

/**
 * 单点登录监听器
 * Created by BIN on 2017/3/26.
 */
public class LoginListener implements HttpSessionAttributeListener {
    private static final Logger logger = LoggerFactory.getLogger(LoginListener.class);
    /**
     * 记录在线用户的session
     */
    public static Map<String, HttpSession> loginSession = new HashMap<String, HttpSession>();

    @Override
    public void attributeAdded(HttpSessionBindingEvent event) {
        // 判断该session是否为用户登录
        String name = event.getName();
        if("user".equals(name)){
            User user = (User) event.getValue();
            // 如果该用户已在线，则先踢除登录
            HttpSession session = loginSession.get(user.getAccount());
            if(session != null){
                session.removeAttribute("user");
                session.invalidate();
            }
            loginSession.put(user.getAccount(), event.getSession());
            logger.info("-----用户[" + user.getAccount() + "]上线-----");
        }
    }

    @Override
    public void attributeRemoved(HttpSessionBindingEvent event) {
        String name = event.getName();
        // 用户下线
        if("user".equals(name)){
            User user = (User) event.getValue();
            loginSession.remove(user.getAccount());
            logger.info("-----用户[" + user.getAccount() + "]下线-----");
        }
    }

    @Override
    public void attributeReplaced(HttpSessionBindingEvent event) {

    }
}
