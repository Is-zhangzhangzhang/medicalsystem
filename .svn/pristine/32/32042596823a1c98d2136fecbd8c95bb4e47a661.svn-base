package cn.edu.scau.hlyz.dao;

import java.util.List;

import cn.edu.scau.hlyz.entity.RegistrationForm;

public interface RegistrationFormMapper {
	int getFindAllCount();
	List<RegistrationForm> findTwoHours();
	List<RegistrationForm> findAll(int start, int num);
	List<RegistrationForm> findByPatient(String patientId);
	RegistrationForm findById(String id);
	int save(RegistrationForm registrationForm);
	int updateStatus(RegistrationForm registrationForm);
	int getCount(String doctorId, int dayOfWeek, int hour);
}
