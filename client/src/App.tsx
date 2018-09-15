import * as React from 'react';
import './App.css';
import './include/bootstrap'

import { BrowserRouter, Route, Switch} from 'react-router-dom';
import HomeComponent from './components/home/home.component';
import ProfileComponent from './components/user/profile.component';
import SignInComponent from './components/sign-in/sign-in.component';

import { AppNav} from './components/navigation/app-nav';
import { Provider } from 'react-redux';
import { store } from './store';
import CreatePlaylistComponent from './components/create-playlist/create-playlist.component';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            < AppNav />
            <div id ="main-content-container" >
              <Switch>
                <Route path="/profile" component={ProfileComponent} />
                <Route path="/signIn" component={SignInComponent} />
                <Route path="/playlists" component={CreatePlaylistComponent} />
                <Route path="/home" component={HomeComponent} />
              </Switch>
            </div>
          </div>
        </BrowserRouter> 
      </Provider>
    );
  }
}

export default App;
