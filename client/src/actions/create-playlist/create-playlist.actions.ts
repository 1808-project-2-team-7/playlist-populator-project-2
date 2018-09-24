import { createPlaylistTypes } from "./create-playlist.types";
import { Song } from "../../models/Song";
import { Playlist } from "../../models/Playlist";
import { environment } from "../../environment";
import { User } from "../../models/User";
import { Category } from "../../models/Category";

export const addInputToPlaylist = (songInput: string, artistInput: string, accessToken: string) => (dispatch: any) => {
    const query = encodeURIComponent(`${songInput} ${artistInput}`);
    const url = `https://api.spotify.com/v1/search?q=${query}&type=track`;
    return fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.json())
        .then(resp => {
            const track = resp.tracks.items && resp.tracks.items[0];
            const artist = track.artists && track.artists[0];
            const song = new Song({
                artistName: artist.name,
                id: 0,
                spotifyArtistId: artist.id,
                spotifyTrackId: track.id,
                trackName: track.name
            });
            dispatch({
                payload: {
                    song
                },
                type: createPlaylistTypes.ADD_INPUT_TO_PLAYLIST
            })
            return song;
        })
        .catch(error => {
            console.log(error);
        })
}

export const addSuggestedSongToPlaylist = (song: Song) => {
    return {
        payload: {
            song
        },
        type: createPlaylistTypes.ADD_INPUT_TO_PLAYLIST
    }
}

export const clearCategory = () => {
    const category = new Category();
    return {
        payload: {
            category
        },
        type: createPlaylistTypes.CLEAR_CATEGORY
    }
}

export const clearPlaylist = () => {
    const id = 0;
    const name = '';
    const bucketKey = '';
    const category: Category = new Category();
    const songs: Song[] = [];
    return {
        payload: {
            bucketKey,
            category,
            id,
            name,
            songs
        },
        type: createPlaylistTypes.CLEAR_PLAYLIST
    }
}

export const clearSongFromSuggestedSongs = (songToRemove: Song, suggestedSongs: Song[]) => {
    const newSuggestedSongs = suggestedSongs.filter((song: Song) => {
        return song.spotifyTrackId !== songToRemove.spotifyTrackId;
    })
    return {
        payload: {
            newSuggestedSongs
        },
        type: createPlaylistTypes.CLEAR_SONG_FROM_SUGGESTED_SONGS
    }
}

export const clearSuggestedSongs = () => {
    return {
        payload: [],
        type: createPlaylistTypes.CLEAR_SUGGESTED_SONGS
    }
}

export const deletePlaylist = (id: number) => (dispatch: any) => {
    fetch(`${environment.context}playlists/delete/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    })
        .then(resp => {
            dispatch({
                payload: new Playlist(),
                type: createPlaylistTypes.CLEAR_PLAYLIST
            })
        })
        .catch(error => {
            console.log(error);
        })
}

export const getAccessToken = () => (dispatch: any) => {
    fetch('http://ec2-18-223-235-230.us-east-2.compute.amazonaws.com:8888/login')
        .then(resp => resp.json())
        .then(accessToken => {
            dispatch({
                payload: {
                    accessToken
                },
                type: createPlaylistTypes.GET_ACCESS_TOKEN
            })
        })
        .catch(error => {
            console.log(error);
        })
}

export const getSongsFromDatabase = (playlist: Playlist, spotifyApiSongs: Song[]) => async (dispatch: any) => {
    const songsFromDatabase = await fetch(`${environment.context}playlists`, {
        body: JSON.stringify(playlist),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
        .then(songsWithIds => songsWithIds.json())
        .then(playlistWithIds => {
            const playlistId = playlistWithIds.id;
            console.log(playlistWithIds);
            dispatch({
                payload: {
                    playlistId
                },
                type: createPlaylistTypes.UPDATE_PLAYLIST_ID
            })
            return Promise.all(playlistWithIds.songs.map((song: Song) => {
                return fetch(`${environment.context}songs/${song.id}/popular`)
                    .then(databaseSuggestions => databaseSuggestions.json())
                    .then(databaseSuggestions => {
                        return databaseSuggestions;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }));
        })
        .then(databaseSuggestions => {
            return [].concat.apply([], databaseSuggestions);
        })
        .catch(error => {
            console.log(error);
        })
    const allSongsToAdd = (songsFromDatabase) ? [...playlist.songs, ...spotifyApiSongs, ...songsFromDatabase] :
        [...playlist.songs, ...spotifyApiSongs];
    // remove duplicates from the array of all songs
    const setOfTrackIds = new Set(allSongsToAdd.map((song: Song) => song.spotifyTrackId));
    const songsToReturn = allSongsToAdd.filter((song: Song) => {
        if (setOfTrackIds.has(song.spotifyTrackId)) {
            setOfTrackIds.delete(song.spotifyTrackId);
            return true;
        }
        return false;
    });
    dispatch({
        payload: {
            songsToReturn
        },
        type: createPlaylistTypes.GET_SONGS_FROM_DATABASE
    })
}

export const getSongsFromSpotifyApi = (songs: Song[], accessToken: string) => (dispatch: any) => {
    const trackIds = songs.map((song: Song) => {
        return song.spotifyTrackId;
    })
    const urlTail = trackIds.join('%2C');
    const url = `https://api.spotify.com/v1/audio-features?ids=${urlTail}`;
    return fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.json())
        .then(resp => {
            const numTracks = songs.length;

            const limitNumberOfSongs = 10;

            const danceability = resp.audio_features.map((song: any) => song.danceability);
            const valence = resp.audio_features.map((song: any) => song.valence);
            const energy = resp.audio_features.map((song: any) => song.energy);

            const seedTracks = trackIds.join('%2C');

            const seedTargetDanceability = danceability.reduce((acc: number, cur: number) => acc + cur) / numTracks;
            const seedMinDanceability = Math.min(...danceability);
            const seedMaxDanceability = Math.max(...danceability);

            const seedTargetValence = valence.reduce((acc: number, cur: number) => acc + cur) / numTracks;
            const seedMinValence = Math.min(...valence);
            const seedMaxValence = Math.max(...valence);

            const seedTargetEnergy = energy.reduce((acc: number, cur: number) => acc + cur) / numTracks;
            const seedMinEnergy = Math.min(...energy);
            const seedMaxEnergy = Math.max(...energy);

            const URL = `https://api.spotify.com/v1/recommendations?limit=${limitNumberOfSongs}&seed_tracks=${seedTracks}&min_danceability=${seedMinDanceability}&max_danceability=${seedMaxDanceability}&target_danceability=${seedTargetDanceability}&min_energy=${seedMinEnergy}&max_energy=${seedMaxEnergy}&target_energy=${seedTargetEnergy}&min_valence=${seedMinValence}&max_valence=${seedMaxValence}&target_valence=${seedTargetValence}`;
            return fetch(URL, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            })
                .then(recommendations => recommendations.json())
                .then(recommendations => {
                    const tracks = recommendations.tracks;
                    const songsToAddToPlaylist = tracks.map((songObject: any) => {
                        return new Song({
                            artistName: songObject.artists && songObject.artists[0].name,
                            id: 0,
                            spotifyArtistId: songObject.artists && songObject.artists[0].id,
                            spotifyTrackId: songObject.id,
                            trackName: songObject.name
                        })
                    });
                    dispatch({
                        payload: {
                            songsToAddToPlaylist
                        },
                        type: createPlaylistTypes.GET_SONGS_FROM_SPOTIFY_API
                    })
                    return songsToAddToPlaylist;
                })
                .catch(error => {
                    console.log(error);
                })
        })
        .catch(error => {
            console.log(error);
        })
}

export const getSuggestedSongs = (song: Song, accessToken: string) => (dispatch: any) => {
    const url = `https://api.spotify.com/v1/artists/${song.spotifyArtistId}/related-artists`;
    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.json())
        .then(jsonArtists => {
            const artists = jsonArtists.artists;
            const threeRelatedArtists = artists && [artists[0].id, artists[1].id, artists[2].id];
            threeRelatedArtists.forEach((artistId: any) => {
                const URL = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`;
                fetch(URL, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + accessToken,
                        'Content-Type': 'application/json'
                    }
                })
                    .then(resp => resp.json())
                    .then(jsonTracks => {
                        const tracks = jsonTracks.tracks;
                        const topThreeSongs = tracks && [tracks[0], tracks[1], tracks[2]];
                        const suggestedSongs = topThreeSongs.map((track: any) => {
                            return new Song({
                                artistName: track.artists && track.artists[0].name,
                                id: 0,
                                spotifyArtistId: track.artists && track.artists[0].id,
                                spotifyTrackId: track.id,
                                trackName: track.name
                            })
                        })
                        dispatch({
                            payload: {
                                suggestedSongs
                            },
                            type: createPlaylistTypes.GET_SUGGESTED_SONGS
                        })
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
        })
        .catch(error => {
            console.log(error);
        })
}

export const removeSongFromPlaylist = (song: Song, songs: Song[]) => {
    const playlistWithSongRemoved = songs.filter((track: Song) => track.spotifyTrackId !== song.spotifyTrackId)
    return {
        payload: {
            playlistWithSongRemoved
        },
        type: createPlaylistTypes.REMOVE_SONG_FROM_PLAYLIST
    }
}

export const savePlaylistToDatabase = (playlist: Playlist) => (dispatch: any) => {
    fetch(`${environment.context}playlists/${playlist.id}/update`, {
        body: JSON.stringify(playlist),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT'
    })
        .then(resp => {
            return resp.json();
        })
        .then((returnedPlaylist: Playlist) => {
            console.log('hello from th einside ');
            console.log('returnedPlaylist');
            dispatch({
                payload: {
                    savedPlaylist: returnedPlaylist
                },
                type: createPlaylistTypes.SAVE_PLAYLIST_TO_DATABASE
            })
        })
        .catch(error => {
            console.log(error);
        })


}

export const sendImageToDatabase = (file: any) => (dispatch: any) => {
    const formData = new FormData();
    formData.append('file', file);
    fetch(`${environment.context}storage/uploadFile`, {
        body: formData,
        method: 'POST'
    })
        .then(resp => resp.text())
        .then(bucketKey => {
            dispatch({
                payload: {
                    bucketKey
                },
                type: createPlaylistTypes.SEND_IMAGE_TO_DATABASE
            })
        })
        .catch(error => {
            console.log(error);
        })
}

export const setCategoryInformation = (category: Category) => {
    return {
        payload: {
            category
        },
        type: createPlaylistTypes.SET_CATEGORY_INFORMATION
    }
}

export const setPlaylistOwner = (owner: User) => {
    return {
        payload: {
            owner
        },
        type: createPlaylistTypes.SET_PLAYLIST_OWNER
    }
}

export const updateArtistInput = (artistInput: string) => {
    return {
        payload: {
            artistInput
        },
        type: createPlaylistTypes.UPDATE_ARTIST_INPUT
    }
}

export const updateMessage = (message: string) => {
    return {
        payload: {
            message
        },
        type: createPlaylistTypes.UPDATE_MESSAGE
    }
}

export const updatePlaylistName = (name: string) => {
    return {
        payload: {
            name
        },
        type: createPlaylistTypes.UPDATE_PLAYLIST_NAME
    }
}

export const updatePopulated = (populated: boolean) => {
    return {
        payload: {
            populated
        },
        type: createPlaylistTypes.UPDATE_POPULATED
    }
}

export const updateSongInput = (songInput: string) => {
    return {
        payload: {
            songInput
        },
        type: createPlaylistTypes.UPDATE_SONG_INPUT
    }
}