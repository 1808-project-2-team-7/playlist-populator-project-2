import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Playlist } from '../../models/Playlist';
import { IState, IPlaylistListState } from '../../reducers';
import { PlaylistCard } from './playlist-card.component';
import * as playlistListActions from '../../actions/playlist/playlist-list.actions';

interface IProps extends RouteComponentProps<{}>, IPlaylistListState {
    filterPlaylists: (playlists: Playlist[], filter: string[]) => void
    playlists: Playlist[]
}

class PlaylistList extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        const { playlists } = this.props;
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    {playlists.map((playlist: Playlist) => {
                        return <PlaylistCard playlist={playlist} key={playlist.id} />
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => state.playlistList

const mapDispatchToProps = {
    filterPlaylists: playlistListActions.filterPlaylists
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistList);