package cn.com.kingkit.mvc.action.comm;

import java.io.Serializable;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import cn.com.kingkit.mvc.controller.BaseAction;
import cn.com.kingkit.mvc.controller.IAction;
import cn.com.kingkit.mvc.exception.BusinessException;
import cn.com.kingkit.mvc.model.CommRole;
import cn.com.kingkit.mvc.model.CommUser;
import cn.com.kingkit.mvc.service.impl.CommRoleService;
import cn.com.kingkit.mvc.service.impl.CommUserService;
import cn.com.kingkit.mvc.util.PageController;

public class UserAction extends BaseAction implements IAction, Serializable {
	/**   
	 * serialVersionUID:TODO（用一句话描述这个变量表示什么）  
	 * @since Ver 1.1   
	 */   
	
	private static final long serialVersionUID = 8299975587235537983L;
	private final static Log logger = LogFactory.getLog(UserAction.class);
	private PageController pager = null;
	private CommUserService service = null;
	private CommUser user = null;
	private List<CommRole> roleList = null; 
	
	public String execute(HttpServletRequest request, HttpServletResponse response,ServletConfig servletConfig) {
		String act = request.getParameter("act");
		if (null != act) {
			//取列表
			if ("list".equals(act)) {
				int totalRows = service.getRecordCount(new CommUser());
				String URL = request.getRequestURI();
				this.pager.setURL(URL);
				this.pager.setTotalRowsAmount(totalRows);
				List<CommUser> resourceList = service.list(new CommUser(), this.pager.getPageStartRow(), pager.getPageSize(), null, true);
				pager.setData(resourceList);
				return getReturnURL(LIST);
			}
			//点了添加或者点了修改
			else if ("get".equals(act)) {	
				user = service.get(user);
				CommRoleService roleService = new CommRoleService();
				roleList = roleService.listAll(new CommRole());
				return getReturnURL(EDIT);
			}
			//保存表单
			else if ("save".equals(act)) {
				try {
					service.save(user);
					return getReturnURL("getList");
				} catch (BusinessException e) {
					//保存原来表单已输入的内容
					request.setAttribute("user", user);
					addMessage(e.getMessage());
					return getReturnURL(EDIT);
				}
			}
			//删除
			else if ("del".equals(act)) {
				String[] ids = request.getParameterValues("id");
				for (String id : ids) {
					CommUser user = new CommUser();
					if(null != id && !("".equals(id))){
						user.setId(Long.valueOf(id));
						service.delete(user);
					}
				}
				return getReturnURL("getList");
			}
		}
		addMessage("参数不正确!! act=" + act);
		return getReturnURL(ERROR);
	}


	public PageController getPager() {
		return pager;
	}


	public void setPager(PageController pager) {
		this.pager = pager;
	}

	public CommUser getUser() {
		return user;
	}


	public void setUser(CommUser user) {
		this.user = user;
	}


	public List<CommRole> getRoleList() {
		return roleList;
	}


	public void setRoleList(List<CommRole> roleList) {
		this.roleList = roleList;
	}


	public void setService(CommUserService service) {
		this.service = service;
	}

}
