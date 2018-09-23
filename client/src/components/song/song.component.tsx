import * as React from 'react';
import { Song } from '../../models/Song';

interface IProps {
    song: Song
}

export const SongComponent: React.StatelessComponent<IProps> = (props) => {
    const { song } = props;
    return (
        <tr>
            <td>{song.trackName}</td>
            <td>{song.artistName}</td>
        </tr>
    );
}