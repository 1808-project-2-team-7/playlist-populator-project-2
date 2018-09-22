import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import * as homeActions from '../../actions/home/home.actions';
import { IHomeState, IState } from '../../reducers';
import PlaylistList from '../playlist/playlist-list.component';


interface IProps extends RouteComponentProps<{}>, IHomeState {
    fetchPlaylists: () => void,
}

class HomeComponent extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <PlaylistList playlists={this.props.playlists} loadMorePlaylists={this.props.fetchPlaylists} />
        )
    }
}

const mapStateToProps = (state: IState) => state.home

const mapDispatchToProps = {
    fetchPlaylists: homeActions.fetchPlaylists
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
