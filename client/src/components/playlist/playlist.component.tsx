import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Card from 'reactstrap/lib/Card';
import CardHeader from 'reactstrap/lib/CardHeader';
import { Song } from '../../models/Song';
import { IState, IPlaylistState } from '../../reducers';
import { SongComponent } from '../song/song.component';
import * as playlistActions from '../../actions/playlist/playlist.actions';

interface IProps extends RouteComponentProps<{ id: string | undefined }>, IPlaylistState {
    fetchSongs: (playlistId: number) => void
}

class PlaylistComponent extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public componentDidMount = () => {
        const id = this.props.match.params.id;
        if (id && parseInt(id, 10) && parseInt(id, 10) > 0) {
            this.props.fetchSongs(parseInt(id, 10));
        }
    }

    public render() {
        const { playlist } = this.props;
        const songs = playlist.songs;
        return (
            <div className="container">
                <Card>
                    <CardHeader className="text-white bg-dark">
                        <span className="my-auto">{playlist.name}</span>
                    </CardHeader>
                </Card>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Artist</th>
                            </tr>
                        </thead>
                        <tbody>
                            {songs.map((song: Song) => {
                                return <SongComponent song={song} key={song.id} />
                            })}
                        </tbody>
                    </table>
                </div>
                {songs.length === 0 &&
                    <div className="container">
                        <div className="row">
                            <div id="no-songs-msg" className="mx-auto">
                                <div className="alert alert-info" role="alert">
                                    <span>This playlist has no songs.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => state.playlist

const mapDispatchToProps = {
    fetchSongs: playlistActions.fetchSongs
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistComponent);