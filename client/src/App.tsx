import * as React from 'react';
import { Provider } from 'react-redux';
import { Router, Switch } from 'react-router-dom';
import { fetchCategories } from './actions/category/category.actions';
import './App.css';
import MainCreatePlaylistComponent from './components/create-playlist/main-create-playlist.component';
import HomeComponent from './components/home/home.component';
import LogoutComponent from './components/logout/logout.component';
import { AppNav } from './components/navigation/app-nav';
import PlaylistComponent from './components/playlist/playlist.component';
import RegisterComponent from './components/register/register.component';
import SignInComponent from './components/sign-in/sign-in.component';
import ProfileComponent from './components/user/profile.component';
import history from './history';
import './include/bootstrap';
import { User } from './models/User';
import { store } from './store';
import { ProtectedRoute } from './components/routes/protected-route.component';



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
                <ProtectedRoute path="/profile" component={ProfileComponent} />
                <ProtectedRoute path="/sign-in" component={SignInComponent} />
                <ProtectedRoute path="/register" component={RegisterComponent} />
                <ProtectedRoute path="/playlists/new" component={MainCreatePlaylistComponent} />
                <ProtectedRoute path="/playlists/:id" component={PlaylistComponent} />
                <ProtectedRoute path="/home" component={HomeComponent} />
                <ProtectedRoute path="/logout" component={LogoutComponent} />
                <ProtectedRoute component={HomeComponent} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
