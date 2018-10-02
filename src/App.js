import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom'
import { MenuList, MenuItem, Paper} from '@material-ui/core'

import Home from './views/Home'
import LoginView from './views/LoginView'
import AdminView from './views/Admin/Admin'
import SearchCards from './views/Cards/SearchCards';
import EditUserView from './views/Admin/EditUserView'
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

const styles = theme => ({
  }
)

const INITIAL_STATE = {
  currentUser: null,
  isLoggedIn: false,
  sideOpen: false,
}

class App extends Component {
  constructor(props) {
    super()
    this.state = INITIAL_STATE;
  }

  logoutClick = () => {
    auth.signOut()
  }

  adminClick = () => {
    this.props.history.push('/admin')
  }
  loginClick = () => {
    this.props.history.push('/login')
  }

  titleClick = (props) => {
    this.props.history.push('/')
  }

  cardsClick = props => {
    this.props.history.push('/cards')
  }

  menuClick = () => {
    this.setState({sideOpen: !this.state.sideOpen})
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className={"App"}>
          <AuthUserContext>
            {authUser => {
              return <div style={{height:"100vh"}}>
                <MenuAppBar cardsClick={this.cardsClick} adminClick={this.adminClick} menuClick={this.menuClick} authUser={authUser} titleClick={this.titleClick} logoutClick={this.logoutClick} loginClick={this.loginClick}></MenuAppBar>
                <div style={{height:'calc(100% - 64px)', width: '100%',  display: 'flex', flexDirection: 'row'}}>
                {this.state.sideOpen && 
                  <Paper style={{width: '250px', zIndex:'100', position: 'absolute', height: '100%', backgroundColor: '#d50000', opacity: '.85'}}>
                    <MenuList>
                      <MenuItem><a href='/'>Home</a></MenuItem>
                      <MenuItem><a href='/cards'>Cards</a></MenuItem>
                    </MenuList>
                  </Paper>
                }
                <div style={{width: '100%'}}>
                  <Switch>
                      <Route path="/" exact component={Home} />
                      <Route path="/cards" exact component={SearchCards} />
                      {!authUser && <div><Route path="/login" authUser exact component={LoginView} />
                      </div>
                      }
                      {authUser &&
                        <div>
                          <Route path='/admin' exact component={AdminView} />
                          <Route path='/admin/editUser/:userId' component={EditUserView} />
                        </div>}
                    </Switch>
                </div>
                </div>
                </div> 
            }}
          </AuthUserContext>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles) (withAuthentication(withRouter(App)));
