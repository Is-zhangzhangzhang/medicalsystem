package cn.edu.scau.hlyz.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cn.edu.scau.hlyz.dao.MedicineMapper;
import cn.edu.scau.hlyz.entity.Medicine;
import cn.edu.scau.hlyz.service.MedicineManageMentService;
@Service
public class MedicineManagementServiceImpl implements MedicineManageMentService {
	private Logger logger = Logger.getLogger(MedicineManagementServiceImpl.class);
    @Autowired
    private MedicineMapper mei;
	@Override
	public Medicine findById(String id) {
		// TODO Auto-generated method stub
		logger.info("select medicine by id");
		return mei.findById(id);
	}

	@Override
	public Boolean addMedicine(Medicine medicine) {
		// TODO Auto-generated method stub
		int a=mei.save(medicine);
		if(a==1){
			logger.info("add medicine success");
			return true;
		}else{
			logger.error("add medicine fail");
			return false;
		}
	}

	@Override
	public Boolean updateMedicine(Medicine medicine) {
		// TODO Auto-generated method stub
		int a=mei.update(medicine);
		if(a==1){
			logger.info("update medicine success");
			return true;
		}else{
			logger.info("update medicine fail");
			return false;
		}
	}

	@Override
	public Boolean deleteMedicine(Medicine medicine) {
		// TODO Auto-generated method stub
		int a=mei.delete(medicine.getMd_id());
		if(a==1){
			logger.info("delete medicine success");
			return true;
		}else{
			logger.error("delete medicine fail");
			return false;
		}
	}

	@Override
	public List<Medicine> findAll(int page, int num) {
		// TODO Auto-generated method stub
		logger.info("select all medicine");
		return mei.findAll((page-1)*num, num);
	}

	@Override
	public Medicine findByName(String name) {
		// TODO Auto-generated method stub
		logger.info("select medicine by name");
		return mei.findByName(name);
	}

	@Override
	public int getFindAllCount() {
		// TODO Auto-generated method stub
		int num = mei.getFindAllCount();
		logger.info("select all medicine count: " + num);
		return num;
	}

}
