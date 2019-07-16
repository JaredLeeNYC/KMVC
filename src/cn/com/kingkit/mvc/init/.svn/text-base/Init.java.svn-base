package cn.com.kingkit.mvc.init;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import cn.com.kingkit.mvc.util.Utils;

public class Init implements ServletContextListener {
	
	private static String logRoot = "log.root";
	public void contextDestroyed(ServletContextEvent arg0) {
		System.out.print(Utils.getCurrentLineMessage(new Exception()));
		System.out.println(": 清除系统属性值：key=" + logRoot + ", value=" +System.getProperty(logRoot));
		System.clearProperty(logRoot);
	}
	public void contextInitialized(ServletContextEvent arg0) {
		String logWroot = Utils.getClassPath() + "log";
		System.setProperty(logRoot, logWroot);
		System.out.print(Utils.getCurrentLineMessage(new Exception()));
		System.out.println(": 成功设置系统属性值. key=" + logRoot + ", value=" + logWroot);
	}
}
