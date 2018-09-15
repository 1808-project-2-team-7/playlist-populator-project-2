import * as React from 'react';
import { ICreatePlaylistState, IState } from '../../reducers';
import { connect } from 'react-redux';
import { Song } from '../../models/Song';


export class PlaylistTableComponent extends React.Component<ICreatePlaylistState, IState> {

  public constructor(props: any){
    super(props);
  }
  
  public render() {
    return (
      <div>
        <label> Your Playlist: </label>
        <table className="table table-striped table-dark col" id="songs-table">
            <thead>
            <tr>
                <th scope="col"> Track Name </th>
                <th scope="col"> Artist Name </th>
            </tr>
            </thead>
            <tbody id="songs-table-body">
            {
                this.props.playlist.songs.map((song: Song) => (
                <tr key={song.spotifyTrackId}>
                    <td>{song && song.trackName}</td>
                    <td>{song && song.artistName}</td>
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
}
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTableComponent);
