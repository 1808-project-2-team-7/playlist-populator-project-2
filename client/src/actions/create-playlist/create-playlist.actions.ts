import { createPlaylistTypes } from "./create-playlist.types";
import { Song } from "../../models/Song";

export const addInputToPlaylist= (songInput: string, artistInput: string, accessToken: string) => (dispatch: any) => {
    const query=encodeURIComponent(`${songInput} ${artistInput}`);
    const url=`https://api.spotify.com/v1/search?q=${query}&type=track`;
    return fetch(url, {
        headers:{
            'Accept': 'application/json',
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(resp => {
        const track=resp.tracks.items && resp.tracks.items[0];
        const artist=track.artists && track.artists[0];
        const song=new Song(
            0, // id placeholder
            track.name,
            artist.name,
            track.id,
            artist.id
        );
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

export const addSuggestedSongToPlaylist= (song: Song) => {
    return {
        payload: {
            song
        },
        type: createPlaylistTypes.ADD_INPUT_TO_PLAYLIST
    }
}

export const clearSongFromSuggestedSongs= (songToRemove: Song, suggestedSongs: Song[]) => {
    const newSuggestedSongs=suggestedSongs.filter((song: Song) => {
        return song.spotifyTrackId!==songToRemove.spotifyTrackId;
    })
    return {
        payload: {
            newSuggestedSongs
        },
        type: createPlaylistTypes.CLEAR_SONG_FROM_SUGGESTED_SONGS
    }
}

export const clearSuggestedSongs= () => {
    return {
        payload: [],
        type: createPlaylistTypes.CLEAR_SUGGESTED_SONGS
    }
}

export const getAccessToken= () => (dispatch: any) => {
    fetch('http://localhost:8888/login')
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

export const getSongsFromSpotifyApi= (songs: Song[], accessToken: string) => (dispatch: any) => {
    const trackIds=songs.map((song: Song) => {
        return song.spotifyTrackId;
    })
    const urlTail=trackIds.join('%2C');
    const url=`https://api.spotify.com/v1/audio-features?ids=${urlTail}`;
    return fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(resp => {
        const numTracks=songs.length;

        const danceability=resp.audio_features.map((song: any) => song.danceability );
        const valence=resp.audio_features.map((song: any) => song.valence );
        const energy=resp.audio_features.map((song: any) => song.energy );

        const seedTracks=trackIds.join('%2C');

        const seedTargetDanceability=danceability.reduce((acc: number, cur: number) => acc + cur )/numTracks;
        const seedMinDanceability=Math.min(...danceability);
        const seedMaxDanceability=Math.max(...danceability);

        const seedTargetValence=valence.reduce((acc: number, cur: number) => acc + cur )/numTracks;
        const seedMinValence=Math.min(...valence);
        const seedMaxValence=Math.max(...valence);

        const seedTargetEnergy=energy.reduce((acc: number, cur: number) => acc + cur )/numTracks;
        const seedMinEnergy=Math.min(...energy);
        const seedMaxEnergy=Math.max(...energy);

        const URL=`https://api.spotify.com/v1/recommendations?seed_tracks=${seedTracks}&min_danceability=${seedMinDanceability}&max_danceability=${seedMaxDanceability}&target_danceability=${seedTargetDanceability}&min_energy=${seedMinEnergy}&max_energy=${seedMaxEnergy}&target_energy=${seedTargetEnergy}&min_valence=${seedMinValence}&max_valence=${seedMaxValence}&target_valence=${seedTargetValence}`;
        fetch(URL, {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        })
        .then(recommendations => recommendations.json())
        .then(recommendations => {
            const tracks=recommendations.tracks;
            const songsToAddToPlaylist=tracks.map((songObject: any) => {
                return new Song(
                    0,
                    songObject.name,
                    songObject.artists && songObject.artists[0].name,
                    songObject.id,
                    songObject.artists && songObject.artists[0].id
                );
            })
            dispatch({
                payload: {
                    songsToAddToPlaylist
                },
                type: createPlaylistTypes.GET_SONGS_FROM_SPOTIFY_API
            })
        })
        .catch(error => {
            console.log(error);
        })
    })
    .catch(error => {
        console.log(error);
    })
}

export const getSuggestedSongs= (song: Song, accessToken: string) => (dispatch: any) => {
    const url=`https://api.spotify.com/v1/artists/${song.spotifyArtistId}/related-artists`;
    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(jsonArtists => {
        const artists=jsonArtists.artists;
        const threeRelatedArtists=artists && [artists[0].id, artists[1].id, artists[2].id];
        threeRelatedArtists.forEach((artistId: any) => {
            const URL=`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`;
            fetch(URL, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then(jsonTracks => {
                const tracks=jsonTracks.tracks;
                const topThreeSongs=tracks && [tracks[0], tracks[1], tracks[2]];
                const suggestedSongs=topThreeSongs.map((track: any) => {
                    return new Song(
                        0, // id placeholder
                        track.name,
                        track.artists && track.artists[0].name,
                        track.id,
                        track.artists && track.artists[0].id
                    )
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

export const updateArtistInput= (artistInput: string) => {
    return {
        payload: {
            artistInput
        },
        type: createPlaylistTypes.UPDATE_ARTIST_INPUT
    }
}

export const updateSongInput= (songInput: string) => {
    return {
        payload: {
            songInput
        },
        type: createPlaylistTypes.UPDATE_SONG_INPUT
    }
}