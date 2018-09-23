import * as React from 'react';
import { connect } from 'react-redux';
import PlaylistList from '../playlist/playlist-list.component';
import { IState, IUserState } from '../../reducers';
import { RouteComponentProps } from 'react-router';
import * as userActions from '../../actions/user/user.actions'
import { getCurrentUser } from "../../App";
import history from '../../history';
import { User } from '../../models/User';

interface IProps extends RouteComponentProps<{}>, IUserState {
    fetchUserPlaylists: (id: number) => void,
}

class ProfileComponent extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentUser:{}
        }
    }
    public componentWillMount = () => {
        if (getCurrentUser() === null) {
            return history.push('/home')
        };
    }

    public componentDidMount = () => {
        const currentUser1 = getCurrentUser();
        if (!(currentUser1 instanceof User)){
            this.props.history.push('home');
        }
        else{
            this.setState({currentUser:currentUser1});
            this.props.fetchUserPlaylists(this.state.currentUser.userId);
        }
    }
    public render() {
    
        return (
            <div>
                <div >
                    <img className="d-block mx-auto rounded-circle mx-auto"
                         src= {this.state.currentUser.bucketKey} alt="revature" />
                         <p className="text-center">{this.state.currentUser.username}</p>

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