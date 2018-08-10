package cn.edu.scau.hlyz.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.swing.text.DateFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import cn.edu.scau.hlyz.entity.Patient;
import cn.edu.scau.hlyz.entity.Suser;
import cn.edu.scau.hlyz.service.TransactionalService;
import cn.edu.scau.hlyz.service.UserService;
import cn.edu.scau.hlyz.service.impl.IdGeneratorServiceImpl;
import cn.edu.scau.hlyz.service.impl.PatientInformationServiceImpl;
import cn.edu.scau.hlyz.service.impl.UserServiceImpl;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value="/user")
public class UserController {
		@Autowired
		private UserServiceImpl userService;
		@Autowired
		private PatientInformationServiceImpl patientService;
		@Autowired
		private IdGeneratorServiceImpl IdGeneratorService;
		@Autowired
		private TransactionalService transactionalService;
		
		@InitBinder
	    public void initBinder(WebDataBinder binder){
	        //日期处理
	        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	        df.setLenient(false);
	        binder.registerCustomEditor(Date.class, new CustomDateEditor(df, true));
	    }
		@ResponseBody
		@RequestMapping(value="/login.do" ,produces="application/json;charset=UTF-8")
		public String login(String callback) throws UnsupportedEncodingException{
			//0:root 1:doctor 2:patient -1:密码错误 -2：账号错误
			String result=null;
				Map<String,String> map=new HashMap<String,String>();
				HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();	
			    Suser user=new Suser();
				user.setUser_id(URLDecoder.decode(request.getParameter("user_id"),"UTF-8"));
	            user.setUser_password(URLDecoder.decode(request.getParameter("user_password"),"UTF-8"));
	            String userId=user.getUser_id();
			    if(userId.length()==11){
			    	String patientId=patientService.getPatientID(userId);
			    	if(patientId==null){
			    		result="-2";
			    	}
			    	else user.setUser_id(patientService.getPatientID(userId));
			    }
				result=userService.login(user).toString();
				map.put("result", result);
				JSONObject resultJSON = JSONObject.fromObject(map); //将Java代码转Json
				String res=callback+"("+resultJSON.toString()+")";
				return res;
			}
		@ResponseBody
		@RequestMapping(value="/register.do",produces="application/json;charset=UTF-8")
		public String register(String callback){
			Map<String,String> map=new HashMap<String,String>();
			JSONObject jsonObject=new JSONObject();
			String result=IdGeneratorService.patientIdGenertor();
			map.put("result", result);
			JSONObject resultJSON = JSONObject.fromObject(map); //将Java代码转Json
			String res=callback+"("+resultJSON.toString()+")";
			return res;
			}

		@ResponseBody
		@RequestMapping(value="/registerSubmit.do",produces="application/json;charset=UTF-8")
		public String registerSubmit(String callback) throws Exception {
			
			
			Map<String,String> map=new HashMap<String,String>();
			HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();	
			Suser user=new Suser();
			user.setUser_id(URLDecoder.decode(request.getParameter("user_id"),"UTF-8"));
            user.setUser_password(URLDecoder.decode(request.getParameter("user_password"),"UTF-8"));
            user.setUser_level(2);
            Patient patient=new Patient();
            patient.setPt_id(URLDecoder.decode(request.getParameter("pt_id"),"UTF-8"));
            patient.setPt_name(URLDecoder.decode(request.getParameter("pt_name"),"UTF-8"));
            patient.setIDCardNumber(URLDecoder.decode(request.getParameter("IDCardNumber"),"UTF-8"));
            patient.setPt_sex(URLDecoder.decode(request.getParameter("pt_sex"),"UTF-8"));
            patient.setPt_tel(URLDecoder.decode(request.getParameter("pt_tel"),"UTF-8"));
            patient.setPt_image(null);
			//System.out.println(URLDecoder.decode(request.getParameter("born"),"UTF-8"));
            //将String时间转为Date
			 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			    Date utilDate = sdf.parse(request.getParameter("born"));
			patient.setBorn(utilDate);
			String result=null;
			if(patientService.checkPatientIDCardNum(patient.getIDCardNumber())){
				int res= 0;
				try{
				res = transactionalService.addPatient(patient, user);
				}catch(Exception e){
					
				}
				if(res==1){
						result="1";//注册成功
				}else result="-1";//数据存储失败
				
			}else{
				result="2";//身份证号存在
			}
			map.put("result", result);

			JSONObject resultJSON = JSONObject.fromObject(map); //将Java代码转Json
			String res=callback+"("+resultJSON.toString()+")";
//			System.out.println(res);
			return res;
		}

}
