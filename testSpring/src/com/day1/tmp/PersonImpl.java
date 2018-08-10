package com.day1.tmp;

import java.util.List;

import org.springframework.stereotype.Repository;
@Repository("personDao")
public class PersonImpl implements PersonDAO {

	@Override
	public void save(Person p) {
		// TODO Auto-generated method stub
		System.out.println("save");
	}

	@Override
	public void delete(Person p) {
		// TODO Auto-generated method stub

	}

	@Override
	public void update(Person p) {
		// TODO Auto-generated method stub

	}

	@Override
	public Person findById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Person> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

}
