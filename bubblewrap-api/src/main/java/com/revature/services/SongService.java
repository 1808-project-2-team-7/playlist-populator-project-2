package com.revature.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.models.Song;
import com.revature.repos.SongRepo;

@Service
public class SongService {

	@Autowired
	private SongRepo sr;

	public List<Song> findAll() {
		return sr.findAll();
	}

	public Song findOne(int id) {
		return sr.getOne(id);
	}

	public List<Song> findMostPopularCommonSongs(int song_id, int limit) {
		return sr.findMostPopularCommonSongs(song_id, limit);
	}
	
	public List<Song> findMostPopularCommonSongs(int song_id, int category_id, int limit) {
		return sr.findMostPopularCommonSongs(song_id, category_id, limit);
	}
}
