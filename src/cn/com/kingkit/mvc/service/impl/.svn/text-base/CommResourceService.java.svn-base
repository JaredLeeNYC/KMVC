package cn.com.kingkit.mvc.service.impl;

import java.io.Serializable;

import cn.com.kingkit.mvc.exception.BusinessException;
import cn.com.kingkit.mvc.model.CommResource;
import cn.com.kingkit.mvc.model.CommRole;
import cn.com.kingkit.mvc.service.BaseService;

public class CommResourceService extends BaseService<CommResource> implements Serializable {
	public void save(CommResource resource) throws BusinessException{
		if (null != resource && null != resource.getName()) {
			if(null != resource.getId() && 0 != resource.getId()){
				update(resource);
			}else{
				add(resource);
			}
		}else {
			throw new BusinessException("角色名不能为空!");
		}
	}
}
