package com.day1.bean;

public class StudentBean {
	private String name;
	private String sex;
	public StudentBean(String name, String sex){
		this.name = name;
		this.sex = sex;
	}
	public StudentBean(){
		
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
}
