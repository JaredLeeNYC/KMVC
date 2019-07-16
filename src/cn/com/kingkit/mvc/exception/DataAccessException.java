package cn.com.kingkit.mvc.exception;

public class DataAccessException extends RuntimeException {

	/**   
	 * serialVersionUID:TODO（用一句话描述这个变量表示什么）  
	 * @since Ver 1.1   
	 */   
	
	private static final long serialVersionUID = 1L;

	public DataAccessException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public DataAccessException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public DataAccessException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public DataAccessException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

}
