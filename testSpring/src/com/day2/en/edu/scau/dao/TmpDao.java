package com.day2.en.edu.scau.dao;

import java.util.List;

import com.day2.en.edu.scau.bean.Tmp;

public interface TmpDao {
	void insert(String title);
	List<Tmp> findAll();
}
