package lx.action;

import lx.entity.User;
import lx.service.UserSerivce;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/user")
public class UserAction {
	@Autowired
	private UserSerivce user;
	
	@RequestMapping("/showuser")
	public ModelAndView find(){
		//先new一个ModelAndView对象
		ModelAndView mav=new ModelAndView();
		//以键值队的形式赋值   然后用对象调用方法 
		
		List<User> list = user.findAll();
		
		mav.addObject("user",list);
		
		for(User u:list){
			System.out.println(u.getUid());
			System.out.println(u.getUname());
			
		}
		
		//要跳转的页面
		mav.setViewName("list_user");
		//return出来你new的对象
		return mav;
	}
	
	
	
	
	//增加
	@RequestMapping(value="saveuser")
	public ModelAndView save(User u){
		user.save(u);
		return new ModelAndView("redirect:/user/showuser.do"); 
	}
	
	//删除
	@RequestMapping(value="deleteuser")
	public ModelAndView delete(int id){
		user.delete(id);
		return new ModelAndView("redirect:/user/showuser.do");
	}
	
	//预修改
	@RequestMapping(value="preupdateuser")
	public ModelAndView preupdate(int id){
		ModelAndView mav=new ModelAndView();
		mav.addObject("user", user.findById(id));
		mav.setViewName("update_user");
		return mav;
	}
	
	//修改
	@RequestMapping(value="updateuser")
	public ModelAndView update(User u){
		user.update(u);
		return new ModelAndView("redirect:/user/showuser.do");
	}
	
}
