package cn.com.kingkit.beanFactory;

import java.util.HashMap;
import java.util.Map;

public class BeanDefinition {
	private String id;
	private boolean singleton;
	//记录属性是在requestScope或者sessionScope, 
	//如果是scope=session的话就在返回时调用request.getSession.setAttribute
	//如果是scope=request的话就在返回时调用request.setAttribute,
	//默认为request
	private Map<String, String> scopeMap = new HashMap<String, String>();
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public boolean isSingleton() {
		return singleton;
	}
	
	public Map<String, String> getScopeMap() {
		return scopeMap;
	}

	public void setScopeMap(Map<String, String> scopeMap) {
		this.scopeMap = scopeMap;
	}

	public void setSingleton(boolean singleton) {
		this.singleton = singleton;
	}
}