package com.day2.en.edu.scau;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.day2.en.edu.scau.bean.Tmp;
import com.day2.en.edu.scau.dao.TmpDao;

public class TestMain {
	@Autowired
	private TmpDao tempMapper;
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
		TmpDao t = (TmpDao)ac.getBean("tmpDao");
		t.insert("bbbb");
		for(Tmp tmp : t.findAll())
			System.out.println(tmp.getTitle());
	}

}
