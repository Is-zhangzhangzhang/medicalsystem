package lx.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lx.dao.UserDao;
import lx.entity.User;
import lx.service.UserSerivce;

//用于标注业务层组件
@Service
public class UserServiceImpl implements UserSerivce{
	@Autowired
	private UserDao usi;

	public List<User> findAll() {
		// TODO Auto-generated method stub
		return usi.findAll();
	}

	public boolean save(User u) {
		// TODO Auto-generated method stub
		int a=usi.save(u);
		if(a==1){
			return true;
		}else{
			return false;
		}
	}

	public boolean delete(int id) {
		// TODO Auto-generated method stub
		int a=usi.delete(id);
		if(a==1){
			return true;
		}else{
			return false;
		}
	}

	public boolean update(User u) {
		// TODO Auto-generated method stub
		int a=usi.update(u);
		if(a==1){
			return true;
		}else{
			return false;
		}
	}

	public User findById(int id) {
		// TODO Auto-generated method stub
		return usi.findById(id);
	}
	
}
