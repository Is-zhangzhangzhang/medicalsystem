package cn.edu.scau.hlyz.entity;

import java.util.Date;

public class Evaluation {


	private String ev_id;
	private String ev_content;
	private Date ev_time;
	private String ev_status;
	private RegistrationForm rf;
	private Doctor doctor;
	private Patient patient;
	private double ev_score;
	public String getEv_id() {
		return ev_id;
	}
	public void setEv_id(String ev_id) {
		this.ev_id = ev_id;
	}
	public String getEv_content() {
		return ev_content;
	}
	public void setEv_content(String ev_content) {
		this.ev_content = ev_content;
	}
	public String getEv_status() {
		return ev_status;
	}
	public void setEv_status(String ev_status) {
		this.ev_status = ev_status;
	}
	public RegistrationForm getRf() {
		return rf;
	}
	public void setRf(RegistrationForm rf) {
		this.rf = rf;
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
	public Date getEv_time() {
		return ev_time;
	}
	public void setEv_time(Date ev_time) {
		this.ev_time = ev_time;
	}
	public double getEv_score() {
		return ev_score;
	}
	public void setEv_score(double ev_score) {
		this.ev_score = ev_score;
	}
	@Override
	public String toString() {
		return "Evaluation [ev_id=" + ev_id + ", ev_content=" + ev_content + ", ev_time=" + ev_time + ", ev_status="
				+ ev_status + ", rf=" + rf + ", doctor=" + doctor + ", patient=" + patient + ", ev_score=" + ev_score
				+ "]";
	}
	
	
	
}
