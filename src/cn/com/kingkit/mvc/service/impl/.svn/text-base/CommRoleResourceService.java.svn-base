package cn.com.kingkit.mvc.service.impl;

import java.io.Serializable;
import java.util.List;

import cn.com.kingkit.mvc.exception.BusinessException;
import cn.com.kingkit.mvc.model.CommRoleResource;
import cn.com.kingkit.mvc.service.BaseService;

public class CommRoleResourceService extends BaseService<CommRoleResource> implements Serializable {

	public List<CommRoleResource> listByRoleId(CommRoleResource entity) throws BusinessException {
		if(null != entity && null != entity.getRoleId()){
			return super.list(entity);
		}
		else {
			throw new BusinessException("roleId 不能为空!");
		}
	}

}
