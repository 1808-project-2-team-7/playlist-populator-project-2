import * as React from 'react';
import './App.css';
import './include/bootstrap'

import { Router, Route, Switch } from 'react-router-dom';
import HomeComponent from './components/home/home.component';
import ProfileComponent from './components/user/profile.component';
import PlaylistComponent from './components/playlist/playlist.component'
import SignInComponent from './components/sign-in/sign-in.component';
import RegisterComponent from './components/register/register.component';

import history from './history'
import { AppNav } from './components/navigation/app-nav';
import { Provider } from 'react-redux';
import { store } from './store';
import { User } from './models/User';
import createPlaylistComponent from './components/create-playlist/create-playlist.component';
import { fetchCategories } from './actions/category/category.actions';

export const getCurrentUser = () => {
  const currentUser = store.getState().currentUser;
  return currentUser ? new User(currentUser) : null;
}

export const getCategories = () => {
  return store.getState().categories;
}

class App extends React.Component {
  public componentDidMount() {
    fetchCategories(store.dispatch);
  }

  public render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div id="wrapper" className="toggled">
            <div id="sidebar-wrapper">
              < AppNav />
            </div>
            <div id="main-content-wrapper">
              <Switch>
                <Route path="/profile" component={ProfileComponent} />
                <Route path="/sign-in" component={SignInComponent} />
                <Route path="/register" component={RegisterComponent} />
                <Route path="/playlists/new" component={createPlaylistComponent} />
                <Route path="/playlists/:id" component={PlaylistComponent} />
                <Route path="/home" component={HomeComponent} />
                <Route component={HomeComponent} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
