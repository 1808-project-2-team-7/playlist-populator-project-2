package com.revature.models;


import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name="playlist")
public class Playlist {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String name;
	@Column(name="playlist_pic_bucket_key")
	private String bucketKey;
	@ManyToOne
	@JoinColumn(name="category_id")
	private Category category;
	@ManyToOne
	@JoinColumn(name="owner_id")
	private User owner;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "songs_playlists", joinColumns = @JoinColumn(name = "playlist_id"), inverseJoinColumns = @JoinColumn(name = "song_id"))
	private List<Song> songs;

	public Playlist() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Playlist(int id, String name, String bucketKey, Category category, User owner, List<Song> songs) {
		super();
		this.id = id;
		this.name = name;
		this.bucketKey = bucketKey;
		this.category = category;
		this.owner = owner;
		this.songs = songs;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBucketKey() {
		return bucketKey;
	}

	public void setBucketKey(String bucketKey) {
		this.bucketKey = bucketKey;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public List<Song> getSongs() {
		return songs;
	}

	public void setSongs(List<Song> songs) {
		this.songs = songs;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((bucketKey == null) ? 0 : bucketKey.hashCode());
		result = prime * result + ((category == null) ? 0 : category.hashCode());
		result = prime * result + id;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((owner == null) ? 0 : owner.hashCode());
		result = prime * result + ((songs == null) ? 0 : songs.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Playlist other = (Playlist) obj;
		if (bucketKey == null) {
			if (other.bucketKey != null)
				return false;
		} else if (!bucketKey.equals(other.bucketKey))
			return false;
		if (category == null) {
			if (other.category != null)
				return false;
		} else if (!category.equals(other.category))
			return false;
		if (id != other.id)
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (owner == null) {
			if (other.owner != null)
				return false;
		} else if (!owner.equals(other.owner))
			return false;
		if (songs == null) {
			if (other.songs != null)
				return false;
		} else if (!songs.equals(other.songs))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Playlist [id=" + id + ", name=" + name + ", bucketKey=" + bucketKey + ", category=" + category
				+ ", owner=" + owner + ", songs=" + songs + "]";
	}
	
	
	
	
	
	
	
}
