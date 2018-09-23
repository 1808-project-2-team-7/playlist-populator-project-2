CREATE SCHEMA playlist_populator;
SET SCHEMA 'playlist_populator';

CREATE TABLE app_user
(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    profile_pic_bucket_key VARCHAR(1024)
);

CREATE TABLE song
(
    song_id SERIAL PRIMARY KEY,
    track_name VARCHAR(200) NOT NULL,
    artist_name VARCHAR(60) NOT NULL,
    spotify_track_id VARCHAR(22) NOT NULL UNIQUE,
    spotify_artist_id VARCHAR(22) NOT NULL,
    valence DECIMAL NOT NULL,
    danceability DECIMAL NOT NULL,
    energy DECIMAL NOT NULL,
    UNIQUE(track_name, artist_name)
);

CREATE TABLE category
(
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(30) NOT NULL UNIQUE,
    image_path VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE playlist
(
    playlist_id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    playlist_pic_bucket_key VARCHAR(1024),
    category_id INTEGER NOT NULL REFERENCES category(category_id),
    owner_id INTEGER NOT NULL REFERENCES app_user(user_id)
);

CREATE TABLE songs_playlists
(
    song_id INTEGER REFERENCES song(song_id),
    playlist_id INTEGER REFERENCES playlist(playlist_id),
    PRIMARY KEY(song_id, playlist_id)
);
