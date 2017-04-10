package edu.gmxx.share.service;

import edu.gmxx.share.domain.Eval;
import edu.gmxx.share.domain.Share;
import edu.gmxx.share.domain.Transpond;
import edu.gmxx.share.domain.User;
import edu.gmxx.share.utils.PageModel;
import edu.gmxx.share.vo.ShareVo;

import java.util.List;
import java.util.Map;

/**
 * 信息分享服务接口
 * Created by BIN on 2017/3/21.
 */
public interface IShareService {
    /**
     * 新增分享信息
     * @param share
     * @param user
     * @return
     */
    Map<String, Object> addShare(Share share, User user);

    /**
     * 根据分享信息类型获取数据
     *
     * @param type
     * @param account
     * @param user
     * @param page
     * @return
     */
    Map<String,Object> getShareByType(String type, String account, User user, PageModel page);

    /**
     * 删除分享信息，将删除状态标记为1
     * @param shareId
     * @return
     */
    Map<String,Object> delete(String shareId);

    /**
     * 对分享信息进行点赞
     * @param shareId
     * @param userId
     * @return
     */
    Map<String,Object> thumbUp(String shareId, String userId);

    /**
     * 用户收藏分享信息
     * @param shareId
     * @param userId
     * @return
     */
    Map<String,Object> collect(String shareId, String userId);

    /**
     * 转发信息
     * @param transpond
     * @param user
     * @return
     */
    Map<String, Object> transpond(Transpond transpond, User user);

    /**
     * 评论分享信息
     * @param eval
     * @param user
     * @return
     */
    Map<String,Object> eval(Eval eval, User user);

    /**
     * 删除评论
     * @param evalId
     * @param user
     * @return
     */
    Map<String,Object> deleteEval(String evalId, User user);

    /**
     * 获取评论信息
     * @param shareId
     * @return
     */
    Map<String,Object> getEval(String shareId);

    /**
     * 回复评论
     * @param eval
     * @param user
     * @return
     */
    Map<String,Object> reply(Eval eval, User user);

    /**
     * 获取回复内容
     * @param evalId
     * @return
     */
    Map<String,Object> getReply(String evalId);

    /**
     * 获取用户分享信息数量
     * @param userId
     * @return
     */
    int getShareCountByUser(String userId);

    /**
     * 获取用户收藏分享数
     * @param userId
     * @return
     */
    int getCollectCountByUser(String userId);

    /**
     * 获取收藏分享信息
     * @param userId
     * @param page
     * @return
     */
    Map<String,Object> getCollectShare(String userId, PageModel page);

    /**
     * 获取分享信息视图
     * @param shareId
     * @return
     */
    ShareVo getShareVoByShareId(String shareId);

    /**
     * 获取最近好友动态
     * @param user
     * @return
     */
    List<ShareVo> getFriendDynamic(User user);

    /**
     * 获取最近关注好友动态
     * @param user
     * @return
     */
    List<ShareVo> getAttentionDynamic(User user);
}
