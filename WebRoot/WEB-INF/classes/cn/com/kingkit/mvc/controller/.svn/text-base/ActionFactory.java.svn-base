package cn.com.kingkit.mvc.controller;

import org.apache.log4j.Logger;

import cn.com.kingkit.beanFactory.BeanFactory;
import cn.com.kingkit.mvc.exception.DataAccessException;

;

public class ActionFactory {
	private static final Logger logger = Logger.getLogger(ActionFactory.class);

	public static IAction getAction(String path) {
		IAction proxy = null;

		Object beanObject = BeanFactory.getBean(path);

		ActionInvocationHandler handler = new ActionInvocationHandler();

		if (beanObject != null) {
			IActionInterceptor interceptor = new ActionInterceptor();

			proxy = (IAction) handler.bind(beanObject, interceptor, path);

		} else {
			logger.error("获取对象失败! 可能是没有在BeanConfig.xml文件为id=" + path + "的bean配置相应的class属性");
			throw new DataAccessException("获取对象失败! 可能是没有在BeanConfig.xml文件为id=" + path + "的bean配置相应的class属性");
		}
		return proxy;
	}

}
