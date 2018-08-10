package cn.edu.scau.hlyz.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cn.edu.scau.hlyz.dao.DoctorMapper;
import cn.edu.scau.hlyz.entity.Clinic;
import cn.edu.scau.hlyz.entity.Doctor;
import cn.edu.scau.hlyz.entity.Suser;
import cn.edu.scau.hlyz.service.PhysicianInformationService;
@Service
public class PhysicianInformationServiceImpl implements PhysicianInformationService {
    @Autowired
    private DoctorMapper dti;
	@Override
	public Doctor findByUser(Suser user) {
		// TODO Auto-generated method stub
		return dti.findDoctorClinic(user);
	}

	@Override
	public Boolean addInformation(Doctor doctor) {
		// TODO Auto-generated method stub
		int a=dti.addDoctor(doctor);
		if(a==1){
			return true;
		}else{
			return false;
		}
	}

	@Override
	public Boolean updateInformation(Doctor doctor) {
		// TODO Auto-generated method stub
		int a=dti.updateDoctor(doctor);
		if(a==1){
			return true;
		}else{
			return false;
		}
	}

	@Override
	public Boolean deleteInformation(Doctor doctor) {
		// TODO Auto-generated method stub
		int a=dti.deleteDoctor(doctor);
		if(a==1){
			return true;
		}else{
			return false;
		}
	}

	@Override
	public List<Doctor> findAll(int page, int num) {
		// TODO Auto-generated method stub
		return dti.findAllPage((page-1)*num, num);
	}

	@Override
	public List<Doctor> findByFlied(String flied, Object value) {
		//根据字段条件查询医师信息，并返回医师列表
		if(flied.equals("clinic")||flied.equals("Clinic")){
			return dti.findByClinic((Clinic)value);
		}
		else return null;
	}

	@Override
	public int getFindAllCount() {
		// TODO Auto-generated method stub
		return dti.getDoctorNum();
	}

}
