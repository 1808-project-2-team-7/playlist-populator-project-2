import * as React from 'react';
import { connect } from 'react-redux';

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
                ProfileComponent
            </div>
        )
    }
}

// const mapStateTo Props = () => ();

// const mapDispatchTo Prop = {}


export default connect()(ProfileComponent);