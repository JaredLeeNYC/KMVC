package cn.com.kingkit.beanFactory;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import cn.com.kingkit.mvc.exception.DataAccessException;

public class BeanFactory {
	private static final Logger logger = Logger.getLogger(BeanFactory.class);

	private static Map<String, Object> beanMap = new HashMap<String, Object>();

	public static void setBeanMap(Map<String, Object> beanMap) {
		BeanFactory.beanMap = beanMap;
	}

	public static Object getBean(String beanId) {
		// 如果是定义成非单例的,从beanMap里面克隆一份返回,
		// 否则直接从beanMap里面返回
		if (null != BeanDefinitions.get(beanId) && BeanDefinitions.get(beanId).isSingleton()) {
			return beanMap.get(beanId);
		} else {
			try {
				return deepCopy(beanMap.get(beanId));
			} catch (Exception e) {
				logger.error(e);
				throw new DataAccessException(e);
			}
		}
	}

	public static Object deepCopy(Object object) throws IOException, ClassNotFoundException {
		// 将该对象序列化成流,因为写在流里的是对象的一个拷贝，而原对象仍然存在于JVM里面。所以利用这个特性可以实现对象的深拷贝
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		ObjectOutputStream oos = new ObjectOutputStream(bos);
		oos.writeObject(object);
		// 将流序列化成对象
		ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray());
		ObjectInputStream ois = new ObjectInputStream(bis);
		return ois.readObject();
	}
}
