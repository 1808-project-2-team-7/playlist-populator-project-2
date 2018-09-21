import * as React from "react";
import { ICreatePlaylistState, IState } from "../../reducers";
import * as createPlaylistActions from "../../actions/create-playlist/create-playlist.actions";
import { connect } from "react-redux";
import InputSongsComponent from "./input-songs.component";
import PlaylistTableComponent from "./playlist-table.component";
import SuggestedSongsTableComponent from "./suggested-songs-table.component";
import { Song } from "../../models/Song";
import { Playlist } from "../../models/Playlist";
import { User } from "../../models/User";
import { Button, Col, Row, Container } from "reactstrap";
import { getCurrentUser } from "../../App";

interface IProps extends ICreatePlaylistState {
  clearPlaylist: () => any;
  getAccessToken: () => any;
  getSongsFromDatabase: (playlist: Playlist, spotifyApiSongs: Song[]) => any;
  getSongsFromSpotifyApi: (songs: Song[], accessToken: string) => any;
  savePlaylistToDatabase: (playlist: Playlist) => any;
  sendImageToDatabase: (file: any) => any;
  setPlaylistOwner: (owner: User | null) => any;
  updateErrorMessage: (message: string) => any;
}

interface ICreatePlaylistComponentState {
  playlistImageSrc: string
}

export class CreatePlaylistComponent extends React.Component<IProps, ICreatePlaylistComponentState> {

  public constructor(props: any){
    super(props);
    this.state={
      playlistImageSrc: ''
    }
  }

  public populate= async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(this.props.playlist.songs.length < 5){
      const spotifyApiSongs=await this.props.getSongsFromSpotifyApi(this.props.playlist.songs, this.props.accessToken);
      this.props.getSongsFromDatabase(this.props.playlist, spotifyApiSongs);
    }
    else{
      this.props.updateErrorMessage('Please enter no more than 5 songs');
    }
  }

  public savePlaylist= () => {
    this.props.savePlaylistToDatabase(this.props.playlist);
  }

  public discardPlaylist= () => {
    this.props.clearPlaylist();
  }

  public showSave= () => {
    if(this.props.playlist.songs.length >= 1){
      return (
        <div className="container">
          <form onSubmit={this.savePlaylist}>
            <div className="form-group container">
                <Button className="submitButton" type="submit"> Save Playlist </Button>
            </div>
          </form>
        </div>
      )
    }
    return;
  }

  public showDiscard= () => {
    if(this.props.playlist.songs.length >= 1){
      return (
        <div className="container">
          <form onSubmit={this.discardPlaylist}>
            <div className="form-group container">
                <Button className="submitButton" type="submit"> Discard Playlist </Button>
            </div>
          </form>
        </div>
      )
    }
    return;
  }

  public showPopulateButton= () => {
    if(this.props.playlist.songs.length >= 3){
      return (
        <form onSubmit={this.populate}>
            <div className="form-group container">
                <Button className="submitButton" type="submit"> Populate </Button>
            </div>
        </form>
      )
    }
    return;
  }

  public playlistTable= () => {
    if(this.props.playlist.songs.length){
      return (
        <PlaylistTableComponent />
      )
    }
    return;
  }

  public suggestedSongsTable= () => {
    if(this.props.suggestedSongs.length){
      return (
        <SuggestedSongsTableComponent />
      )
    }
    return;
  }

  public uploadImage= (e: any) => {
    const file=e.target && e.target.files[0];
    this.props.sendImageToDatabase(file);
    const fReader  = new FileReader();
    fReader.readAsDataURL(file);
    fReader.onload= (loadedFile: any) => {
      const readFile=loadedFile && loadedFile.target.result;
      if(readFile){
        this.setState({
          ...this.state,
          playlistImageSrc: readFile
        });
      }
    }
  }

  public componentDidMount(){
    this.props.getAccessToken();
    this.props.setPlaylistOwner(getCurrentUser());
  }

  public render() {
    return (
      <div className="container">
        <Container>
        <Row>
          <Col><InputSongsComponent /></Col>
          <Col>
            <div className="container">
              <label> Upload Playlist Image: </label>
              <input
                onChange={this.uploadImage}
                type="file"
                id="inputPlaylistImage"
                className="form-control"
                placeholder="Upload Playlist Image" />
                <div className="container">
                  <img id="imagePreview" src={this.state.playlistImageSrc}/>
                </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{this.showPopulateButton()}</Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>{this.playlistTable()}</Col>
          <Col>{this.suggestedSongsTable()}</Col>
        </Row>
        <Row>
          <Col>{this.showSave()}</Col>
          <Col></Col>
        </Row>
        <Row>
          <Col>{this.showDiscard()}</Col>
          <Col></Col>
        </Row>
        </Container>
        {this.props.errorMessage}
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => (state.createPlaylist);
const mapDispatchToProps = {
  clearPlaylist: createPlaylistActions.clearPlaylist,
  getAccessToken: createPlaylistActions.getAccessToken,
  getSongsFromDatabase: createPlaylistActions.getSongsFromDatabase,
  getSongsFromSpotifyApi: createPlaylistActions.getSongsFromSpotifyApi,
  savePlaylistToDatabase: createPlaylistActions.savePlaylistToDatabase,
  sendImageToDatabase: createPlaylistActions.sendImageToDatabase,
  setPlaylistOwner: createPlaylistActions.setPlaylistOwner,
  updateErrorMessage: createPlaylistActions.updateErrorMessage
}
export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylistComponent);