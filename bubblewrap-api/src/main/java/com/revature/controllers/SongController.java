package com.revature.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.Song;
import com.revature.services.SongService;

@RestController
@RequestMapping("songs")
public class SongController {

	@Autowired
	private SongService ss;

	@GetMapping
	public List<Song> findAll() {
		return ss.findAll();
	}

	@GetMapping("{id}")
	public Song findById(@PathVariable int id) {
		return ss.findOne(id);
	}
	
	@GetMapping("find")
	public List<Song> findByNameAndArtist(@RequestBody Song s){
		return ss.findByNameAndArtist(s.getTrackName(),s.getArtistName());
		
	}

	@PostMapping
	public ResponseEntity<Song> save(@RequestBody Song s) {
		return new ResponseEntity<Song>(s, HttpStatus.CREATED);
	}
	
	@GetMapping("{id}/popular")
	public List<Song> findTest(@PathVariable int id, Pageable pageable) {
		return ss.findMostPopularCommonSongs(id, pageable);
	}
	
	@GetMapping("{id}/popular/{category_id}")
	public List<Song> findTest(@PathVariable int id, @PathVariable int category_id, Pageable pageable) {
		return ss.findMostPopularCommonSongs(id, category_id, pageable);
	}

}
