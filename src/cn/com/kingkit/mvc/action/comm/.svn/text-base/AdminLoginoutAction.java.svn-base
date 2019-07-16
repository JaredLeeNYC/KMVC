package cn.com.kingkit.mvc.action.comm;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import cn.com.kingkit.mvc.controller.BaseAction;
import cn.com.kingkit.mvc.controller.IAction;
import cn.com.kingkit.mvc.exception.BusinessException;
import cn.com.kingkit.mvc.model.CommRole;
import cn.com.kingkit.mvc.model.CommRoleResource;
import cn.com.kingkit.mvc.model.CommUser;
import cn.com.kingkit.mvc.service.impl.CommRoleResourceService;
import cn.com.kingkit.mvc.service.impl.CommRoleService;
import cn.com.kingkit.mvc.service.impl.CommUserService;

public class AdminLoginoutAction extends BaseAction implements IAction,
		Serializable {
	/**
	 * serialVersionUID:TODO（用一句话描述这个变量表示什么）
	 * 
	 * @since Ver 1.1
	 */

	private static final long serialVersionUID = -7200170070860788456L;
	private final static Log logger = LogFactory
			.getLog(AdminLoginoutAction.class);
	private CommUser user = null;
	private CommUser loginUser = null;
	private CommUserService service = null;

	public String execute(HttpServletRequest request, HttpServletResponse response,ServletConfig servletConfig) {
		String act = request.getParameter("act");
		if (null != act) {
			if ("in".equals(act)) {

				try {
					loginUser = (CommUser) service.checkUser(user);
					if (null != loginUser) {
						MenuAction menuAction = new MenuAction();
						
						CommRoleResourceService rrService = new CommRoleResourceService();
						CommRoleResource crr = new CommRoleResource();
						crr.setRoleId(loginUser.getRoleId());
						List<CommRoleResource> crrList = rrService.listAll(crr);
						String menu = menuAction.printMainMenu(request, crrList);
						menu = this.trim(menu);
						
						CommRoleService rService = new CommRoleService();
						CommRole role = new CommRole();
						role.setId(loginUser.getRoleId());
						role = rService.get(role);

						request.getSession().setAttribute("role", role);
						request.getSession().setAttribute("menu", menu);
						return getReturnURL(SUCCESS);
					} else {
						addMessage("用户不存在或密码错误！");
						return getReturnURL("failure");
					}
				} catch (BusinessException e) {
					logger.error(e);
					addMessage(e.getMessage());
					return getReturnURL("failure");
				}
			} else if ("out".equals(act)) {
				request.getSession().invalidate();
				return getReturnURL("failure");
			} else if ("get".equals(act)) {
				this.user = service.get(user);
				return getReturnURL(EDIT);
			} else if ("save".equals(act)) {
				try {
					service.save(user);
					addMessage("资料修改成功，请<a href=\""+request.getContextPath()+"/adminLoginout.do?act=out\">重新登录。</a>");
					return getReturnURL(EDIT);
				} catch (Exception e) {
					request.setAttribute("user", user);
					addMessage(e.getMessage());
					return getReturnURL(EDIT);
				}
			}
		}
		return getReturnURL(ERROR);
	}

	public CommUser getUser() {
		return user;
	}

	public void setUser(CommUser user) {
		this.user = user;
	}

	public CommUser getLoginUser() {
		return loginUser;
	}

	public void setLoginUser(CommUser loginUser) {
		this.loginUser = loginUser;
	}

	public void setService(CommUserService service) {
		this.service = service;
	}
	//把空的<li></li>对和<li><ul></ul></li>对删除掉。
	private String trim(String str) {
		Pattern p = Pattern.compile("<li></li>");
		Matcher m = p.matcher(str);
		if (m.find()) {
			str = m.replaceAll("");
		}
		p = Pattern.compile("<li><ul></ul></li>");
		m = p.matcher(str);
		if (m.find()) {
			str = m.replaceAll("");
		}
		return str;
	}
}
