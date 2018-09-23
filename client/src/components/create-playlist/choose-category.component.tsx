import * as React from "react";
import { connect } from "react-redux";
import { getCategories } from "../../App";
import { Category } from "../../models/Category";
import { ICreatePlaylistState, IState } from "../../reducers";
import CategoryCardComponent from "./category-card.component";

interface ICategoryState {
  categories: Category[]
}

export class ChooseCategoryComponent extends React.Component<ICreatePlaylistState, ICategoryState> {

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
                  <div className="col-sm">
                    <CategoryCardComponent imagePath={images[index]} category={categories[index]} />
                  </div>
                  <div className="col-sm">
                    <CategoryCardComponent imagePath={images[index + 1]} category={categories[index + 1]} />
                  </div>
                  <div className="col-sm">
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
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(ChooseCategoryComponent);