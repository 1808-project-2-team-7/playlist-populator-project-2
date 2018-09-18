package com.revature.repos;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.revature.models.Song;

@Repository
public interface SongRepo extends JpaRepository<Song, Integer> {
	@Query("SELECT others \r\n" + "FROM Song so JOIN so.playlists pl\r\n"
			+ "JOIN pl.songs others WHERE so.id = :id AND others.id != :id " + "GROUP BY others.id\r\n"
			+ "ORDER BY COUNT(others.id) DESC\r\n")
	List<Song> findMostPopularCommonSongs(@Param("id") int id, Pageable p);

	@Query(value = "SELECT others \r\n" + "FROM Song so JOIN so.playlists pl JOIN pl.category c\r\n"
			+ "JOIN pl.songs others WHERE so.id = :song_id AND c.id = :category_id AND others.id != :song_id " + "GROUP BY others.id\r\n"
			+ "ORDER BY COUNT(others.id) DESC\r\n")
	List<Song> findMostPopularCommonSongs(@Param("song_id") int song_id, @Param("category_id") int category_id, Pageable p);
}
