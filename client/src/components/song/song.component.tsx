import * as React from 'react';
import { Song } from '../../models/Song';

interface IProps {
    song: Song
}

export const SongComponent: React.StatelessComponent<IProps> = (props) => {
    const { song } = props;
    return (
        <tr>
            <td className="song-row">{song.trackName}</td>
            <td className="song-row">{song.artistName}</td>
        </tr>
    );
}