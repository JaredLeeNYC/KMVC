package cn.com.kingkit.mvc.controller;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.com.kingkit.mvc.exception.BusinessException;
import cn.com.kingkit.mvc.exception.DataAccessException;

public class BaseAction  implements Serializable {
	/**   
	 * serialVersionUID:TODO（用一句话描述这个变量表示什么）  
	 * @since Ver 1.1   
	 */   
	
	private static final long serialVersionUID = 8839420403740435654L;
	protected final static String EDIT = "edit";
	protected final static String DEL = "del";
	protected final static String LIST = "list";
	protected final static String SUCCESS = "success";
	protected final static String ERROR = "error";
	// 信息, 可用于向页面返回信息等
	private List<String> message = new ArrayList<String>();
	private Map<String, String> result = null;

	public List<String> getMessage() {
		return message;
	}

	public String getMessageString() {
		StringBuffer sBuffer = new StringBuffer();
		for (String msg : message) {
			sBuffer.append(msg);
		}
		return sBuffer.toString();
	}

	public void setMessage(List<String> message) {
		this.message = message;
	}

	public void addMessage(String message) {
		this.message.add(message);
	}

	public Map<String, String> getResult() {
		return result;
	}

	public void setResult(Map<String, String> result) {
		this.result = result;
	}
	protected String getReturnURL(String result){
		if(null != this.result && null != this.result.get(result)){
			return this.result.get(result);
		}
		throw new DataAccessException("获取返回路径出错! result=" + result + "; 已定义的返回路径有: "+ (null == this.result? null: this.result.toString().replaceAll("\n|\t", "")));
	}

}
