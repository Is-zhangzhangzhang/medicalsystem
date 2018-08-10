package lx.dao.impl;

import java.util.List;

import lx.dao.UserDao;
import lx.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
/**
 * 
 * @author 萌萌里的小高冷
 *	实体类
 */
public class UserDaoImpl implements UserDao{
	//注解（扫描  按类型装配）
	@Autowired
	//获取到对象
	private UserDao user;
	
	public List<User> findAll() {
		// TODO Auto-generated method stub
		//使用对象 . 方法(创建的接口方法)  以下同理  就不写了
		return user.findAll();
	}

	public int save(User u) {
		// TODO Auto-generated method stub
		return user.save(u);
	}

	public int delete(int id) {
		// TODO Auto-generated method stub
		return user.delete(id);
	}

	public int update(User u) {
		// TODO Auto-generated method stub
		return user.update(u);
	}

	public User findById(int id) {
		// TODO Auto-generated method stub
		return user.findById(id);
	}
	
}
