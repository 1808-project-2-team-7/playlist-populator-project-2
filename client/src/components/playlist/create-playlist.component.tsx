import * as React from 'react';
import { connect } from 'react-redux';

interface IProps {
    filler: any;
}

class PlaylistComponent extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div>
                <form>
                    <div className="form-row" >
                        <input type="text" className="" placeholder="Playlist name" />
                    </div>
                    <div className="form-row" >
                        <input type="select" id="Catrgories" />
                        <option selected>Choose Category</option>
                    </div>
                    <div className="form-row">
                        <div className="col">
                        <input type="text" className="form-control" placeholder="1st song / Artist" />
                        </div>
                        <div className="col">
                        <input type="text" className="form-control" placeholder="2nd song / Artist" />
                        </div>
                        <div className="col">
                        <input type="text" className="form-control" placeholder="3rd song / Artist" />
                        </div>
                        <div className="col">
                        <input type="text" className="form-control" placeholder="4th song / Artist" />
                        </div>
                        <div className="col">
                        <input type="text" className="form-control" placeholder="5th song / Artist" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

// const mapStateTo Props = () => ();

// const mapDispatchTo Prop = {}


export default connect()(PlaylistComponent);