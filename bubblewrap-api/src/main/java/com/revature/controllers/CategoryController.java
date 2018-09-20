package com.revature.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.Category;
import com.revature.services.CategoryService;

@RestController
@RequestMapping("categories")
public class CategoryController {

	@Autowired
	private CategoryService cs;

	@GetMapping
	public List<Category> findAll() {
		return cs.findAll();
	}

	@GetMapping("{id}")
	public Category findById(@PathVariable int id) {
		return cs.findOne(id);
	}

	@PostMapping
	public ResponseEntity<Category> save(@RequestBody Category c) {
		return new ResponseEntity<>(c, HttpStatus.CREATED);
	}

}
