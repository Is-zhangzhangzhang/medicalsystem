package cn.edu.scau.hlyz.service.impl;

import org.springframework.stereotype.Service;

import cn.edu.scau.hlyz.service.IdGeneratorService;

/**
 * @author hjd
 * 2位简写字母+13位当前时间毫秒数+5位循环自增数
 *
 */
@Service
public class IdGeneratorServiceImpl implements IdGeneratorService {

	private static int ptid = 10000;
	private static int adid = 10000;
	private static int coid = 10000;
	private static int evid = 10000;
	private static int mrid = 10000;
	private static int rfid = 10000;
	private static int reid = 10000;
	
	private String getCurrentTimeMillStr(){
		return (System.currentTimeMillis() + "");
	}
	
	@Override
	public synchronized String patientIdGenertor() {
		// TODO Auto-generated method stub
		IdGeneratorServiceImpl.ptid ++;
		if(IdGeneratorServiceImpl.ptid > 99999){
			IdGeneratorServiceImpl.ptid = 10000;
		}
		String  mill = this.getCurrentTimeMillStr();
		return "PT" + mill + IdGeneratorServiceImpl.ptid;
	}

	@Override
	public synchronized String advisoryIdGenertor() {
		// TODO Auto-generated method stub
		IdGeneratorServiceImpl.adid ++;
		if(IdGeneratorServiceImpl.adid > 99999){
			IdGeneratorServiceImpl.adid = 10000;
		}
		String  mill = this.getCurrentTimeMillStr();
		return "AD" + mill + IdGeneratorServiceImpl.adid;
	}

	@Override
	public synchronized String consumptionOrderIdGenerator() {
		// TODO Auto-generated method stub
		IdGeneratorServiceImpl.coid ++;
		if(IdGeneratorServiceImpl.coid > 99999){
			IdGeneratorServiceImpl.coid = 10000;
		}
		String  mill = this.getCurrentTimeMillStr();
		return "CO" + mill + IdGeneratorServiceImpl.coid;
	}

	@Override
	public synchronized String evaluationIdGenerator() {
		// TODO Auto-generated method stub
		IdGeneratorServiceImpl.evid ++;
		if(IdGeneratorServiceImpl.evid > 99999){
			IdGeneratorServiceImpl.evid = 10000;
		}
		String  mill = this.getCurrentTimeMillStr();
		return "EV" + mill + IdGeneratorServiceImpl.evid;
	}

	@Override
	public synchronized String medicalRecordGenerator() {
		// TODO Auto-generated method stub
		IdGeneratorServiceImpl.mrid ++;
		if(IdGeneratorServiceImpl.mrid > 99999){
			IdGeneratorServiceImpl.mrid = 10000;
		}
		String  mill = this.getCurrentTimeMillStr();
		return "MR" + mill + IdGeneratorServiceImpl.mrid;
	}

	@Override
	public synchronized String registrationFormIdGenerator() {
		// TODO Auto-generated method stub
		IdGeneratorServiceImpl.rfid ++;
		if(IdGeneratorServiceImpl.rfid > 99999){
			IdGeneratorServiceImpl.rfid = 10000;
		}
		String  mill = this.getCurrentTimeMillStr();
		return "RF" + mill + IdGeneratorServiceImpl.rfid;
	}

	@Override
	public synchronized String ReplyIdGenerator() {
		// TODO Auto-generated method stub
		IdGeneratorServiceImpl.reid ++;
		if(IdGeneratorServiceImpl.reid > 99999){
			IdGeneratorServiceImpl.reid = 10000;
		}
		String  mill = this.getCurrentTimeMillStr();
		return "RE" + mill + IdGeneratorServiceImpl.reid;
	}

}
