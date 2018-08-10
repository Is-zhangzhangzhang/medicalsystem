package com.day2.en.edu.scau.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.day2.en.edu.scau.bean.Tmp;
import com.day2.en.edu.scau.dao.TmpDao;

public class TmpDaoImpl implements TmpDao {
	private JdbcTemplate jdbcTemplate;
	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	@Override
	public void insert(String title) {
		// TODO Auto-generated method stub
		String sql = "insert into tmp(title) values ('" + title + "');";
		this.jdbcTemplate.execute(sql);
	}

	@Override
	public List<Tmp> findAll() {
		// TODO Auto-generated method stub
		List<Tmp> rows = this.jdbcTemplate.query("select * from tmp;", 
				new RowMapper<Tmp>(){

					@Override
					public Tmp mapRow(ResultSet arg0, int arg1) throws SQLException {
						// TODO Auto-generated method stub
						Tmp tmp = new Tmp();
						tmp.setNumber(arg0.getInt("number"));
						tmp.setTitle("title");
						return tmp;
					}
			
		});
		return rows;
	}

}
