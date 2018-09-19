import * as React from "react";
import { Link } from 'react-router-dom';

export class AppNav extends React.Component {
    public render() {
        return (
            <div className="sidebar-sticky col-md-3 align-items-center"  >
                <nav className="navbar navbar-dark bg-dark">
                    <ul className="navbar-nav ml-auto margin-nav flex-column">
                        <li className="nav-item ">
                            <Link to="/home" className="unset-anchor nav-link-active">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/profile" className="unset-anchor nav-link-active">profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/playlists/new" className="unset-anchor nav-link-active">Create Playlist</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/sign-in" className="unset-anchor nav-link-active">Sign In</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="unset-anchor nav-link-active">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/playlists/1" className="unset-anchor nav-link-active">Playlist</Link>
                        </li>
                    </ul>
                </nav>

            </div>
        )
    }
}