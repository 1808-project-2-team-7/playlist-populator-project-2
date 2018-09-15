import * as React from "react";
import { ICreatePlaylistState, IState } from "../../reducers";
import { connect } from "react-redux";
import { Song } from "../../models/Song";
import * as createPlaylistActions from "../../actions/create-playlist/create-playlist.actions";

interface IProps extends ICreatePlaylistState {
  addSuggestedSongToPlaylist: (song: Song) => any,
  clearSongFromSuggestedSongs: (song: Song, suggestedSongs: Song[]) => any
}
export class SuggestedSongsTableComponent extends React.Component<IProps, IState> {

  public constructor(props: any){
    super(props);
  }

  public addToPlaylist= (song: Song) => {
    this.props.addSuggestedSongToPlaylist(song);
    this.props.clearSongFromSuggestedSongs(song, this.props.suggestedSongs);
  }
  
  public render() {
    return (
      <div>
        <label> Suggested Songs to Add: </label>
        <table className="table table-striped table-dark col" id="songs-table">
            <thead>
            <tr>
                <th scope="col"> Track Name </th>
                <th scope="col"> Artist Name </th>
            </tr>
            </thead>
            <tbody id="songs-table-body">
            {
                this.props.suggestedSongs.map((song: Song) => (
                <tr key={song.spotifyTrackId}>
                    <td>{song && song.trackName}</td>
                    <td>{song && song.artistName}</td>
                    <td>
                        <input type="submit" value="Add" onClick={() => this.addToPlaylist(song)} />
                    </td>
                </tr>
                ))
            }
            </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state: IState) => (state.createPlaylist);
const mapDispatchToProps = {
  addSuggestedSongToPlaylist: createPlaylistActions.addSuggestedSongToPlaylist,
  clearSongFromSuggestedSongs: createPlaylistActions.clearSongFromSuggestedSongs
}
export default connect(mapStateToProps, mapDispatchToProps)(SuggestedSongsTableComponent);
