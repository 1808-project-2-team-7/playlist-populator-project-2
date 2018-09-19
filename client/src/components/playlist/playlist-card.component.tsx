import * as React from "react";
import { IState, IPlaylistCardState } from "../../reducers";
import { connect } from "react-redux";
import Card from "reactstrap/lib/Card";
import CardImg from "reactstrap/lib/CardImg";
import CardImgOverlay from "reactstrap/lib/CardImgOverlay";
import { CardTitle, CardText } from "reactstrap";
import { Playlist } from "../../models/Playlist";

interface IProps extends IPlaylistCardState{
    playlistId: number
}

export class PlaylistCard extends React.Component<IProps, any> {
    public render() {
        // const fakePlaylists:Playlist[] = [new Playlist(1,"Testlist","",new Category(1,"realCat"),new User(1,"uname"),[]),new Playlist(3,"Test3list","",new Category(1,"real3Cat"),new User(1,"u3name"),[new Song()]),new Playlist(2,"Test2list","",new Category(1,"realCat2"),new User(1,"u2name"),[new Song(), new Song(), new Song()])]
        let currentPlaylist:Playlist;
        const playlistCheck:any =this.props.playlists.find((pl:Playlist)=>{
            if(pl.id === this.props.playlistId){
                return true;
            }
            return false;
        });
        if (playlistCheck instanceof Playlist){
            currentPlaylist = playlistCheck;
        }
        else{
            currentPlaylist = new Playlist();
        }
        return (
                <Card style={{width:240, height:240} } >
                    <CardImg height="100%" src={require(`../../images/test.png`)} alt="category" />
                    <CardImgOverlay>
                        <CardTitle>{currentPlaylist.name}  ({currentPlaylist.category.categoryName})</CardTitle>
                        <CardText>{currentPlaylist.owner.username}<br/>
                        # of Songs: {currentPlaylist.songs.length}
                        </CardText>
                    </CardImgOverlay>
                </Card>
        )
    }
}
const mapStateToProps = (state: IState, ownProp: any) => {
    return {
        ...state.playlistCard,
        playlistId: ownProp.playlistId
    }
};
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)
    (PlaylistCard);
