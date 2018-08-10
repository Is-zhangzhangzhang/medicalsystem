package com.day2;

import org.aspectj.lang.ProceedingJoinPoint;

public class LogPrint {
	public void doAccessCheck(){
		System.out.println("do access check");
	}
	
	public void doReturnCheck(String r){
		System.out.println(r);
	}
	
	public void doExpetionAction(){}
	
	public void doReleaseAction(){
		System.out.println("do release action");
	}
	
	public Object doBasicProfiling(ProceedingJoinPoint pjp) throws Throwable {
		System.out.println("started r");
		Object o = pjp.proceed();
		System.out.println("end r");
		return o;
	}

}
