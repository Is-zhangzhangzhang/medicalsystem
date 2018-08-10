package cn.edu.scau.hlyz.entity;

import java.util.Set;

public class Doctor {

	private String dt_id;
	private String dt_name;
	private String dt_sex;
	private String dt_tel;
	private String dt_title;
	private String introduction;
	private double money;
	private String dt_image;
	private Clinic clinic;
	private Set<Advisory> adSet;
	private Set<RegistrationForm> rfSet;
	public String getDt_id() {
		return dt_id;
	}
	public void setDt_id(String dt_id) {
		this.dt_id = dt_id;
	}
	public String getDt_name() {
		return dt_name;
	}
	public void setDt_name(String dt_name) {
		this.dt_name = dt_name;
	}
	public String getDt_sex() {
		return dt_sex;
	}
	public void setDt_sex(String dt_sex) {
		this.dt_sex = dt_sex;
	}
	public String getDt_tel() {
		return dt_tel;
	}
	public void setDt_tel(String dt_tel) {
		this.dt_tel = dt_tel;
	}
	public String getDt_title() {
		return dt_title;
	}
	public void setDt_title(String dt_title) {
		this.dt_title = dt_title;
	}
	public String getIntroduction() {
		return introduction;
	}
	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}
	public double getMoney() {
		return money;
	}
	public void setMoney(double money) {
		this.money = money;
	}
	public String getDt_image() {
		return dt_image;
	}
	public void setDt_image(String dt_image) {
		this.dt_image = dt_image;
	}
	public Clinic getClinic() {
		return clinic;
	}
	public void setClinic(Clinic clinic) {
		this.clinic = clinic;
	}
	public Set<Advisory> getAdSet() {
		return adSet;
	}
	public void setAdSet(Set<Advisory> adSet) {
		this.adSet = adSet;
	}
	public Set<RegistrationForm> getRfSet() {
		return rfSet;
	}
	public void setRfSet(Set<RegistrationForm> rfSet) {
		this.rfSet = rfSet;
	}
	@Override
	public String toString() {
		return "Doctor [dt_id=" + dt_id + ", dt_name=" + dt_name + ", dt_sex=" + dt_sex + ", dt_tel=" + dt_tel
				+ ", dt_title=" + dt_title + ", introduction=" + introduction + ", money=" + money + ", dt_image="
				+ dt_image + ", clinic=" + clinic + ", adSet=" + adSet + ", rfSet=" + rfSet + "]";
	}
	
	

}
