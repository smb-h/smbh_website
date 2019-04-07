import React from "react"
import { NavLink } from 'react-router-dom'
import Header from "./Header"
import withStyles from "@material-ui/core/styles/withStyles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Button from "@material-ui/core/Button"
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Typography from '@material-ui/core/Typography'
// Icons
import AccountCircle from "@material-ui/icons/AccountCircle"
import AccountBox from "@material-ui/icons/AccountBox"
import IconButton from '@material-ui/core/IconButton'
import Home from '@material-ui/icons/HomeRounded'
import Cafe from '@material-ui/icons/LocalCafeRounded'
import SpeakerNotes from '@material-ui/icons/SpeakerNotesRounded'
import Add from '@material-ui/icons/AddRounded'
import AccountBalance from '@material-ui/icons/AccountBalanceWallet'
// Style
import navBarStyle from "./NavBarStyle"



class NavBar extends React.Component {
  state={
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const SmbhLogo = (<p>SMB<span>&nbsp;</span><span className={classes.HColor}>H</span></p>);

    return (

        <div id="navbar" className={classes.navbar}>

            {/* NavBar */}
            <Header
              // brand="SMB H"
              brand={SmbhLogo}
              color="dark"
              rightLinks={
                <List className={classes.list} >

                  {/* Home */}
                  <ListItem className={classes.listItem}>
                    <NavLink to={{
                      pathname: `/en/`,
                      state: {fromDashboard: false},
                    }} maintainScrollPosition={false} activeClassName='navActive' className={classes.navLink} >
                      <Typography variant='subheading' className={classes.navLink}> <Home className={classes.icons} /> Home </Typography>
                    </NavLink>
                  </ListItem>

                  {/* Blog */}
                  <ListItem className={classes.listItem}>
                      <NavLink to={{
                        pathname: `/en/Blog/`,
                        state: {fromDashboard: false},
                      }} maintainScrollPosition={false} activeClassName='navActive' className={classes.navLink} >
                        <Typography variant='subheading' className={classes.navLink}> <Cafe className={classes.icons} /> Blog </Typography>
                      </NavLink>
                  </ListItem>

                  {/* Profile */}
                  <ListItem className={classes.listItem}>
                  <NavLink to={{
                    pathname: `/en/Profile/`,
                    state: {fromDashboard: false},
                  }} maintainScrollPosition={false} activeClassName='navActive' className={classes.navLink} >
                    <Typography variant='subheading' className={classes.navLink}> <AccountBox className={classes.icons} /> Profile </Typography>
                  </NavLink>
                  </ListItem>

                  {/* Contact */}
                  <ListItem className={classes.listItem}>
                  <NavLink to={{
                    pathname: `/en/Contact`,
                    state: {fromDashboard: false},
                  }} maintainScrollPosition={false} activeClassName='navActive' className={classes.navLink} >
                    <Typography variant='subheading' className={classes.navLink}> <SpeakerNotes className={classes.icons} /> Contact </Typography>
                  </NavLink>
                  </ListItem>

                  {/*
                  <ListItem className={classes.listItem}>
                      <IconButton
                      className={classes.navLink}
                      aria-owns={open ? 'menu-appbar' : null}
                      aria-haspopup="true"
                      onClick={this.handleMenu}
                      color="inherit"
                    >
                      <Typography variant='subheading' className={classes.navLink}> <AccountCircle /> </Typography>
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={this.handleClose}
                    >

                      <MenuItem className={classes.menuItem} onClick={this.handleClose}>

                        <NavLink to={{
                          pathname: `/en/Accounts/Authentication`,
                          state: {fromDashboard: false},
                        }} maintainScrollPosition={false} activeClassName='navActive' className={classes.menuListItem} >
                          <Typography variant='subheading' className={classes.menuListItem} > Authentication </Typography>
                        </NavLink>

                      </MenuItem>

                      <MenuItem className={classes.menuItem} onClick={this.handleClose}>

                        <NavLink to={{
                          pathname: `/en/Blog/Create`,
                          state: {fromDashboard: false},
                        }} maintainScrollPosition={false} activeClassName='navActive' className={classes.menuListItem} >
                          <Typography variant='subheading' className={classes.menuListItem}> <Add className={classes.icons} /> New Post </Typography>
                        </NavLink>

                      </MenuItem>

                      <MenuItem className={classes.menuItem} onClick={this.handleClose}>

                        <NavLink to={{
                          pathname: `/en/Dashboard/`,
                          state: {fromDashboard: false},
                        }} maintainScrollPosition={false} activeClassName='navActive' className={classes.menuListItem} >
                          <Typography variant='subheading' className={classes.menuListItem} > <AccountBalance className={classes.icons} /> Dashboard </Typography>
                        </NavLink>

                      </MenuItem>
                    </Menu>
                  </ListItem>
                  */}

                </List>
              }
            />

        </div>
    );
  }
}




export default withStyles(navBarStyle)(NavBar);
