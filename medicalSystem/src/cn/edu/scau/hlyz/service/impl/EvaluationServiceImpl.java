package cn.edu.scau.hlyz.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cn.edu.scau.hlyz.dao.EvaluationMapper;
import cn.edu.scau.hlyz.entity.Evaluation;
import cn.edu.scau.hlyz.service.EvaluationService;
@Service
public class EvaluationServiceImpl implements EvaluationService {
    @Autowired
    private EvaluationMapper evi;
	@Override
	public Boolean addEvaluation(Evaluation evaluation) {
		// TODO Auto-generated method stub
    	int a=evi.addEvaluation(evaluation);
		if(a==1){
			return true;
		}else{
			return false;
		}
	}

	@Override
	public List<Evaluation> findUnreadEvaluation(String doctorId, int page, int num) {
		// TODO Auto-generated method stub
		return evi.findUreadByDoctor(doctorId, (page-1)*num, num);
	}

	@Override
	public List<Evaluation> findAllEvaluationOfDoctor(String doctorId, int page, int num) {
		// TODO Auto-generated method stub
		return evi.findAllByDoctor(doctorId, (page-1)*num, num);
	}

	@Override
	public int getFindUnreadEvaluationCount(String doctorId) {
		// TODO Auto-generated method stub
		int num = evi.getUnreadEvaluationNum(doctorId);
		return num;
	}

	@Override
	public int getFindAllEvaluationOfDoctorCount(String doctorId) {
		// TODO Auto-generated method stub
		int num = evi.getAllEvaluationNum(doctorId);
		return num;
	}

	@Override
	public List<Double> getDoctorCurrentTimeEvaluationScore(String doctorId, String year, String month) {
		// TODO Auto-generated method stub
		return evi.getAverageEvaluationScoreOfMonth(doctorId, year, month);
	}

	@Override
	public Boolean setReadEvaluation(String doctorId) {
		// TODO Auto-generated method stub
		int num=evi.getUnreadEvaluationNum(doctorId);
		if(num==0) return true;
		List<Evaluation> evList=evi.findUreadByDoctor(doctorId, 0, num);
		int count=0;
		for(Evaluation e:evList){
			e.setEv_status("read");
			count=count+evi.updateEvaluation(e);
		}
		if(count>0) return true;
		else return false;
	}

}
