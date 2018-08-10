package cn.edu.scau.hlyz.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import cn.edu.scau.hlyz.entity.Advisory;

public interface AdvisoryMapper {
	int save(Advisory advisory);
	Advisory findById(String id);
	int getFindByDoctorCount(String doctorId);
	int getFindByPatientCount(String patientId);
	List<Advisory> findByDoctor(String doctorId, int start, int num);
	List<Advisory> findByPatient(String patientId, int start, int num);
	int getUnreadAdvisory(String dt_id);
	List<Advisory> findUnreadAdvisory(String dt_id,int start,int num);
	int setAdvisoryRead(String ad_id);
}
