package com.day1.bean;

import java.util.List;
import java.util.Map;

public class SomeBean {
	private String[] myArray;
	private List<String> myList;
	private Map<String, String> myMap;
	public String[] getMyArray() {
		return myArray;
	}
	public void setMyArray(String[] myArray) {
		this.myArray = myArray;
	}
	public List<String> getMyList() {
		return myList;
	}
	public void setMyList(List<String> myList) {
		this.myList = myList;
	}
	public Map<String, String> getMyMap() {
		return myMap;
	}
	public void setMyMap(Map<String, String> myMap) {
		this.myMap = myMap;
	}
}
