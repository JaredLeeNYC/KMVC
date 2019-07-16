package cn.com.kingkit.mvc.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import cn.com.kingkit.mvc.exception.BusinessException;
import cn.com.kingkit.mvc.model.CommResource;
import cn.com.kingkit.mvc.model.CommRoleResource;
import cn.com.kingkit.mvc.model.CommUser;
import cn.com.kingkit.mvc.service.impl.CommResourceService;
import cn.com.kingkit.mvc.service.impl.CommRoleResourceService;

public class SecurityFilter implements Filter {

	private final static Logger logger = Logger.getLogger(SecurityFilter.class);

	public void destroy() {
		// TODO Auto-generated method stub

	}

	public void doFilter(ServletRequest arg0, ServletResponse arg1,
			FilterChain arg2) throws IOException, ServletException {
		
		HttpServletRequest request = (HttpServletRequest)arg0;
		HttpServletResponse response = (HttpServletResponse)arg1;
		
		String path = request.getServletPath();
		
		if(path.startsWith("/pages")){
			//获取当前登录用户的信息
			CommUser user = (CommUser)request.getSession().getAttribute("loginUser");
			if(hasRight(path, user)){
				//继续往下执行
				arg2.doFilter(request, response);
			}else {
				String message = "尝试访问未授权资源! 已被拦截.";
				logger.error(message);
				response.setStatus(response.SC_FORBIDDEN);
				message = java.net.URLEncoder.encode(message, "UTF-8")+ "<br/>path=" + path  + (null == user ? " " : " <br/>userId=" + user.getId() + " <br/>userName=" + user.getUserName());
				String url = request.getContextPath()+"/error/403.jsp?message=" + message;
				logger.info("url=" + url);
				response.sendRedirect(url);
			}
		}
		else {
			//继续往下执行
			arg2.doFilter(request, response);
		}
	}

	private boolean hasRight(String path, CommUser user) {
		if(null != user && null != user.getRoleId()){
			//取得当前用户的可访问资源
			CommRoleResource crr = new CommRoleResource();
			crr.setRoleId(user.getRoleId());
			CommRoleResourceService commRoleResourceService = new CommRoleResourceService();
			CommResourceService commResourceService = new CommResourceService();
			List<CommRoleResource> commRoleResources;
			try {
				commRoleResources = commRoleResourceService.listByRoleId(crr);
				for (CommRoleResource commRoleResource : commRoleResources) {
					CommResource commResource = new CommResource();
					commResource.setId(commRoleResource.getResourceId());
					CommResource resource = commResourceService.get(commResource);
					logger.info("角色可访问资源: " + resource.getPath() + " 当前: " + path);
					
					/*
					 * 改用正则表达式,可以匹配*号等
					 * if(path.equals(resource.getPath())){
						logger.info("该资源可访问. 验证通过! resourcePath=" + resource.getPath());
						return true;
					}*/
					if(match(path, resource.getPath())){
						logger.info("该资源可访问. 验证通过! resourcePath=" + resource.getPath());
						return true;
					}
				}
			} catch (BusinessException e) {
				logger.error("查询权限时出错了: " + e.getMessage(), e);
			}
			
		}
		return false;
	}
	
	

	private boolean match(String path, String resource) {
		Pattern pattern = Pattern.compile(resource);
		Matcher matcher = pattern.matcher(path);
		return matcher.find();
	}

	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub

	}
}
