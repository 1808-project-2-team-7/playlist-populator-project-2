import * as React from "react";
import { IState, IPlaylistCardState } from "../../reducers";
import { connect } from "react-redux";
import Card from "reactstrap/lib/Card";
import CardImg from "reactstrap/lib/CardImg";
import CardImgOverlay from "reactstrap/lib/CardImgOverlay";
import { CardTitle, CardText } from "reactstrap";




export class PlaylistCard extends React.Component<IPlaylistCardState, any> {
    public render() {
        return (
            <div>
                <Card >
                    <CardImg width="100%" src="" alt="category" />
                    <CardImgOverlay>
                        <CardTitle>Playlist Name(Category)</CardTitle>
                        <CardText>Creator<br/>
                        Song#
                        </CardText>
                    </CardImgOverlay>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state: IState, ownProp: any) => state.playlistCard;
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)
    (PlaylistCard);
