package cn.com.kingkit.mvc.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.log4j.Logger;

import cn.com.kingkit.mvc.exception.DataAccessException;

public class JdbcUtil {
	private final static Logger logger = Logger.getLogger(JdbcUtil.class);

	public static Connection getConnection() throws DataAccessException {
		Connection conn = null;
		try {
			Class.forName("org.logicalcobwebs.proxool.ProxoolDriver");
			conn = DriverManager.getConnection("proxool.cmsdata"); // 从连接池取得连接
		} catch (Exception e) {
			logger.error("获取数据库连接失败！ " + e.getMessage(), e);
			throw new DataAccessException("获取数据库连接失败！ " + e.getMessage(), e);
		}
		return conn;
	}

	public static void close(Object o) {
		if (o == null) {
			return;
		}
		try {
			if (o instanceof ResultSet) {
				ResultSet rs = (ResultSet) o;

				rs.close();
			}
			if (o instanceof Statement) {
				Statement stmt = (Statement) o;
				stmt.close();
			}
			if (o instanceof Connection) {
				Connection conn = (Connection) o;
				conn.close();
			}
		} catch (SQLException e) {
			logger.error("关闭数据库连接出错！", e);
		}
	}

	public static void close(PreparedStatement prmt, Connection conn) {
		try {
			if (prmt != null) {
				prmt.close();
			}
			if (conn != null) {
				conn.close();
			}
		} catch (SQLException e) {
			logger.error("关闭数据库连接出错！", e);
		}
	}

	public static void close(ResultSet rs, Statement stmt, Connection conn) {
		try {
			if (rs != null) {
				rs.close();
			}
			if (stmt != null) {
				stmt.close();
			}
			if (conn != null) {
				conn.close();
			}
		} catch (SQLException e) {
			logger.error("关闭数据库连接出错！", e);
		}
	}

	/**
	 * 打印ResultSet列名
	 * @param rs
	 */
	public static void printColumnName(ResultSet rs) {
		try {
			ResultSetMetaData rsmd = rs.getMetaData();
			int columnCount = rsmd.getColumnCount();
			for (int i = 1; i <= columnCount; i++) {
				System.out.print(rsmd.getColumnName(i) + "\t");
			}
			System.out.println();
		} catch (SQLException e) {
			logger.error("打印ResultSet列名出错！", e);
		}
	}

	/**
	 * 以表格形式打印ResultSet
	 * @param rs
	 */
	public static void printResuletSet(ResultSet rs) {
		printColumnName(rs); // 打印表头信息
		try {
			int columnCount = rs.getMetaData().getColumnCount();
			while (rs.next()) {
				// 打印一条记录
				for (int i = 1; i <= columnCount; i++) {
					// 打印一个字段
					System.out.print(rs.getObject(i) + "\t");
				}
				System.out.println();
			}
		} catch (SQLException e) {
			logger.error("以表格形式打印ResultSet出错！", e);
		}
	}

}
