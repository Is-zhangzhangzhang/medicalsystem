package cn.edu.scau.hlyz.service;

import java.util.List;

import cn.edu.scau.hlyz.entity.MedicalRecord;

public interface MedicalRecordService {
	int getFindByPatientCount(String patientId);
	List<MedicalRecord> findByPatient(String patientId, int page , int num);
	MedicalRecord findById(String medicalRecordId);
	Boolean addMedicalRecord(MedicalRecord medicalRecord);
}
