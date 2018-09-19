import * as React from 'react';
import './App.css';
import './include/bootstrap'

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeComponent from './components/home/home.component';
import ProfileComponent from './components/user/profile.component';
import CreatePlaylistComponent from './components/playlist/create-playlist.component'
import PlaylistComponent from './components/playlist/playlist.component'
import SignInComponent from './components/sign-in/sign-in.component';
import RegisterComponent from './components/register/register.component';

import { AppNav } from './components/navigation/app-nav';
import { Provider } from 'react-redux';
import { store } from './store';
import { User } from './model/User';

export const getCurrentUser = () => {
  const currentUser = store.getState().currentUser;
  return currentUser ? new User(currentUser) : null;
}

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="container mx-0 px-0 my-100">
            <div className="row">
              < AppNav />
              <div className="col-md-9" id="main-content-container" >
                <Switch>
                  <Route path="/profile" component={ProfileComponent} />
                  <Route path="/sign-in" component={SignInComponent} />
                  <Route path="/register" component={RegisterComponent} />
                  <Route path="/playlists/new" component={CreatePlaylistComponent} />
                  <Route path="/playlists/:id" component={PlaylistComponent} />
                  <Route path="/home" component={HomeComponent} />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
