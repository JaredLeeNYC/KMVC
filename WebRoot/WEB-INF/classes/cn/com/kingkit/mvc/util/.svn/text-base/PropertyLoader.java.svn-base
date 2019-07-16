package cn.com.kingkit.mvc.util;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

import cn.com.kingkit.mvc.exception.DataAccessException;

/**
 * 加载配置文件工具
 * 文件中key-value对用"="或":"分隔，如：key=value 或 key:value
 * @author yong
 *
 */
public class PropertyLoader {
	private final static Logger logger = Logger.getLogger(PropertyLoader.class);
	
	private Properties properties = new Properties();
	
	/**
	 * 
	 * @param filePath 配置文件路径
	 * filePath以“/”开始表示在项目src目录下，
	 * 不以“/”开始表示在本类PropertyLoader同一包下
	 */
	public void init(String filePath) throws DataAccessException{
		try {
			InputStream in = new FileInputStream(filePath);
			properties.load(in);
		} catch (Exception e) {
			logger.error("加载配置文件出错! filePath=" + filePath, e);
			throw new DataAccessException("加载配置文件出错! filePath=" + filePath, e);
		}
	}
	
	/**
	 * 
	 * @param key 关键字
	 * @return 键key对应的值
	 */
	public String getProperty(String key){
		return properties.getProperty(key);
	}
	
	public Properties getProperties(){
		return this.properties;
	}
	
}
