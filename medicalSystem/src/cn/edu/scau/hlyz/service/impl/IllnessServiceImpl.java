package cn.edu.scau.hlyz.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cn.edu.scau.hlyz.dao.IllnessMapper;
import cn.edu.scau.hlyz.entity.Illness;
import cn.edu.scau.hlyz.service.IllnessService;
@Service
public class IllnessServiceImpl implements IllnessService {
	Logger logger = Logger.getLogger(IllnessServiceImpl.class);
    @Autowired
	private IllnessMapper illi;
	
	public Illness findById(String id) {
		// TODO Auto-generated method stub
		logger.info("select illness by id");
		return illi.findById(id);
	}

	
	public List<Illness> findAll(int page, int num) {
		// TODO Auto-generated method stub
		logger.info("select all illness");
		return illi.findAll((page-1)*num, num);
	}

	
	public Boolean addIllness(Illness illness) {
		// TODO Auto-generated method stub
		int a=illi.save(illness);
	    if(a==1){
	    	logger.info("add illness success");
	    	return true;
	    }
	    else{
	    	logger.error("add illness fail");
	    	return false;
	    }
	}

	
	public Boolean updateIllness(Illness illness) {
		// TODO Auto-generated method stub
		int a=illi.update(illness);
	    if(a==1){
	    	logger.info("update illness success");
	    	return true;
	    }
	    else{
	    	logger.info("update illness fail");
	    	return false;
	    }
	}

	
	public List<Illness> findByName(String name) {
		// TODO Auto-generated method stub
		logger.info("select illness by name");
		return illi.findByName(name);
	}


	@Override
	public int getFindAllCount() {
		// TODO Auto-generated method stub
		int num = illi.getFindAllCount();
		logger.info("select all illness count: " + num);
		return num;
	}

}
