import * as React from "react";
import { ICreatePlaylistState, IState } from "../../reducers";
import { connect } from "react-redux";
import CategoryCardComponent from "./category-card.component";
import { Category } from "../../models/Category";
import { environment } from "../../environment";

interface ICategoryState {
  categories: Category[],
  imageTitles: string[]
}

export class ChooseCategoryComponent extends React.Component<ICreatePlaylistState, ICategoryState> {

  public constructor(props: any){
    super(props);
    this.state={
      categories: [new Category(1, 'Productivity'),
                  new Category(2, 'Travel'),
                  new Category(3, 'Going Out'),
                  new Category(4, 'Unwind'),
                  new Category(5, 'Exercise'),
                  new Category(6, 'Melancholy'),
                  new Category(7, 'Upbeat'),
                  new Category(8, 'Throwback'),
                  new Category(9, 'Moody')],
      imageTitles: ['productivity', 'travel', 'goingOut', 'unwind', 'exercise', 'melancholy',
                    'upbeat', 'throwback', 'moody']
    }
  }

  public componentDidMount(){
    fetch(`${environment.context}categories`)
    .then(resp => resp.json())
    .then(returnedCategories => {
      this.setState({
        categories: returnedCategories
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  public render() {
    return (
      <div className="container">
      {
        this.state.categories.map((category : Category, index: number) => {
          const categories=this.state.categories;
          const images=this.state.imageTitles;
          if(index%3===0 && index-2 < this.state.categories.length){
            return (
              <div key={category.id} className="row">
                  <div className="col-sm">
                  <CategoryCardComponent imagePath={images[index]} category={categories[index]}/>
                  </div>
                  <div className="col-sm">
                  <CategoryCardComponent imagePath={images[index+1]} category={categories[index+1]}/>
                  </div>
                  <div className="col-sm">
                  <CategoryCardComponent imagePath={images[index+2]} category={categories[index+2]}/>
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