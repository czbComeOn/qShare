package edu.gmxx.share.service.impl;

import edu.gmxx.share.dao.InformMapper;
import edu.gmxx.share.dao.ShareTypeMapper;
import edu.gmxx.share.dao.UserMapper;
import edu.gmxx.share.domain.Inform;
import edu.gmxx.share.domain.ShareType;
import edu.gmxx.share.domain.User;
import edu.gmxx.share.dto.InformDTO;
import edu.gmxx.share.listener.LoginListener;
import edu.gmxx.share.service.IManageService;
import edu.gmxx.share.utils.PageModel;
import edu.gmxx.share.vo.InformVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpSession;
import java.util.*;

/**
 * Created by BIN on 2017/4/12.
 */
@Service("manageService")
public class ManageServiceImpl implements IManageService {
    private final static Logger logger = LoggerFactory.getLogger(ManageServiceImpl.class);
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private InformMapper informMapper;
    @Autowired
    private ShareTypeMapper shareTypeMapper;

    @Override
    public Map<String, Object> lockUser(String userId, long time) {
        Map<String, Object> result = new HashMap<String, Object>();

        User user = userMapper.selectByPrimaryKey(userId);
        if(user == null){
            logger.debug("-----> 锁定用户异常");
            result.put("msg", "用户不存在，请刷新后重试！");
            return result;
        }

        // 判断是否已被锁定
        if("LOCK".equals(user.getStatus())){
            result.put("msg", "用户已被锁定，请刷新后重试！");
            return result;
        }

        // 设置锁定时间
        long unlockTime = System.currentTimeMillis();
        if(time <= 0) {
            // 默认锁定一年
            time = 365 * 24;
        }
        unlockTime += time * 3600000;
        user.setUnlockTime(new Date(unlockTime));
        user.setStatus("LOCK");

        int count = userMapper.updateByPrimaryKeySelective(user);
        if(count == 1){
            result.put("msg", "success");
            result.put("user", user);

            // 踢除用户在线
            Map<String, HttpSession> loginSession = LoginListener.loginSession;
            HttpSession session = loginSession.get(user.getAccount());
            if(session != null){
                session.removeAttribute("user");
                loginSession.remove(user.getAccount());
            }
        } else{
            logger.debug("-----> 锁定用户数据异常");
            result.put("msg", "锁定用户异常，请刷新后重试！");
        }
        result.put("user", userMapper.selectByPrimaryKey(userId));

        return result;
    }

    @Override
    public Map<String, Object> unlockUser(String userId) {
        Map<String, Object> result = new HashMap<String, Object>();

        User user = userMapper.selectByPrimaryKey(userId);
        if(user == null){
            logger.debug("-----> 解锁用户异常");
            result.put("msg", "用户不存在，请刷新后重试！");
            return result;
        }

        // 判断用户是否已被解锁
        if(!"LOCK".equals(user.getStatus())){
            result.put("msg", "用户已被解锁！");
            return result;
        }

        user.setUnlockTime(new Date());
        user.setStatus("OFFLINE");

        int count = userMapper.updateByPrimaryKeySelective(user);
        if(count == 1){
            result.put("msg", "success");
            result.put("user", user);
        } else{
            logger.debug("-----> 解锁用户数据异常");
            result.put("msg", "解锁用户异常，请刷新后重试！");
        }
        result.put("user", userMapper.selectByPrimaryKey(userId));

        return result;
    }

    @Override
    public List<InformVo> getInformDataByStatus(String auditStatus, PageModel page) {
        List<InformVo> informVos = new ArrayList<InformVo>();
        auditStatus = StringUtils.isEmpty(auditStatus) ? "ALL" : auditStatus.toUpperCase();

        // 初始化分页
        if(page.getPageSize() < 1){
            page.setPageSize(10);
        }
        // 获取总记录数
        page.setTotalRecord(informMapper.getInformDataByStatusCount(auditStatus));

        // 包装查询条件
        InformDTO informDTO = new InformDTO(new Inform(auditStatus), page);
        List<Inform> informs = informMapper.getInformDataByStatus(informDTO);
        for(Inform inform : informs){
            informVos.add(getInformVo(inform));
        }

        return informVos;
    }

    @Override
    public Map<String, Object> auditUser(User user, Inform inform) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(inform.getInformId())){
            logger.debug("-----> 举报信息不存在异常");
            result.put("msg", "举报信息不存在，请刷新后重试！");
            return result;
        }

        // 包装审核信息
        inform.setAuditUserId(user.getUserId());
        inform.setAuditTime(new Date());
        int count = informMapper.updateByPrimaryKeySelective(inform);
        if(count == 1){
            result.put("informVo", getInformVo(informMapper.selectByPrimaryKey(inform.getInformId())));
            result.put("msg", "success");
        } else{
            logger.debug("-----> 用户审核异常");
            result.put("msg", "审核出现异常，请刷新后重试！");
        }

        return result;
    }

    private InformVo getInformVo(Inform inform){
        return new InformVo(inform, userMapper.selectByPrimaryKey(inform.getAuserId()),
                userMapper.selectByPrimaryKey(inform.getBuserId()),
                StringUtils.isEmpty(inform.getAuditUserId()) ? null : userMapper.selectByPrimaryKey(inform.getAuditUserId()));
    }

    @Override
    public Map<String, Object> addAdmin(String userId) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(userId)){
            logger.debug("-----> 添加管理员异常");
            result.put("msg", "管理员设置失败，请刷新后重试！");
            return result;
        }

        User user = userMapper.selectByPrimaryKey(userId);
        if("ADMIN".equals(user.getUserType())){
            result.put("msg", "该用户已经是管理员");
            return result;
        }

        user.setUserType("ADMIN");
        userMapper.updateByPrimaryKeySelective(user);

        result.put("msg", "success");
        result.put("user", userMapper.selectByPrimaryKey(user.getUserId()));

        return result;
    }

    @Override
    public Map<String, Object> cancelAdmin(String userId) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(userId)){
            logger.debug("-----> 添加管理员异常");
            result.put("msg", "管理员取消失败，请刷新后重试！");
            return result;
        }

        User user = new User();
        user.setUserId(userId);
        user.setUserType("NORMAL");
        userMapper.updateByPrimaryKeySelective(user);

        result.put("msg", "success");
        result.put("user", userMapper.selectByPrimaryKey(user.getUserId()));

        return result;
    }

    @Override
    public Map<String, Object> addShareType(ShareType shareType) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(shareType.getShareTypeId())){
            result.put("msg", "分享信息类别编码不能为空！");
            return result;
        }

        if(StringUtils.isEmpty(shareType.getShareTypeName())){
            result.put("msg", "分享信息类别名称不能为空！");
            return result;
        }

        if(shareType.getTypeNum() <= 0){
            result.put("msg", "请输入大于0的类别编号");
            return result;
        }

        if(shareType.getTypeNum() >= 100){
            result.put("msg", "类别编码必须在1-99之间");
            return result;
        }

        // 判断编码是否已存在
        ShareType st = shareTypeMapper.selectByPrimaryKey(shareType.getShareTypeId());
        if(st != null){
            result.put("msg", "分享信息类别编码已存在！");
            return result;
        }

        st = shareTypeMapper.getShareTypeByName(StringUtils.trimWhitespace(shareType.getShareTypeName()));
        if(st != null){
            result.put("msg", "分享信息类别名称已存在！");
            return result;
        }

        int count = shareTypeMapper.getShareTypeAllCount();
        shareTypeMapper.insert(shareType);

        result.put("msg", "success");
        result.put("shareType", shareType);

        return result;
    }

    @Override
    public Map<String, Object> deleteShareType(String shareTypeId) {
        Map<String, Object> result = new HashMap<String, Object>();

        if (StringUtils.isEmpty(shareTypeId)) {
            logger.debug("-----> 删除分享信息类别不存在");
            result.put("msg", "分享信息类别不存在，请刷新后重试！");
            return result;
        }

        int count = shareTypeMapper.deleteByPrimaryKey(shareTypeId);

        if (count == 1) {
            result.put("msg", "success");
        } else {
            logger.debug("-----> 分享信息类别删除异常");
            result.put("msg", "分享信息类别删除失败，请刷新后重试");
        }

        return result;
    }

    @Override
    public Map<String, Object> updateShareType(ShareType shareType) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(shareType.getShareTypeId())){
            result.put("msg", "分享信息类别编码不能为空！");
            return result;
        }

        if(StringUtils.isEmpty(shareType.getShareTypeName())){
            result.put("msg", "分享信息类别名称不能为空！");
            return result;
        }

        if(shareType.getTypeNum() <= 0){
            result.put("msg", "请输入大于0的类别编号");
            return result;
        }

        if(shareType.getTypeNum() >= 100){
            result.put("msg", "类别编码必须在1-99之间");
            return result;
        }

        ShareType st = shareTypeMapper.getShareTypeByName(StringUtils.trimWhitespace(shareType.getShareTypeName()));
        if(st != null && !shareType.getShareTypeId().equals(st.getShareTypeId())){
            result.put("msg", "分享信息类别名称已存在！");
            return result;
        }

        shareTypeMapper.updateByPrimaryKeySelective(shareType);
        result.put("msg", "success");
        result.put("shareType", shareType);

        return result;
    }
}
