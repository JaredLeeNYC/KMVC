package cn.com.kingkit.mvc.service.impl;

import java.io.Serializable;

import cn.com.kingkit.mvc.exception.BusinessException;
import cn.com.kingkit.mvc.model.CommRole;
import cn.com.kingkit.mvc.service.BaseService;

public class CommRoleService extends BaseService<CommRole> implements Serializable{
	public Long save(CommRole role) throws BusinessException{
		if (null != role && null != role.getName()) {
			if(null != role.getId() && 0 != role.getId()){
				update(role);
				return role.getId();
			}else{
				return add(role);
			}
		}else {
			throw new BusinessException("角色名不能为空!");
		}
	}
}
