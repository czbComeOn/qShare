package edu.gmxx.share.service.impl;

import edu.gmxx.share.dao.UserMapper;
import edu.gmxx.share.domain.User;
import edu.gmxx.share.service.ILoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * 登录服务
 *
 * @author 3138907243 陈志斌
 */
@Service("loginService")
public class LoginServiceImpl implements ILoginService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public Map<String, Object> login(String userId) {
        Map<String, Object> result = new HashMap();
        User user = userMapper.selectByPrimaryKey(userId);
        result.put("user",user);
        return result;
    }
}
