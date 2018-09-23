import * as React from 'react';

import { connect } from 'react-redux';
import { getCurrentUser } from '../../App';
import { User } from '../../models/User';
// import { Playlist } from '../../models/Playlist';
// import { ListPlaylist } from '../playlist/list-playlists.component'

// interface IProps {
//     // playlist: Playlist
// }

class ProfileComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentUser:{}
        }
    }

    // public updateId = (e:number) => {

    // }
    public componentDidMount(){
        const currentUser1 = getCurrentUser();
        if (!(currentUser1 instanceof User)){
            this.props.history.push('home');
        }
        else{
            this.setState({currentUser:currentUser1});
        }
    }
    public render() {
 //       const {playlist} = this.props;
        
        return (
            <div>
                <div >
                    <img className="d-block mx-auto rounded-circle mx-auto"
                         src= {this.state.currentUser.bucketKey} alt="revature" />
                         <p className="text-center">{this.state.currentUser.username}</p>

                </div>
                <div>
                    {/* <ListPlaylist filler= {""}/> */}
                </div>
            </div>
        )
    }
}

// const mapStateToProps = (state: IState) => (state.playlist);

/* const mapDispatchTo Prop = {
        updatePlaylistId: 
}*/


export default connect()(ProfileComponent);