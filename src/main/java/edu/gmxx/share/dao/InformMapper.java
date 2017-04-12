package edu.gmxx.share.dao;

import edu.gmxx.share.domain.Inform;
import edu.gmxx.share.dto.InformDTO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface InformMapper {
    int deleteByPrimaryKey(String informId);

    int insert(Inform record);

    int insertSelective(Inform record);

    Inform selectByPrimaryKey(String informId);

    int updateByPrimaryKeySelective(Inform record);

    int updateByPrimaryKey(Inform record);

    /**
     * 分页根据审核状态获取举报信息
     * @param informDTO
     * @return
     */
    List<Inform> getInformDataByStatus(InformDTO informDTO);

    /**
     * 获取记录数
     * @param auditStatus
     * @return
     */
    int getInformDataByStatusCount(@Param("status") String status);
}