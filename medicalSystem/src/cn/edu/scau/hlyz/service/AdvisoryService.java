package cn.edu.scau.hlyz.service;

import java.util.List;

import cn.edu.scau.hlyz.entity.Advisory;
import cn.edu.scau.hlyz.entity.Reply;

public interface AdvisoryService {
	Boolean addAdvisory(Advisory advisory);
	Boolean addRespondence(Reply reply);
	Advisory findAdvisoryById(String id);
	int getFindAllAdvisoryOfDoctorCount(String doctorId);
	int getFindAllAdvisoryOfPatientCount(String patientId);
	int getFindAllRespondenceOfAdvisory(String advisoryId);
	List<Advisory> findAllAdvisoryOfDoctor(String doctorId, int page , int num);
	List<Advisory> findAllAdvisoryOfPatient(String patientId, int page , int num);
	List<Reply> findAllRespondenceOfAdvisory(String advisoryId, int page , int num);
	List<Advisory> findUnreadAdvisoryOfDoctor(String doctorId);
	Boolean setAdvisoryReadOfDoctor(String advisoryId);
	List<Reply> findDoctorUnreadReply(String doctorId);
	List<Reply> findPatientUnreadReply(String patientId);
	Boolean setReplysOfAdvisoryRead(String advisoryId,String userId);
}
