package cn.edu.scau.hlyz.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cn.edu.scau.hlyz.dao.PatientMapper;
import cn.edu.scau.hlyz.entity.Patient;
import cn.edu.scau.hlyz.entity.Suser;
import cn.edu.scau.hlyz.service.PatientInformationService;
@Service
public class PatientInformationServiceImpl implements PatientInformationService {
    @Autowired
    private PatientMapper pti;
	@Override
	public Patient findByUser(Suser user) {
		//�����û���Ϣ��ȡҽʦ��Ϣ������
		// TODO Auto-generated method stub
		return pti.findById(user.getUser_id());
	}

	@Override
	public Boolean addInformation(Patient patient) {
		// TODO Auto-generated method stub
		int a=pti.save(patient);
		if(a==1){
			return true;
		}else{
			return false;
		}
	}

	@Override
	public Boolean updateInformation(Patient patient) {
		// TODO Auto-generated method stub
		int a=pti.update(patient);
		if(a==1){
			return true;
		}else{
			return false;
		}
	}

	@Override
	public Boolean deleteInformation(Patient patient) {
		// TODO Auto-generated method stub
		int a=pti.delete(patient.getPt_id());
		if(a==1){
			return true;
		}else{
			return false;
		}
	}

	@Override
	public String getPatientID(String phone) {
		// TODO Auto-generated method stub
		return pti.getIdByPhone(phone);
	}

	@Override
	public Boolean checkPatientIDCardNum(String IDCardNum) {
		// TODO Auto-generated method stub
		if(pti.checkIDCardNum(IDCardNum)!=null)
		return false;
		else return true;
	}

}
