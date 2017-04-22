package edu.gmxx.share.service.impl;

import edu.gmxx.share.dao.*;
import edu.gmxx.share.domain.*;
import edu.gmxx.share.dto.ShareDTO;
import edu.gmxx.share.service.IShareService;
import edu.gmxx.share.utils.MyStringUtil;
import edu.gmxx.share.utils.PageModel;
import edu.gmxx.share.vo.EvalVo;
import edu.gmxx.share.vo.ShareVo;
import edu.gmxx.share.vo.TranspondVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.sql.Timestamp;
import java.util.*;

/**
 * 用户分享信息操作服务
 * Created by BIN on 2017/3/21.
 */
@Service("shareService")
@Transactional
public class ShareServiceImpl implements IShareService {
    private static final Logger logger = LoggerFactory.getLogger(ShareServiceImpl.class);
    @Autowired
    private ShareMapper shareMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private CollectMapper collectMapper;
    @Autowired
    private TranspondMapper transpondMapper;
    @Autowired
    private EvalMapper evalMapper;
    @Autowired
    private ShareTypeMapper shareTypeMapper;

    @Override
    public Map<String, Object> addShare(Share share, User user) {
        Map<String, Object> result = new HashMap<String, Object>();

        // 1.验证分享信息
        if(share == null || StringUtils.isEmpty(share.getShareTitle()) || StringUtils.isEmpty(share.getShareContent())){
            result.put("msg", "分享信息不能为空！");
            return result;
        }

        // 2.补充数据
        share.setUserId(user.getUserId());
        // 添加分享时间
        share.setCreateTime(new Timestamp(System.currentTimeMillis()));
        share.setShareId(MyStringUtil.getUUID());

        // 3.添加分享记录
        int count = shareMapper.insertSelective(share);
        if(count == 1){
            result.put("shareInfo", share);
            result.put("userInfo", user);
            result.put("msg", "success");
        } else{
            // 记录添加失败，回滚删除数据
            result.put("msg", "信息分享失败！");
        }

        return result;
    }

    @Override
    public Map<String, Object> getShareByType(String type, String shareTitle, String account, User user, PageModel page) {
        Map<String, Object> result = new HashMap<String, Object>();

        Share share = new Share();
        share.setShareTypeId(type);
        share.setShareTitle(shareTitle);

        User shareUser = userMapper.getUserByAccount(account);
        if(shareUser != null){
            share.setUserId(shareUser.getUserId());
        }

        // 获取记录数
        page.setTotalRecord(shareMapper.getShareCount(share));
        page.setPageSize(10);

        if(page.getPageNumber() > page.getTotalPages()){
            page.setPageNumber(page.getTotalPages());
        }

        // 获取分享信息
        ShareDTO shareDto = new ShareDTO();
        shareDto.setShare(share);
        shareDto.setPage(page);

        List<ShareVo> shares = new ArrayList<ShareVo>();
        // 1.获取分享信息列表
        List<Share> shareList = shareMapper.getShareByType(shareDto);

        // 2.获取用户信息
        List<User> userList = userMapper.getUserIdByType(shareDto);

        // 3.返回分享信息结果
        for(Share rShare : shareList){
            for(User acc : userList){
                if(rShare.getUserId().equals(acc.getUserId())){
                    shares.add(packShareVo(rShare, acc));
                }
            }
        }

        result.put("userInfo", user);
        result.put("page", page);
        result.put("shareTypeId", type);
        result.put("shares", shares);
        result.put("msg", "success");

        return result;
    }

    @Override
    public Map<String, Object> delete(String shareId) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(shareId)){
            result.put("msg", "分享信息不存在，请刷新后重试！");
            return result;
        }

        Share share = new Share(shareId, 1);
        int count = shareMapper.updateByPrimaryKeySelective(share);
        if(count == 1){
            result.put("msg", "success");
            logger.info("----->删除分享：" + shareId);
        } else{
            result.put("msg", "删除失败,请刷新后重试！");
        }

        return result;
    }

    @Override
    public Map<String, Object> thumbUp(String shareId, String userId) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(shareId)){
            result.put("msg", "分享信息不存在，请刷新后重试！");
            return result;
        }

        Share share = shareMapper.selectByPrimaryKey(shareId);
        String thumbUpId = share.getThumbUpId();
        List<String> userIds = null;
        if(!StringUtils.isEmpty(thumbUpId)){
            userIds = MyStringUtil.stringsToList(thumbUpId.split(","));
            Iterator<String> it = userIds.iterator();
            boolean up = false;

            while(it.hasNext()){
                // 取消赞
                if(it.next().equals(userId)){
                    it.remove();
                    up = true;
                    break;
                }
            }

            if(!up){
                userIds.add(userId);
            }
        } else{
            // 点赞
            userIds = new ArrayList<String>();
            userIds.add(userId);
        }

        share.setThumbUpId(MyStringUtil.listToString(userIds, ","));
        int count = shareMapper.updateByPrimaryKeySelective(share);
        if(count == 1){
            result.put("msg", "success");
        } else{
            result.put("msg", "点赞失败,请刷新后重试！");
        }

        return result;
    }

    @Override
    public Map<String, Object> collect(String shareId, String userId) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(shareId)){
            result.put("msg", "分享信息不存在，请刷新后重试！");
            return result;
        }

        Collect collect = collectMapper.getCollectByUserAndShare(new Collect(shareId, userId));
        int count = 0;
        if(collect == null){
            // 收藏
            collect = new Collect(MyStringUtil.getUUID(), shareId, userId);
            count = collectMapper.insertSelective(collect);
        } else{
            // 取消收藏
            count = collectMapper.deleteByPrimaryKey(collect.getCollectId());
        }
        if(count == 1){
            result.put("msg", "success");
        } else{
            result.put("msg", "收藏失败,请刷新后重试！");
        }

        return result;
    }

    @Override
    public Map<String, Object> transpond(Transpond transpond, User user) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(transpond.getShareId())){
            result.put("msg", "转发的分享信息不存在，请刷新后重试！");
            return result;
        }

        if(StringUtils.isEmpty(transpond.getReason())){
            result.put("msg", "转发理由不能为空！");
            return result;
        }

        // 1.获取原始分享的id
        Share share = shareMapper.selectByPrimaryKey(transpond.getShareId());

        String shareId;
        if(StringUtils.isEmpty(share.getTranspondId())){
            shareId = share.getShareId();
        } else{
            shareId = transpondMapper.selectByPrimaryKey(share.getTranspondId()).getShareId();
        }

        long time = System.currentTimeMillis();
        // 2.新增转发
        String transpondId = MyStringUtil.getUUID();
        transpond.setShareId(shareId);
        transpond.setUserId(share.getUserId());
        transpond.setTranspondId(transpondId);
        transpond.setTranspondTime(new Timestamp(time));
        int count = transpondMapper.insertSelective(transpond);
        if(count != 1){
            result.put("msg", "转发失败,请刷新后重试！");
            return result;
        }

        // 3.新增分享信息
        share.setShareId(MyStringUtil.getUUID());
        share.setTranspondId(transpondId);
        share.setCreateTime(new Timestamp(time));
        share.setThumbUpId(null); // 清除点赞列表
        share.setUserId(user.getUserId());
        share.setVisible("all");

        count = shareMapper.insertSelective(share);
        if(count != 1){
            transpondMapper.deleteByPrimaryKey(transpondId);
            result.put("msg", "转发失败,请刷新后重试！");
            return result;
        }

        result.put("msg", "success");
        result.put("shareInfo", share);
        result.put("userInfo", user);
        result.put("transpondInfo", new TranspondVo(transpond, userMapper.selectByPrimaryKey(transpond.getUserId())));

        return result;
    }

    @Override
    public Map<String, Object> eval(Eval eval, User user) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(eval.getShareId())){
            result.put("msg", "评论的分享信息不存在，请刷新后重试！");
            return result;
        }

        // 1.包装评论信息
        eval.setUserId(user.getUserId());
        eval.setCreateTime(new Timestamp(System.currentTimeMillis()));
        eval.setEvalId(MyStringUtil.getUUID());

        // 2.保存评论信息
        int count = evalMapper.insertSelective(eval);

        if(count != 1){
            result.put("msg", "评论失败,请刷新后重试！");
            return result;
        }

        User shareUser = userMapper.selectByPrimaryKey(eval.getShareUserId());
        EvalVo evalVo = new EvalVo(eval, shareUser, user, shareUser);
        result.put("evalInfo", evalVo);
        result.put("msg", "success");

        return result;
    }

    @Override
    public Map<String, Object> deleteEval(String evalId, User user) {
        Map<String, Object> result = new HashMap<String, Object>();

        if(StringUtils.isEmpty(evalId)){
            result.put("msg", "评论信息不存在，请刷新后重试！");
            return result;
        }

        Eval eval = evalMapper.selectByPrimaryKey(evalId);
        if(eval != null){
            if(StringUtils.isEmpty(eval.getReplyEvalId())){
                result.put("isEval", true);
                evalMapper.deleteByReplyEval(evalId);
            }

            int count = evalMapper.deleteByPrimaryKey(evalId);
            if(count == 1){
                result.put("msg", "success");
                logger.info("----->删除评论：" + evalId);
            } else{
                result.put("msg", "评论删除失败,请刷新后重试！");
            }
        } else{
            result.put("msg", "评论信息不存在，请刷新后重试！");
        }

        return result;
    }

    @Override
    public Map<String, Object> getEval(String shareId) {
        Map<String, Object> result = new HashMap<String, Object>();
        if(StringUtils.isEmpty(shareId)){
            result.put("msg", "分享信息不存在，请刷新后重试！");
            return result;
        }

        List<Eval> evals = evalMapper.getEvalByShareId(shareId);
        List<EvalVo> evalVos = new ArrayList<EvalVo>();

        for(Eval eval : evals){
            User shareUser = userMapper.selectByPrimaryKey(eval.getShareUserId());
            evalVos.add(new EvalVo(eval, shareUser, userMapper.selectByPrimaryKey(eval.getUserId()), shareUser));
        }

        result.put("evals", evalVos);
        result.put("msg", "success");

        return result;
    }

    @Override
    public Map<String, Object> reply(Eval eval, User user) {
        Map<String, Object> result = new HashMap<String, Object>();
        if(StringUtils.isEmpty(eval.getEvalId())){
            result.put("msg", "回复失败，请刷新后重试！");
            return result;
        }

        // 1.包装回复信息
        Eval oldEval = evalMapper.selectByPrimaryKey(eval.getEvalId());
        Eval replyeval = new Eval();
        replyeval.setEvalId(MyStringUtil.getUUID());
        replyeval.setReplyEvalId(StringUtils.isEmpty(oldEval.getReplyEvalId()) ?
                oldEval.getEvalId() : oldEval.getReplyEvalId());
        replyeval.setEvalContent(eval.getEvalContent());
        replyeval.setCreateTime(new Timestamp(System.currentTimeMillis()));
        replyeval.setShareId(oldEval.getShareId());
        replyeval.setShareUserId(oldEval.getShareUserId());
        replyeval.setUserId(user.getUserId());
        replyeval.setReplyUserId(eval.getReplyUserId());

        // 2.保存回复信息
        int count = evalMapper.insertSelective(replyeval);

        EvalVo replyEvalVo = new EvalVo(replyeval, userMapper.selectByPrimaryKey(replyeval.getShareUserId()),
                userMapper.selectByPrimaryKey(replyeval.getUserId()),
                userMapper.selectByPrimaryKey(replyeval.getReplyUserId()));
        result.put("replyInfo", replyEvalVo);
        result.put("msg", "success");

        return result;
    }

    @Override
    public Map<String, Object> getReply(String evalId) {
        Map<String, Object> result = new HashMap<String, Object>();

        List<Eval> evals = evalMapper.getEvalByReplyEval(evalId);
        List<EvalVo> evalVos = new ArrayList<EvalVo>();

        for(Eval eval : evals){
            evalVos.add(new EvalVo(eval, userMapper.selectByPrimaryKey(eval.getShareUserId()),
                    userMapper.selectByPrimaryKey(eval.getUserId()),
                    userMapper.selectByPrimaryKey(eval.getReplyUserId())));
        }

        result.put("replyEvals", evalVos);
        result.put("msg", "success");

        return result;
    }

    @Override
    public int getShareCountByUser(String userId) {
        return StringUtils.isEmpty(userId) ? 0 : shareMapper.getShareCountByUser(userId);
    }

    @Override
    public int getCollectCountByUser(String userId) {
        return StringUtils.isEmpty(userId) ? 0 : collectMapper.getCollectCountByUser(userId);
    }

    @Override
    public Map<String, Object> getCollectShare(String userId, PageModel page) {
        Map<String, Object> result = new HashMap<String, Object>();
        User user = userMapper.selectByPrimaryKey(userId);

        // 用户id
        Share share = new Share();
        share.setUserId(userId);

        // 分页信息
        page.setTotalRecord(collectMapper.getCollectCountByUser(userId));
        page.setPageSize(10);

        if(page.getPageNumber() > page.getTotalPages()){
            page.setPageNumber(page.getTotalPages());
        }

        ShareDTO shareDTO = new ShareDTO();
        shareDTO.setShare(share);
        shareDTO.setPage(page);

        List<Share> shareList = shareMapper.getCollectShare(shareDTO);
        List<ShareVo> shares = new ArrayList<ShareVo>();

        List<User> userList = userMapper.getUserIdByCollectShare(shareDTO);
        // 3.返回分享信息结果
        for(Share rShare : shareList){
            for(User acc : userList){
                if(rShare.getUserId().equals(acc.getUserId())){
                    shares.add(packShareVo(rShare, acc));
                }
            }
        }

        result.put("userInfo", user);
        result.put("page", page);
        result.put("shareTypeId", "all");
        result.put("shares", shares);
        result.put("msg", "success");

        return result;
    }

    @Override
    public ShareVo getShareVoByShareId(String shareId) {
        Share share = shareMapper.selectByPrimaryKey(shareId);

        // 判断分享是否为转发分享
        String transpondId = share.getTranspondId();
        TranspondVo transpondVo = null;
        if(StringUtils.isEmpty(transpondId)){
            transpondVo = null;
        } else{
            Transpond transpond = transpondMapper.selectByPrimaryKey(transpondId);
            transpondVo = new TranspondVo(transpond, userMapper.selectByPrimaryKey(transpond.getUserId()));
        }

        return new ShareVo(share, userMapper.selectByPrimaryKey(share.getUserId()),
                collectMapper.getCollectByShareId(share.getShareId()), transpondVo,
                transpondMapper.getTranspondCount(share.getShareId()));
    }

    @Override
    public List<ShareVo> getFriendDynamic(User user) {
        if(user == null || StringUtils.isEmpty(user.getUserId())){
            return null;
        }

        Share share = new Share();
        share.setUserId(user.getUserId());
        PageModel page = new PageModel();
        page.setPageSize(3);

        List<Share> shares = shareMapper.getFriendDynamic(new ShareDTO(share, page));
        List<ShareVo> shareVos = new ArrayList<ShareVo>();
        for(Share sh : shares){
            if(!StringUtils.isEmpty(sh.getTranspondId())){
                shareVos.add(new ShareVo(sh, userMapper.selectByPrimaryKey(sh.getUserId()),
                        new TranspondVo(transpondMapper.selectByPrimaryKey(sh.getTranspondId()))));
            } else{
                shareVos.add(new ShareVo(sh, userMapper.selectByPrimaryKey(sh.getUserId())));
            }
        }

        return shareVos;
    }

    @Override
    public List<ShareVo> getAttentionDynamic(User user) {
        if(user == null || StringUtils.isEmpty(user.getUserId())){
            return null;
        }

        Share share = new Share();
        share.setUserId(user.getUserId());
        PageModel page = new PageModel();
        page.setPageSize(3);

        List<Share> shares = shareMapper.getAttentionDynamic(new ShareDTO(share, page));
        List<ShareVo> shareVos = new ArrayList<ShareVo>();
        for(Share sh : shares){
            if(!StringUtils.isEmpty(sh.getTranspondId())){
                shareVos.add(new ShareVo(sh, userMapper.selectByPrimaryKey(sh.getUserId()),
                        new TranspondVo(transpondMapper.selectByPrimaryKey(sh.getTranspondId()))));
            } else{
                shareVos.add(new ShareVo(sh, userMapper.selectByPrimaryKey(sh.getUserId())));
            }
        }

        return shareVos;
    }

    /**
     * 包装分享信息
     * @param share
     * @param user
     * @return
     */
    private ShareVo packShareVo(Share share, User user){
        if(share.getUserId().equals(user.getUserId())){
            // 获取收藏该信息的列表
            List<Collect> collects = collectMapper.getCollectByShareId(share.getShareId());
            // 获取转发信息
            TranspondVo transpondVo = null;
            if(!StringUtils.isEmpty(share.getTranspondId())){
                Transpond transpond = transpondMapper.selectByPrimaryKey(share.getTranspondId());
                transpondVo = new TranspondVo(transpond, userMapper.selectByPrimaryKey(transpond.getUserId()));
            }
            int transpondCount = transpondMapper.getTranspondCount(share.getShareId());

            return new ShareVo(share, user, collects, transpondVo, transpondCount);
        }
        return null;
    }

    @Override
    public List<ShareType> getAllShareType() {
        return shareTypeMapper.getAllShareType();
    }

    @Override
    public ShareType getShareTypeById(String shareTypeId) {
        ShareType shareType = shareTypeMapper.selectByPrimaryKey(shareTypeId);
        // 如果类别不存在默认为其他
        if(shareType == null){
            shareType = new ShareType();
            shareType.setShareTypeId("qt");
            shareType.setShareTypeName("其他");
            shareType.setTypeNum(0);
        }
        return shareType;
    }
}
