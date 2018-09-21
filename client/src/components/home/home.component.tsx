import * as React from 'react';
import { connect } from 'react-redux';
import { IState, IHomeState } from '../../reducers';
import * as homeActions from '../../actions/home/home.actions';
import PlaylistList from '../playlist/playlist-list.component';
import { RouteComponentProps } from 'react-router';


interface IProps extends RouteComponentProps<{}>, IHomeState {
    fetchPlaylists: () => void,
}

class HomeComponent extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
    }

    public componentDidMount = () => {
        this.props.fetchPlaylists();

    }

    public render() {

        return (
            <PlaylistList playlists={this.props.playlists} />
        )
    }
}

const mapStateToProps = (state: IState) => state.home

const mapDispatchToProps = {
    fetchPlaylists: homeActions.fetchPlaylists
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
