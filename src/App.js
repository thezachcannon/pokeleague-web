import React, { Component } from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import './App.css';
import { AppBar, Toolbar, Typography, Grid } from '@material-ui/core';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Home from './views/Home'

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

class App extends Component {
  render() {
    return (
      <Router>
      <MuiThemeProvider theme={theme}>
      <div className="App">
        <AppBar color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              PokeLeauge
            </Typography>
          </Toolbar>
        </AppBar>
        <div  style={{"height": "100vh", "display": "flex"}}>
        <Grid container alignContent="center" justify="center" alignItems="center">
        <Route path="/" exact component={Home} />
        </Grid>
        </div>        
      </div>
      </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
