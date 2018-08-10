package cn.edu.scau.hlyz.service;

import java.util.List;

import cn.edu.scau.hlyz.entity.Evaluation;

public interface EvaluationService {
	Boolean addEvaluation(Evaluation evaluation);
	int getFindUnreadEvaluationCount(String doctorId);
	int getFindAllEvaluationOfDoctorCount(String doctorId);
	List<Evaluation> findUnreadEvaluation(String doctorId, int page , int num);
	List<Evaluation> findAllEvaluationOfDoctor(String doctorId, int page , int num);
	List<Double> getDoctorCurrentTimeEvaluationScore(String doctorId,String year,String month);
	Boolean setReadEvaluation(String doctorId);
}
