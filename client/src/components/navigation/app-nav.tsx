import * as React from "react";
import { Link } from "react-router-dom";

export class AppNav extends React.Component {
    public render() {
        return (

            <ul className="sidebar-nav">
                <li className="nav-item sidebar-brand">
                    <Link to="/home">Bubblewrap</Link>
                </li>
                <li className="nav-item">
                    <Link to="/home">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link to="/playlists/new">Create Playlist</Link>
                </li>
                <li className="nav-item">
                    <Link to="/sign-in">Sign In</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/playlists/1">Playlist</Link>
                </li>
            </ul>
        )
    }
}