package cn.com.kingkit.mvc.service;

import java.util.List;

import cn.com.kingkit.mvc.dao.BaseDao;
import cn.com.kingkit.mvc.exception.BusinessException;
import cn.com.kingkit.mvc.model.CommUser;

public class BaseService<T> {
	
	protected BaseDao<T> baseDao = new BaseDao<T>();

	public Long add(T entity)  {
		return baseDao.add(entity);
	}

	public void batchUpdate(List<T> list)  {
		for (T t : list) {
			this.update(t);
		}
	}

	public void delete(T entity)  {
			baseDao.delete(entity);
	}

	public List<T> list(T entity)  {
		return baseDao.list(entity);
	}
	
	public List<T> listAll(T entity)  {
		return baseDao.listAll(entity);
	}

	public List<T> list(T entity, Integer start, Integer size,
			String condition, boolean isQueryAll)  {
		return baseDao.list(entity, start, size, condition, isQueryAll);
	}

	public void update(T entity)  {
		baseDao.update(entity);
	}

	public T get(T entity) {
		return baseDao.get(entity);
	}
	
	public int getRecordCount(T entity) {
		return this.baseDao.getRecordCount(entity);
	}

}
