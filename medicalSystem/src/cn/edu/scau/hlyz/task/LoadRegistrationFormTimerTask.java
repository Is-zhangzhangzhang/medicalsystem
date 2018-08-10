package cn.edu.scau.hlyz.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import cn.edu.scau.hlyz.service.RegisteredService;

@Component
public class LoadRegistrationFormTimerTask {
	
	@Autowired
	private RegisteredService registereService;
	
	/**
	 * 工作日偶数小时加载一次挂号单
	 */
	@Scheduled(cron="0 0 8,10,14,16 ? * MON-FRI")
	public void loadRF(){
		registereService.loadRegister();
	}
}
