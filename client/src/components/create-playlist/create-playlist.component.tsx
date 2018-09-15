import * as React from "react";
import { ICreatePlaylistState, IState } from "../../reducers";
import * as createPlaylistActions from "../../actions/create-playlist/create-playlist.actions";
import { connect } from "react-redux";
import InputSongsComponent from "./input-songs.component";
import PlaylistTableComponent from "./playlist-table.component";
import SuggestedSongsTableComponent from "./suggested-songs-table.component";
import { Song } from "../../models/Song";


interface IProps extends ICreatePlaylistState {
  getAccessToken: () => any;
  getSongsFromSpotifyApi: (songs: Song[], accessToken: string) => any;
}

export class CreatePlaylistComponent extends React.Component<IProps, {}> {

  public constructor(props: any){
    super(props);
  }

  public populate= (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.getSongsFromSpotifyApi(this.props.playlist.songs, this.props.accessToken);
  }

  public showPopulateButton= () => {
    if(this.props.playlist.songs.length >= 3){
      return (
        <form onSubmit={this.populate}>
            <div className="form-group">
                <button type="submit"> Populate </button>
            </div>
        </form>
      )
    }
    return;
  }

  public suggestedSongsTable= () => {
    if(this.props.playlist.songs.length){
      return (
        <SuggestedSongsTableComponent />
      )
    }
    return;
  }

  public componentDidMount(){
    this.props.getAccessToken();
  }

  public render() {
    return (
      <div>
          <InputSongsComponent />
          {this.showPopulateButton()}
          {this.suggestedSongsTable()}
          <PlaylistTableComponent />
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => (state.createPlaylist);
const mapDispatchToProps = {
  getAccessToken: createPlaylistActions.getAccessToken,
  getSongsFromSpotifyApi: createPlaylistActions.getSongsFromSpotifyApi
}
export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylistComponent);