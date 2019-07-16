package cn.com.kingkit.mvc.util;


import java.io.Serializable;
import java.util.Collection;

public class PageController implements Serializable{

	// 总行数
	private int totalRowsAmount;
	// 每页行数
	private int pageSize = 10;
	// 总页数
	private int totalPages = 1;
	// 当前页码
	private int currentPage = 1;
	// 下一页
	private int nextPage;
	// 上一页
	private int previousPage;
	// 是否有下一页
	private boolean hasNext;
	// 是否有上一页
	private boolean hasPrevious;

	// 当前页开始行
	private int pageStartRow;

	// 当前页结束行
	private int pageEndRow;
	
	//当前页的提交路径
	private String URL;
	
	//附近几页的页数
	private int[] pageNums;
	
	@SuppressWarnings("unchecked")
	
	private Collection data;

	/**
	 * 构造函数。
	 * 
	 * @param totalRows
	 *            总行数
	 */
	
	public PageController() {
		this.setPageSize(this.pageSize);
		this.setCurrentPage(this.currentPage);
	}
	
	public PageController(int totalRows, int currentPage) {
		setPageController(totalRows, currentPage);
	}

	public PageController(int totalRows, int currentPage, int pageSize) {
		this.pageSize = pageSize;
		this.setPageController(totalRows, currentPage);
	}
	
	public PageController(int totalRows, int currentPage, int pageSize, String URL) {
		this.pageSize = pageSize;
		this.setPageController(totalRows, currentPage);
		this.URL = URL;
	}

	public void setPageController(int totalRows, int currentPage) {

		setTotalRowsAmount(totalRows);
		setCurrentPage(currentPage);
	}

	/**
	 * 设置总行数。
	 * 
	 * @param i
	 *            总行数。
	 */
	public void setTotalRowsAmount(int rows) {
		if (rows < 0) {
			totalRowsAmount = 0;
		} else {
			totalRowsAmount = rows;
		}
		if (totalRowsAmount == 0) {
			pageSize = 1;
		}
		if (totalRowsAmount % pageSize == 0) {
			totalPages = totalRowsAmount / pageSize;
		} else {
			totalPages = totalRowsAmount / pageSize + 1;
		}
		
		if (currentPage > totalPages) {
			this.setCurrentPage(totalPages);
		}
		
		if (currentPage == totalPages) {
			hasNext = false;
		} else {
			hasNext = true;
		}
		
		// 计算当前页开始行和结束行
		if (currentPage != totalPages) {

			pageStartRow = (currentPage - 1) * pageSize + 1;

		} else {
			pageStartRow = (currentPage - 1) * pageSize + 1;
		}

		// 记录索引从0开始
		if (totalRowsAmount == 0) {
			pageStartRow = 0;
		} else {
			pageStartRow -= 1;
		}
		pageEndRow = pageStartRow + pageSize;
	}

	/**
	 * 设置当前页数。
	 * 
	 * @param i
	 */
	public void setCurrentPage(int curPage) {

		if (curPage <= 0) {
			currentPage = 1;
		} else {
			currentPage = curPage;
		}
		
		if (currentPage == 1) {
			hasPrevious = false;
		} else {
			hasPrevious = true;
		}
		
		if (currentPage > 3) {
			int[] temp = {currentPage-2, currentPage-1, currentPage, currentPage+1,
					currentPage+2, currentPage+3, currentPage+4};
			this.pageNums = temp;
		} else {
			int[] temp = {1, 2, 3, 4, 5, 6, 7};
			this.pageNums = temp;
		}
		nextPage = currentPage + 1;
		previousPage = currentPage - 1;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public boolean isHasNext() {
		return hasNext;
	}

	public boolean isHasPrevious() {
		return hasPrevious;
	}

	public int getNextPage() {
		return nextPage;
	}

	public int getPageSize() {
		return pageSize;
	}

	public int getPreviousPage() {
		return previousPage;
	}

	public int getTotalPages() {
		return totalPages;
	}

	public int getTotalRowsAmount() {
		return totalRowsAmount;
	}

	public int getPageStartRow() {
		return pageStartRow;
	}

	public int getPageEndRow() {
		return pageEndRow;
	}

	public String description() {
		String description = "Total:" + this.getTotalRowsAmount() + " items " + this.getTotalPages()
				+ " pages,Current page:" + this.currentPage + " Previous " + this.hasPrevious
				+ " Next:" + this.hasNext + " start row:" + this.pageStartRow + " end row:"
				+ this.pageEndRow;
		return description;
	}

	@SuppressWarnings("unchecked")
	public void setData(Collection data) {
		this.data = data;
	}

	@SuppressWarnings("unchecked")
	public Collection getData() {
		return data;
	}

	@SuppressWarnings("unchecked")
	public static void main(String args[]) {

		@SuppressWarnings("unused")
		Collection c = null;
		PageController pc = new PageController(0, 2);
		System.out.println(pc.description());
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public void setNextPage(int nextPage) {
		this.nextPage = nextPage;
	}

	public void setPreviousPage(int previousPage) {
		this.previousPage = previousPage;
	}

	public void setHasNext(boolean hasNext) {
		this.hasNext = hasNext;
	}

	public void setHasPrevious(boolean hasPrevious) {
		this.hasPrevious = hasPrevious;
	}

	public void setPageStartRow(int pageStartRow) {
		this.pageStartRow = pageStartRow;
	}

	public void setPageEndRow(int pageEndRow) {
		this.pageEndRow = pageEndRow;
	}

	public String getURL() {
		return URL;
	}

	public void setURL(String url) {
		URL = url;
	}

	public int[] getPageNums() {
		return pageNums;
	}

	public void setPageNums(int[] pageNums) {
		this.pageNums = pageNums;
	}

}
