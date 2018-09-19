import * as React from 'react';

import { connect } from 'react-redux';
// import { Playlist } from '../../models/Playlist';
// import { ListPlaylist } from '../playlist/list-playlists.component'

// interface IProps {
//     // playlist: Playlist
// }

class ProfileComponent extends React.Component<any, {}> {
    constructor(props: any) {
        super(props);
        
    }

    // public updateId = (e:number) => {

    // }

    public render() {
 //       const {playlist} = this.props;
        console.log(this.props.id);
        return (
            <div>
                <div >
                    <img className="d-block mx-auto rounded-circle mx-auto"
                         src= "https://jooinn.com/images/fantasy-6.jpg" alt="revature" />
                         <p className="text-center">Users name</p>

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