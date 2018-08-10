package cn.edu.scau.hlyz.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cn.edu.scau.hlyz.dao.MedicalRecordMapper;
import cn.edu.scau.hlyz.dao.PrescriptionMapper;
import cn.edu.scau.hlyz.entity.MedicalRecord;
import cn.edu.scau.hlyz.entity.Prescription;
import cn.edu.scau.hlyz.service.MedicalRecordService;
@Service
public class MedicalRecordServiceImpl implements MedicalRecordService {
	Logger logger = Logger.getLogger(MedicalRecordServiceImpl.class);
    @Autowired
    private MedicalRecordMapper mri;
    @Autowired
    private PrescriptionMapper prescriptionDao;
	@Override
	public List<MedicalRecord> findByPatient(String patientId, int page, int num) {
		// TODO Auto-generated method stub
		logger.info("select medical record by patient");
		return mri.findByPatient(patientId,(page-1)*num, num);
	}

	@Override
	public MedicalRecord findById(String medicalRecordId) {
		// TODO Auto-generated method stub
		logger.info("select medical record by id");
		return mri.findById(medicalRecordId);
	}

	@Override
	public Boolean addMedicalRecord(MedicalRecord medicalRecord) {
		// TODO Auto-generated method stub
		int a=mri.save(medicalRecord);
		for(Prescription p : medicalRecord.getPrstSet()){
			int b = prescriptionDao.save(p);
			a &= b;
		}
		if(a==1){
			logger.info("add medical record success");
			return true;
		}else{
			logger.error("add medical record fail");
			return false;
		}
	}

	@Override
	public int getFindByPatientCount(String patientId) {
		// TODO Auto-generated method stub
		int num = mri.getFindByPatientCount(patientId);
		logger.info("select medical record by patinet count: " + num);
		return num;
	}

}
