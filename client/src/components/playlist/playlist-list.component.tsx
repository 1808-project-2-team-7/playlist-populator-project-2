import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Playlist } from '../../models/Playlist';
import { IState, IPlaylistListState } from '../../reducers';
import { PlaylistCard } from './playlist-card.component';
import * as playlistListActions from '../../actions/playlist/playlist-list.actions';
import { ButtonGroup } from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import { getCategories } from '../../App';
import { Category } from '../../models/Category';

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
        const buttonStyles = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];
        return (
            <div className="container-fluid">
                <ButtonGroup className="playlist-list-buttons row justify-content-center">
                    {getCategories().map((category: Category, index: number) => {
                        return <Button outline color={buttonStyles[index % buttonStyles.length]} key={category.id} onClick={() => this.props.filterPlaylists(playlists, this.toggleFilter(categoryFilter, category.categoryName), nameFilter)} active={categoryFilter.indexOf(category.categoryName) >= 0}>{category.categoryName}</Button>
                    })
                    }
                </ButtonGroup>
                <div className="row justify-content-center" id="input-name-filter">
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