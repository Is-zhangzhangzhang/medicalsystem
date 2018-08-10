package cn.edu.scau.hlyz.entity;

public class Prescription {

	private Medicine medicine;
	private MedicalRecord mr;
	private int pr_num;
	public Medicine getMedicine() {
		return medicine;
	}
	public void setMedicine(Medicine medicine) {
		this.medicine = medicine;
	}
	public MedicalRecord getMr() {
		return mr;
	}
	public void setMr(MedicalRecord mr) {
		this.mr = mr;
	}
	public int getPr_num() {
		return pr_num;
	}
	public void setPr_num(int pr_num) {
		this.pr_num = pr_num;
	}
	@Override
	public String toString() {
		return "Prescription [medicine=" + medicine + ", mr=" + mr + ", pr_num=" + pr_num + "]";
	}
}
