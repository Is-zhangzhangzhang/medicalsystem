package cn.edu.scau.hlyz.entity;

public class Illness {

	private String ill_id;
	private String ill_name;
	private String ill_symptom;
	private String ill_treatment;
	private Clinic clinic;
	public String getIll_id() {
		return ill_id;
	}
	public void setIll_id(String ill_id) {
		this.ill_id = ill_id;
	}
	public String getIll_name() {
		return ill_name;
	}
	public void setIll_name(String ill_name) {
		this.ill_name = ill_name;
	}
	public String getIll_symptom() {
		return ill_symptom;
	}
	public void setIll_symptom(String ill_symptom) {
		this.ill_symptom = ill_symptom;
	}
	public String getIll_treatment() {
		return ill_treatment;
	}
	public void setIll_treatment(String ill_treatment) {
		this.ill_treatment = ill_treatment;
	}
	public Clinic getClinic() {
		return clinic;
	}
	public void setClinic(Clinic clinic) {
		this.clinic = clinic;
	}
	@Override
	public String toString() {
		return "Illness [ill_id=" + ill_id + ", ill_name=" + ill_name + ", ill_symptom=" + ill_symptom
				+ ", ill_treatment=" + ill_treatment + ", clinic=" + clinic + "]";
	}
}

