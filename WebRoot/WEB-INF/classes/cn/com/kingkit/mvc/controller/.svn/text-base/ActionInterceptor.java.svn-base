package cn.com.kingkit.mvc.controller;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;

import cn.com.kingkit.beanFactory.BeanDefinition;
import cn.com.kingkit.beanFactory.BeanDefinitions;
import cn.com.kingkit.mvc.util.Utils;

public class ActionInterceptor implements IActionInterceptor {
	/**
	 * 执行execute方法之后要做的事情在这个方法里面实现
	 */
	public void after(Object target, Method method, Object[] args, String beanId) {
		HttpServletRequest request = (HttpServletRequest)args[0];
		
		//判断在BeanConfig.xml里对象属性的scope值, scope=session时为request.getSession.setAttribute
		//其他为request.setattribute
		Map<String, BeanDefinition> beanDefinitionMap = BeanDefinitions.getBeanDefinitionMap();
		BeanDefinition beanDefinition = beanDefinitionMap.get(beanId);
		
		if (null != beanDefinition) {
			Map<String, String> scopeMap = beanDefinition.getScopeMap();
			Class<?> targetClass = target.getClass();
			Method[] allMethods = targetClass.getMethods();
			for (Method met : allMethods) {
				String methodName = met.getName();
				if (methodName.startsWith("get")) {
					String fieldName = Utils.lowerFirstChar(methodName.substring(3));
					if ("session".equals(scopeMap.get(fieldName))) {
						try {
							request.getSession().setAttribute(fieldName, met.invoke(target));
						} catch (Exception e) {
							e.printStackTrace();
						}
					} else {
						try {
							request.setAttribute(fieldName, met.invoke(target));
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
		}
	}
	
	public void afterFinally(Object target, Method method, Object[] args, String beanId) {
		// TODO Auto-generated method stub
	}
	
	public void afterThrowing(Object target, Method method, Object[] args, Throwable throwable, String beanId) {
		// TODO Auto-generated method stub
	}
	
	/**
	 * 执行execute方法之前要做的事情在这个方法里面实现
	 */
	public void before(Object target, Method method, Object[] args, String beanId) {
		HttpServletRequest request = (HttpServletRequest)args[0];
		try {
			BeanUtils.populate(target, request.getParameterMap());
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
	}
}
