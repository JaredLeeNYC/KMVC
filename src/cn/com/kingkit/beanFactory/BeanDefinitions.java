package cn.com.kingkit.beanFactory;

import java.util.HashMap;
import java.util.Map;

public class BeanDefinitions {
	private static Map<String, BeanDefinition> beanDefinitionMap = new HashMap<String, BeanDefinition>();

	static BeanDefinition get(String id) {
		return beanDefinitionMap.get(id);
	}

	public static Map<String, BeanDefinition> getBeanDefinitionMap() {
		return beanDefinitionMap;
	}

	public static void setBeanDefinitionMap(Map<String, BeanDefinition> beanDefinitionMap) {
		BeanDefinitions.beanDefinitionMap = beanDefinitionMap;
	}

}
