package lx.service;

import java.util.List;

import lx.entity.User;

public interface UserSerivce {
	//跟实体类 一样   只不过把 int 换成了 boolean
	public List<User> findAll();
	public boolean save(User u);
	public boolean delete(int id);
	public boolean update(User u);
	public User findById(int id);
}
