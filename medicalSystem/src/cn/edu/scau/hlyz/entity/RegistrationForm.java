package cn.edu.scau.hlyz.entity;

import java.util.Date;

public class RegistrationForm {

	private String rf_id;
	private Doctor doctor;
	private Patient patient;
	private Date rf_time;
	private String rf_status;
	private Evaluation evaluation;
	public String getRf_id() {
		return rf_id;
	}
	public void setRf_id(String rf_id) {
		this.rf_id = rf_id;
	}
	public Doctor getDoctor() {
		return doctor;
	}
	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}
	public Patient getPatient() {
		return patient;
	}
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	public Date getRf_time() {
		return rf_time;
	}
	public void setRf_time(Date rf_time) {
		this.rf_time = rf_time;
	}
	public String getRf_status() {
		return rf_status;
	}
	public void setRf_status(String rf_status) {
		this.rf_status = rf_status;
	}
	public Evaluation getEvaluation() {
		return evaluation;
	}
	public void setEvaluation(Evaluation evaluation) {
		this.evaluation = evaluation;
	}
	@Override
	public String toString() {
		return "RegistrationForm [rf_id=" + rf_id + ", doctor=" + doctor + ", patient=" + patient + ", rf_time="
				+ rf_time + ", rf_status=" + rf_status + ", evaluation=" + evaluation + "]";
	}
	
    
	
}
