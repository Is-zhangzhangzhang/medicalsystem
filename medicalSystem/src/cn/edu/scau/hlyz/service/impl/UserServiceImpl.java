package cn.edu.scau.hlyz.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cn.edu.scau.hlyz.dao.UserMapper;
import cn.edu.scau.hlyz.entity.Suser;
import cn.edu.scau.hlyz.service.UserService;
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper useri;
	@Override
	public Boolean register(Suser user) {
		//注册用户，把用户信息添加到数据库中
		// TODO Auto-generated method stub
		int a=useri.addUser(user);
		if(a==1){
			return true;
		}
		else{
			return false;
		}
	}

	@Override
	public Integer login(Suser user) {
		//用户登录，返回用户的权限等级
		//0:root 1:doctor 2:patient -1:密码错误 -2：账号错误
		// TODO Auto-generated method stub
		Suser u=useri.findById(user.getUser_id());
		if(u==null) return -2;
		if(u.getUser_password().equals(user.getUser_password())){
		return useri.findById(user.getUser_id()).getUser_level();
		}else{
			return -1;
		}
	}

	@Override
	public Boolean changePassword(Suser user) {
		// TODO Auto-generated method stub
		int a=useri.updateUser(user);
		if(a==1){
			return true;
		}
		else{
			return false;
		}
	}

	@Override
	public Boolean deleteUser(Suser user) {
		// TODO Auto-generated method stub
		int a=useri.deleteUser(user);
		if(a==1){
			return true;
		}
		else{
			return false;
		}
	}

}
