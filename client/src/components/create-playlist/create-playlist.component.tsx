import * as React from "react";
import { ICreatePlaylistState, IState } from "../../reducers";
import * as createPlaylistActions from "../../actions/create-playlist/create-playlist.actions";
import { connect } from "react-redux";
import InputSongsComponent from "./input-songs.component";
import PlaylistTableComponent from "./playlist-table.component";
import SuggestedSongsTableComponent from "./suggested-songs-table.component";
import { Playlist } from "../../models/Playlist";
import { Button, Col, Row, Container, FormGroup, Label, Input } from "reactstrap";
import { getCurrentUser } from "../../App";
import { User } from "../../models/User";
import history from '../../history';

interface IProps extends ICreatePlaylistState {
  clearPlaylist: () => any;
  clearCategory: () => any;
  deletePlaylist: (id: number) => any;
  getAccessToken: () => any;
  savePlaylistToDatabase: (playlist: Playlist) => any;
  sendImageToDatabase: (file: any) => any;
  setPlaylistOwner: (owner: User | null) => any;
  updateMessage: (message: string) => any;
  updatePlaylistName: (name: string) => any;
}

interface ICreatePlaylistComponentState {
  playlistImageSrc: string
}

export class CreatePlaylistComponent extends React.Component<IProps, ICreatePlaylistComponentState> {

  public constructor(props: any) {
    super(props);
    this.state = {
      playlistImageSrc: ''
    }
  }

  public savePlaylist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.savePlaylistToDatabase(this.props.playlist);
    history.push('/profile');
  }

  public discardPlaylist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.deletePlaylist(this.props.playlist.id);
  }

  public showSave = () => {
    if (this.props.playlist.songs.length >= 1) {
      return (
        <div className="container">
          <form onSubmit={this.savePlaylist}>
            <div className="form-group container">
              <Button color="success" className="save-discard-button" type="submit"> Save Playlist </Button>
            </div>
          </form>
        </div>
      )
    }
    return;
  }

  public showDiscard = () => {
    if (this.props.playlist.songs.length >= 1) {
      return (
        <div className="container">
          <form onSubmit={this.discardPlaylist}>
            <div className="form-group container">
              <Button color="danger" className="save-discard-button" type="submit"> Discard Playlist </Button>
            </div>
          </form>
        </div>
      )
    }
    return;
  }

  public playlistTable = () => {
    if (this.props.playlist.songs.length) {
      return (
        <PlaylistTableComponent />
      )
    }
    return;
  }

  public showMessage = () => {
    if (this.props.playlist.songs.length > 5 && !this.props.populated) {
      return (
        <div id="create-playlist" className="alert alert-danger container message" role="alert">
          <span id="message">{this.props.message}</span>
        </div>
      )
    }
    return;
  }

  public suggestedSongsTable = () => {
    if (this.props.suggestedSongs.length) {
      return (
        <SuggestedSongsTableComponent />
      )
    }
    return;
  }

  public uploadImage = (e: any) => {
    const file = e.target && e.target.files[0];
    this.props.sendImageToDatabase(file);
    const fReader = new FileReader();
    fReader.readAsDataURL(file);
    fReader.onload = (loadedFile: any) => {
      const readFile = loadedFile && loadedFile.target.result;
      if (readFile) {
        this.setState({
          ...this.state,
          playlistImageSrc: readFile
        });
      }
    }
  }

  public updateName = (e: any) => {
    this.props.updatePlaylistName(e.target.value);
  }

  public componentDidUpdate() {
    if (this.props.playlist.songs.length > 5 && !this.props.populated) {
      this.props.updateMessage('Enter no more than 5 songs');
    }
  }

  public componentDidMount() {
    this.props.getAccessToken();
    this.props.setPlaylistOwner(getCurrentUser());
  }

  public componentWillUnmount() {
    this.props.clearPlaylist();
  }

  public changeCategory = () => {
    this.props.clearCategory();
  }

  public render() {
    return (
      <div id="create-playlist" className="container">
        <Container>
          <Row>
            <Col><InputSongsComponent /></Col>
            <Col>
              <FormGroup>
                <label> Playlist Name </label>
                <input onChange={this.updateName} type="text" className="form-control" id="formGroupExampleInput" maxLength={60} />
              </FormGroup>
              <FormGroup>
                <Label>Playlist Category </Label>
                <Row>
                  <Col>
                    <Input value={this.props.playlist.category.categoryName} disabled />
                  </Col>
                  <Col>
                    <Button onClick={this.changeCategory} type="submit"> Change Category </Button>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <label> Upload Playlist Image </label>
                <input
                  onChange={this.uploadImage}
                  type="file"
                  id="inputPlaylistImage"
                  className="form-control" />
                {/* <div className="container">
                  <img id="imagePreview" src={this.state.playlistImageSrc} />
                </div> */}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {this.showMessage()}
          </Row>
          <Row>
            <Col>{this.playlistTable()}</Col>
            <Col>{this.suggestedSongsTable()}</Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>{this.showSave()}</Col>
                <Col>{this.showDiscard()}</Col>
              </Row>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => (state.createPlaylist);
const mapDispatchToProps = {
  clearCategory: createPlaylistActions.clearCategory,
  clearPlaylist: createPlaylistActions.clearPlaylist,
  deletePlaylist: createPlaylistActions.deletePlaylist,
  getAccessToken: createPlaylistActions.getAccessToken,
  savePlaylistToDatabase: createPlaylistActions.savePlaylistToDatabase,
  sendImageToDatabase: createPlaylistActions.sendImageToDatabase,
  setPlaylistOwner: createPlaylistActions.setPlaylistOwner,
  updateMessage: createPlaylistActions.updateMessage,
  updatePlaylistName: createPlaylistActions.updatePlaylistName
}
export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylistComponent);