import React, { Component } from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './views/Home'
import LoginView from './views/LoginView'
import AdminView from './views/Admin'
import { auth } from './firebase/firebase';

import AuthUserContext from './components/Session/AuthUserContext';
import withAuthentication from './components/Session/withAuthentication';
import MenuAppBar from './components/MenuAppBar';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff5131',
      main: '#d50000',
      dark: '#9b0000',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#5472d3',
      main: '#0d47a1',
      dark: '#002171',
      contrastText: '#ffffff',
    },
  }
});

const INITIAL_STATE = {
  currentUser: null,
  isLoggedIn: false,
  loginRoute: '/login'
}
class App extends Component {
  constructor(props){
    super()
    this.state = INITIAL_STATE;
  }
  
  logoutClick = () =>{
      auth.signOut()
  }

  loginClick = () => {
    // window.history.push('/login')
  }

  titleClick = (props, context) => {
    // history.push('/')
  }

  render() {
    return (
      <BrowserRouter>
      <MuiThemeProvider theme={theme}>
          <div className="App">
          <AuthUserContext>
            { authUser => { return <div>
            <MenuAppBar authUser={authUser} titleClick={this.titleClick} logoutClick={this.logoutClick} loginClick={this.loginClick}></MenuAppBar>
            <Switch>
              <Route path="/" exact component={Home} />
              { !authUser &&  <div><Route path="/login" authUser exact component={LoginView} />
                             </div>
              }
             { authUser && <div><Route path='/admin' exact component={AdminView} /> </div>}
             </Switch>
              </div>
            }}
            
            
             
          </AuthUserContext>
          </div>
          </MuiThemeProvider> 
      </BrowserRouter>
    );
  }
}

export default withAuthentication(App);
