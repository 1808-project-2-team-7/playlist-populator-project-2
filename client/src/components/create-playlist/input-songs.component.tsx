import * as React from 'react';
import { ICreatePlaylistState, IState } from '../../reducers';
import { connect } from 'react-redux';
import * as createPlaylistActions from '../../actions/create-playlist/create-playlist.actions';
import { Song } from "../../models/Song";
import { Playlist } from "../../models/Playlist";
import { Button } from "reactstrap";

interface IProps extends ICreatePlaylistState {
    addInputToPlaylist: (songInput: string, artistInput: string, accessToken: string) => any;
    clearCategory: () => any;
    clearSuggestedSongs: () => any;
    getSongsFromDatabase: (playlist: Playlist, spotifyApiSongs: Song[]) => any;
    getSongsFromSpotifyApi: (songs: Song[], accessToken: string) => any;
    getSuggestedSongs: (song: Song, accessToken: string) => any;
    updateArtistInput: (artistInput: string) => any;
    updateMessage: (message: string) => any;
    updatePopulated: (populated: boolean) => any;
    updateSongInput: (songInput: string) => any;
}

export class InputSongsComponent extends React.Component<IProps, IState> {

  public constructor(props: any) {
    super(props);
  }

  public updateArtist = (e: any) => {
    this.props.updateArtistInput(e.target.value);
  }

  public updateSong = (e: any) => {
    this.props.updateSongInput(e.target.value);
  }

  public addToPlaylist = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const song = await this.props.addInputToPlaylist(this.props.songInput, this.props.artistInput, this.props.accessToken);
    this.props.clearSuggestedSongs();
    song && this.props.getSuggestedSongs(song, this.props.accessToken);
  }

  public populate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(this.props.playlist.songs.length <= 5){
      const spotifyApiSongs=await this.props.getSongsFromSpotifyApi(this.props.playlist.songs, this.props.accessToken);
      this.props.getSongsFromDatabase(this.props.playlist, spotifyApiSongs);
      this.props.updatePopulated(true);
    }
  }

  public showPopulateButton = () => {
    if (this.props.playlist.songs.length >= 3) {
      return (
        <form onSubmit={this.populate}>
          <div>
            <Button className="submit-button" type="submit"> POPulate </Button>
          </div>
        </form>
      )
    }
    return;
  }

  public changeCategory= (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.clearCategory();
  }
  
  public render() {
    return (
      <div id="create-playlist" className="container">
        <form onSubmit={this.addToPlaylist}>
          <div className="form-group">
            <label>Enter Song Title: </label>
            <input onChange={this.updateSong} type="text" className="form-control" id="formGroupExampleInput" placeholder="Song Title" autoFocus />
            <label>Enter Artist: </label>
            <input onChange={this.updateArtist} type="text" className="form-control" id="formGroupExampleInput" placeholder="Artist Name" />
            <br />
            <Button className="submit-button" type="submit">Add to Playlist</Button>
          </div>
        </form>
        {this.showPopulateButton()}
        <br />
        <form onSubmit={this.changeCategory}>
            <div>
                <Button className="submit-button" type="submit"> Change Category </Button>
            </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state: IState) => (state.createPlaylist);
const mapDispatchToProps = {
    addInputToPlaylist: createPlaylistActions.addInputToPlaylist,
    clearCategory: createPlaylistActions.clearCategory,
    clearSuggestedSongs: createPlaylistActions.clearSuggestedSongs,
    getSongsFromDatabase: createPlaylistActions.getSongsFromDatabase,
    getSongsFromSpotifyApi: createPlaylistActions.getSongsFromSpotifyApi,
    getSuggestedSongs: createPlaylistActions.getSuggestedSongs,
    updateArtistInput: createPlaylistActions.updateArtistInput,
    updateMessage: createPlaylistActions.updateMessage,
    updatePopulated: createPlaylistActions.updatePopulated,
    updateSongInput: createPlaylistActions.updateSongInput
}
export default connect(mapStateToProps, mapDispatchToProps)(InputSongsComponent);
