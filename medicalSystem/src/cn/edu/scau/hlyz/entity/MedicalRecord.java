package cn.edu.scau.hlyz.entity;

import java.util.Date;
import java.util.Set;

public class MedicalRecord {

	private String mr_id;
	private Patient patient;
	private Doctor doctor;
	private Illness illness;
	private Date mr_time;
	private int mr_taken_times;
	private int mr_taken_days;
	private double mr_score;
	private Set<Prescription> prstSet;
	public String getMr_id() {
		return mr_id;
	}
	public void setMr_id(String mr_id) {
		this.mr_id = mr_id;
	}
	public Patient getPatient() {
		return patient;
	}
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
	public Doctor getDoctor() {
		return doctor;
	}
	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}
	public Illness getIllness() {
		return illness;
	}
	public void setIllness(Illness illness) {
		this.illness = illness;
	}
	public Date getMr_time() {
		return mr_time;
	}
	public void setMr_time(Date mr_time) {
		this.mr_time = mr_time;
	}
	public int getMr_taken_times() {
		return mr_taken_times;
	}
	public void setMr_taken_times(int mr_taken_times) {
		this.mr_taken_times = mr_taken_times;
	}
	public int getMr_taken_days() {
		return mr_taken_days;
	}
	public void setMr_taken_days(int mr_taken_days) {
		this.mr_taken_days = mr_taken_days;
	}
	public double getMr_score() {
		return mr_score;
	}
	public void setMr_score(double mr_score) {
		this.mr_score = mr_score;
	}
	public Set<Prescription> getPrstSet() {
		return prstSet;
	}
	public void setPrstSet(Set<Prescription> prstSet) {
		this.prstSet = prstSet;
	}
	@Override
	public String toString() {
		return "MedicalRecord [mr_id=" + mr_id + ", patient=" + patient + ", doctor=" + doctor + ", illness=" + illness
				+ ", mr_time=" + mr_time + ", mr_taken_times=" + mr_taken_times + ", mr_taken_days=" + mr_taken_days
				+ ", mr_score=" + mr_score + ", prstSet=" + prstSet + "]";
	}
}
