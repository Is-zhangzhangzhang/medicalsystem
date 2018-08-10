package cn.edu.scau.hlyz.entity;

public class Suser {

	private String user_id;
	private String user_password;
	private int user_level;
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUser_password() {
		return user_password;
	}
	public void setUser_password(String user_password) {
		this.user_password = user_password;
	}
	public int getUser_level() {
		return user_level;
	}
	public void setUser_level(int user_level) {
		this.user_level = user_level;
	}
	@Override
	public String toString() {
		return "Suser [user_id=" + user_id + ", user_password=" + user_password + ", user_level=" + user_level + "]";
	}
	
	
}
