package com.revature.controllers;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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

	@GetMapping("{id}")
	public User findById(@PathVariable int id) {
		return us.findOne(id);
	}

	@PostMapping
	public ResponseEntity<String> create(@RequestBody User u) {
		JSONObject createdUser = us.create(u);
		HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
		if (createdUser != null) {
			if (createdUser.has("user")) {
				status = HttpStatus.CREATED;
			} else if (createdUser.has("errors")) {
				if (createdUser.getJSONObject("errors").has("duplicate")) {
					status = HttpStatus.CONFLICT;
				} else {
					status = HttpStatus.BAD_REQUEST;
				}
			}
		}
		return new ResponseEntity<>(createdUser.toString(), status);
	}

	@PatchMapping("{id}")
	public ResponseEntity<User> update(@RequestBody User u) {
		User updatedUser = us.update(u);
		return new ResponseEntity<User>(updatedUser,
				updatedUser == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}

	@PostMapping("login")
	public ResponseEntity<User> login(@RequestBody Credential c) {
		User u = us.login(c.getUsername(), c.getPassword());
		return new ResponseEntity<User>(u, u == null ? HttpStatus.UNAUTHORIZED : HttpStatus.OK);
	}

}
