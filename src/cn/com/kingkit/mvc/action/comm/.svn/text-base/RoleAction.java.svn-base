package cn.com.kingkit.mvc.action.comm;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import cn.com.kingkit.mvc.controller.BaseAction;
import cn.com.kingkit.mvc.controller.IAction;
import cn.com.kingkit.mvc.exception.BusinessException;
import cn.com.kingkit.mvc.model.CommResource;
import cn.com.kingkit.mvc.model.CommRole;
import cn.com.kingkit.mvc.model.CommRoleResource;
import cn.com.kingkit.mvc.model.CommUser;
import cn.com.kingkit.mvc.service.impl.CommResourceService;
import cn.com.kingkit.mvc.service.impl.CommRoleResourceService;
import cn.com.kingkit.mvc.service.impl.CommRoleService;
import cn.com.kingkit.mvc.util.PageController;

public class RoleAction extends BaseAction implements IAction, Serializable{
	private final static Log logger = LogFactory.getLog(RoleAction.class);
	private PageController pager = null;
	private CommRoleService service = new CommRoleService();
	private CommRole role = null;
	private List<CommRoleResource> roleResourceList = null;
	private List<CommResource> resourceList = null;
	

	public String execute(HttpServletRequest request, HttpServletResponse response,ServletConfig servletConfig) {
		String act = request.getParameter("act");
		if (null != act) {
			//取列表
			if ("list".equals(act)) {
				int totalRows = service.getRecordCount(new CommRole());
				String URL = request.getRequestURI();
				this.pager.setURL(URL);
				this.pager.setTotalRowsAmount(totalRows);
				List<CommRole> resourceList = service.list(new CommRole(), this.pager.getPageStartRow(), pager.getPageSize(), null, true);
				pager.setData(resourceList);
				return getReturnURL(LIST);
			}
			//点了添加或者点了修改
			else if ("get".equals(act)) {
				role = service.get(role);
				
				//获取该角色的资源
				if(null != role){
					CommRoleResourceService commRoleResourceService = new CommRoleResourceService();
					CommRoleResource crr = new CommRoleResource();
					crr.setRoleId(role.getId());
					try {
						roleResourceList = commRoleResourceService.listByRoleId(crr);
						//request.setAttribute("roleResourceList", roleResourceList);
						
					} catch (BusinessException e) {
						logger.error("查询获取该角色的资源时出错了: " + e.getMessage(), e);
					}
				}
				//所有资源
				CommResourceService resourceService = new CommResourceService();
				resourceList = resourceService.listAll(new CommResource());
				return getReturnURL(EDIT);
			}
			//保存表单
			else if ("save".equals(act)) {
				try {
					Long key = service.save(role);
					//如果插入或者更新记录成功, 会返回该记录的主键
					if (null != key) {
						//获取选中了的权限资源
						String[] resources = request.getParameterValues("resource");
						CommRoleResourceService commRoleResourceService = new CommRoleResourceService();
						//把选中了的插入中间表
						CommRoleResource crr = new CommRoleResource();
						crr.setRoleId(key);
						//首先把当前获取的这个角色记录全部删除,然后再新增
						commRoleResourceService.delete(crr);
						if(null != resources){
							for (String string : resources) {
								crr.setResourceId(Long.valueOf(string));
								commRoleResourceService.add(crr);
							}
						}
					}
					
					return getReturnURL("getList");
				} catch (BusinessException e) {
					//保存原来表单已输入的内容
					request.setAttribute("role", role);
					addMessage(e.getMessage());
					return getReturnURL(EDIT);
				}
			}
			//删除
			else if ("del".equals(act)) {
				String[] ids = request.getParameterValues("id");
				for (String id : ids) {
					CommRole role = new CommRole();
					if(null != id && !("".equals(id))){
						role.setId(Long.valueOf(id));
						service.delete(role);
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
	public CommRole getRole() {
		return role;
	}
	public void setRole(CommRole role) {
		this.role = role;
	}
	public List<CommRoleResource> getRoleResourceList() {
		return roleResourceList;
	}
	public void setRoleResourceList(List<CommRoleResource> roleResourceList) {
		this.roleResourceList = roleResourceList;
	}
	public List<CommResource> getResourceList() {
		return resourceList;
	}
	public void setResourceList(List<CommResource> resourceList) {
		this.resourceList = resourceList;
	}
}
