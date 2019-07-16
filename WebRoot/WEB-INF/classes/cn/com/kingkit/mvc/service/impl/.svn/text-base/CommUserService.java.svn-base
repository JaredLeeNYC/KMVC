package cn.com.kingkit.mvc.service.impl;

import java.io.Serializable;

import cn.com.kingkit.mvc.exception.BusinessException;
import cn.com.kingkit.mvc.model.CommUser;
import cn.com.kingkit.mvc.service.BaseService;

public class CommUserService extends BaseService<CommUser> implements Serializable {

	/**   
	 * serialVersionUID:TODO（用一句话描述这个变量表示什么）  
	 * @since Ver 1.1   
	 */   
	
	private static final long serialVersionUID = 8274946613233212247L;

	public CommUser checkUser(CommUser entity) throws BusinessException {
		if (null == entity) {
			throw new BusinessException("用户对象不能为空!");
		}
		if (null == entity.getUserName()
				|| null == entity.getPassword()) {
			throw new BusinessException("用户名或者密码不能为空!");
		}
		return this.get(entity);
	}
	
	public void save(CommUser user) throws BusinessException{
		if (null != user && null != user.getUserName()) {
			if(null != user.getId() && 0 != user.getId()){
				update(user);
			}else{
				add(user);
			}
		}else {
			throw new BusinessException("用户名不能为空!");
		}
	}
}
