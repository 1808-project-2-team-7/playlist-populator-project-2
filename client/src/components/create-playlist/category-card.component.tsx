import * as React from "react";
import { ICreatePlaylistState, IState } from "../../reducers";
import { connect } from "react-redux";
import * as images from '../../assets/category-images';
import { Card, CardImg, CardBody, CardText } from "reactstrap";
import { Category } from "../../models/Category";
import * as createPlaylistActions from "../../actions/create-playlist/create-playlist.actions";

interface IProps extends ICreatePlaylistState {
  imagePath: any;
  category: Category;
  setCategoryInformation: (category: Category) => any;
}
export class CategoryCardComponent extends React.Component<IProps, any> {

  public constructor(props: any){
    super(props);
  }

  public setCategory= () => {
    this.props.setCategoryInformation(this.props.category);
  }

  public render() {
    return (
      <div id="category-cards" onClick={this.setCategory} className="card">
        <Card>
          <CardImg id="cardImage" className="card-img-top" src={images.assetsObject[this.props.imagePath]} alt="Card image cap" />
          <CardBody className="cardBody">
              <CardText id="cardText" className="card-text">{this.props.category && this.props.category.categoryName}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => (state.createPlaylist);
const mapDispatchToProps = {
  setCategoryInformation: createPlaylistActions.setCategoryInformation
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryCardComponent);