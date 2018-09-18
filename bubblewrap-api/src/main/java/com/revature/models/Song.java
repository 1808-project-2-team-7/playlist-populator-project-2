package com.revature.models;

import java.util.List;

import javax.persistence.JoinColumn;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
@Table(name = "song")
public class Song {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "song_id")
	private int id;
	@Column(name = "track_name")
	private String trackName;
	@Column(name = "artist_name")
	private String artistName;
	@Column(name = "spotify_track_id")
	private String spotifyTrackId;
	@Column(name = "spotify_artist_id")
	private String spotifyArtistId;
	private double valence;
	private double danceability;
	private double energy;
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "songs_playlists", inverseJoinColumns = @JoinColumn(name = "playlist_id"), joinColumns = @JoinColumn(name = "song_id"))
	@JsonIgnore
	private List<Playlist> playlists;

	public Song() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Song(int id, String trackName, String artistName, String spotifyTrackId, String spotifyArtistId,
			double valence, double danceability, double energy) {
		super();
		this.id = id;
		this.trackName = trackName;
		this.artistName = artistName;
		this.spotifyTrackId = spotifyTrackId;
		this.spotifyArtistId = spotifyArtistId;
		this.valence = valence;
		this.danceability = danceability;
		this.energy = energy;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTrackName() {
		return trackName;
	}

	public void setTrackName(String trackName) {
		this.trackName = trackName;
	}

	public String getArtistName() {
		return artistName;
	}

	public void setArtistName(String artistName) {
		this.artistName = artistName;
	}

	public String getSpotifyTrackId() {
		return spotifyTrackId;
	}

	public void setSpotifyTrackId(String spotifyTrackId) {
		this.spotifyTrackId = spotifyTrackId;
	}

	public String getSpotifyArtistId() {
		return spotifyArtistId;
	}

	public void setSpotifyArtistId(String spotifyArtistId) {
		this.spotifyArtistId = spotifyArtistId;
	}

	public double getValence() {
		return valence;
	}

	public void setValence(double valence) {
		this.valence = valence;
	}

	public double getDanceability() {
		return danceability;
	}

	public void setDanceability(double danceability) {
		this.danceability = danceability;
	}

	public double getEnergy() {
		return energy;
	}

	public void setEnergy(double energy) {
		this.energy = energy;
	}

	@Override
	public String toString() {
		return "Song [id=" + id + ", trackName=" + trackName + ", artistName=" + artistName + ", spotifyTrackId="
				+ spotifyTrackId + ", spotifyArtistId=" + spotifyArtistId + ", valence=" + valence + ", danceability="
				+ danceability + ", energy=" + energy + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((artistName == null) ? 0 : artistName.hashCode());
		long temp;
		temp = Double.doubleToLongBits(danceability);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(energy);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + id;
		result = prime * result + ((spotifyArtistId == null) ? 0 : spotifyArtistId.hashCode());
		result = prime * result + ((spotifyTrackId == null) ? 0 : spotifyTrackId.hashCode());
		result = prime * result + ((trackName == null) ? 0 : trackName.hashCode());
		temp = Double.doubleToLongBits(valence);
		result = prime * result + (int) (temp ^ (temp >>> 32));
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
		Song other = (Song) obj;
		if (artistName == null) {
			if (other.artistName != null)
				return false;
		} else if (!artistName.equals(other.artistName))
			return false;
		if (Double.doubleToLongBits(danceability) != Double.doubleToLongBits(other.danceability))
			return false;
		if (Double.doubleToLongBits(energy) != Double.doubleToLongBits(other.energy))
			return false;
		if (id != other.id)
			return false;
		if (spotifyArtistId == null) {
			if (other.spotifyArtistId != null)
				return false;
		} else if (!spotifyArtistId.equals(other.spotifyArtistId))
			return false;
		if (spotifyTrackId == null) {
			if (other.spotifyTrackId != null)
				return false;
		} else if (!spotifyTrackId.equals(other.spotifyTrackId))
			return false;
		if (trackName == null) {
			if (other.trackName != null)
				return false;
		} else if (!trackName.equals(other.trackName))
			return false;
		if (Double.doubleToLongBits(valence) != Double.doubleToLongBits(other.valence))
			return false;
		return true;
	}

}
