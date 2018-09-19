import * as React from 'react';

import { connect } from 'react-redux';
import { ViewPlaylist } from '../playlist/view-playlist.component'
import {Input, InputGroupAddon, InputGroup } from 'reactstrap';
import { Playlist } from '../../models/Playlist';
import { IState } from '../../reducers';

interface IProps {
    playlist: Playlist
    id: number
}

class ProfileComponent extends React.Component<IProps, {}> {
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
                <InputGroup>
                <Input placeholder="Enter the playlist id" value={0} type="number"/>
                <InputGroupAddon addonType="append"><button type="submit" /*onSubmit={this.updateId}*/>Load Playlist</button></InputGroupAddon>
                </InputGroup>
                    { ViewPlaylist }
                </div>
            </div>
        )
    }
}

 const mapStateToProps = (state: IState) => (state.playlist);

/* const mapDispatchTo Prop = {
        updatePlaylistId: 
}*/


export default connect(mapStateToProps)(ProfileComponent);