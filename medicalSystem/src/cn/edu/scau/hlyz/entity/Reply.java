package cn.edu.scau.hlyz.entity;

import java.util.Date;

public class Reply {

	private String re_id;
	private Suser respondent;
	private Advisory re_Consultaion;
	private String re_content;
	private String re_status;
	private Date re_time;
	public String getRe_id() {
		return re_id;
	}
	public void setRe_id(String re_id) {
		this.re_id = re_id;
	}
	public Suser getRespondent() {
		return respondent;
	}
	public void setRespondent(Suser respondent) {
		this.respondent = respondent;
	}
	public Advisory getRe_Consultaion() {
		return re_Consultaion;
	}
	public void setRe_Consultaion(Advisory re_Consultaion) {
		this.re_Consultaion = re_Consultaion;
	}
	public String getRe_content() {
		return re_content;
	}
	public void setRe_content(String re_content) {
		this.re_content = re_content;
	}
	public String getRe_status() {
		return re_status;
	}
	public void setRe_status(String re_status) {
		this.re_status = re_status;
	}
	public Date getRe_time() {
		return re_time;
	}
	public void setRe_time(Date re_time) {
		this.re_time = re_time;
	}
	@Override
	public String toString() {
		return "Reply [re_id=" + re_id + ", respondent=" + respondent + ", re_Consultaion=" + re_Consultaion
				+ ", re_content=" + re_content + ", re_status=" + re_status + ", re_time=" + re_time + "]";
	}
	
}
