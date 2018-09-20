import * as React from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../App';

interface IProps {
    filler: any;
    history: any;
}

class HomeComponent extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props);
    }
    public componentDidMount(){
        if (getCurrentUser() === null){
        this.props.history.push("/sign-in");
        }
    }
    public render() {
        return (
            <div>
                HomeComponent
            </div>
        )
    }
}

// const mapStateTo Props = () => ();

// const mapDispatchTo Prop = {}


export default connect()(HomeComponent);