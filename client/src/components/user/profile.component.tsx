import * as React from 'react';
import { connect } from 'react-redux';
import PlaylistList from '../playlist/playlist-list.component';
import { IState, IUserState } from '../../reducers';
import { RouteComponentProps } from 'react-router';
import * as userActions from '../../actions/user/user.actions'


interface IProps extends IUserState, RouteComponentProps<{}> {
    fetchUserPlaylists: () => void,
}

class ProfileComponent extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
        
    }

    public componentDidMount = () => {
        this.props.fetchUserPlaylists();
    }

    public render() {
 //       const {playlist} = this.props;
        return (
            <div>
                <div >
                    <img className="d-block mx-auto rounded-circle mx-auto"
                         src= "https://jooinn.com/images/fantasy-6.jpg" alt="revature" />
                         <p className="text-center">Users name</p>

                </div>
                <PlaylistList playlists={this.props.userPlaylists} />
            </div>
        )
    }
}

 const mapStateToProps = (state: IState) => state.user;

 const mapDispatchToProps = {
         fetchUserPlaylists: userActions.fetchUserPlaylists
 }


export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);