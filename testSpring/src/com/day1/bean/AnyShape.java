package com.day1.bean;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

@Component
public class AnyShape {
	@Resource(name="myshape")
	private Shape shape;
	public AnyShape(){
		
	}
	public AnyShape(Shape shape){
		this.shape = shape;
	}
//	public Shape getShape() {
//		return shape;
//	}
//
//	public void setShape(Shape shape) {
//		this.shape = shape;
//	}
	public void outputArea(){
		System.out.println("面积："+shape.area());
	}
}
