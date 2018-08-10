package cn.edu.scau.hlyz.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cn.edu.scau.hlyz.dao.ConsumptionOrderMapper;
import cn.edu.scau.hlyz.entity.ConsumptionOrder;
import cn.edu.scau.hlyz.service.ConsumptionOrderService;
@Service
public class ConsumptionOrderServiceImpl implements ConsumptionOrderService {
    @Autowired
    private ConsumptionOrderMapper coi;
	@Override
	public List<ConsumptionOrder> findConsumptionByPatient(String patientId) {
		// TODO Auto-generated method stub
		return coi.findAllByPatient(patientId);
	}

	@Override
	public ConsumptionOrder findConsumptionById(String ConsumptionOrderId) {
		// TODO Auto-generated method stub
		return coi.findById(ConsumptionOrderId);
	}

	@Override
	public ConsumptionOrder findRecentConsumptionByPatient(String patientId) {
		// TODO Auto-generated method stub
		return coi.findNewByPatient(patientId);
	}

}
