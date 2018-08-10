package cn.edu.scau.hlyz.service;

import cn.edu.scau.hlyz.entity.Suser;

public interface UserService {
	Boolean register(Suser user);
	Integer login(Suser user);
	Boolean changePassword(Suser user);
	Boolean deleteUser(Suser user);
}
