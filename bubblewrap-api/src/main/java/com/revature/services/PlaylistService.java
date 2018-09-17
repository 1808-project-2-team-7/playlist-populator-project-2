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

import com.revature.models.Playlist;
import com.revature.models.User;
import com.revature.repos.PlaylistRepo;
import com.revature.repos.UserRepo;

@Service
public class PlaylistService {

	@Autowired
	private PlaylistRepo pr;

	@Autowired 
	private  UserService us;
	
	public List<Playlist> findAll() {
		return pr.findAll();
	}

	public Playlist findOne(int id) {
		return pr.getOne(id);
	}

	public JSONObject save(Playlist p) {
		try {
			JSONObject user = new JSONObject();
			user.put("playlist", pr.saveAndFlush(p));
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
	
	public Playlist update(int id,Playlist p) {
		if(pr.existsById(id)) {
		    System.out.println(p);
			p.setOwner(us.findOne(p.getOwner().getId()));
			return pr.saveAndFlush(p);
		}
		else {
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

	public boolean delete(int id) {
		if (pr.existsById(id)){
			pr.deleteById(id);
			return true;
		}
		else {
			return false;
		}
		
	}

	public List<Playlist> findByUserId(int id) {
		return pr.findByOwnerId(id);
	}
}
