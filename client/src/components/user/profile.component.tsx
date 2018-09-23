import * as React from 'react';
import { connect } from 'react-redux';
import PlaylistList from '../playlist/playlist-list.component';
import { IState, IUserState } from '../../reducers';
import { RouteComponentProps } from 'react-router';
import * as userActions from '../../actions/user/user.actions'
import { getCurrentUser } from "../../App";
import history from '../../history';
import { store } from '../../store';


interface IProps extends RouteComponentProps<{}>, IUserState {
    fetchUserPlaylists: (id: number) => void,
}

class ProfileComponent extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
        
    }
    public componentWillMount = () => {
        if (getCurrentUser() === null) {
            return history.push('/home')
        };
    }

    public componentDidMount = () => {
        this.props.fetchUserPlaylists(1);
    }

    public render() {
        const cUser = store.getState().currentUser;
        return (
            <div>
                <div >
                    <img className="d-block mx-auto rounded-circle mx-auto"
                         src= "https://jooinn.com/images/fantasy-6.jpg" alt="revature" />
                         <p className="text-center"></p>

                </div>
                <PlaylistList playlists={this.props.userPlaylists} loadMorePlaylists={this.props.fetchUserPlaylists} doneLoading={this.props.doneLoading} />
            </div>
        )
    }
}

 const mapStateToProps = (state: IState) => state.user;

 const mapDispatchToProps = {
         fetchUserPlaylists: userActions.fetchUserPlaylists
 }


export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);