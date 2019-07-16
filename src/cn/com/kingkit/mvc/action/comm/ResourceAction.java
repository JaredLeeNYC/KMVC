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
import cn.com.kingkit.mvc.model.CommResource;
import cn.com.kingkit.mvc.service.impl.CommResourceService;
import cn.com.kingkit.mvc.util.PageController;

public class ResourceAction extends BaseAction implements IAction, Serializable{
	private final static Log logger = LogFactory.getLog(ResourceAction.class);
	private PageController pager = null;
	private CommResourceService service = null;
	private CommResource resource = null;
	
	public String execute(HttpServletRequest request, HttpServletResponse response,ServletConfig servletConfig) {
		String act = request.getParameter("act");
		if (null != act) {
			
			//取列表
			if ("list".equals(act)) {
				int totalRows = service.getRecordCount(new CommResource());
				String URL = request.getRequestURI();
				this.pager.setURL(URL);
				this.pager.setTotalRowsAmount(totalRows);
				List<CommResource> resourceList = service.list(new CommResource(), this.pager.getPageStartRow(), pager.getPageSize(), null, true);
				pager.setData(resourceList);
				return getReturnURL(LIST);
			}
			//点了添加或者点了修改
			else if ("get".equals(act)) {
				resource = service.get(resource);
				return getReturnURL(EDIT);
			}
			//保存表单
			else if ("save".equals(act)) {
				try {
					service.save(resource);
					return getReturnURL("getList");
				} catch (BusinessException e) {
					//保存原来表单已输入的内容
					request.setAttribute("resource", resource);
					addMessage(e.getMessage());
					return getReturnURL(EDIT);
				}
			}
			//删除
			else if ("del".equals(act)) {
				String[] ids = request.getParameterValues("id");
				for (String id : ids) {
					CommResource resource = new CommResource();
					if(null != id && !("".equals(id))){
						resource.setId(Long.valueOf(id));
						service.delete(resource);
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
	
	public CommResource getResource() {
		return resource;
	}
	public void setResource(CommResource resource) {
		this.resource = resource;
	}
	public void setService(CommResourceService service) {
		this.service = service;
	}

}
