package com.day2;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AspectLogic {
	
	@Pointcut("execution(* com.day2.Wotk.some(..))")
	public void myPoint(){}
	
	@Before("myPoint()")
	public void  beforeWork(){
		System.out.println("朱元璋");
	}
	
	@After("myPoint()")
	public void afterWork(){
		System.out.println("元朝已亡");
	}
	
	@AfterReturning(pointcut="myPoint()", returning="r")
	public void afterReturingWork(String r){
		if (r != null){
			System.out.println(r);
		}
		else{
			System.out.println("null");
		}
	}
	
	@Around("myPoint()")
	public Object aroundWork(ProceedingJoinPoint pjp) throws Throwable{
		
		System.out.println("我定义的内容");
		Object o = pjp.proceed();
		System.out.println("我执行后的内容");
		
		return o;
	}
	
	@AfterThrowing(pointcut="myPoint()", throwing="e")
	public void afterThrowingWork(Exception e){
		System.out.println("work exception is :" + e.getMessage());
	}
}
