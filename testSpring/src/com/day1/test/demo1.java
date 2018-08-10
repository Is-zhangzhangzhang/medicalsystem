package com.day1.test;


import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import com.day1.bean.AnyShape;
import com.day1.bean.SomeBean;

public class demo1 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		ApplicationContext application = new FileSystemXmlApplicationContext("classpath:applicationContext.xml");
		AnyShape s = (AnyShape)application.getBean("anyShape");
		s.outputArea();
		
//		SomeBean sb = (SomeBean)application.getBean("someBean");
//		
//		for(String str: sb.getMyArray())
//			System.out.println(str);
//		for(String str: sb.getMyList())
//			System.out.println(str);
//		System.out.println(sb.getMyMap().get("value"));
	}

}
