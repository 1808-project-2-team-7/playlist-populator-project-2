SET SCHEMA 'playlist_populator';

-- Find most popular 10 songs on playlists that contain song with id 1
SELECT song.*, COUNT(song_id) AS popularity
FROM song NATURAL JOIN songs_playlists
WHERE playlist_id IN
  (
  SELECT playlist_id
  FROM playlist NATURAL JOIN songs_playlists
  WHERE song_id = 1
  ) AND song_id != 1
GROUP BY song_id
ORDER BY popularity DESC
LIMIT 10;

-- Find most popular 10 songs on playlists that contain song with id 1 and have category id 23
SELECT song.*, COUNT(song_id) AS popularity
FROM song NATURAL JOIN songs_playlists
WHERE playlist_id IN
  (
  SELECT playlist_id
  FROM CATEGORY NATURAL JOIN playlist NATURAL JOIN songs_playlists
  WHERE song_id = 1 AND category_id = 23
  ) AND song_id != 1
GROUP BY song_id
ORDER BY popularity DESC
LIMIT 10;