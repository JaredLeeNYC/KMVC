package cn.com.kingkit.mvc.service.impl;

import java.io.Serializable;

import cn.com.kingkit.mvc.exception.BusinessException;
import cn.com.kingkit.mvc.model.CommMenu;
import cn.com.kingkit.mvc.model.CommRole;
import cn.com.kingkit.mvc.model.CommUser;
import cn.com.kingkit.mvc.service.BaseService;

public class CommMenuService extends BaseService<CommMenu> implements Serializable {
	
	public void save(CommMenu menu) throws BusinessException{
		if (null != menu && null != menu.getName()) {
			if(null != menu.getId() && 0 != menu.getId()){
				update(menu);
			}else{
				add(menu);
			}
		}else {
			throw new BusinessException("菜单名不能为空!");
		}
	}
}
