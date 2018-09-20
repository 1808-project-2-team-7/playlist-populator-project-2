import * as React from "react";
import { ICreatePlaylistState, IState } from "../../reducers";
import * as createPlaylistActions from "../../actions/create-playlist/create-playlist.actions";
import { connect } from "react-redux";
import InputSongsComponent from "./input-songs.component";
import PlaylistTableComponent from "./playlist-table.component";
import SuggestedSongsTableComponent from "./suggested-songs-table.component";
import { Song } from "../../models/Song";
import { Playlist } from "../../models/Playlist";
import { User } from "../../models/User";
import { Button } from "reactstrap";
import { getCurrentUser } from "../../App";

interface IProps extends ICreatePlaylistState {
  getAccessToken: () => any;
  getSongsFromDatabase: (playlist: Playlist, spotifyApiSongs: Song[]) => any;
  getSongsFromSpotifyApi: (songs: Song[], accessToken: string) => any;
  setPlaylistOwner: (owner: User | null) => any;
  updateErrorMessage: (message: string) => any;
}

export class CreatePlaylistComponent extends React.Component<IProps, {}> {

  public constructor(props: any){
    super(props);
  }

  public populate= async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(this.props.playlist.songs.length < 5){
      const spotifyApiSongs=await this.props.getSongsFromSpotifyApi(this.props.playlist.songs, this.props.accessToken);
      this.props.getSongsFromDatabase(this.props.playlist, spotifyApiSongs);
    }
    else{
      this.props.updateErrorMessage('Please enter no more than 5 songs');
    }
  }

  public showPopulateButton= () => {
    if(this.props.playlist.songs.length >= 3){
      return (
        <form onSubmit={this.populate}>
            <div className="form-group container">
                <Button type="submit"> Populate </Button>
            </div>
        </form>
      )
    }
    return;
  }

  public playlistTable= () => {
    if(this.props.playlist.songs.length){
      return (
        <PlaylistTableComponent />
      )
    }
    return;
  }

  public suggestedSongsTable= () => {
    if(this.props.suggestedSongs.length){
      return (
        <SuggestedSongsTableComponent />
      )
    }
    return;
  }

  public componentDidMount(){
    this.props.getAccessToken();
    this.props.setPlaylistOwner(getCurrentUser());
  }

  public render() {
    return (
      <div className="container">
        <InputSongsComponent />
        {this.props.errorMessage}
        {this.showPopulateButton()}
        {this.suggestedSongsTable()}
        {this.playlistTable()}
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => (state.createPlaylist);
const mapDispatchToProps = {
  getAccessToken: createPlaylistActions.getAccessToken,
  getSongsFromDatabase: createPlaylistActions.getSongsFromDatabase,
  getSongsFromSpotifyApi: createPlaylistActions.getSongsFromSpotifyApi,
  setPlaylistOwner: createPlaylistActions.setPlaylistOwner,
  updateErrorMessage: createPlaylistActions.updateErrorMessage
}
export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylistComponent);