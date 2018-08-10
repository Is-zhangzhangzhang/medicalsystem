package cn.edu.scau.hlyz.service;

import java.util.List;

import cn.edu.scau.hlyz.entity.Doctor;
import cn.edu.scau.hlyz.entity.RegistrationForm;

public interface RegisteredService {
	void loadRegister();
	RegistrationForm findById(String id);
	Boolean addRegister(RegistrationForm rform);
	RegistrationForm getNextRegister(Doctor doctor);
	RegistrationForm getFirstRegister(Doctor doctor);
	void registerComplete(String id);
	List<RegistrationForm> getDoctorRegisters(Doctor doctor);
	int getFindAllCount();
	List<RegistrationForm> findAll(int page , int num);
	int getRemainingQuantity(String doctorId, int dayOfWeek, int startTime); 
	List<RegistrationForm> getPatientRegister(String patientId);
}
