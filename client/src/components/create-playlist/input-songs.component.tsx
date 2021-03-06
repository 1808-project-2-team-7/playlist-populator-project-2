import * as React from 'react';
import { ICreatePlaylistState, IState } from '../../reducers';
import { connect } from 'react-redux';
import * as createPlaylistActions from '../../actions/create-playlist/create-playlist.actions';
import { Song } from "../../models/Song";
import { Playlist } from "../../models/Playlist";
import { Button, FormGroup, Col } from "reactstrap";
import Form from 'reactstrap/lib/Form';

interface IProps extends ICreatePlaylistState {
  addInputToPlaylist: (songInput: string, artistInput: string, accessToken: string) => any;
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
    if (this.props.playlist.songs.length <= 5) {
      const spotifyApiSongs = await this.props.getSongsFromSpotifyApi(this.props.playlist.songs, this.props.accessToken);
      this.props.getSongsFromDatabase(this.props.playlist, spotifyApiSongs);
      this.props.updatePopulated(true);
    }
  }

  public showPopulateButton = () => {
    return (
      <form onSubmit={this.populate}>
        <div>
          {this.props.playlist.songs.length >= 3 && this.props.playlist.songs.length <= 5 ?
            <Button className="submit-button" type="submit"> POPulate </Button> :
            <Button className="submit-button" type="submit" disabled> POPulate </Button>
          }
        </div>
      </form>
    )
  }

  public render() {
    return (
      <div id="create-playlist" className="container">
        <Form onSubmit={this.addToPlaylist}>
          <Col>
            <FormGroup>
              <label>Song Title</label>
              <input onChange={this.updateSong} type="text" className="form-control" id="formGroupExampleInput" autoFocus />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <label>Artist</label>
              <input onChange={this.updateArtist} type="text" className="form-control" id="formGroupExampleInput" />
            </FormGroup>
          </Col>
          <Button color="primary" className="submit-button" type="submit">Add to Playlist</Button>
        </Form>
        {this.showPopulateButton()}
      </div>
    );
  }
}
const mapStateToProps = (state: IState) => (state.createPlaylist);
const mapDispatchToProps = {
  addInputToPlaylist: createPlaylistActions.addInputToPlaylist,
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
