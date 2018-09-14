package com.revature.services;

import java.util.List;
import java.util.regex.Pattern;

import javax.validation.ConstraintViolationException;

import org.json.JSONArray;
import org.json.JSONObject;
import org.postgresql.util.PSQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionSystemException;

import com.revature.models.User;
import com.revature.repos.UserRepo;

@Service
public class UserService {

	@Autowired
	private UserRepo ur;

	public List<User> findAll() {
		return ur.findAll();
	}

	public User findOne(int id) {
		return ur.existsById(id) ? ur.getOne(id) : null;
	}

	public JSONObject save(User u) {
		try {
			JSONObject user = new JSONObject();
			user.put("user", ur.saveAndFlush(u));
			return user;
		} catch (ConstraintViolationException t) {
			return getConstraintErrors(t);
		} catch (TransactionSystemException e) {
			Throwable t = e.getCause();
			while ((t != null) && !(t instanceof ConstraintViolationException)) {
				t = t.getCause();
			}
			if (t instanceof ConstraintViolationException) {
				return getConstraintErrors((ConstraintViolationException) t);
			}
			return null;
		} catch (DataIntegrityViolationException e) {
			Throwable t = e.getCause();
			while ((t != null) && !(t instanceof PSQLException)) {
				t = t.getCause();
			}
			if (t instanceof PSQLException) {
				JSONObject errors = new JSONObject();
				JSONObject specificErrors = new JSONObject();
				String errorMessage = t.getMessage();
				if (errorMessage.startsWith("ERROR: duplicate key value violates unique constraint")) {
					errors.put("errors", specificErrors);
					specificErrors.put("duplicate",
							errorMessage.split(Pattern.quote("Key ("))[1].split(Pattern.quote(")=("))[0]);
				}
				return errors;
			}
			return null;
		}
	}

	private JSONObject getConstraintErrors(ConstraintViolationException t) {
		JSONObject errors = new JSONObject();
		JSONObject specificErrors = new JSONObject();
		errors.put("errors", specificErrors);
		((ConstraintViolationException) t).getConstraintViolations().forEach(constraint -> {
			String errorType = constraint.getMessage();
			String errorColumn = constraint.getPropertyPath().toString();
			if (specificErrors.has(errorType)) {
				specificErrors.getJSONArray(errorType).put(errorColumn);
			} else {
				JSONArray newErrorType = new JSONArray();
				newErrorType.put(errorColumn);
				specificErrors.put(errorType, newErrorType);
			}
		});
		return errors;
	}

	public User login(String username, String password) {
		User u = ur.findByUsernameAndPassword(username, password);
		return u;
	}
}
