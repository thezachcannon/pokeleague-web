import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle'
import Lock from '@material-ui/icons/Lock'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
    state = {
    anchorEl: null,
    };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleAdmin = () => this.props.adminClick();

  handleLogout = () => this.props.logoutClick();
  handleCardsClick = () => this.props.cardsClick()

  render() {
    const { classes, authUser } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <a href='/' style={{'color': "white", 'textDecoration': "none"}}><MenuIcon /></a>
            </IconButton>
            <Typography onClick={this.props.titleClick} variant="title" color="inherit" className={classes.flex}>
              PokeLeague
            </Typography>
            {authUser && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleCardsClick}>Cards</MenuItem>
                  <MenuItem onClick={this.handleAdmin}>Admin</MenuItem>               
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>                  
                </Menu>
              </div>
            )}
            {!authUser && (
                <div>
                    <IconButton color="inherit" onClick={this.props.loginClick}>
                    
                    <Lock/>
                    </IconButton>
                
                </div>
            ) }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutClick: PropTypes.func.isRequired,
  loginClick: PropTypes.string.isRequired,
  authUser: PropTypes.object
};

export default withStyles(styles)(MenuAppBar);