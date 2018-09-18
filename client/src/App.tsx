import * as React from 'react';
import './App.css';
import './include/bootstrap'

import { BrowserRouter, Route, Switch} from 'react-router-dom';
import HomeComponent from './components/home/home.component';
import ProfileComponent from './components/user/profile.component';
import PlaylistComponent from './components/playlist/create-playlist.component'
import SignInComponent from './components/sign-in/sign-in.component';

import { AppNav} from './components/navigation/app-nav';
import { Provider } from 'react-redux';
import { store } from './Store';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="container mx-0 px-0">
            <div className="row">
              < AppNav />
              <div id ="main-content-container col-md-9" >
                <Switch>
                  <Route path="/profile" component={ProfileComponent} />
                  <Route path="/signIn" component={SignInComponent} />
                  <Route path="/playlist" component={PlaylistComponent} />
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
