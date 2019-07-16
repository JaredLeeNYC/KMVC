package cn.com.kingkit.mvc.controller;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * Action拦截器, 主要用于执行execute方法前初始化数据\执行后设置数据
 * 
 * @author Kit.Liao
 * 
 */
public class ActionInvocationHandler implements InvocationHandler {
	private Object targetObject;
	private IActionInterceptor interceptor;
	private String  beanId;
	
	public Object bind(Object obj, IActionInterceptor interceptor, String beanId) {
		this.targetObject = obj;
		this.interceptor = interceptor;
		this.beanId = beanId;
		return Proxy.newProxyInstance(obj.getClass().getClassLoader(), obj.getClass().getInterfaces(), this);
	}
	
	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
		
		Object result = null;
		//拦截execute方法
		if("execute".equals(method.getName())){
			//提前设置一些数据
			this.interceptor.before(targetObject, method, args, beanId);
			//执行原来的方法
			result = method.invoke(targetObject, args);
			//执行后设置一些数据
			this.interceptor.after(targetObject, method, args, beanId);
		} else {
			result = method.invoke(targetObject, args);
		}
		return result;
	}
}
