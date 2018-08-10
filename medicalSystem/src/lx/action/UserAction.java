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
		//��newһ��ModelAndView����
		ModelAndView mav=new ModelAndView();
		//�Լ�ֵ�ӵ���ʽ��ֵ   Ȼ���ö�����÷��� 
		
		List<User> list = user.findAll();
		
		mav.addObject("user",list);
		
		for(User u:list){
			System.out.println(u.getUid());
			System.out.println(u.getUname());
			
		}
		
		//Ҫ��ת��ҳ��
		mav.setViewName("list_user");
		//return������new�Ķ���
		return mav;
	}
	
	
	
	
	//����
	@RequestMapping(value="saveuser")
	public ModelAndView save(User u){
		user.save(u);
		return new ModelAndView("redirect:/user/showuser.do"); 
	}
	
	//ɾ��
	@RequestMapping(value="deleteuser")
	public ModelAndView delete(int id){
		user.delete(id);
		return new ModelAndView("redirect:/user/showuser.do");
	}
	
	//Ԥ�޸�
	@RequestMapping(value="preupdateuser")
	public ModelAndView preupdate(int id){
		ModelAndView mav=new ModelAndView();
		mav.addObject("user", user.findById(id));
		mav.setViewName("update_user");
		return mav;
	}
	
	//�޸�
	@RequestMapping(value="updateuser")
	public ModelAndView update(User u){
		user.update(u);
		return new ModelAndView("redirect:/user/showuser.do");
	}
	
}
