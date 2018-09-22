import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../../App';

export class ProtectedRoute extends React.Component<any, {}> {
    public render() {
        const { component: Component, ...props } = this.props
        const createPlaylistsRoute = props.path === '/playlists/new';
        return (
            <Route
                {...props}
                render={prop => (
                    !getCurrentUser() && createPlaylistsRoute ?
                        <Redirect to='/sign-in' /> : <Component {...prop} />)
                }
            />
        )
    }
}