package cn.edu.scau.hlyz.dao;

import java.util.List;

import cn.edu.scau.hlyz.entity.Evaluation;

public interface EvaluationMapper {
	public List<Evaluation> findAllByDoctor(String dt_id,int start,int num);
	public int getAllEvaluationNum(String dt_id);
	public List<Evaluation> findUreadByDoctor(String dt_id,int start,int num);
	public int getUnreadEvaluationNum(String dt_id);
	public int addEvaluation(Evaluation evaluation);
	public int updateEvaluation(Evaluation evaluation);
	//获得具体某年某月的平均评分
    public List<Double> getAverageEvaluationScoreOfMonth(String dt_id,String year,String month);
}
