package cn.edu.scau.hlyz.service.impl;

import java.util.Iterator;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cn.edu.scau.hlyz.dao.ConsumptionOrderMapper;
import cn.edu.scau.hlyz.entity.ConsumptionOrder;
import cn.edu.scau.hlyz.entity.MedicalRecord;
import cn.edu.scau.hlyz.entity.Medicine;
import cn.edu.scau.hlyz.entity.Prescription;
import cn.edu.scau.hlyz.service.ChargePaymentService;
@Service
public class ChargePaymentServiceImpl implements ChargePaymentService {
    @Autowired
    private ConsumptionOrderMapper coi;
	@Override
	public boolean payment(ConsumptionOrder consumptionOrder) {
    	//支付，成功则修改消费单的支付状态为pay，返回true，失败返回false
		// TODO Auto-generated method stub
		int a=coi.updateConsumptionOrder(consumptionOrder);
		if(a==1){
			return true;
		}else{
			return false;
		}
	}

	@Override
	public boolean charge(ConsumptionOrder consumptionOrder) {
		//生成消费单并写入数据库中
		// TODO Auto-generated method stub
		MedicalRecord mr=consumptionOrder.getMr();
		Set<Prescription> sp=mr.getPrstSet();
		double dt_money=mr.getDoctor().getMoney();
		Iterator<Prescription> it=sp.iterator();
		double moneyOfMedicine=0;
		double totalConsumptionMoney=0;
		while(it.hasNext()){
			Prescription p=it.next();
			Medicine m=p.getMedicine();
			moneyOfMedicine+=m.getMd_price()*p.getPr_num();
		}
		moneyOfMedicine=moneyOfMedicine*mr.getMr_taken_times()*mr.getMr_taken_days();
		totalConsumptionMoney=moneyOfMedicine+dt_money;
		consumptionOrder.setCo_price(totalConsumptionMoney);
		consumptionOrder.setCo_status("unpay");
		int a=coi.addConsumptionOrder(consumptionOrder);
		if(a==1){
			return true;
		}else{
			return false;
		}

	}

}
