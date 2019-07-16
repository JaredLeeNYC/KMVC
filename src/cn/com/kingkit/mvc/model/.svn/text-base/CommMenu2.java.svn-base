package cn.com.kingkit.mvc.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


public class CommMenu2 implements Serializable {
	private Long id;
	private String name;
	private String url;
	private Long pid;
	private String image;
	private List<CommMenu2> menuList = new ArrayList<CommMenu2>();
	private Long resourceId;
	public Long getResourceId() {
		return resourceId;
	}
	public void setResourceId(Long resourceId) {
		this.resourceId = resourceId;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getPid() {
		return pid;
	}
	public void setPid(Long pid) {
		this.pid = pid;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return id + "-" + pid +"-" + name;
	}
	public List<CommMenu2> getMenuList() {
		return menuList;
	}
	public void setMenuList(List<CommMenu2> menuList) {
		this.menuList = menuList;
	}
	/*public Menu(Long id, Long pid, String name) {
		super();
		this.id = id;
		this.name = name;
		this.pid = pid;
	}*/
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
}
