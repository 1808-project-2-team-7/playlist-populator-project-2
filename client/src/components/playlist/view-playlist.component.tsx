import * as React from 'react';
import { IPlaylistState } from '../../reducers';
import { Table} from 'reactstrap';
import { Playlist } from '../../models/Playlist';

interface IProps extends IPlaylistState {
    playlist: Playlist
}

export const ViewPlaylist: React.StatelessComponent<IProps> = (props) => {

    return(
        <div>

            <Table>
                <thead>
                    <tr>
                        <th>Song</th>
                        <th>Artist</th>
                    </tr>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </thead>
            </Table>
        </div>
    );
}