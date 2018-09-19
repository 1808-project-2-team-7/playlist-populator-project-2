import * as React from 'react';
import { Song } from '../../model/Song';

interface IProps {
    song: Song
}

export const SongComponent: React.StatelessComponent<IProps> = (props) => {
    const { song } = props;
    return (
        <tr className="reimbursement-table-row">
            <th scope="row">{song.id}</th>
            <td>{song.trackName}</td>
            <td>{song.artistName}</td>
        </tr>
    );
}