package cn.edu.scau.hlyz.dao;

import java.util.List;

import cn.edu.scau.hlyz.entity.Reply;

public interface ReplyMapper {
	int save(Reply reply);
	int getFindByAdvisoryCount(String advisoryId);
	List<Reply> findByAdvisory(String advisoryId, int start, int num);
	int updateAllReplyRead(String ad_id,String user_id);
	List<Reply> findByDoctorUnread(String dt_id);
	List<Reply> findByPatientUnread(String pt_id);
	int getDoctorUnreadCount(String dt_id);
	int getPatientUnreadCount(String pt_id);
}
