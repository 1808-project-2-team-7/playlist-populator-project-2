package com.revature.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.models.Song;

@Repository
public interface SongRepo extends JpaRepository<Song, Integer> {
}
