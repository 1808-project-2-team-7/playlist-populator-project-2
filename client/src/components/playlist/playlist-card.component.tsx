import * as React from "react";

import Card from "reactstrap/lib/Card";
import CardImg from "reactstrap/lib/CardImg";
import CardImgOverlay from "reactstrap/lib/CardImgOverlay";
import { CardTitle, CardText } from "reactstrap";
import { Playlist } from "../../models/Playlist";
import { Link } from "react-router-dom";

interface IProps {
    playlist: Playlist
}

export const PlaylistCard: React.StatelessComponent<IProps> = (props) => {
    const { playlist } = props;
    return (
        <div className="playlist-card-container">
        <Link to={"/playlists/"+playlist.id}>
            <Card className="playlist-card" >
                <CardImg height="100%" src={playlist.bucketKey} alt="category" />
                <CardImgOverlay>
                    <CardTitle>{playlist.name}  ({playlist.category.categoryName})</CardTitle>
                    <CardText>{playlist.owner.username}<br />
                        # of Songs: {playlist.songs.length}
                    </CardText>
                </CardImgOverlay>
            </Card>
            </Link>
        </div>
    )
}
