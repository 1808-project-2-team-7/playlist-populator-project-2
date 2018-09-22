package com.revature.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	public List<Playlist> findAll(Pageable pageable) {
		return ps.findAll(pageable).getContent();
	}

	@GetMapping("{id}")
	public Playlist findById(@PathVariable int id) {
		return ps.findOne(id);
	}
	
	@GetMapping("user/{id}")
	public List<Playlist> findByUserId(@PathVariable int id, Pageable pageable){
		return ps.findByUserId(id, pageable);
	}
	
	@PostMapping
	public ResponseEntity<Playlist> save(@RequestBody Playlist p) {
		Playlist returnP = ps.save(p);
		return new ResponseEntity<>(returnP, HttpStatus.CREATED);
	}
	//Can return null on failure, check to see if other errors are possiblity
	@PutMapping("{id}/update")
	public Playlist update(@PathVariable int id,@RequestBody Playlist p) {
		
		return ps.update(id, p);
		
	}
	
	//Probably should have some security
	@DeleteMapping("/delete/{id}")
	public boolean delete(@PathVariable int id) {
		return ps.delete(id);
	}

}
