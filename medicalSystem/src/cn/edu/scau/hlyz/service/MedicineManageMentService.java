package cn.edu.scau.hlyz.service;

import java.util.List;

import cn.edu.scau.hlyz.entity.Medicine;

public interface MedicineManageMentService {
	Medicine findById(String id);
	Boolean addMedicine(Medicine medicine);
	Boolean updateMedicine(Medicine medicine);
	Boolean deleteMedicine(Medicine medicine);
	int getFindAllCount();
	List<Medicine> findAll(int page , int num);
	Medicine findByName(String name);
}
