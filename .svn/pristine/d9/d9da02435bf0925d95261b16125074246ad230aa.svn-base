package cn.edu.scau.hlyz.service;

import cn.edu.scau.hlyz.entity.ConsumptionOrder;
import cn.edu.scau.hlyz.entity.Doctor;
import cn.edu.scau.hlyz.entity.MedicalRecord;
import cn.edu.scau.hlyz.entity.Patient;
import cn.edu.scau.hlyz.entity.Suser;

public interface TransactionalService {
	int addDoctor(Doctor dt, Suser user);
	int addPatient(Patient patient, Suser user);
	int addMedicalRecordAndConsumption(MedicalRecord mr,ConsumptionOrder co);
}
