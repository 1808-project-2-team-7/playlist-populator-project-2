export class Song {
    public id: number
    public trackName: string
    public artistName: string
    public spotifyTrackId: string
    public spotifyArtistId: string
    public valence: number
    public danceability: number
    public energy: number

    public constructor(init?: Partial<Song>) {
        Object.assign(this, init);
    }
}