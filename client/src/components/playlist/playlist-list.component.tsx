import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Playlist } from '../../models/Playlist';
import { IState, IPlaylistListState } from '../../reducers';
import { PlaylistCard } from './playlist-card.component';
import * as playlistListActions from '../../actions/playlist/playlist-list.actions';
import { ButtonGroup } from 'reactstrap';
import Button from 'reactstrap/lib/Button';

interface IProps extends RouteComponentProps<{}>, IPlaylistListState {
    filterPlaylists: (playlists: Playlist[], categoryFilter: string[], nameFilter: string) => void
    playlists: Playlist[]
}

class PlaylistList extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        const { playlists, filteredPlaylists, categoryFilter, nameFilter } = this.props;
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <ButtonGroup className="playlist-list-buttons">
                        <Button outline color="warning" onClick={() => this.props.filterPlaylists(playlists, this.toggleFilter(categoryFilter, "Punk"), nameFilter)} active={categoryFilter.indexOf("Punk") >= 0}>Punk</Button>
                        <Button outline color="success" onClick={() => this.props.filterPlaylists(playlists, this.toggleFilter(categoryFilter, "Dance"), nameFilter)} active={categoryFilter.indexOf("Dance") >= 0}>Dance</Button>
                        <Button outline color="danger" onClick={() => this.props.filterPlaylists(playlists, this.toggleFilter(categoryFilter, "Rock Hard"), nameFilter)} active={categoryFilter.indexOf("Rock Hard") >= 0}>Rock Hard</Button>
                    </ButtonGroup>
                    <input
                        id="inputUsernameFilter"
                        placeholder="Filter by name"
                        type="text"
                        onChange={(e: any) => this.props.filterPlaylists(playlists, categoryFilter, e.target.value)}
                        value={nameFilter} />
                </div>
                <div className="row justify-content-center">
                    {filteredPlaylists.map((playlist: Playlist) => {
                        return <PlaylistCard playlist={playlist} key={playlist.id} />
                    })}
                </div>
            </div>
        );
    }

    private toggleFilter = (oldStatusFilter: string[], status: string) => {
        return oldStatusFilter.some(filter => filter === status) ? oldStatusFilter.filter(filter => filter !== status) : oldStatusFilter.slice().concat(status);
    }
}

const mapStateToProps = (state: IState) => state.playlistList

const mapDispatchToProps = {
    filterPlaylists: playlistListActions.filterPlaylists
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistList);