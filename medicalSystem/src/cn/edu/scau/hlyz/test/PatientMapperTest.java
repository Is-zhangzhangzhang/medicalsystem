package cn.edu.scau.hlyz.test;

import static org.junit.Assert.*;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import cn.edu.scau.hlyz.dao.PatientMapper;
import cn.edu.scau.hlyz.entity.Patient;

public class PatientMapperTest {
	private Logger logger = Logger.getLogger(PatientMapper.class);
	
	private ApplicationContext ac = new ClassPathXmlApplicationContext("SpringConf.xml");
	
	private PatientMapper patientDao = (PatientMapper) ac.getBean("patientDao");
	
	@Test
	public void testFindById() {
		
		Patient patient = patientDao.findById("13");
		System.out.println(patient);
	}

	@Test
	public void testSave() {
		fail("Not yet implemented");
	}

	@Test
	public void testUpdate() {
		fail("Not yet implemented");
	}

	@Test
	public void testDelete() {
		fail("Not yet implemented");
	}

}
