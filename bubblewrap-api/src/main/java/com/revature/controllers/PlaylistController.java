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

import com.revature.models.Playlist;
import com.revature.services.PlaylistService;

@RestController
@RequestMapping("playlists")
public class PlaylistController {

	@Autowired
	private PlaylistService ps;

	@GetMapping
	public List<Playlist> findAll() {
		return ps.findAll();
	}

	@GetMapping("{id}")
	public Playlist findById(@PathVariable int id) {
		return ps.findOne(id);
	}

	@PostMapping
	public ResponseEntity<Playlist> save(@RequestBody Playlist p) {
		return new ResponseEntity<>(p, HttpStatus.CREATED);
	}

}
