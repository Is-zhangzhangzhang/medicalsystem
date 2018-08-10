package cn.edu.scau.hlyz.entity;

import java.util.Set;

public class Clinic {

	private String cl_id;
	private String cl_dept;
	private String cl_part;
	private String cl_place;
	private Set<Doctor> dcSet;
	public String getCl_id() {
		return cl_id;
	}
	public void setCl_id(String cl_id) {
		this.cl_id = cl_id;
	}
	public String getCl_dept() {
		return cl_dept;
	}
	public void setCl_dept(String cl_dept) {
		this.cl_dept = cl_dept;
	}
	public String getCl_part() {
		return cl_part;
	}
	public void setCl_part(String cl_depart) {
		this.cl_part = cl_depart;
	}
	public String getCl_place() {
		return cl_place;
	}
	public void setCl_place(String cl_place) {
		this.cl_place = cl_place;
	}
	public Set<Doctor> getDcSet() {
		return dcSet;
	}
	public void setDcSet(Set<Doctor> dcSet) {
		this.dcSet = dcSet;
	}
	@Override
	public String toString() {
		return "Clinic [cl_id=" + cl_id + ", cl_dept=" + cl_dept + ", cl_part=" + cl_part + ", cl_place=" + cl_place
				+ ", dcSet=" + dcSet + "]";
	}
	
	
}
