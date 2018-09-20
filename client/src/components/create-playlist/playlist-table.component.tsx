import * as React from 'react';
import { ICreatePlaylistState, IState } from '../../reducers';
import { connect } from 'react-redux';
import { Song } from '../../models/Song';
import * as createPlaylistActions from "../../actions/create-playlist/create-playlist.actions";
import { Table, Button } from "reactstrap";

interface IProps extends ICreatePlaylistState{
  removeSongFromPlaylist: (song: Song, songs: Song[]) => any;
}
export class PlaylistTableComponent extends React.Component<IProps, {}> {

  public constructor(props: any){
    super(props);
  }

  public removeSong= (song: Song) => {
    song && this.props.removeSongFromPlaylist(song, this.props.playlist.songs);
  }

  
  public render() {
    return (
      <div className="container">
        <label> Your Playlist: </label>
        <Table className="table table-striped table-dark col table-main" id="songs-table">
            <thead>
            <tr className="table-row">
                <th scope="col"> Track Name </th>
                <th scope="col"> Artist Name </th>
                <th scope="col"> </th>
            </tr>
            </thead>
              <tbody className="table-body">
              {
                  this.props.playlist.songs.map((song: Song) => (
                  <tr className="table-row" key={song.spotifyTrackId}>
                      <td>{song && song.trackName}</td>
                      <td>{song && song.artistName}</td>
                      <td>
                          <Button type="submit" onClick={() => this.removeSong(song)}> Remove Song </Button>
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
  removeSongFromPlaylist: createPlaylistActions.removeSongFromPlaylist
}
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTableComponent);