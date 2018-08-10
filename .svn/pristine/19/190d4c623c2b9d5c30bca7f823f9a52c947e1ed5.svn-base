package com.day1.tmp;

import javax.annotation.Resource;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.stereotype.Controller;


@Controller
public class PersonAction {
	@Resource
	private PersonDAO personDao;
	public void test(){
		personDao.save(new Person());
	}
	public static void main(String[] args){
		ApplicationContext application = new FileSystemXmlApplicationContext("classpath:applicationContext.xml");
		PersonAction pa = (PersonAction)application.getBean("personAction");
		pa.test();
	}
}
