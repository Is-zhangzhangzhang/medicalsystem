package cn.edu.scau.hlyz.entity;

public class ConsumptionOrder {

	private String co_id;
	private MedicalRecord mr;
	private double co_price;
	private String co_status;
	public String getCo_id() {
		return co_id;
	}
	public void setCo_id(String co_id) {
		this.co_id = co_id;
	}
	public MedicalRecord getMr() {
		return mr;
	}
	public void setMr(MedicalRecord mr) {
		this.mr = mr;
	}
	public double getCo_price() {
		return co_price;
	}
	public void setCo_price(double co_price) {
		this.co_price = co_price;
	}
	public String getCo_status() {
		return co_status;
	}
	public void setCo_status(String co_status) {
		this.co_status = co_status;
	}
	@Override
	public String toString() {
		return "ConsumptionOrder [co_id=" + co_id + ", mr=" + mr + ", co_price=" + co_price
				+ ", co_status=" + co_status + "]";
	}
	
}
