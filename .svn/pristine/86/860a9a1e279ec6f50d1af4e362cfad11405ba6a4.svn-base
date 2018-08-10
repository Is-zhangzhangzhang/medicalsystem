package com.day1.bean;


import org.springframework.stereotype.Component;

@Component("myshape")
public class Circle implements Shape {
	
	private double radio=2.5;
	public Circle(double radio){
		this.radio = radio;
	}
	public Circle(){
		
	}
	public double getRadio() {
		return radio;
	}
	public void setRadio(double radio) {
		this.radio = radio;
	}
	@Override
	public double area() {
		// TODO Auto-generated method stub
		return Math.PI*this.radio*this.radio;
	}

}
