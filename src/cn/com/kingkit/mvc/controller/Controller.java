package cn.com.kingkit.mvc.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import cn.com.kingkit.mvc.util.Utils;


public class Controller extends HttpServlet {
	
	private final static Log logger = LogFactory.getLog(Controller.class);
 
	@Override
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException,
			IOException {
		this.doPost(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException,
			IOException {
		String path = request.getServletPath();
		
		IAction action = (IAction)ActionFactory.getAction(path);
		
		//取得结果
		//获取相关的跳转路径
		String url = action.execute(request, response, this.getServletConfig());
		//如果跳转地址是标记为[redirect]的话,则用response.sendRedirect()
		RequestDispatcher rd = null;
		if(null != url){
			url = url.replaceAll("\t", "").replaceAll("\n", "");
			if(url.lastIndexOf("[redirect]") != -1){
				url= url.substring(0,url.lastIndexOf("[redirect]"));
				response.sendRedirect(request.getContextPath()+url);
			}else{
				rd = request.getRequestDispatcher(url);
				rd.forward(request, response); 
			}
		}else{
			url = "/error/Error.jsp";
			rd = request.getRequestDispatcher(url);
			rd.forward(request, response); 
		}
		logger.info("成功跳转! path=" + path + "---> url=" + url);
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		super.destroy();
	}

	@Override
	public void init() throws ServletException {
		// TODO Auto-generated method stub
		super.init();
	}

}
