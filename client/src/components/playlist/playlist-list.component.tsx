import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Waypoint from 'react-waypoint';
import Button from 'reactstrap/lib/Button';
import * as playlistListActions from '../../actions/playlist/playlist-list.actions';
import { getCategories } from '../../App';
import { Category } from '../../models/Category';
import { Playlist } from '../../models/Playlist';
import { IPlaylistListState, IState } from '../../reducers';
import { PlaylistCard } from './playlist-card.component';
import { CategoryCardComponent } from '../create-playlist/category-card.component';

interface IProps extends RouteComponentProps<{}>, IPlaylistListState {
    doneLoading: boolean
    filterPlaylists: (playlists: Playlist[], categoryFilter: Category[], nameFilter: string) => void
    loadMorePlaylists: (page: number, userId?: number) => void
    playlists: Playlist[]
    updateLoading: (isLoading: boolean) => void
}

class PlaylistList extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public componentDidUpdate(prevProps: IProps) {
        if (this.props.playlists.length > prevProps.playlists.length) {
            this.props.updateLoading(false);
        }
        if (this.props.isLoading && !prevProps.isLoading) {
            this.props.loadMorePlaylists(this.props.page);
        }
        if (this.props.categoriesFetched && !prevProps.categoriesFetched || this.props.playlists !== prevProps.playlists) {
            this.props.filterPlaylists(this.props.playlists, this.props.categoryFilter, this.props.nameFilter);
        }
    }

    public render() {
        const { playlists, filteredPlaylists, categoryFilter, nameFilter, doneLoading } = this.props;
        return (
            <div className="container-fluid" id="playlist-list-filters">
                <div className="playlist-list-buttons row justify-content-center categories">
                    {getCategories().map((category: Category) => {
                        return (
                            <Button key={category.id} onClick={() => this.props.filterPlaylists(playlists, this.toggleFilter(categoryFilter, category), nameFilter)} active={categoryFilter.indexOf(category) >= 0}>
                                <CategoryCardComponent key={category.id} imagePath={category.imagePath} category={category} />
                            </Button>
                        )
                    })
                    }
                </div>
                <div className="playlist-list-buttons row justify-content-center">
                    <Button color={"primary"} onClick={() => this.props.filterPlaylists(playlists, getCategories(), nameFilter)}>Select all categories</Button>
                    <Button color={"primary"} onClick={() => this.props.filterPlaylists(playlists, [], nameFilter)}>Deselect all categories</Button>
                </div>
                <div className="row justify-content-center">
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
                {!doneLoading &&
                    <div className="row justify-content-center">
                        {this.props.isLoading ? null :
                            <Waypoint
                                onEnter={() => this.props.updateLoading(true)}
                            />}
                        <div className="alert alert-info" role="alert">
                            Loading more playlists...
                        </div>
                    </div>
                }
            </div>
        );
    }

    private toggleFilter = (oldStatusFilter: Category[], status: Category) => {
        return oldStatusFilter.some(filter => filter === status) ? oldStatusFilter.filter(filter => filter !== status) : oldStatusFilter.slice().concat(status);
    }
}

const mapStateToProps = (state: IState) => state.playlistList

const mapDispatchToProps = {
    filterPlaylists: playlistListActions.filterPlaylists,
    updateLoading: playlistListActions.updateLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistList);