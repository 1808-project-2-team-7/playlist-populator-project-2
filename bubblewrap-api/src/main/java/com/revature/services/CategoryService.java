package com.revature.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.models.Category;
import com.revature.repos.CategoryRepo;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepo cr;

	public List<Category> findAll() {
		return cr.findAll();
	}

	public Category findOne(int id) {
		return cr.getOne(id);
	}
}
