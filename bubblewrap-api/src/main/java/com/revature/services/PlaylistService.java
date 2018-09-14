package com.revature.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.models.Playlist;
import com.revature.repos.PlaylistRepo;

@Service
public class PlaylistService {

	@Autowired
	private PlaylistRepo pr;

	public List<Playlist> findAll() {
		return pr.findAll();
	}

	public Playlist findOne(int id) {
		return pr.getOne(id);
	}
}
