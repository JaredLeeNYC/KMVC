package cn.com.kingkit.mvc.controller;

import java.lang.reflect.Method;

public interface IActionInterceptor {
	public void before(Object target, Method method, Object[] args, String beanId);
	
	public void after(Object target, Method method, Object[] args, String beanId);
	
	public void afterThrowing(Object target, Method method, Object[] args, Throwable throwable, String beanId);
	
	public void afterFinally(Object target, Method method, Object[] args, String beanId);
}