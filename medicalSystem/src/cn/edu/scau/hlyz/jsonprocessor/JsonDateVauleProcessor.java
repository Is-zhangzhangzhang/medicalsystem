package cn.edu.scau.hlyz.jsonprocessor;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

public class JsonDateVauleProcessor implements JsonValueProcessor {

	private String format = "yyyy-MM-dd";
	public JsonDateVauleProcessor() {
		// TODO Auto-generated constructor stub
	}
	
	
	
	public JsonDateVauleProcessor(String format) {
		this.format = format;
	}


	@Override
	public Object processArrayValue(Object arg0, JsonConfig arg1) {
		// TODO Auto-generated method stub
		String[] obj = {};
		if(arg0 instanceof Date[]){
			SimpleDateFormat sf = new SimpleDateFormat(format);
			Date[] dates = (Date[]) arg0;
			obj = new String[dates.length];
			for(int i = 0; i < dates.length; i++){
				obj[i] = sf.format(dates[i]);
			}
		}
		return obj;
	}

	@Override
	public Object processObjectValue(String arg0, Object arg1, JsonConfig arg2) {
		// TODO Auto-generated method stub
		if(arg1 instanceof java.util.Date){
			String str = new SimpleDateFormat(format).format((Date)arg1);
			return str;
		}
		if(arg1 != null){
			return arg1.toString();
		}
		return "";
		
	}

}
