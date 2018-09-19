import * as React from "react";
import { Link } from 'react-router-dom';

export class AppNav extends React.Component {
    public render() {
        return (
            <div className="sidebar-sticky col-md-2 align-items-center "  >
                <nav className="navbar navbar-dark bg-dark flex-column">
                    <ul className="navbar-nav ml-auto margin-nav">
                        <li className="nav-item">
                            <Link to="/home" className="unset-anchor nav-link-active">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/profile" className="unset-anchor nav-link-active">profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/playlist" className="unset-anchor nav-link-active">Create Playlist</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/home" className="unset-anchor nav-link-active">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/home" className="unset-anchor nav-link-active">Home</Link>
                        </li>
                    </ul>
                </nav> 

            </div>
        )
    }
}