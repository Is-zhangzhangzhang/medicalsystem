package cn.edu.scau.hlyz.service;

import java.util.List;

import cn.edu.scau.hlyz.entity.ConsumptionOrder;
import cn.edu.scau.hlyz.entity.RegistrationForm;
import cn.edu.scau.hlyz.entity.Reply;

public interface MessagePushService {
	void addCallRegistration(RegistrationForm registrationForm);
	List<RegistrationForm> findCallRegistration(String patientId);
	void addPushConsumpationOrder(ConsumptionOrder consumptionOrder);
	List<ConsumptionOrder> findPushConsumptionOrder(String PatientId);
	void removeCallRegistration(String patientId, String rfId);
	void removePushConsumption(String patientId, String coId);
}
