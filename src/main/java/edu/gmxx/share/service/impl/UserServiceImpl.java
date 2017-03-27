package edu.gmxx.share.service.impl;

import edu.gmxx.share.dao.UserMapper;
import edu.gmxx.share.domain.User;
import edu.gmxx.share.service.IUserService;
import edu.gmxx.share.utils.MyStringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

/**
 * 登录服务
 *
 * @author 3138907243 陈志斌
 */
@Service("userService")
public class UserServiceImpl implements IUserService {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    @Autowired
    private UserMapper userMapper;

    @Override
    public Map<String, Object> login(User user) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(user == null || StringUtils.isEmpty(user.getAccount())){
            result.put("msg", "输入信息不能为空！");
            return result;
        }

        // 获取账户信息
        User account = userMapper.getUserByAccountOrEmail(user.getAccount());
        // 1.验证账户是否存在
        if(account == null){
            result.put("msg", "该账号不存在！");
            return result;
        }

        // 2.验证账户是否被锁定
        if("LOCK".equalsIgnoreCase(account.getStatus())){
            result.put("msg", "该账号已被锁定");
            return result;
        }

        // 3.验证密码
        if(StringUtils.isEmpty(user.getPassword())){
            result.put("msg", "密码不能为空！");
            return result;
        } else{
            if(!user.getPassword().equals(account.getPassword())){
                // 密码输入错误记录错误次数,超过5次将被锁定当天不能登录
                account.setPwdErrorCount(account.getPwdErrorCount() + 1);

                // 判断是否超过5次
                if(account.getPwdErrorCount() >= 5){
                    account.setStatus("LOCK");
                }
                userMapper.updateByPrimaryKey(account);
                result.put("msg", "密码输入错误！");
                return result;
            }
        }

        // 4.修改登录信息
        account.setStatus("ONLINE");
        account.setLastTime(new Timestamp(System.currentTimeMillis()));
        account.setPwdErrorCount(0);
        account.setUnlockTime(null);
        userMapper.updateByPrimaryKeySelective(account);

        result.put("user",account);
        result.put("msg", "success");
        return result;
    }

    @Override
    public Map<String, Object> register(User user) {
        Map<String, Object> result = new HashMap<String, Object>();
        // 1.验证用户信息
        if(user == null || StringUtils.isEmpty(user.getAccount())){
            result.put("msg", "用户信息不存在");
            return result;
        }

        User aUser = userMapper.selectUserByAccount(user.getAccount());
        if(aUser != null){
            result.put("msg", "该账户已存在");
            return result;
        }
        if(StringUtils.isEmpty(user.getPassword())){
            result.put("msg", "密码不能为空");
            return result;
        }
        if(StringUtils.isEmpty(user.getPhone())){
            result.put("msg", "手机号码不能为空");
            return result;
        }
        // 2.验证手机是否已被使用
        User pUser = userMapper.selectUserByPhone(user.getPhone());
        if(pUser != null){
            result.put("msg", "该手机已被其他账户绑定");
            return result;
        }

        // 3.对密码进行加密
//        Mademd5 md = new Mademd5();
//        user.setPassword(md.toMd5(user.getPassword()));

        // 4.添加用户
        user.setUserId(MyStringUtil.getUUID());
        userMapper.insert(user);
        result.put("msg", "success");

        logger.info("----->新用户[" + user.getAccount() + "]注册成功");
        return result;
    }

    @Override
    public User getUserByAccount(String account) {
        if(StringUtils.isEmpty(account)){
            return null;
        }
        return userMapper.selectUserByAccount(account);
    }

    @Override
    public void logout(User user) {
        User account = userMapper.selectByPrimaryKey(user.getUserId());
        account.setStatus("OFFLINE");

        userMapper.updateByPrimaryKeySelective(account);
    }

    @Override
    public int updateUserById(User user) {
        return userMapper.updateByPrimaryKeySelective(user);
    }
}
