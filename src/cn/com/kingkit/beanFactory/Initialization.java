package cn.com.kingkit.beanFactory;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.log4j.Logger;
import org.dom4j.Attribute;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.ElementHandler;
import org.dom4j.ElementPath;
import org.dom4j.io.SAXReader;

import cn.com.kingkit.mvc.exception.DataAccessException;
import cn.com.kingkit.mvc.util.Utils;

public class Initialization extends HttpServlet {
	private static final Logger logger = Logger.getLogger(Initialization.class);

	@Override
	public void destroy() {
		beanMap = null;
		beanDefinitionMap = null;
	}

	@Override
	public void init() throws ServletException {
		ServletConfig cfg = getServletConfig();
		String path = Utils.getClassPath() + cfg.getInitParameter("configFile");
		logger.info("configFile=" + path);
		initBeanFactory(path);
	}

	private Map<String, Object> beanMap = new HashMap<String, Object>();
	private Map<String, BeanDefinition> beanDefinitionMap = new HashMap<String, BeanDefinition>();

	private void initBeanFactory(String path) {
		SAXReader saxReader = new SAXReader();
		File file = new File(path);
		try {
			saxReader.addHandler("/beans/bean", new BeanHandler());
			saxReader.read(file);
		} catch (DocumentException e) {
			logger.error(e);
			throw new DataAccessException(e);
		}
		BeanFactory.setBeanMap(beanMap);
		BeanDefinitions.setBeanDefinitionMap(beanDefinitionMap);
		logger.info("初始化BeanFactory完毕!");
	}

	private class BeanHandler implements ElementHandler {
		Object obj = null;
		BeanDefinition definition = null;

		public void onStart(ElementPath path) {
			Element beanElement = path.getCurrent();
			Attribute classAttribute = beanElement.attribute("class");
			Class<?> bean = null;
			try {
				bean = Class.forName(classAttribute.getText());
			} catch (ClassNotFoundException e) {
				logger.error(e);
				throw new DataAccessException(e);
			}

			// 有继承的话要去父类取属性
			Map<String, String> mapField = new HashMap<String, String>();
			Method[] allMethods = bean.getMethods();
			for (Method met : allMethods) {
				String methodName = met.getName();
				if (methodName.startsWith("set")) {
					String fieldName = Utils.lowerFirstChar(methodName.substring(3));
					mapField.put(fieldName, fieldName);
				}
			}

			try {
				obj = bean.newInstance();
			} catch (Exception e) {
				logger.error(e);
				throw new DataAccessException(e);
			}
			// 单例与否
			definition = new BeanDefinition();
			Attribute singleton = beanElement.attribute("singleton");
			definition.setSingleton(null == singleton ? false : Boolean.valueOf(singleton.getValue()));
			path.addHandler("property", new PropertyHandler(mapField, obj, definition));
		}

		public void onEnd(ElementPath path) {
			Element beanElement = path.getCurrent();
			Attribute idAttribute = beanElement.attribute("id");
			if (null != idAttribute) {
				String id = idAttribute.getText();
				beanMap.put(id, obj);
				definition.setId(id);
				beanDefinitionMap.put(id, definition);
			}
			path.removeHandler("property");
		}
	}

	private class PropertyHandler implements ElementHandler {
		Map<String, String> mapField;
		Object obj;
		BeanDefinition definition;

		public PropertyHandler(Map<String, String> mapField, Object obj, BeanDefinition definition) {
			this.mapField = mapField;
			this.obj = obj;
			this.definition = definition;
		}

		public void onStart(ElementPath path) {
			Element propertyElement = path.getCurrent();
			Attribute nameAttribute = propertyElement.attribute("name");
			Attribute scopeAttribute = propertyElement.attribute("scope");
			this.definition.getScopeMap().put(nameAttribute.getText(),
					null == scopeAttribute ? null : scopeAttribute.getText());
			path.addHandler("value", new ValueHandler(mapField, obj, nameAttribute));
			path.addHandler("list", new ListHandler(mapField, obj, nameAttribute));
			path.addHandler("set", new SetHandler(mapField, obj, nameAttribute));
			path.addHandler("map", new MapHandler(mapField, obj, nameAttribute));
			path.addHandler("ref", new RefHandler(mapField, obj, nameAttribute));
		}

		public void onEnd(ElementPath path) {
			path.removeHandler("value");
			path.removeHandler("list");
			path.removeHandler("set");
			path.removeHandler("map");
			path.removeHandler("ref");
		}
	}

	private class ValueHandler implements ElementHandler {
		Map<String, String> mapField;
		Object obj;
		Attribute nameAttribute;

		public ValueHandler(Map<String, String> mapField, Object obj, Attribute nameAttribute) {
			this.mapField = mapField;
			this.obj = obj;
			this.nameAttribute = nameAttribute;
		}

		public void onStart(ElementPath path) {
		}

		public void onEnd(ElementPath path) {
			Element valueElement = path.getCurrent();
			String strValue = null;
			strValue = valueElement.getText();
			String tmpField = mapField.get(nameAttribute.getValue());
			if (tmpField != null) {
				try {
					BeanUtils.setProperty(obj, tmpField, strValue);
				} catch (Exception e) {
					logger.error(e);
					throw new DataAccessException(e);
				}
			}
		}
	}

	private class ListHandler implements ElementHandler {
		Map<String, String> mapField;
		Object obj;
		Attribute nameAttribute;
		List<String> list;

		public ListHandler(Map<String, String> mapField, Object obj, Attribute nameAttribute) {
			this.mapField = mapField;
			this.obj = obj;
			this.nameAttribute = nameAttribute;
		}

		public void onStart(ElementPath path) {
			list = new ArrayList<String>();
			path.addHandler("value", new ListValueHandler(list));
		}

		public void onEnd(ElementPath path) {
			path.removeHandler("value");
			String tmpField = mapField.get(nameAttribute.getValue());
			if (tmpField != null) {
				try {
					BeanUtils.setProperty(obj, tmpField, list);
				} catch (Exception e) {
					logger.error(e);
					throw new DataAccessException(e);
				}
			}
		}
	}

	private class ListValueHandler implements ElementHandler {
		List<String> list;

		public ListValueHandler(List<String> list) {
			this.list = list;
		}

		public void onStart(ElementPath path) {
		}

		public void onEnd(ElementPath path) {
			Element valueElement = path.getCurrent();
			String strValue = null;
			strValue = valueElement.getText();
			list.add(strValue);
		}
	}

	private class SetHandler implements ElementHandler {
		Map<String, String> mapField;
		Object obj;
		Attribute nameAttribute;
		Set<String> set;

		public SetHandler(Map<String, String> mapField, Object obj, Attribute nameAttribute) {
			this.mapField = mapField;
			this.obj = obj;
			this.nameAttribute = nameAttribute;
		}

		public void onStart(ElementPath path) {
			set = new HashSet<String>();
			path.addHandler("value", new SetValueHandler(set));
		}

		public void onEnd(ElementPath path) {
			path.removeHandler("value");
			String tmpField = mapField.get(nameAttribute.getValue());
			if (tmpField != null) {
				try {
					BeanUtils.setProperty(obj, tmpField, set);
				} catch (IllegalAccessException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					logger.error(e);
					throw new DataAccessException(e);
				}
			}
		}
	}

	private class SetValueHandler implements ElementHandler {
		Set<String> set;

		public SetValueHandler(Set<String> set) {
			this.set = set;
		}

		public void onStart(ElementPath path) {
		}

		public void onEnd(ElementPath path) {
			Element valueElement = path.getCurrent();
			String strValue = null;
			strValue = valueElement.getText();
			set.add(strValue);
		}
	}

	private class MapHandler implements ElementHandler {
		Map<String, String> mapField;
		Object obj;
		Attribute nameAttribute;
		Map<String, String> map;

		public MapHandler(Map<String, String> mapField, Object obj, Attribute nameAttribute) {
			this.mapField = mapField;
			this.obj = obj;
			this.nameAttribute = nameAttribute;
		}

		public void onStart(ElementPath path) {
			map = new HashMap<String, String>();
			path.addHandler("entry", new MapEntryHandler(map));
		}

		public void onEnd(ElementPath path) {
			path.removeHandler("entry");
			String tmpField = mapField.get(nameAttribute.getValue());
			if (tmpField != null) {
				try {
					BeanUtils.setProperty(obj, tmpField, map);
				} catch (Exception e) {
					logger.error(e);
					throw new DataAccessException(e);
				} 
			}
		}
	}

	private class MapEntryHandler implements ElementHandler {
		Map<String, String> map;

		public MapEntryHandler(Map<String, String> map) {
			this.map = map;
		}

		public void onStart(ElementPath path) {
			Element entryElement = path.getCurrent();
			Attribute keyAttribute = entryElement.attribute("key");
			path.addHandler("value", new MapValueHandler(keyAttribute, map));
		}

		public void onEnd(ElementPath path) {
			path.removeHandler("value");
		}
	}

	private class MapValueHandler implements ElementHandler {
		Map<String, String> map;
		Attribute keyAttribute;

		public MapValueHandler(Attribute keyAttribute, Map<String, String> map) {
			this.keyAttribute = keyAttribute;
			this.map = map;
		}

		public void onStart(ElementPath path) {
		}

		public void onEnd(ElementPath path) {
			Element valueElement = path.getCurrent();
			String strValue = null;
			strValue = valueElement.getText();
			map.put(keyAttribute.getText(), strValue);
		}
	}

	private class RefHandler implements ElementHandler {
		Map<String, String> mapField;
		Object obj;
		Attribute nameAttribute;
		Object bean;

		public RefHandler(Map<String, String> mapField, Object obj, Attribute nameAttribute) {
			this.mapField = mapField;
			this.obj = obj;
			this.nameAttribute = nameAttribute;
		}

		public void onStart(ElementPath path) {
			Element refElement = path.getCurrent();
			Attribute beanAttribute = refElement.attribute("bean");
			bean = beanMap.get(beanAttribute.getText());
			// this.beanDefinition.setRef(beanAttribute.getText());
		}

		public void onEnd(ElementPath path) {
			String tmpField = mapField.get(nameAttribute.getValue());
			if (tmpField != null) {
				try {
					BeanUtils.setProperty(obj, tmpField, bean);
				} catch (Exception e) {
					logger.error(e);
					throw new DataAccessException(e);
				} 
			}
		}
	}
}
