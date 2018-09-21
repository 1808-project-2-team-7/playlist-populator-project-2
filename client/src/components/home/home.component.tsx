import * as React from 'react';
import { connect } from 'react-redux';
// import { Filter } from './category-filter';
import { IState, ICategoryState } from '../../reducers';
import * as FilterCategories from '../../actions/category/category.action'


interface IProps extends ICategoryState {
    loadCategories: () => any
    check: () => any
}

class HomeComponent extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
    }

    public check= () => {
        this.props.loadCategories();
        this.props.check();
        console.log(this.props.categories)
    }

    public render() {

        {
            if (this.props.categories === null) {
                this.props.loadCategories();
            }
        }

        return (
            <div>
                HomeComponent
                <button onClick={this.check} >Check State</button>
            </div>
        )
    }
}

 const mapStateToProps = (state: IState) => (state.categories);

const mapDispatchToProp = {
    check: FilterCategories.stateCheck,
    loadCategories: FilterCategories.loadCategories,
}


export default connect(mapStateToProps, mapDispatchToProp)(HomeComponent);