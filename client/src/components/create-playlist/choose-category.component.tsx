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
            const categoryCards = [];
            if (index % 3 === 0) {
              for (let i = 0; i < 3; i++) {
                categoryCards.push(
                  <div key={index + i} className="col-sm" onClick={() => this.props.setCategoryInformation(categories[index + i])}>
                    <div className="card choose-category-cards">
                      <CategoryCardComponent imagePath={images[index + i]} category={categories[index + i]} />
                    </div>
                  </div>)
              }
              return (
                <div key={category.id} className="row">
                  {categoryCards}
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