import * as React from 'react';
import { connect } from 'react-redux';
import PlaylistList from '../playlist/playlist-list.component';
import { IState, IUserState } from '../../reducers';
import { RouteComponentProps } from 'react-router';
import * as userActions from '../../actions/user/user.actions'
import { getCurrentUser } from "../../App";

import { User } from '../../models/User';

interface IProps extends RouteComponentProps<{}>, IUserState {
    fetchUserPlaylists: (id: number) => void,
}

class ProfileComponent extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentUser: {}
        }
    }

    public componentDidMount = () => {
        const currentUser1 = getCurrentUser();
        if (!(currentUser1 instanceof User)) {
            this.props.history.push('home');
        }

    }
    public render() {
        const currentUser = getCurrentUser();

        if (currentUser) {
            return (
                <div>
                    <div >
                        {currentUser.bucketKey &&
                            <img className="d-block mx-auto rounded-circle mx-auto profile-picture"
                                src={currentUser.bucketKey} alt="revature" />
                        }
                        <h2 className="text-center">{currentUser.username}</h2>

                    </div>
                    <PlaylistList page={this.props.page} playlists={this.props.userPlaylists} loadMorePlaylists={this.props.fetchUserPlaylists} doneLoading={this.props.doneLoading} userId={currentUser.id} />
                </div>
            )
        }
        return null;
    }

}

const mapStateToProps = (state: IState) => state.user;

const mapDispatchToProps = {
    fetchUserPlaylists: userActions.fetchUserPlaylists
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);