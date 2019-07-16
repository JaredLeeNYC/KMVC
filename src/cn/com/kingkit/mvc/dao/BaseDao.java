package cn.com.kingkit.mvc.dao;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import cn.com.kingkit.mvc.exception.DataAccessException;
import cn.com.kingkit.mvc.util.JdbcUtil;
import cn.com.kingkit.mvc.util.Utils;

/**
 * 通用的Dao类<br>
 * <p>
 * 为了方便，下面是一些约定：<br>
 * 1.实体entity必须和表名相同，如果实体名称里面由多个单词组成，则表名则用下划线_连接各单词：<br>
 * 实体类NewsType，对应的表名应该为 news_type；<br>
 * 2.主键字段名为id，java类型为Long，自动增长
 * </p>
 * <p>
 * 说明：原型参考自kingkitcms(author EricKong)
 * </p>
 * 
 * @author Kit.Liao
 * 
 */
public class BaseDao<T> {
	private final static Log logger = LogFactory.getLog(BaseDao.class);

	/**
	 * 新增记录
	 * @param entity
	 * @return 返回新增记录在数据库是自增的字段值
	 * @throws DataAccessException
	 */
	@SuppressWarnings("unchecked")
	public Long add(T entity) throws DataAccessException {
		if (null == entity) {
			throw new DataAccessException("尝试插入空记录！entity==null");
		}
		Connection conn = null;
		PreparedStatement prmt = null;
		Class entityClass = entity.getClass();
		String entityClassName = entityClass.getName(); // 获得实体类名
		// 获得实体类对应的数据库表名
		String tableName = Utils.getTableNameFromEntityName(entityClassName.substring(entityClassName
				.lastIndexOf('.') + 1));
		Field[] field = entityClass.getDeclaredFields(); // 获取实体类的所有字段
		StringBuffer fieldNameStr = new StringBuffer();
		StringBuffer fieldNameParameterStr = new StringBuffer();
		int i = 0;
		for (int j = 0; j < field.length; j++) {
			String fieldName = field[j].getName();
			if ("id".equals(fieldName)) { // id(主键)字段不需要设值
				continue;
			}
			if (i == 0) {
				fieldNameStr.append(fieldName);
				fieldNameParameterStr.append("?");
			} else {
				fieldNameStr.append("," + fieldName);
				fieldNameParameterStr.append(",?");
			}
			i++;
		}
		String sql = "insert into " + tableName + "(" + fieldNameStr + ")values(" + fieldNameParameterStr + ")";// 构造插入的sql语句
		conn = JdbcUtil.getConnection(); // 取得数据库连接
		try {
			prmt = conn.prepareStatement(sql); // 预查询
			for (int j = 0; j < field.length; j++) {
				String fieldName = field[j].getName();
				if (fieldName.equals("id")) { // id字段不需要设值
					continue;
				}
				String fieldGetterName = "get" + Utils.upperFirstChar(fieldName);
				Object value = entityClass.getMethod(fieldGetterName).invoke(entity);
				prmt.setObject(j, value);
			}
			prmt.executeUpdate();

			// 产生的主键以结果集的形式返回
			ResultSet rs = prmt.getGeneratedKeys();
			// 遍历结果集，输出主键，实际上结果集只有一条记录
			if (rs.next()) {
				return rs.getLong(1);
			}
			logger.info("sql=" + sql);
			logger.info("插入已完成。");
		} catch (Exception e) {
			logger.error("插入记录出错！sql=" + sql, e);
			throw new DataAccessException("插入记录出错！sql=" + sql, e);
		} finally {
			/* 关闭连接 */
			JdbcUtil.close(prmt, conn);
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	public void delete(T entity) throws DataAccessException {
		if (null == entity) {
			throw new DataAccessException("尝试删除空对象！请至少有一个属性被赋值。entity==null");
		}
		Connection conn = null;
		PreparedStatement prmt = null;
		Class entityClass = entity.getClass();
		String entityClassName = entityClass.getName(); // 获得实体类名
		// 获得实体类对应的数据库表名
		String tableName = Utils.getTableNameFromEntityName(entityClassName.substring(entityClassName
				.lastIndexOf('.') + 1));

		Field[] field = entityClass.getDeclaredFields(); // 获取实体类的所有字段

		// 拼接where条件
		StringBuffer sql = new StringBuffer("delete from " + tableName);
		List<Integer> fieldIndexs = new ArrayList<Integer>();
		for (int j = 0; j < field.length; j++) {
			String fieldName = field[j].getName();
			String fieldGetterName = "get" + Utils.upperFirstChar(fieldName);
			try {
				Object value = entityClass.getMethod(fieldGetterName).invoke(entity);
				if (null != value) {
					if (fieldIndexs.size() == 0) {
						sql.append(" where ");
					}
					sql.append(fieldName + "=? " );
					fieldIndexs.add(j);
				}
			} catch (Exception e) {
				logger.error("请至少有一个属性被赋值，并且设置相应的getter和setter方法！entityClass="
						+ entityClassName, e);
				throw new DataAccessException("请至少有一个属性被赋值，并且设置相应的getter和setter方法！entityClass="
						+ entityClassName, e);
			}
		}
		try {
			conn = JdbcUtil.getConnection();
			prmt = conn.prepareStatement(sql.toString());
			//对prepareStatement赋值
			for (int i = 0; i < fieldIndexs.size(); i++) {
				String fieldName = field[fieldIndexs.get(i)].getName();
				String fieldGetterName = "get" + Utils.upperFirstChar(fieldName);
				Object value = entityClass.getMethod(fieldGetterName).invoke(entity);
				entityClass.getMethod(fieldGetterName).invoke(entity);
				prmt.setObject(i + 1, value);
			}
			int rows = prmt.executeUpdate();
			logger.info("sql=" + sql);
			logger.info("成功删除"+rows+"条记录。");
		} catch (Exception e) {
			logger.error("删除记录出错！sql=" + sql, e);
			throw new DataAccessException("删除记录出错！sql=" + sql, e);
		} finally {
			/* 关闭连接 */
			JdbcUtil.close(prmt, conn);
		}
	}

	@SuppressWarnings("unchecked")
	public void update(T entity) throws DataAccessException {
		if (null == entity) {
			throw new DataAccessException("尝试更新空对象！请至少对id属性设置值。entity==null");
		}
		Connection conn = null;
		PreparedStatement prmt = null;
		Class entityClass = entity.getClass();
		String entityClassName = entityClass.getName(); // 获得实体类名
		// 获得实体类对应的数据库表名
		String tableName = Utils.getTableNameFromEntityName(entityClassName.substring(entityClassName
				.lastIndexOf('.') + 1));
		Field[] field = entityClass.getDeclaredFields(); // 获取实体类的所有字段
		String[] fieldGetterName = Utils.getColumnGetterName(entityClass);
		StringBuffer sql = new StringBuffer("update " + tableName + " set ");
		try {
			int k = 0; // 计数器, //累计需要更新的字段数量(id不更新),id字段的设值号码为k+1
			for (int i = 0; i < field.length; i++) { // 构造sql语句
				if (!field[i].getName().equals("id")) {
					sql.append(field[i].getName() + "=?,");
					k++;
				}
			}
			sql.deleteCharAt(sql.length() - 1); // 删除最后一个逗号
			sql.append(" where id=?");
			conn = JdbcUtil.getConnection();// 取得数据库连接
			prmt = conn.prepareStatement(sql.toString()); // 预查询

			int i = 1; // 设值位
			for (int j = 0; j < field.length; j++) {
				Object value = entityClass.getMethod(fieldGetterName[j]).invoke(entity);
				if (!field[j].getName().equals("id")) {
					prmt.setObject(i, value);
					i++;
				}
				if (field[j].getName().equals("id")) {
					if (null == value) {
						logger.error("尝试更新id为空的对象！请至少对id属性设置值。entityClassName="
								+ entityClassName);
						throw new DataAccessException(
								"尝试更新id为空的对象！请至少对id属性设置值。entityClassName="
										+ entityClassName);
					}
					prmt.setObject(k + 1, value);
				}
			}
			int rows = prmt.executeUpdate();
			logger.info("sql=" + sql);
			logger.info("成功更新"+rows+"条记录。");
		} catch (Exception e) {
			logger.error("更新记录出错！sql=" + sql, e);
			throw new DataAccessException("更新记录出错！sql=" + sql, e);
		} finally {
			/* 关闭连接 */
			JdbcUtil.close(prmt, conn);
		}
	}

	/**
	 * 查询单个对象
	 * @param entity
	 * @return 一个对象. 如果全部属性没有一个设置值的话,则返回null
	 * @throws DataAccessException
	 */
	public T get(T entity) throws DataAccessException {
		T obj = null;
		List<T> list = this.list(entity, null, null, null, false);
		if (!list.isEmpty()) { // 如果集合不为空
			obj = list.get(0);
		}
		return obj;
	}

	/**
	 * 按条件查询, 即按entity被赋值的属性作为条件
	 * @param entity
	 * @return 如果全部属性没有一个设置值的话,则返回空列表
	 * @throws DataAccessException
	 */
	public List<T> list(T entity) throws DataAccessException {
		return this.list(entity, null, null, null, false);
	}

	/**
	 * 查询所有记录
	 * @param entity
	 * @return 返回所有记录列表
	 * @throws DataAccessException
	 */
	public List<T> listAll(T entity) throws DataAccessException {
		return this.list(entity, null, null, null, true);
	}

	/**
	 * 查询列表的方法
	 * 注意: entity的属性如果没设置有值并且isQueryAll=true时会查询所有记录!
	 * @param entity 实体对象
	 * @param start 开始记录
	 * @param size 要查询返回的数量
	 * @param condition 条件, 如 order by updateTime desc
	 * @param isQueryAll
	 * @return
	 * @throws DataAccessException
	 */
	@SuppressWarnings("unchecked")
	public List<T> list(T entity, Integer start, Integer size, String condition, boolean isQueryAll)
			throws DataAccessException {
		Connection conn = null;
		PreparedStatement prmt = null;
		ResultSet rs = null;
		Class entityClass = entity.getClass();
		String entityClassName = entityClass.getName(); // 获得实体类名
		String tableName = Utils.getTableNameFromEntityName(entityClassName.substring(entityClassName
				.lastIndexOf('.') + 1));
		Field[] field = entityClass.getDeclaredFields(); // 获取实体类的所有字段
		String[] fieldGetterName = Utils.getColumnGetterName(entityClass); // 获取字段值getter名
		/** *创建预备查询语句** */
		StringBuilder sql = new StringBuilder("select * from " + tableName + " where 1=1");
		List<T> list = new ArrayList<T>();
		try {
			// 准备基本的sql语句
			for (int i = 0; i < fieldGetterName.length; i++) {// 构造查询字符串
				if (entityClass.getMethod(fieldGetterName[i]).invoke(entity) != null) { // 如果实体对象字段值不为空
					sql.append(" and " + field[i].getName() + "=?");
				}
			}
			// 排序
			if (null != condition) {
				sql.append(" " + condition);
			}

			// 如果需要分布查询
			if (null != start && null != size) {
				sql.append(" limit " + start + "," + size);
			}

			conn = JdbcUtil.getConnection();
			prmt = conn.prepareStatement(sql.toString());
			/** **为查询语句设值***** */
			int j = 1;// 预查询语句的设值下标号
			for (int i = 0; i < fieldGetterName.length; i++) {
				if (entityClass.getMethod(fieldGetterName[i]).invoke(entity) != null) { // 如果实体对象字段值不为空
					Object value = entityClass.getMethod(fieldGetterName[i]).invoke(entity);
					prmt.setObject(j, value);
					j++;
				}
			}
			// 如果没有一个属性被赋值的话, 会查询全部列表!!
			// 所以除非是要查询所有记录, 否则要避免这种情况
			if (1 == j && (!isQueryAll)) {
				// 如果不是查询全部但没有一个属性被赋值,则抛异常!!
				logger.error("查询记录出错！sql=" + sql
						+ ". 请确认: 1.对象的getter方法为public; 2. 如果不是查询所有记录, 请至少有一个属性被赋值.");
				return list;
			}
			// System.out.print("sql============" + sql + "======");
			rs = prmt.executeQuery();
			ResultSetMetaData rsMetaData = rs.getMetaData();
			String[] columnSetterName = Utils.getColumnSetterName(entityClass); // 实体类中字段的设值方法名
			list = (List<T>) Utils.setEntityObject(entityClass, rs, rsMetaData, columnSetterName);
		} catch (Exception e) {
			logger
					.error("查询记录出错！sql=" + sql
							+ ". 请确认: 1.对象的getter方法为public; 2.如果不是查询所有记录, 请至少有一个属性被赋值.", e);
			throw new DataAccessException("查询记录出错！sql=" + sql
					+ ". 请确认: 1.对象的getter方法为public; 2.如果不是查询所有记录, 请至少有一个属性被赋值.", e);
		} finally {
			/* 关闭连接 */
			JdbcUtil.close(prmt, conn);
		}
		logger.info("sql=" + sql);
		logger.info("成功查询记录。");
		return list;
	}

	public int getRecordCount(T entity) throws DataAccessException {
		List<T> list = this.listAll(entity);
		return list.size();
	}

	public void batchUpdate(List<T> list) throws DataAccessException {
		for (T object : list) {
			this.update(object);
		}
	}
	
	public static int getMaxNum(String field,String entityName){
		String tableName = Utils.getTableNameFromEntityName(entityName);
		Connection conn = JdbcUtil.getConnection();
		String sql = "select max("+field+") from "+tableName;
		int i;
		try {
			PreparedStatement stm = conn.prepareStatement(sql);
			ResultSet rs = stm.executeQuery();
			i = 0;
			if (rs.next()) {
				i = rs.getInt(1);
			}
			stm.close();
			conn.close();
		} catch (SQLException e) {
			logger.error(e.getMessage(),e);
			throw new DataAccessException(e.getMessage());
		}
		return i;
	}
}