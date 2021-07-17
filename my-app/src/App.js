import React, {Component} from 'react';
import {
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {initializeApp} from './redux/appReducer';
import './App.css';
import Preloader from './components/common/Preloader';
import Nav from './components/Nav/Nav'
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import HeaderContainer from './components/Header/HeaderContainer';

const UsersContainer = React.lazy(
  () => import("./components/Users/UsersContainer")
);
const Login = React.lazy(
  () => import("./components/Login/Login")
);
const ProfileContainer = React.lazy(
  () => import("./components/Profile/ProfileContainer")
);
const DialogsContainer = React.lazy(
  () => import("./components/Dialogs/DialogsContainer")
);

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }

    return (
      <div className='app-wrapper'>
        <HeaderContainer/>
        <Nav/>
        <div className={'app-wrapper-content'}>
          <React.Suspense fallback={<Preloader/>}>
            <Switch>
              <Route path='/' exact>
                <Redirect to='/profile'/>
              </Route>
              <Route path="/profile/:userID?"
                     render={() => <ProfileContainer/>}/>
              <Route path="/dialogs"
                     render={() => <DialogsContainer/>}/>
              <Route path="/users"
                     render={() => <UsersContainer/>}/>
              <Route path="/login"
                     render={() => <Login/>}/>
            </Switch>
          </React.Suspense>
          <Route path="/news"
                 render={() => <News/>}/>
          <Route path="/music"
                 render={() => <Music/>}/>
          <Route path="/settings"
                 render={() => <Settings/>}/>
          <Route path="*"
                 render={() => <div>
                   <h1>404 NOT FOUND</h1>
                 </div>}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    {initializeApp})
)(App);
