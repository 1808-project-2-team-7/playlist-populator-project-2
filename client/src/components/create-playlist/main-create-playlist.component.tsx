import * as React from "react";
import { ICreatePlaylistState, IState } from "../../reducers";
import { connect } from "react-redux";
import ChooseCategoryComponent from "./choose-category.component";
import CreatePlaylistComponent from "./create-playlist.component";
import * as createPlaylistActions from "../../actions/create-playlist/create-playlist.actions";

interface IProps extends ICreatePlaylistState {
    clearPlaylist: () => any;
}

export class MainCreatePlaylistComponent extends React.Component<IProps, {}> {

  public constructor(props: any){
    super(props);
  }

  public display= () => {
      if(!this.props.playlist.category.id){
          return (
            <ChooseCategoryComponent />
          );
      }
      else{
        return (
            <CreatePlaylistComponent />
        )
      }
  }

  public componentWillUnmount(){
    this.props.clearPlaylist();
  }

  public render() {
    return (
        <div>
            {this.display()}
        </div>      
    );
  }
}

const mapStateToProps = (state: IState) => (state.createPlaylist);
const mapDispatchToProps = {
    clearPlaylist: createPlaylistActions.clearPlaylist
}
export default connect(mapStateToProps, mapDispatchToProps)(MainCreatePlaylistComponent);