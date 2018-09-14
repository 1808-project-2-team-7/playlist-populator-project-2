package com.revature.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.revature.models.Song;

@Repository
public interface SongRepo extends JpaRepository<Song, Integer> {
	@Query(value = "SELECT song.*, COUNT(song_id) AS popularity\r\n" + 
			"FROM playlist_populator.song NATURAL JOIN playlist_populator.songs_playlists\r\n" + 
			"WHERE playlist_id IN\r\n" + 
			"  (\r\n" + 
			"  SELECT playlist_id\r\n" + 
			"  FROM playlist_populator.playlist NATURAL JOIN playlist_populator.songs_playlists\r\n" + 
			"  WHERE song_id = 1\r\n" + 
			"  ) AND song_id != 1\r\n" + 
			"GROUP BY song_id\r\n" + 
			"ORDER BY popularity DESC\r\n" + 
			"LIMIT 10", nativeQuery = true)
	List<Song> findMostPopularCommonSongs();
}
