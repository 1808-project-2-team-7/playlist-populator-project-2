package com.revature.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.revature.models.Playlist;
import com.revature.models.Song;
import com.revature.repos.PlaylistRepo;

@Service
public class PlaylistService {

	@Autowired
	private PlaylistRepo pr;
	@Autowired
	private SongService ss;
	@Autowired
	private UserService us;

	public Page<Playlist> findAll(Pageable pageable) {
		return pr.findAll(pageable);
	}

	public Playlist findOne(int id) {
		return pr.getOne(id);
	}

	public Playlist save(Playlist p) {
		List<Song> songs = p.getSongs();
		Set<Song> dbSongs = new HashSet<>();
		Song currentSong;
		for (Song song : songs) {
			if (ss.findByNameAndArtist(song.getTrackName(), song.getArtistName()).size() != 0) {
				currentSong = ss.findByNameAndArtist(song.getTrackName(), song.getArtistName()).get(0);
				dbSongs.add(currentSong);
			} else {
				currentSong = ss.save(song);
				if (currentSong != null) {
					dbSongs.add(currentSong);
				}
			}
		}
		List<Song> dbSongList = new ArrayList<>(dbSongs);
		p.setSongs(dbSongList);
		return pr.saveAndFlush(p);
	}

	public Playlist update(int id, Playlist p) {
		if (pr.existsById(id)) {
			p.setOwner(us.findOne(p.getOwner().getId()));

			return save(p);
		} else {
			return null;
		}
	}

	public boolean delete(int id) {
		if (pr.existsById(id)) {
			pr.deleteById(id);
			return true;
		} else {
			return false;
		}

	}

	public List<Playlist> findByUserId(int id, Pageable pageable) {
		return pr.findByOwnerId(id, pageable);
	}
}
