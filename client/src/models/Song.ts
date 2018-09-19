export class Song {
    public id=0;
    public trackName='';
    public artistName='';
    public spotifyTrackId='';
    public spotifyArtistId='';
    public valence=0;
    public danceability=0;
    public energy=0;

    public constructor(id: number, trackName: string, artistName: string, spotifyTrackId: string, 
    spotifyArtistId: string, valence?: number, danceability?: number, energy?: number){
        id && (this.id=id);
        trackName && (this.trackName=trackName);
        artistName && (this.artistName=artistName);
        spotifyTrackId && (this.spotifyTrackId=spotifyTrackId);
        spotifyArtistId && (this.spotifyArtistId=spotifyArtistId);
        valence && (this.valence=valence);
        danceability && (this.danceability=danceability);
        energy && (this.energy=energy);
    }
}