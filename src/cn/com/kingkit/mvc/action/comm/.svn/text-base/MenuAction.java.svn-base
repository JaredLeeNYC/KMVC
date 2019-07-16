package cn.com.kingkit.mvc.action.comm;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import cn.com.kingkit.mvc.controller.BaseAction;
import cn.com.kingkit.mvc.controller.IAction;
import cn.com.kingkit.mvc.exception.BusinessException;
import cn.com.kingkit.mvc.model.CommMenu;
import cn.com.kingkit.mvc.model.CommMenu2;
import cn.com.kingkit.mvc.model.CommResource;
import cn.com.kingkit.mvc.model.CommRole;
import cn.com.kingkit.mvc.model.CommRoleResource;
import cn.com.kingkit.mvc.model.CommUser;
import cn.com.kingkit.mvc.service.impl.CommMenuService;
import cn.com.kingkit.mvc.service.impl.CommResourceService;
import cn.com.kingkit.mvc.service.impl.CommRoleService;
import cn.com.kingkit.mvc.util.PageController;

public class MenuAction extends BaseAction implements Serializable, IAction {
	private final static Log logger = LogFactory.getLog(MenuAction.class);
	private PageController pager = null;
	private CommMenuService service = null;
	private CommMenu menu = null;
	private List<CommMenu> menuList = new ArrayList<CommMenu>();
	
	public String execute(HttpServletRequest request, HttpServletResponse response, 
			ServletConfig servletConfig) {
		String act = request.getParameter("act");
		if (null != act) {
			//取列表
			if ("list".equals(act)) {
				int totalRows = service.getRecordCount(new CommMenu());
				String URL = request.getRequestURI();
				this.pager.setURL(URL);
				this.pager.setTotalRowsAmount(totalRows);
				List<CommMenu> mList = service.list(new CommMenu(), null, null, null, true);
				List<CommMenu2> tempList = new ArrayList<CommMenu2>();
				this.save(mList, tempList);
				List<CommMenu2> tempList2 = new ArrayList<CommMenu2>();
				this.setMenu(0l, tempList, tempList2);
				tempList = new ArrayList<CommMenu2>();
				this.display(tempList2, tempList);
				if (tempList.size() <= this.pager.getPageEndRow()) {
					tempList = tempList.subList(this.pager.getPageStartRow(), tempList.size());
				} else {
					tempList = tempList.subList(this.pager.getPageStartRow(), this.pager.getPageEndRow());
				}
				pager.setData(tempList);
				return getReturnURL(LIST);
			}
			//点了添加或者点了修改
			else if ("get".equals(act)) {
				CommMenu temp = service.get(menu);
				if (null != temp) {
					menu = temp;
				}
				this.menuList = service.listAll(new CommMenu());
				request.setAttribute("menuList", this.menuList);
				CommResourceService resourceService = new CommResourceService();
				List<CommResource> resourceList = resourceService.listAll(new CommResource());
				request.setAttribute("resourceList", resourceList);
				return getReturnURL(EDIT);
			}
			//保存表单
			else if ("save".equals(act)) {
				try {
					service.save(menu);
					return getReturnURL("getList");
				} catch (BusinessException e) {
					//保存原来表单已输入的内容
					request.setAttribute("menu", menu);
					addMessage(e.getMessage());
					return getReturnURL(EDIT);
				}
			}
			//删除
			else if ("del".equals(act)) {
				String[] ids = request.getParameterValues("id");
				for (String id : ids) {
					CommMenu menu = new CommMenu();
					if(null != id && !("".equals(id))){
						menu.setId(Long.valueOf(id));
						service.delete(menu);
					}
				}
				return getReturnURL("getList");
			}
		}
		addMessage("参数不正确!! act=" + act);
		return getReturnURL(ERROR);
	}

	private void save(List<CommMenu> originList, List<CommMenu2> objectList) {
		for (CommMenu menu : originList) {
			CommMenu2 menu2 = new CommMenu2();
			menu2.setId(menu.getId());
			menu2.setName(menu.getName());
			menu2.setPid(menu.getPid());
			menu2.setUrl(menu.getUrl());
			menu2.setImage(menu.getImage());
			menu2.setResourceId(menu.getResourceId());
			objectList.add(menu2);
		}
	}
	
	private void setMenu(Long pid, List<CommMenu2> menuList, List<CommMenu2> resultList) {
		List<CommMenu2> sub = getSubList(pid, menuList);
		resultList.addAll(sub);
		for (CommMenu2 menu : resultList) {
			setMenu(menu.getId(), menuList, menu.getMenuList());
		}
	}

	
	private List<CommMenu2> getSubList(Long pid, List<CommMenu2> menuList){
		List<CommMenu2> subList = new ArrayList<CommMenu2>();
		for (CommMenu2 menu2 : menuList) {
			if (menu2.getPid() == pid) {
				subList.add(menu2);
			}
		}
		return subList;
	}
	
	private void display(List<CommMenu2> resultList, List<CommMenu2> sortedList) {
		if(resultList.size() > 0){
			for (CommMenu2 m : resultList) {
				sortedList.add(m);
				if (m.getMenuList().size() > 0) {
				}
				display(m.getMenuList(), sortedList);
			}
		}else {
		}
	}

	public CommMenu getMenu() {
		return menu;
	}

	public void setMenu(CommMenu menu) {
		this.menu = menu;
	}

	public void setService(CommMenuService service) {
		this.service = service;
	}

	public String printMainMenu(HttpServletRequest request, List<CommRoleResource> crrList) {
		this.service = new CommMenuService();
		List<CommMenu2> tempList2 = new ArrayList<CommMenu2>();
		List<CommMenu> tempList = service.list(new CommMenu(), null, null, null, true);
		this.save(tempList, tempList2);
		List<CommMenu2> resultList = new ArrayList<CommMenu2>();
		this.setMenu(0l, tempList2, resultList);
		String menuStr =  getMenuHTML(resultList, request, crrList);
		return menuStr;
	}

	private int level = 0;
	private String getMenuHTML(List<CommMenu2> mainMenu2, HttpServletRequest request, List<CommRoleResource> crrList) {
		StringBuffer sb = new StringBuffer();
		sb.append(level==0?"<ul id=\"menu\">":"<ul>");
		level++;		
		for(CommMenu2 menu2: mainMenu2){
			sb.append("<li>");
			if (menu2.getPid() == 0) {
				for (CommRoleResource crr : crrList) {
					if (crr.getResourceId() == menu2.getResourceId()) {
						sb.append("<a href=\""+menu2.getUrl()+"\" target=\"mainIframe\" style=\"cursor: pointer;\"><img src=\""+request.getContextPath()+menu2.getImage()+"\" align=\"absmiddle\"/>"+menu2.getName()+"</a>");
					}
				}
			} else {
				for (CommRoleResource crr : crrList) {
					if (crr.getResourceId() == menu2.getResourceId()) {
						sb.append("<a href=\""+request.getContextPath()+menu2.getUrl()+"\" target=\"mainIframe\" style=\"cursor: pointer;\">"+menu2.getName()+"</a>");
					}
				}
			}
			if(menu2.getMenuList().size()>0){
				sb.append(getMenuHTML(menu2.getMenuList(), request, crrList));
			}
			sb.append("</li>");
		}
		sb.append("</ul>");
		return sb.toString();
	}

	public PageController getPager() {
		return pager;
	}

	public void setPager(PageController pager) {
		this.pager = pager;
	}

	public List<CommMenu> getMenuList() {
		return menuList;
	}

	public void setMenuList(List<CommMenu> menuList) {
		this.menuList = menuList;
	}

}
