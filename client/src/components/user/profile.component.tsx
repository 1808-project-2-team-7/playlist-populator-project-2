import * as React from 'react';
import { connect } from 'react-redux';
import { ListPlaylist } from '../playlist/list-playlists.component'

interface IProps {
    filler: any;
}

class ProfileComponent extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div>
                <div >
                    <img className="img-adjust-position img-responsive rounded-circle mx-auto"
                         src= "" alt="revature" />
                         <p className="text-center">Users name</p>

                </div>
                <div>
                    <ListPlaylist filler= {""}/>
                </div>
            </div>
        )
    }
}

// const mapStateTo Props = () => ();

// const mapDispatchTo Prop = {}


export default connect()(ProfileComponent);