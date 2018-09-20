import * as React from "react";
import { ICreatePlaylistState, IState } from "../../reducers";
import { connect } from "react-redux";
import { Song } from "../../models/Song";
import * as createPlaylistActions from "../../actions/create-playlist/create-playlist.actions";
import { Table, Button } from "reactstrap";

interface IProps extends ICreatePlaylistState {
  addSuggestedSongToPlaylist: (song: Song) => any,
  clearSongFromSuggestedSongs: (song: Song, suggestedSongs: Song[]) => any
}
export class SuggestedSongsTableComponent extends React.Component<IProps, IState> {

  public constructor(props: any){
    super(props);
  }

  public addToPlaylist= (song: Song) => {
    song && this.props.addSuggestedSongToPlaylist(song);
    song && this.props.clearSongFromSuggestedSongs(song, this.props.suggestedSongs);
  }
  
  public render() {
    return (
      <div className="container">
        <label> Suggested Songs to Add: </label>
        <Table className="table table-striped table-dark col table-main" id="songs-table">
            <thead>
            <tr className="table-row">
                <th scope="col"> Track Name </th>
                <th scope="col"> Artist Name </th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody className="table-body">
            {
                this.props.suggestedSongs.map((song: Song) => (
                <tr className="table-row" key={song.spotifyTrackId}>
                    <td>{song && song.trackName}</td>
                    <td>{song && song.artistName}</td>
                    <td>
                        <Button type="submit" onClick={() => this.addToPlaylist(song)}> Add </Button>
                    </td>
                </tr>
                ))
            }
            </tbody>
        </Table>
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
