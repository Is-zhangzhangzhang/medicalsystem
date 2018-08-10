package cn.edu.scau.hlyz.service.impl;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.scau.hlyz.dao.AdvisoryMapper;
import cn.edu.scau.hlyz.dao.ReplyMapper;
import cn.edu.scau.hlyz.entity.Advisory;
import cn.edu.scau.hlyz.entity.Reply;
import cn.edu.scau.hlyz.service.AdvisoryService;

@Service
public class AdvisoryServiceImpl implements AdvisoryService{
	Logger logger = Logger.getLogger(AdvisoryServiceImpl.class);
	@Autowired
	private AdvisoryMapper adi;
	@Autowired
	private ReplyMapper rei;

	@Override
	public Boolean addAdvisory(Advisory advisory) {
		// TODO Auto-generated method stub
		int a=adi.save(advisory);
		if(a==1){
			logger.info("add advisory success");
			return true;
		}	
		else{
			logger.error("add advisory fail");
			return false;
		}	
	}

	@Override
	public Boolean addRespondence(Reply reply) {
		// TODO Auto-generated method stub
		int a=rei.save(reply);
		if(a==1){
			logger.info("add reply success");
			return true;
		}	
		else{
			logger.error("add reply fail");
			return false;
		}
	}

	@Override
	public Advisory findAdvisoryById(String id) {
		// TODO Auto-generated method stub
		logger.info("select advisory by id");
		return adi.findById(id);
	}

	@Override
	public List<Advisory> findAllAdvisoryOfDoctor(String doctorId, int page, int num) {
		// TODO Auto-generated method stub
		logger.info("select advisory by doctor");
		return adi.findByDoctor(doctorId, (page-1)*num, num);
	}

	@Override
	public List<Advisory> findAllAdvisoryOfPatient(String patientId, int page, int num) {
		// TODO Auto-generated method stub
		logger.info("select advisory by patient");
		return adi.findByPatient(patientId, (page-1)*num, num);
	}

	@Override
	public List<Reply> findAllRespondenceOfAdvisory(String advisoryId, int page, int num) {
		// TODO Auto-generated method stub
		logger.info("select reply by advisory");
		return rei.findByAdvisory(advisoryId, (page-1)*num, num);
	}

	@Override
	public int getFindAllAdvisoryOfDoctorCount(String doctorId) {
		// TODO Auto-generated method stub
		int num = adi.getFindByDoctorCount(doctorId);
		logger.info("select all advisory by doctor count: " + num);
		return num;
	}

	@Override
	public int getFindAllAdvisoryOfPatientCount(String patientId) {
		// TODO Auto-generated method stub
		int num = adi.getFindByPatientCount(patientId);
		logger.info("select all advisory by patient count: " + num);
		return num;
	}

	@Override
	public int getFindAllRespondenceOfAdvisory(String advisoryId) {
		// TODO Auto-generated method stub
		int num = rei.getFindByAdvisoryCount(advisoryId);
		logger.info("select all reply by advisory count: " + num);
		return num;
	}

	@Override
	public List<Advisory> findUnreadAdvisoryOfDoctor(String doctorId) {
		// TODO Auto-generated method stub
		int num=adi.getUnreadAdvisory(doctorId);
		logger.info("select unread advisory count: " + num);
		logger.info("select unread advisory ");
		return adi.findUnreadAdvisory(doctorId, 0, num);
	}

	@Override
	public Boolean setAdvisoryReadOfDoctor(String advisoryId) {
		// TODO Auto-generated method stub
		int num=adi.setAdvisoryRead(advisoryId);
		if(num==1){
			logger.info("update advisory success");
			return true;
		}
		else{
			logger.info("update advisory error");
			return false;
		}
	}

	@Override
	public List<Reply> findDoctorUnreadReply(String doctorId) {
		logger.info("select doctor unread reply ");
		return rei.findByDoctorUnread(doctorId);
	}

	@Override
	public List<Reply> findPatientUnreadReply(String patientId) {
		// TODO Auto-generated method stub
		logger.info("select patient unread reply ");
		return rei.findByPatientUnread(patientId);
	}

	@Override
	public Boolean setReplysOfAdvisoryRead(String advisoryId,String userId) {
		// TODO Auto-generated method stub
		int num=rei.updateAllReplyRead(advisoryId,userId);
		if(num>0){
			logger.info("update reply success");
			return true;
		}
		else{
			logger.info("update reply error");
			return false;
		}
	}
	
}
