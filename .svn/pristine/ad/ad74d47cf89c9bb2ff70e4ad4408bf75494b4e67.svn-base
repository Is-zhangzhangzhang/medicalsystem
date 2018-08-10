package cn.edu.scau.hlyz.service;

import java.util.List;

import cn.edu.scau.hlyz.entity.Doctor;
import cn.edu.scau.hlyz.entity.Suser;

public interface PhysicianInformationService {
	Doctor findByUser(Suser user);
	Boolean addInformation(Doctor doctor);
	Boolean updateInformation(Doctor doctor);
	Boolean deleteInformation(Doctor doctor);
	int getFindAllCount();
	List<Doctor> findAll(int page, int num);
	List<Doctor> findByFlied(String flied, Object value);
}
