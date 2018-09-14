package com.revature.controllers;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	public ResponseEntity<User> findById(@PathVariable int id) {
		User u = us.findOne(id);
		return new ResponseEntity<>(u, u == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<String> create(@RequestBody User u) {
		return save(u);
	}

	@PutMapping("{id}")
	public ResponseEntity<String> update(@RequestBody User u, @PathVariable int id) {
		u.setId(id);
		return save(u);
	}

	private ResponseEntity<String> save(User u) {
		JSONObject createdUser = us.save(u);
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

	@PostMapping("login")
	public ResponseEntity<User> login(@RequestBody Credential c) {
		User u = us.login(c.getUsername(), c.getPassword());
		return new ResponseEntity<User>(u, u == null ? HttpStatus.UNAUTHORIZED : HttpStatus.OK);
	}

}
