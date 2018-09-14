package com.revature.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.revature.models.Song;

@Repository
public interface SongRepo extends JpaRepository<Song, Integer> {
	@Query(value = "SELECT song.song_id\r\n" + 
			"FROM song NATURAL JOIN songs_playlists\r\n" + 
			"WHERE playlist_id IN\r\n" + 
			"  (\r\n" + 
			"  SELECT playlist_id\r\n" + 
			"  FROM playlist NATURAL JOIN songs_playlists\r\n" + 
			"  WHERE song_id = 1\r\n" + 
			"  ) AND song_id != 1\r\n" + 
			"GROUP BY song_id\r\n" + 
			"ORDER BY COUNT(song_id) DESC\r\n" + 
			"LIMIT 10", nativeQuery = true)
	List<Song> findMostPopularCommonSongs();
}
