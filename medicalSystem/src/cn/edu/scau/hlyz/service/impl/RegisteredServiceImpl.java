package cn.edu.scau.hlyz.service.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;
import java.util.TimeZone;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.scau.hlyz.dao.DoctorMapper;
import cn.edu.scau.hlyz.dao.RegistrationFormMapper;
import cn.edu.scau.hlyz.entity.Doctor;
import cn.edu.scau.hlyz.entity.RegistrationForm;
import cn.edu.scau.hlyz.service.RegisteredService;

@Service
public class RegisteredServiceImpl implements RegisteredService {
	Logger logger = Logger.getLogger(RegisteredServiceImpl.class);
	@Autowired
	private RegistrationFormMapper rfi;
	@Autowired
	private DoctorMapper doctorDao;

	private static Map<String, Queue<RegistrationForm>> map = new ConcurrentHashMap<>();

	private void initMap() {
		List<Doctor> doctors = doctorDao.findAllClinic();
		for (Doctor dt : doctors) {
			map.put(dt.getDt_id(), new ConcurrentLinkedQueue<RegistrationForm>());
		}
		logger.info("init registrationForm map");
	}

	/**
	 * ���Һ�ʱ�䣬�ڵ�ǰ��Сʱ���򷵻�true,���򷵻�false
	 * 
	 * @param date
	 * @return
	 */
	private boolean checkTime(Date date) {
		Calendar calendar = Calendar.getInstance();
		int nowHour = calendar.get(Calendar.HOUR_OF_DAY);
		calendar.setTime(date);
		int rfHour = calendar.get(Calendar.HOUR_OF_DAY);
		if (((nowHour % 2) != 0 && (nowHour - 1) <= rfHour && (nowHour + 1) > rfHour)
				|| ((nowHour % 2) == 0 && (nowHour + 2) > rfHour && nowHour <= rfHour)) {
			logger.info("check registrationForm time return true, rf_timeOfHour:" + rfHour);
			return true;
		}
		logger.info("check registrationForm time return false, rf_timeOfHour:" + rfHour);
		return false;

	}

	@Override
	public void loadRegister() {
		// �����ݿ��м��ص���ĹҺ���Ϣ����ȴ�������
		// TODO Auto-generated method stub
		// �ж�map�Ƿ�Ϊ�գ�Ϊ�����ʼ��map
		if (map.isEmpty()) {
			initMap();
		}
		// ����2��Сʱ�ڵĹҺ���Ϣ
		List<RegistrationForm> rfs = rfi.findTwoHours();
		for (RegistrationForm rf : rfs) {
			map.get(rf.getDoctor().getDt_id()).offer(rf);
		}
		logger.info("load 2 hours registrationForm to map");
	}

	@Override
	public RegistrationForm findById(String id) {
		// TODO Auto-generated method stub
		logger.info("select registrationForm by id");
		return rfi.findById(id);
	}

	@Override
	public Boolean addRegister(RegistrationForm rform) {
		// ��ӹҺ���Ϣ�����ݿ⣬�����Һ�ʱ�䣬�ڷ�Χ��������Ӧ�ȴ����У��ɹ�������true��ʧ�ܷ���false
		// TODO Auto-generated method stub
		int a = rfi.save(rform);
		if (a == 1) {
			if (checkTime(rform.getRf_time())) {
				map.get(rform.getDoctor().getDt_id()).offer(rform);
			}
			logger.info("save registrationForm success");
			return true;
		} else {
			logger.error("save registrationForm fail");
			return false;
		}
	}

	@Override
	public RegistrationForm getNextRegister(Doctor doctor) {
		// �Ƴ���Ӧҽʦ�ȴ����еĵ�һ���Һ���Ϣ,��������һ���Һ���Ϣ
		// TODO Auto-generated method stub
		if (!map.get(doctor.getDt_id()).isEmpty()) {
			map.get(doctor.getDt_id()).poll();
			logger.info("getNextRegister not null");
			return map.get(doctor.getDt_id()).peek();
		}
		logger.info("getNextRegister is null");
		return null;
	}

	@Override
	public RegistrationForm getFirstRegister(Doctor doctor) {
		// ��ȡ��Ӧҽʦ�ȴ����еĵ�һ���Һ���Ϣ������
		// TODO Auto-generated method stub
		if (!map.get(doctor.getDt_id()).isEmpty()) {
			logger.info("getFirstRegister not null");
			return map.get(doctor.getDt_id()).peek();
		}
		logger.info("getFirstRegister is null");
		return null;
	}

	@Override
	public void registerComplete(String id) {
		// ���ö�Ӧ�Һŵ�״̬Ϊ���
		// TODO Auto-generated method stub
		RegistrationForm rf = new RegistrationForm();
		rf.setRf_id(id);
		rf.setRf_status("completed");
		int flag = rfi.updateStatus(rf);
		if (flag == 1) {
			logger.info("change registrationForm status to completed success");
		} else {
			logger.error("change registrationForm status to completed fail");
		}
	}

	@Override
	public List<RegistrationForm> getDoctorRegisters(Doctor doctor) {
		// a���ض�Ӧҽʦ�ȴ����еĹҺ���Ϣ��
		// TODO Auto-generated method stub
		Iterator<RegistrationForm> itreator = map.get(doctor.getDt_id()).iterator();
		List<RegistrationForm> rfList = new ArrayList<>();
		while (itreator.hasNext()) {
			rfList.add(itreator.next());
		}
		logger.info("get menery doctor registers");
		return rfList;
	}

	@Override
	public List<RegistrationForm> findAll(int start, int num) {
		// TODO Auto-generated method stub
		logger.info("select all registration form");
		return rfi.findAll(start, num);
	}

	@Override
	public int getRemainingQuantity(String doctorId, int dayOfWeek, int startTime) {
		// TODO Auto-generated method stub
		logger.info("get remainng Quatity dayOfWeek:" + dayOfWeek + " startTime:" + startTime);
		return rfi.getCount(doctorId, dayOfWeek, startTime);
	}

	@Override
	public int getFindAllCount() {
		// TODO Auto-generated method stub
		int num = rfi.getFindAllCount();
		logger.info("select all registration form count:" + num);
		return num;
	}

	@Override
	public List<RegistrationForm> getPatientRegister(String patientId) {
		// TODO Auto-generated method stub
		// ��ȡ��Ч�ĹҺ���Ϣ
		List<RegistrationForm> rfList = rfi.findByPatient(patientId);
		logger.info("select registration form by patient");
		// ����Ѽ��صĹҺŵ�������©�Ĳ��ϡ�

		Set<String> rfIdSet = new HashSet<>();
		for (RegistrationForm rf : rfList) {
			rfIdSet.add(rf.getRf_id());
		}
		for (String key : map.keySet()) {
			for (RegistrationForm rf : map.get(key)) {
				if (rf.getPatient().getPt_id().equals(patientId) && !rfIdSet.contains(rf.getRf_id())) {
					rfList.add(0, rf);
					logger.info("have rf found:" + rf);
				}
			}
		}
		return rfList;
	}

}
