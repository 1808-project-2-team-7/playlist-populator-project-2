package com.revature.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.models.Playlist;

@Repository
public interface PlaylistRepo extends JpaRepository<Playlist, Integer> {
}
