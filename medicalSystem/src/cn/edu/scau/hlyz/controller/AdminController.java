package cn.edu.scau.hlyz.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.AttributeOverride;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.edu.scau.hlyz.entity.Clinic;
import cn.edu.scau.hlyz.entity.Doctor;
import cn.edu.scau.hlyz.entity.Illness;
import cn.edu.scau.hlyz.entity.Medicine;
import cn.edu.scau.hlyz.entity.RegistrationForm;
import cn.edu.scau.hlyz.entity.Suser;
import cn.edu.scau.hlyz.jsonprocessor.JsonDateVauleProcessor;
import cn.edu.scau.hlyz.service.ClinicService;
import cn.edu.scau.hlyz.service.IllnessService;
import cn.edu.scau.hlyz.service.MedicineManageMentService;
import cn.edu.scau.hlyz.service.PhysicianInformationService;
import cn.edu.scau.hlyz.service.RegisteredService;
import cn.edu.scau.hlyz.service.TransactionalService;
import cn.edu.scau.hlyz.service.UserService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

@Controller
@RequestMapping(value = "/admin")
public class AdminController {

	@Autowired
	private MedicineManageMentService medicineService;
	@Autowired
	private PhysicianInformationService doctorService;
	@Autowired
	private ClinicService clinicService;
	@Autowired
	private IllnessService illnessService;
	@Autowired
	private UserService userService;
	@Autowired
	private RegisteredService registeredService;
	@Autowired
	private TransactionalService transactionalService;
	
	
	@ResponseBody
	@RequestMapping(value = "/allMedicine.do", produces = "application/json;charset=UTF-8")
	public String getAllMedicine(String callback, HttpServletRequest request)
			throws NumberFormatException, UnsupportedEncodingException {
		// 获取页数
		int page = Integer.parseInt(URLDecoder.decode(request.getParameter("page"), "UTF-8"));

		// 获取结果总数和对应页数的药品
		int num = medicineService.getFindAllCount();
		List<Medicine> medicineList = medicineService.findAll(page, 10);

		// 返回结果
		Map<String, Object> map = new HashMap<>();
		map.put("resultNum", num);
		map.put("medicineArray", medicineList);

		JSONObject resultJSON = JSONObject.fromObject(map);
		String result = callback + "(" + resultJSON.toString() + ")";
		return result;
	}

	@ResponseBody
	@RequestMapping(value = "/submitMedicine.do", produces = "application/json;charset=UTF-8")
	public String submitMedicine(String callback, HttpServletRequest request) throws UnsupportedEncodingException {
		// 获取药品信息
		Medicine md = new Medicine();
		md.setMd_id(URLDecoder.decode(request.getParameter("md_id"), "UTF-8"));
		md.setMd_name(URLDecoder.decode(request.getParameter("md_name"), "UTF-8"));
		md.setMd_is_prescription(URLDecoder.decode(request.getParameter("md_is_prescription"), "UTF-8"));
		md.setMd_price(Double.parseDouble(URLDecoder.decode(request.getParameter("md_price"), "UTF-8")));
		md.setMd_inventor(Integer.parseInt(URLDecoder.decode(request.getParameter("md_inventor"), "UTF-8")));
		md.setMd_details(URLDecoder.decode(request.getParameter("md_details"), "UTF-8"));

		// 添加药品
		int res = medicineService.addMedicine(md) ? 1 : 0;

		// 返回结果
		Map<String, Object> map = new HashMap<>();
		map.put("result", res);

		JSONObject resultJSON = JSONObject.fromObject(map);
		String result = callback + "(" + resultJSON.toString() + ")";
		return result;
	}

	@ResponseBody
	@RequestMapping(value = "/updateMedicine.do", produces = "application/json;charset=UTF-8")
	public String updateMedicine(String callback, HttpServletRequest request) throws UnsupportedEncodingException {
		// 获取药品信息
		Medicine md = new Medicine();
		md.setMd_id(URLDecoder.decode(request.getParameter("md_id"), "UTF-8"));
		md.setMd_name(URLDecoder.decode(request.getParameter("md_name"), "UTF-8"));
		md.setMd_is_prescription(URLDecoder.decode(request.getParameter("md_is_prescription"), "UTF-8"));
		md.setMd_price(Double.parseDouble(URLDecoder.decode(request.getParameter("md_price"), "UTF-8")));
		md.setMd_inventor(Integer.parseInt(URLDecoder.decode(request.getParameter("md_inventor"), "UTF-8")));
		md.setMd_details(URLDecoder.decode(request.getParameter("md_details"), "UTF-8"));

		// 修改药品
		int res = medicineService.updateMedicine(md) ? 1 : 0;

		// 返回结果
		Map<String, Object> map = new HashMap<>();
		map.put("result", res);

		JSONObject resultJSON = JSONObject.fromObject(map);
		String result = callback + "(" + resultJSON.toString() + ")";
		return result;
	}

	@ResponseBody
	@RequestMapping(value = "/allDoctor.do", produces = "application/json;charset=UTF-8")
	public String getAllDoctor(String callback, HttpServletRequest request)
			throws NumberFormatException, UnsupportedEncodingException {
		// 获取页数
		int page = Integer.parseInt(URLDecoder.decode(request.getParameter("page"), "UTF-8"));

		// 获取结果总数和对应页数的药品
		int num = doctorService.getFindAllCount();
		List<Doctor> doctorList = doctorService.findAll(page, 10);
		
		// 返回结果
		Map<String, Object> map = new HashMap<>();
		map.put("resultNum", num);
		map.put("doctorArray", doctorList);

		JSONObject resultJSON = JSONObject.fromObject(map);
		String result = callback + "(" + resultJSON.toString() + ")";
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value = "/department.do", produces = "application/json;charset=UTF-8")
	public String getDepartment(String callback){
		//获取所有诊室信息并提取出科室
		int num = clinicService.getFindAllClinicCount();
		List<Clinic> clincList = clinicService.findAllClinic(1, num);
		
		Set<String> deptSet = new HashSet<String>();
		for(Clinic c : clincList){
			deptSet.add(c.getCl_dept());
		}
		
		//返回结果
		JSONArray resultJSON = JSONArray.fromObject(deptSet);
		String result = callback + "(" + resultJSON.toString() + ")";
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value = "/part.do", produces = "application/json;charset=UTF-8")
	public String getPart(String callback, HttpServletRequest request) throws UnsupportedEncodingException{
		//获取科室
		String dept = URLDecoder.decode(request.getParameter("dept"), "UTF-8");
		
		//获取所有诊室信息并提取出诊室
		int num = clinicService.getFindAllClinicCount();
		List<Clinic> clincList = clinicService.findAllClinic(1, num);
		
		List<Map<String, String>> partList = new ArrayList<Map<String,String>>();
		for(Clinic c : clincList){
			if(c.getCl_dept().equals(dept)){
				Map<String, String> map = new HashMap<String, String>();
				map.put("cl_id", c.getCl_id());
				map.put("cl_part", c.getCl_part());
				partList.add(map);
			}
		}
		
		//返回结果
		JSONArray resultJSON = JSONArray.fromObject(partList);
		String result = callback + "(" + resultJSON.toString() + ")";
		return result;
	}

	@ResponseBody
	@RequestMapping(value = "/submitDoctor.do", produces = "application/json;charset=UTF-8")
	public String submitDoctor(String callback, HttpServletRequest request) throws UnsupportedEncodingException {
		// 获取医师信息
		Doctor dt = new Doctor();
		dt.setDt_id(URLDecoder.decode(request.getParameter("dt_id"), "UTF-8"));
		dt.setDt_name(URLDecoder.decode(request.getParameter("dt_name"), "UTF-8"));
		dt.setDt_sex(URLDecoder.decode(request.getParameter("dt_sex"), "UTF-8"));
		dt.setDt_tel(URLDecoder.decode(request.getParameter("dt_tel"), "UTF-8"));
		dt.setDt_title(URLDecoder.decode(request.getParameter("dt_title"), "UTF-8"));
		dt.setIntroduction(URLDecoder.decode(request.getParameter("introduction"), "UTF-8"));
		dt.setMoney(Double.parseDouble(URLDecoder.decode(request.getParameter("money"), "UTF-8")));
		Clinic clinic = new Clinic();
		clinic.setCl_id(URLDecoder.decode(request.getParameter("cl_id"), "UTF-8"));
		dt.setClinic(clinic);
		dt.setDt_image("inithead.jpg");
		
		Suser user = new Suser();
		user.setUser_id(dt.getDt_id());
		user.setUser_password("123456");
		user.setUser_level(1);
		
		// 添加医师
		int res= 0;
		try{
		res = transactionalService.addDoctor(dt, user);
		}catch(Exception e){
			
		}
		// 返回结果
		Map<String, Object> map = new HashMap<>();
		map.put("result", res);

		JSONObject resultJSON = JSONObject.fromObject(map);
		String result = callback + "(" + resultJSON.toString() + ")";
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value = "/updateDoctor.do", produces = "application/json;charset=UTF-8")
	public String updateDoctor(String callback, HttpServletRequest request) throws UnsupportedEncodingException {
		// 获取医师信息
		Suser user = new Suser();
		user.setUser_id(URLDecoder.decode(request.getParameter("dt_id"), "UTF-8"));
		Doctor dt = doctorService.findByUser(user);
		dt.setDt_name(URLDecoder.decode(request.getParameter("dt_name"), "UTF-8"));
		dt.setDt_sex(URLDecoder.decode(request.getParameter("dt_sex"), "UTF-8"));
		dt.setDt_tel(URLDecoder.decode(request.getParameter("dt_tel"), "UTF-8"));
		dt.setDt_title(URLDecoder.decode(request.getParameter("dt_title"), "UTF-8"));
		dt.setIntroduction(URLDecoder.decode(request.getParameter("introduction"), "UTF-8"));
		dt.setMoney(Double.parseDouble(URLDecoder.decode(request.getParameter("money"), "UTF-8")));
		Clinic clinic = new Clinic();
		clinic.setCl_id(URLDecoder.decode(request.getParameter("cl_id"), "UTF-8"));
		dt.setClinic(clinic);
		
		
		// 添加医师
		int res = doctorService.updateInformation(dt) ? 1 : 0;
		
		// 返回结果
		Map<String, Object> map = new HashMap<>();
		map.put("result", res);

		JSONObject resultJSON = JSONObject.fromObject(map);
		String result = callback + "(" + resultJSON.toString() + ")";
		return result;
	}

	@ResponseBody
	@RequestMapping(value="/allClinic.do", produces="application/json;charset=UTF-8")
	public String getAllClinic(String callback, HttpServletRequest request) throws NumberFormatException, UnsupportedEncodingException{
		//获取页数
		int page = Integer.parseInt(URLDecoder.decode(request.getParameter("page"), "UTF-8"));
		
		//获取对应页数的诊室信息
		int num = clinicService.getFindAllClinicCount();
		List<Clinic> clinicList = clinicService.findAllClinic(page, 10);
		
		//返回结果
		Map<String, Object> map = new HashMap<>();
		map.put("resultNum", num);
		map.put("clinicArray", clinicList);

		JSONObject resultJSON = JSONObject.fromObject(map);
		String result = callback + "(" + resultJSON.toString() + ")";
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value="/submitClinic.do", produces="application/json;charset=UTF-8")
	public String submitClinic(String callback, HttpServletRequest request) throws UnsupportedEncodingException {
		// 获取诊室信息
		Clinic clinic = new Clinic();
		clinic.setCl_id(URLDecoder.decode(request.getParameter("cl_id"), "UTF-8"));
		clinic.setCl_dept(URLDecoder.decode(request.getParameter("cl_dept"), "UTF-8"));
		clinic.setCl_part(URLDecoder.decode(request.getParameter("cl_part"), "UTF-8"));
		clinic.setCl_place(URLDecoder.decode(request.getParameter("cl_place"), "UTF-8"));
		
		// 添加诊室
		int res = clinicService.addClinic(clinic) ? 1 : 0;
		
		// 返回结果
		Map<String, Object> map = new HashMap<>();
		map.put("result", res);

		JSONObject resultJSON = JSONObject.fromObject(map);
		String result = callback + "(" + resultJSON.toString() + ")";
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value="/updateClinic.do", produces="application/json;charset=UTF-8")
	public String updateClinic(String callback, HttpServletRequest request) throws UnsupportedEncodingException {
		// 获取诊室信息
		Clinic clinic = new Clinic();
		clinic.setCl_id(URLDecoder.decode(request.getParameter("cl_id"), "UTF-8"));
		clinic.setCl_dept(URLDecoder.decode(request.getParameter("cl_dept"), "UTF-8"));
		clinic.setCl_part(URLDecoder.decode(request.getParameter("cl_part"), "UTF-8"));
		clinic.setCl_place(URLDecoder.decode(request.getParameter("cl_place"), "UTF-8"));
		
		// 修改诊室
		int res = clinicService.updateClinic(clinic) ? 1 : 0;
		
		// 返回结果
		Map<String, Object> map = new HashMap<>();
		map.put("result", res);

		JSONObject resultJSON = JSONObject.fromObject(map);
		String result = callback + "(" + resultJSON.toString() + ")";
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value="/allIllness.do", produces="application/json;charset=UTF-8")
	public String getAllIllness(String callback, HttpServletRequest request) throws NumberFormatException, UnsupportedEncodingException{
		//获取页数
		int page = Integer.parseInt(URLDecoder.decode(request.getParameter("page"), "UTF-8"));
		
		//获取对应页数的诊室信息
		int num = illnessService.getFindAllCount();
		List<Illness> illList = illnessService.findAll(page, 10);
		
		//返回结果
		Map<String, Object> map = new HashMap<>();
		map.put("resultNum", num);
		map.put("illnessArray", illList);

		JSONObject resultJSON = JSONObject.fromObject(map);
		String result = callback + "(" + resultJSON.toString() + ")";
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value="/clinic.do", produces="application/json;charset=UTF-8")
	public String getClinic(String callback){
		//获取诊室信息
		int num = clinicService.getFindAllClinicCount();
		List<Clinic> clinicList = clinicService.findAllClinic(1, num);
		
		//返回结果
		JSONArray resultJSON = JSONArray.fromObject(clinicList);
		String result = callback + "(" + resultJSON.toString() + ")";
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value="/submitIllness.do", produces="application/json;charset=UTF-8")
	public String submitIllness(String callback, HttpServletRequest request) throws UnsupportedEncodingException {
		// 获取疾病信息
		Illness illness = new Illness();
		illness.setIll_id(URLDecoder.decode(request.getParameter("ill_id"), "UTF-8"));
		illness.setIll_name(URLDecoder.decode(request.getParameter("ill_name"), "UTF-8"));
		illness.setIll_symptom(URLDecoder.decode(request.getParameter("ill_symptom"), "UTF-8"));
		illness.setIll_treatment(URLDecoder.decode(request.getParameter("ill_treatment"), "UTF-8"));
		
		Clinic clinic = new Clinic();
		clinic.setCl_id(URLDecoder.decode(request.getParameter("cl_id"), "UTF-8"));
		illness.setClinic(clinic);
		
		// 添加疾病
		int res = illnessService.addIllness(illness) ? 1 : 0;
		
		// 返回结果
		Map<String, Object> map = new HashMap<>();
		map.put("result", res);

		JSONObject resultJSON = JSONObject.fromObject(map);
		String result = callback + "(" + resultJSON.toString() + ")";
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value="/updateIllness.do", produces="application/json;charset=UTF-8")
	public String updateIllness(String callback, HttpServletRequest request) throws UnsupportedEncodingException {
		// 获取疾病信息
		Illness illness = new Illness();
		illness.setIll_id(URLDecoder.decode(request.getParameter("ill_id"), "UTF-8"));
		illness.setIll_name(URLDecoder.decode(request.getParameter("ill_name"), "UTF-8"));
		illness.setIll_symptom(URLDecoder.decode(request.getParameter("ill_symptom"), "UTF-8"));
		illness.setIll_treatment(URLDecoder.decode(request.getParameter("ill_treatment"), "UTF-8"));
		
		Clinic clinic = new Clinic();
		clinic.setCl_id(URLDecoder.decode(request.getParameter("cl_id"), "UTF-8"));
		illness.setClinic(clinic);
		
		// 修改疾病
		int res = illnessService.updateIllness(illness) ? 1 : 0;
		
		// 返回结果
		Map<String, Object> map = new HashMap<>();
		map.put("result", res);

		JSONObject resultJSON = JSONObject.fromObject(map);
		String result = callback + "(" + resultJSON.toString() + ")";
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value="/allRegistration.do", produces="application/json;charset=UTF-8")
	public String getAllRegistraion(String callback, HttpServletRequest request) throws NumberFormatException, UnsupportedEncodingException{
		//获取页数
		int page = Integer.parseInt(URLDecoder.decode(request.getParameter("page"), "UTF-8"));
		
		//获取挂号信息
		int num = registeredService.getFindAllCount();
		List<RegistrationForm> rfList = registeredService.findAll(page, 10);
		
		//返回结果
		Map<String, Object> map = new HashMap<>();
		map.put("resultNum", num);
		map.put("rfArray", rfList);
		
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerJsonValueProcessor(Date.class, new JsonDateVauleProcessor("yyyy-MM-dd HH:mm:ss"));
		JSONObject resultJSON = JSONObject.fromObject(map, jsonConfig);
		String result = callback + "(" + resultJSON.toString() + ")";
		return result;
	}
}
