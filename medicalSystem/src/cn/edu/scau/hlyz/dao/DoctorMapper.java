package cn.edu.scau.hlyz.dao;

import cn.edu.scau.hlyz.entity.Suser;

import java.util.List;

import cn.edu.scau.hlyz.entity.Clinic;
import cn.edu.scau.hlyz.entity.Doctor;;

public interface DoctorMapper {

	public List<Doctor> findAllClinic();
	public List<Doctor> findByClinic(Clinic clinic);
	public List<Doctor> findAllPage(int start,int num);
	public Doctor findDoctorClinic(Suser user);
	public int getDoctorNum();
	public int addDoctor(Doctor d);
	public int deleteDoctor(Doctor d);
	public int updateDoctor(Doctor d);
}
