package cn.edu.scau.hlyz.entity;

public class Medicine {

	private String md_id;
	private String md_name;
	private String md_is_prescription;
	private double md_price;
	private int md_inventor;
	private String md_details;
	public String getMd_id() {
		return md_id;
	}
	public void setMd_id(String md_id) {
		this.md_id = md_id;
	}
	public String getMd_name() {
		return md_name;
	}
	public void setMd_name(String md_name) {
		this.md_name = md_name;
	}
	public String getMd_is_prescription() {
		return md_is_prescription;
	}
	public void setMd_is_prescription(String md_is_prescription) {
		this.md_is_prescription = md_is_prescription;
	}
	public double getMd_price() {
		return md_price;
	}
	public void setMd_price(double md_price) {
		this.md_price = md_price;
	}
	public int getMd_inventor() {
		return md_inventor;
	}
	public void setMd_inventor(int md_inventor) {
		this.md_inventor = md_inventor;
	}
	public String getMd_details() {
		return md_details;
	}
	public void setMd_details(String md_details) {
		this.md_details = md_details;
	}
	@Override
	public String toString() {
		return "Medicine [md_id=" + md_id + ", md_name=" + md_name + ", md_is_prescription=" + md_is_prescription
				+ ", md_price=" + md_price + ", md_inventor=" + md_inventor + ", md_details=" + md_details + "]";
	}
	
}
