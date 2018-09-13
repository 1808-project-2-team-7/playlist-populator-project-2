package com.revature.controllers;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.dto.Credential;
import com.revature.models.User;
import com.revature.services.UserService;

@RestController
@RequestMapping("users")
public class UserController {

	@Autowired
	private UserService us;

	@GetMapping
	public List<User> findAll() {
		return us.findAll();
	}

	@Transactional
	@GetMapping("{id}")
	public User findById(@PathVariable int id) {
		return us.findOne(id);
	}

	@PostMapping
	public ResponseEntity<User> save(@RequestBody User u) {
		return new ResponseEntity<User>(u, HttpStatus.CREATED);
	}

	@PostMapping("login")
	public ResponseEntity<User> login(@RequestBody Credential c) {
		User u = us.login(c.getUsername(), c.getPassword());
		return new ResponseEntity<User>(u, u == null ? HttpStatus.UNAUTHORIZED : HttpStatus.OK);
	}

}
