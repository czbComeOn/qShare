package edu.gmxx.share.service.impl;

import edu.gmxx.share.dao.FriendGroupMapper;
import edu.gmxx.share.dao.FriendMapper;
import edu.gmxx.share.dao.ShareMapper;
import edu.gmxx.share.dao.UserMapper;
import edu.gmxx.share.domain.Friend;
import edu.gmxx.share.domain.FriendGroup;
import edu.gmxx.share.domain.User;
import edu.gmxx.share.dto.UserDTO;
import edu.gmxx.share.service.IUserService;
import edu.gmxx.share.utils.MyStringUtil;
import edu.gmxx.share.utils.PageModel;
import edu.gmxx.share.vo.FriendGroupVo;
import edu.gmxx.share.vo.FriendVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 用户信息操作服务
 *
 * @author 3138907243 陈志斌
 */
@Service("userService")
public class UserServiceImpl implements IUserService {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private FriendMapper friendMapper;
    @Autowired
    private FriendGroupMapper friendGroupMapper;
    @Autowired
    private ShareMapper shareMapper;

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
        int count = userMapper.insert(user);
        if(count != 1){
            result.put("msg", "用户注册失败，请刷新后重试！");
            return result;
        }

        // 5.初始化好友分组数据,创建默认分组
        FriendGroup group = new FriendGroup();
        group.setUserId(user.getUserId());
        group.setGroupId(MyStringUtil.getUUID());
        group.setGroupName("我的好友");
        group.setNum(0);
        friendGroupMapper.insertSelective(group);
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
    public Map<String, Object> updateUserData(User currUser, User userData) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(userData.getAccount())){
            logger.debug("-----> 修改用户数据异常");
            result.put("msg", "账户不存在，请刷新后重试！");
            return result;
        }

        if(!currUser.getAccount().equals(userData.getAccount())){
            logger.debug("-----> 修改用户数据异常");
            result.put("msg", "用户信息操作异常，请刷新后重试！");
            return result;
        }

        userData.setUserId(currUser.getUserId());
        int count = userMapper.updateByPrimaryKeySelective(userData);
        if(count == 1){
            result.put("msg", "success");
            result.put("newData", userMapper.getUserByAccount(userData.getAccount()));
        } else{
            result.put("msg", "用户信息修改失败！");
        }
        return result;
    }

    @Override
    public int updateUserById(User user) {
        return userMapper.updateByPrimaryKeySelective(user);
    }

    @Override
    public Map<String, Object> updatePassword(User user, String account, String oldPassword
            , String newPassword, String againPassword) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(account)){
            logger.debug("-----> 修改密码异常");
            result.put("msg", "账户不存在，请刷新后重试！");
            return result;
        }

        if(!user.getAccount().equals(account)){
            result.put("msg", "用户信息操作异常，请刷新后重试！");
            return result;
        }

        if(StringUtils.isEmpty(oldPassword) || StringUtils.isEmpty(newPassword)
                || StringUtils.isEmpty(againPassword)){
            result.put("msg", "密码不能为空！");
            return result;
        }

        User acc = userMapper.getUserByAccount(account);

        // 1.验证密码
        if(!acc.getPassword().equals(oldPassword)){
            result.put("msg", "原密码输入有误！");
            return result;
        }
        if(acc.getPassword().equals(newPassword)){
            result.put("msg", "新密码不能与原密码相同！");
            return result;
        }
        if(!newPassword.equals(againPassword)){
            result.put("msg", "两次输入的密码不相同！");
            return result;
        }

        // 2.更新密码
        acc.setUserId(user.getUserId());
        acc.setPassword(newPassword);
        int count = userMapper.updateByPrimaryKeySelective(acc);
        if(count == 1){
            result.put("msg", "success");
            result.put("newData", acc);
        } else{
            result.put("msg", "密码修改失败！");
        }
        return result;
    }

    @Override
    public Map<String, Object> getGroup(User user) {
        Map<String, Object> result = new HashMap<String, Object>();

        List<FriendGroup> groups = friendGroupMapper.getGroupByUserId(user.getUserId());
        List<FriendGroupVo> groupVos = new ArrayList<FriendGroupVo>();
        for(FriendGroup group : groups){
            groupVos.add(new FriendGroupVo(group, friendMapper.getFriendCountByGroup(group.getGroupId())));
        }

        result.put("groups", groupVos);
        result.put("msg", "success");

        return result;
    }

    @Override
    public Map<String, Object> getFriend(User user, FriendGroup group) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(group.getGroupId())){
            result.put("msg", "分组信息不存在，请刷新后重试！");
            return result;
        }

        List<Friend> friends = friendMapper.getFriendByGroupId(group.getGroupId());
        List<FriendVo> friendVos = new ArrayList<FriendVo>();
        for(Friend friend : friends){
            friendVos.add(new FriendVo(friend, userMapper.selectByPrimaryKey(friend.getBuserId())
                , shareMapper.getShareCountByUser(friend.getBuserId())
                , getAttentionCountByUser(friend.getBuserId())));
        }

        result.put("friends", friendVos);
        result.put("msg", "success");

        return result;
    }

    @Override
    public Map<String, Object> deleteFriend(String auserId, String buserId) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(buserId)){
            result.put("msg", "好友不存在，请刷新后重试！");
            return result;
        }

        Friend friend = new Friend();
        friend.setAuserId(auserId);
        friend.setBuserId(buserId);
        friendMapper.deleteFriend(friend);
        result.put("msg", "success");
        return result;
    }

    @Override
    public Map<String, Object> addFriend(User user, String account) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(account)){
            logger.debug("-----> 添加好友异常");
            result.put("msg", "好友不存在，请刷新后重试！");
            return result;
        }

        if(user.getAccount().equals(account)){
            result.put("msg", "不能添加自己为好友！");
            return result;
        }

        User acc = userMapper.getUserByAccount(account);

        // 1.判断是否已添加该好友
        Friend f = new Friend();
        f.setAuserId(user.getUserId());
        f.setBuserId(acc.getUserId());
        int count = friendMapper.getFriendByUser(f);
        if(count == 1){
            result.put("msg", "AlreadyFriend");
            return result;
        }

        // 2.获取用户默认分组
        FriendGroup group = friendGroupMapper.getDefaultGroup(user.getUserId());

        // 3.包装好友信息
        String friendId = MyStringUtil.getUUID();
        Friend friend = new Friend();
        friend.setAuserId(user.getUserId());
        friend.setBuserId(acc.getUserId());
        friend.setGroupId(group.getGroupId());
        friend.setIsFriend((byte)1);
        friend.setFriendId(friendId);

        // 4.保存好友信息，单向添加
        count = friendMapper.insertSelective(friend);
        if(count == 1){
            result.put("friendVo", new FriendVo(friend, acc
                    , shareMapper.getShareCountByUser(acc.getUserId())
                    , friendMapper.getWhoAttentionMeCount(acc.getUserId())));
            result.put("msg", "success");
        } else{
            result.put("msg", "好友添加失败！");
            friendMapper.deleteByPrimaryKey(friendId);
        }

        return result;
    }

    @Override
    public Map<String, Object> deleteFriendById(String friendId) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(friendId)){
            logger.debug("-----> 删除好友异常");
            result.put("msg", "好友不存在，请刷新后重试！");
            return result;
        }

        int count = friendMapper.deleteByPrimaryKey(friendId);
        if(count == 1){
            result.put("msg", "success");
        } else{
            result.put("msg", "删除失败，请刷新后重试！");
        }

        return result;
    }

    @Override
    public Map<String, Object> createGroup(FriendGroup group) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(group.getUserId())){
            logger.debug("-----> 创建分组异常");
            result.put("msg", "用户数据出现异常，请刷新后重试！");
            return result;
        }

        if(StringUtils.isEmpty(group.getGroupName())){
            result.put("msg", "分组名称不能为空！");
            return result;
        }

        if(group.getGroupName().length() > 20){
            result.put("msg", "分组名称不能超过20个字符！");
            return result;
        }

        // 获取已有分组个数
        int num = friendGroupMapper.getGroupCountByUser(group.getUserId());
        group.setNum(num);
        group.setGroupId(MyStringUtil.getUUID());
        friendGroupMapper.insertSelective(group);

        result.put("groupVo", new FriendGroupVo(group, 0));
        result.put("msg", "success");

        return result;
    }

    @Override
    public Map<String, Object> deleteFriendGroup(FriendGroup group) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(group.getUserId())){
            logger.debug("-----> 删除分组异常！");
            result.put("msg", "分组不存在，请刷新后重试！");
        }

        // 1.获取该分组内的好友
        List<Friend> friends = friendMapper.getFriendByGroupId(group.getGroupId());

        // 2.获取用户默认分组
        FriendGroup defaultGroup = friendGroupMapper.getDefaultGroup(group.getUserId());

        // 3.删除分组
        int count = friendGroupMapper.deleteByPrimaryKey(group.getGroupId());
        if(count != 1){
            logger.debug("-----> 删除分组异常");
            result.put("msg", "删除分组异常，请刷新后重试！");
            return result;
        }

        // 4.移动好友到默认分组
        for(Friend friend : friends){
            friend.setGroupId(defaultGroup.getGroupId());
            friendMapper.updateByPrimaryKeySelective(friend);
        }

        result.put("msg", "success");

        return result;
    }

    @Override
    public Map<String, Object> updateGroup(FriendGroup group) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(group.getGroupId())){
            logger.debug("-----> 修改分组异常");
            result.put("msg", "分组信息不存在，请刷新后重试！");
            return result;
        }

        if(StringUtils.isEmpty(group.getGroupName())){
            result.put("msg", "分组名称不能为空！");
            return result;
        }

        int count = friendGroupMapper.updateByPrimaryKeySelective(group);
        if(count == 1){
            result.put("group", friendGroupMapper.selectByPrimaryKey(group.getGroupId()));
            result.put("msg", "success");
        } else{
            logger.debug("-----> 分组信息修改异常");
            result.put("msg", "分组信息修改失败，请刷新后重试！");
        }

        return result;
    }

    @Override
    public int getFriendCountByUser(String userId) {
        return StringUtils.isEmpty(userId) ? 0 : friendMapper.getFriendCountByUser(userId);
    }

    @Override
    public int getAttentionCountByUser(String userId) {
        return StringUtils.isEmpty(userId) ? 0 : friendMapper.getWhoAttentionMeCount(userId);
    }

    @Override
    public boolean isAttention(String auserId, String buserId) {
        Friend friend = new Friend();
        friend.setAuserId(auserId);
        friend.setBuserId(buserId);
        return friendMapper.getAttentionByABUser(friend) != null;
    }

    @Override
    public boolean isFriend(String auserId, String buserId) {
        Friend friend = new Friend();
        friend.setAuserId(auserId);
        friend.setBuserId(buserId);
        return friendMapper.getFriendByABUser(friend) != null;
    }

    @Override
    public Map<String, Object> addAttention(User user, String account) {
        Map<String, Object> result = new HashMap<String, Object>();
        if(StringUtils.isEmpty(account)){
            logger.debug("-----> 关注异常");
            result.put("msg", "关注失败，请刷新后重试");
            return result;
        }

        if(user.getAccount().equals(account)){
            result.put("msg", "不能关注自己！");
            return result;
        }

        User buser = userMapper.getUserByAccount(account);
        Friend friend = new Friend();
        friend.setAuserId(user.getUserId());
        friend.setBuserId(buser.getUserId());

        // 1.判断是否已关注过
        Friend atten = friendMapper.getAttentionByABUser(friend);
        if(atten != null){
            result.put("msg", "AlreadyAttention");
            return result;
        }

        // 2.添加关注
        friend.setFriendId(MyStringUtil.getUUID());
        friend.setIsAttention((byte)1);
        int count = friendMapper.insertSelective(friend);
        if(count == 1){
            result.put("msg", "success");
        } else{
            logger.debug("-----> 添加关注异常");
            result.put("msg", "关注失败，请刷新后重试！");
        }

        return result;
    }

    @Override
    public Map<String, Object> deleteAttention(User user, String account) {
        Map<String, Object> result = new HashMap<String, Object>();
        if(StringUtils.isEmpty(account)){
            logger.debug("-----> 取消关注异常");
            result.put("msg", "取消关注失败，请刷新后重试");
            return result;
        }

        User buser = userMapper.getUserByAccount(account);
        Friend friend = new Friend();
        friend.setAuserId(user.getUserId());
        friend.setBuserId(buser.getUserId());

        // 1.判断是否已关注过
        Friend atten = friendMapper.getAttentionByABUser(friend);
        if(atten == null){
            result.put("msg", "已取消关注！");
            return result;
        }

        // 2.删除关注信息
        int count = friendMapper.deleteByPrimaryKey(atten.getFriendId());
        if(count == 1){
            result.put("msg", "success");
        } else{
            logger.debug("-----> 去洗关注异常");
            result.put("msg", "取消关注失败，请刷新后重试！");
        }

        return result;
    }

    @Override
    public Map<String, Object> searchAccount(User user, String account, PageModel page) {
        Map<String, Object> result = new HashMap<String, Object>();
        if(StringUtils.isEmpty(account)){
            result.put("msg", "请输入要查找的账号！");
            return result;
        }

        // 包装查询条件
        UserDTO ud = new UserDTO();
        User acc = new User();
        acc.setUserId(user.getUserId());
        acc.setAccount(account);

        // 获取总记录数
        page.setTotalRecord(userMapper.searchAccountCount(acc));
        page.setPageSize(5);

        ud.setPage(page);
        ud.setUser(acc);

        result.put("page", page);
        result.put("users", userMapper.searchAccount(ud));
        result.put("msg", "success");

        return result;
    }

    @Override
    public Map<String, Object> searchNickname(User user, String nickname, PageModel page) {
        Map<String, Object> result = new HashMap<String, Object>();
        if(StringUtils.isEmpty(nickname)){
            result.put("msg", "请输入要查找的昵称！");
            return result;
        }

        // 包装查询条件
        UserDTO ud = new UserDTO();
        User acc = new User();
        acc.setUserId(user.getUserId());
        acc.setNickname(nickname);

        // 获取总记录数
        page.setTotalRecord(userMapper.searchNicknameCount(acc));
        page.setPageSize(5);

        ud.setPage(page);
        ud.setUser(acc);

        result.put("page", page);
        result.put("users", userMapper.searchNickname(ud));
        result.put("msg", "success");

        return result;
    }

    @Override
    public Map<String, Object> changeGroup(User user, Friend friend) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(friend.getFriendId())){
            logger.debug("-----> 修改分组异常");
            result.put("msg", "好友信息不存在，请刷新后重试！");
            return result;
        }

        if(StringUtils.isEmpty(friend.getGroupId())){
            logger.debug("-----> 修改分组异常");
            result.put("msg", "分组信息不存在，请刷新后重试！");
            return result;
        }

        friendMapper.updateByPrimaryKeySelective(friend);
        result.put("friendVo", new FriendVo(friendMapper.selectByPrimaryKey(friend.getFriendId()), user
            , shareMapper.getShareCountByUser(user.getUserId()), friendMapper.getWhoAttentionMeCount(user.getUserId())));
        result.put("msg", "success");

        return result;
    }

    @Override
    public Map<String, Object> getMeAttentionWho(String userId, PageModel page) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(userId)){
            logger.debug("-----> 获取我关注的信息异常");
            result.put("msg", "用户信息不存在，请刷新后重试！");
            return result;
        }

        // 获取总记录数
        page.setTotalRecord(friendMapper.getMeAttentionWhoCount(userId));
        page.setPageSize(10);

        UserDTO userDTO = new UserDTO();
        userDTO.setUser(new User(userId));
        userDTO.setPage(page);

        // 获取关注信息
        List<Friend> friends = friendMapper.getMeAttentionWho(userDTO);
        List<FriendVo> friendVos = new ArrayList<FriendVo>();

        for(Friend friend : friends){
            friendVos.add(new FriendVo(friend, userMapper.selectByPrimaryKey(friend.getBuserId()),
                shareMapper.getShareCountByUser(friend.getBuserId()),
                friendMapper.getWhoAttentionMeCount(friend.getBuserId())));
        }

        result.put("page", page);
        result.put("friends", friendVos);
        result.put("msg", "success");

        return result;
    }

    @Override
    public Map<String, Object> getWhoAttentionMe(String userId, PageModel page) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(userId)){
            logger.debug("-----> 获取我关注的信息异常");
            result.put("msg", "用户信息不存在，请刷新后重试！");
            return result;
        }

        // 获取总记录数
        page.setTotalRecord(friendMapper.getWhoAttentionMeCount(userId));
        page.setPageSize(10);

        UserDTO userDTO = new UserDTO();
        userDTO.setUser(new User(userId));
        userDTO.setPage(page);

        // 获取关注信息
        List<Friend> friends = friendMapper.getWhoAttentionMe(userDTO);
        List<FriendVo> friendVos = new ArrayList<FriendVo>();

        for(Friend friend : friends){
            friendVos.add(new FriendVo(friend, userMapper.selectByPrimaryKey(friend.getAuserId()),
                shareMapper.getShareCountByUser(friend.getAuserId()),
                friendMapper.getWhoAttentionMeCount(friend.getAuserId())));
        }

        result.put("page", page);
        result.put("friends", friendVos);
        result.put("msg", "success");

        return result;
    }

    @Override
    public int getMeAttentionWhoCount(String userId) {
        return StringUtils.isEmpty(userId) ? 0 : friendMapper.getMeAttentionWhoCount(userId);
    }

    @Override
    public int getWhoAttentionMeCount(String userId) {
        return StringUtils.isEmpty(userId) ? 0 : friendMapper.getWhoAttentionMeCount(userId);
    }
}
