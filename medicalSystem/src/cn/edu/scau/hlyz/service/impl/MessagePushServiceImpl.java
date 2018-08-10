package cn.edu.scau.hlyz.service.impl;

import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Vector;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import cn.edu.scau.hlyz.entity.ConsumptionOrder;
import cn.edu.scau.hlyz.entity.RegistrationForm;
import cn.edu.scau.hlyz.entity.Reply;
import cn.edu.scau.hlyz.service.MessagePushService;
@Service
public class MessagePushServiceImpl implements MessagePushService {
	
	private static Map<String, Vector<RegistrationForm>> rfMap = new ConcurrentHashMap<>();
	private static Map<String, Vector<ConsumptionOrder>> coMap = new ConcurrentHashMap<>();
	
	@Override
	public void addCallRegistration(RegistrationForm registrationForm) {
		// TODO Auto-generated method stub
		String key = registrationForm.getPatient().getPt_id();
		if(!MessagePushServiceImpl.rfMap.containsKey(key)){
			MessagePushServiceImpl.rfMap.put(key, new Vector<RegistrationForm>());
		}
		MessagePushServiceImpl.rfMap.get(key).add(registrationForm);
	}
	@Override
	public List<RegistrationForm> findCallRegistration(String patientId) {
		// TODO Auto-generated method stub
		if(MessagePushServiceImpl.rfMap.containsKey(patientId) && !MessagePushServiceImpl.rfMap.get(patientId).isEmpty()){
			List<RegistrationForm> rfList = MessagePushServiceImpl.rfMap.get(patientId);
			return rfList;
		}
		return null;
	}

	@Override
	public void addPushConsumpationOrder(ConsumptionOrder consumptionOrder) {
		// TODO Auto-generated method stub
		String key = consumptionOrder.getMr().getPatient().getPt_id();
		if(!MessagePushServiceImpl.coMap.containsKey(key)){
			MessagePushServiceImpl.coMap.put(key, new Vector<ConsumptionOrder>());
		}
		MessagePushServiceImpl.coMap.get(key).add(consumptionOrder);
	}

	@Override
	public List<ConsumptionOrder> findPushConsumptionOrder(String patientId) {
		// TODO Auto-generated method stub
		if(MessagePushServiceImpl.coMap.containsKey(patientId) && ! MessagePushServiceImpl.coMap.get(patientId).isEmpty()){
			List<ConsumptionOrder> co = MessagePushServiceImpl.coMap.get(patientId);
			return co;
		}
		return null;
	}
	@Override
	public void removeCallRegistration(String patientId, String rfId) {
		// TODO Auto-generated method stub
		if(MessagePushServiceImpl.rfMap.containsKey(patientId)){
			List<RegistrationForm> rfList = MessagePushServiceImpl.rfMap.get(patientId);
			for(int i = 0; i < rfList.size(); i ++){
				if(rfList.get(i).getRf_id().equals(rfId)){
					rfList.remove(i);
					break;
				}
			}
			if(rfList.size() == 0){
				MessagePushServiceImpl.rfMap.remove(patientId);
			}
		}
	}
	@Override
	public void removePushConsumption(String patientId, String coId) {
		// TODO Auto-generated method stub
		if(MessagePushServiceImpl.coMap.containsKey(patientId)){
			List<ConsumptionOrder> coList = MessagePushServiceImpl.coMap.get(patientId);
			for(int i = 0; i < coList.size(); i ++){
				if(coList.get(i).getCo_id().equals(coId)){
					coList.remove(i);
					break;
				}
			}
			if(coList.size() == 0){
				MessagePushServiceImpl.coMap.remove(patientId);
			}
		}
	}

	

}
