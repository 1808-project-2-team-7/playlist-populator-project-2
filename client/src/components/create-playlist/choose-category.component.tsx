import * as React from "react";
import { connect } from "react-redux";
import { getCategories } from "../../App";
import { Category } from "../../models/Category";
import { ICreatePlaylistState, IState } from "../../reducers";
import { CategoryCardComponent } from "./category-card.component";
import * as createPlaylistActions from "../../actions/create-playlist/create-playlist.actions";

interface ICategoryState {
  categories: Category[]
}

interface IProps extends ICreatePlaylistState {
  setCategoryInformation: (category: Category) => any;
}

export class ChooseCategoryComponent extends React.Component<IProps, ICategoryState> {

  public constructor(props: any) {
    super(props);
    this.state = { categories: [] }
  }

  public componentDidMount() {
    this.setState({
      categories: getCategories()
    })
  }

  public render() {
    const categories = this.state.categories;
    const images = categories.map(c => c.imagePath);
    return (
      <div className="container">
        {
          categories.map((category: Category, index: number) => {
            if (index % 3 === 0 && index - 2 < this.state.categories.length) {
              return (
                <div key={category.id} className="row">
                  <div className="col-sm" onClick={() => this.props.setCategoryInformation(category)}>
                    <CategoryCardComponent imagePath={images[index]} category={categories[index]} />
                  </div>
                  <div className="col-sm" onClick={() => this.props.setCategoryInformation(category)}>
                    <CategoryCardComponent imagePath={images[index + 1]} category={categories[index + 1]} />
                  </div>
                  <div className="col-sm" onClick={() => this.props.setCategoryInformation(category)}>
                    <CategoryCardComponent imagePath={images[index + 2]} category={categories[index + 2]} />
                  </div>
                </div>
              )
            }
            return;
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => (state.createPlaylist);
const mapDispatchToProps = { setCategoryInformation: createPlaylistActions.setCategoryInformation }
export default connect(mapStateToProps, mapDispatchToProps)(ChooseCategoryComponent);