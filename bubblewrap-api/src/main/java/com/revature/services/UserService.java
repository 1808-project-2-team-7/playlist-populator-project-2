package com.revature.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.revature.models.User;
import com.revature.repos.UserRepo;

@Service
public class UserService {

	@Autowired
	private UserRepo ur;

	public List<User> findAll() {
		return ur.findAll();
	}

	@Transactional
	public User findOne(int id) {
		return ur.getOne(id);
	}

	public User login(String username, String password) {
		User u = ur.findByUsernameAndPassword(username, password);
		return u;
	}
}
