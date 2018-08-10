package cn.edu.scau.hlyz.service.impl;

import java.sql.SQLException;
import java.util.Iterator;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import cn.edu.scau.hlyz.dao.ConsumptionOrderMapper;
import cn.edu.scau.hlyz.dao.DoctorMapper;
import cn.edu.scau.hlyz.dao.MedicalRecordMapper;
import cn.edu.scau.hlyz.dao.PatientMapper;
import cn.edu.scau.hlyz.dao.PrescriptionMapper;
import cn.edu.scau.hlyz.dao.UserMapper;
import cn.edu.scau.hlyz.entity.ConsumptionOrder;
import cn.edu.scau.hlyz.entity.Doctor;
import cn.edu.scau.hlyz.entity.MedicalRecord;
import cn.edu.scau.hlyz.entity.Medicine;
import cn.edu.scau.hlyz.entity.Patient;
import cn.edu.scau.hlyz.entity.Prescription;
import cn.edu.scau.hlyz.entity.Suser;
import cn.edu.scau.hlyz.service.PhysicianInformationService;
import cn.edu.scau.hlyz.service.TransactionalService;
import cn.edu.scau.hlyz.service.UserService;
@Service
public class TransactionalServiceImpl implements TransactionalService {
	@Autowired
	private UserMapper userDao;
	@Autowired
	private DoctorMapper doctorDao;
	@Autowired
	private PatientMapper patientDao;
	@Autowired
	private MedicalRecordMapper medicalRecordDao;
	@Autowired
	private ConsumptionOrderMapper coDao;
	@Autowired
	private PrescriptionMapper prescriptionDao;
	
	@Transactional
	@Override
	public int addDoctor(Doctor dt, Suser user) {
		int res = 0;
	 try{
		res = userDao.addUser(user);
		if (res == 1) {
			res &= doctorDao.addDoctor(dt);
		}
		
	 }catch (Exception e) {
		 throw new RuntimeException();
//		 TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();

//		 TODO: handle exception
	}
	 return res;
	}
	@Transactional
	@Override
	public int addPatient(Patient patient, Suser user) {
		int res = 0;
		 try{
			res = userDao.addUser(user);
			if (res == 1) {
				res &= patientDao.save(patient);
			}
			
		 }catch (Exception e) {
			 throw new RuntimeException();
		}
		 return res;
	}
	@Transactional
	@Override
	public int addMedicalRecordAndConsumption(MedicalRecord mr, ConsumptionOrder co) {
		int res=0;
		System.out.println(res);
		try{
		res=medicalRecordDao.save(mr);
		System.out.println(res);
		if(res==1){
			for(Prescription p : mr.getPrstSet()){
				int b = prescriptionDao.save(p);
				res &= b;
				System.out.println(res);
			}
			if(res>0){
				MedicalRecord mr1=co.getMr();
				Set<Prescription> sp=mr1.getPrstSet();
				double dt_money=mr1.getDoctor().getMoney();
				Iterator<Prescription> it=sp.iterator();
				double moneyOfMedicine=0;
				double totalConsumptionMoney=0;
				while(it.hasNext()){
					Prescription p=it.next();
					Medicine m=p.getMedicine();
					moneyOfMedicine+=m.getMd_price()*p.getPr_num();
				}
				moneyOfMedicine=moneyOfMedicine*mr1.getMr_taken_times()*mr1.getMr_taken_days();
				totalConsumptionMoney=moneyOfMedicine+dt_money;
				co.setCo_price(totalConsumptionMoney);
				co.setCo_status("unpay");
				res&=coDao.addConsumptionOrder(co);
			}
		}
	}catch(Exception e){
		 throw new RuntimeException();
	}
		return res;

}
}
