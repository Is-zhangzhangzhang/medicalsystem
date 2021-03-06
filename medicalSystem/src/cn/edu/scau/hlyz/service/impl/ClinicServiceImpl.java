package cn.edu.scau.hlyz.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cn.edu.scau.hlyz.dao.ClinicMapper;
import cn.edu.scau.hlyz.entity.Clinic;
import cn.edu.scau.hlyz.service.ClinicService;
@Service
public class ClinicServiceImpl implements ClinicService {
    @Autowired
    private ClinicMapper cli;
	@Override
	public Clinic findClinicById(String clinicId) {
		// TODO Auto-generated method stub
		return cli.findById(clinicId);
	}

	@Override
	public List<Clinic> findAllClinic(int page, int num) {
		// TODO Auto-generated method stub
		return cli.findAll((page-1)*num, num);
	}

	@Override
	public Boolean addClinic(Clinic clinic) {
		// TODO Auto-generated method stub
		int a=cli.addClinic(clinic);
		if(a==1){
			return true;
		}else{
			return false;
		}
	}

	@Override
	public Boolean updateClinic(Clinic clinic) {
		// TODO Auto-generated method stub
		int a=cli.updateClinic(clinic);
		if(a==1){
			return true;
		}else{
			return false;
		}
	}

	@Override
	public Boolean deleteClinic(Clinic clinic) {
		// TODO Auto-generated method stub
		int a=cli.deleteClinic(clinic);
		if(a==1){
			return true;
		}else{
			return false;
		}
	}

	@Override
	public int getFindAllClinicCount() {
		// TODO Auto-generated method stub
		int num = cli.getClinicNum();
		return num;
	}

}
