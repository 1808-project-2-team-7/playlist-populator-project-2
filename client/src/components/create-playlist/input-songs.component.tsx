import * as React from 'react';
import { ICreatePlaylistState, IState } from '../../reducers';
import { connect } from 'react-redux';
import * as createPlaylistActions from '../../actions/create-playlist/create-playlist.actions';
import { Song } from "../../models/Song";
import { Button } from "reactstrap";

interface IProps extends ICreatePlaylistState {
    addInputToPlaylist: (songInput: string, artistInput: string, accessToken: string) => any;
    clearSuggestedSongs: () => any;
    getSuggestedSongs: (song: Song, accessToken: string) => any;
    updateArtistInput: (artistInput: string) => any;
    updateSongInput: (songInput: string) => any;
}

export class InputSongsComponent extends React.Component<IProps, IState> {

  public constructor(props: any){
    super(props);
  }

  public updateArtist= (e: any) => {
      this.props.updateArtistInput(e.target.value);
  }

  public updateSong= (e: any) => {
      this.props.updateSongInput(e.target.value);
  }

  public addToPlaylist= async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const song= await this.props.addInputToPlaylist(this.props.songInput, this.props.artistInput, this.props.accessToken);
      this.props.clearSuggestedSongs();
      song && this.props.getSuggestedSongs(song, this.props.accessToken);
  }
  
  public render() {
    return (
      <div className="container">
          <form onSubmit={this.addToPlaylist}>
            <div className="form-group">
                <label>Enter Song Title: </label>
                <input onChange={this.updateSong} type="text" className="form-control" id="formGroupExampleInput" placeholder="Song Title" />
                <label>Enter Artist: </label>
                <input onChange={this.updateArtist} type="text" className="form-control" id="formGroupExampleInput" placeholder="Artist Name" />
                <Button type="submit"> Submit </Button>
            </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state: IState) => (state.createPlaylist);
const mapDispatchToProps = {
    addInputToPlaylist: createPlaylistActions.addInputToPlaylist,
    clearSuggestedSongs: createPlaylistActions.clearSuggestedSongs,
    getSuggestedSongs: createPlaylistActions.getSuggestedSongs,
    updateArtistInput: createPlaylistActions.updateArtistInput,
    updateSongInput: createPlaylistActions.updateSongInput
}
export default connect(mapStateToProps, mapDispatchToProps)(InputSongsComponent);
