import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// @material-ui/icons
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from '@material-ui/core/IconButton';
import Home from '@material-ui/icons/HomeRounded';
import Public from '@material-ui/icons/PublicRounded';
import Cafe from '@material-ui/icons/LocalCafeRounded';
import SpeakerNotes from '@material-ui/icons/SpeakerNotesRounded';


// core components
import Header from "../Header/Header";
import navbarsStyle from "./navbarsStyle";





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
    const SmbhLogo = (<p>SMB <span className={classes.HColor}>H</span></p>);

    return (

        <div id="navbar" className={classes.navbar}>

            {/* NavBar */}
            <Header
              // brand="SMB H"
              brand={SmbhLogo}
              color="dark"
              rightLinks={
                <List className={classes.list}>

                  <ListItem className={classes.listItem}>
                    <Button
                      href="#"
                      className={classes.navLink + " " + classes.navLinkActive}
                      // className={classes.navLink}
                      // onClick={e => e.preventDefault()}
                      color="transparent"
                      variant='flat'
                    >
                      <Home className={classes.icons} /> Home
                    </Button>
                  </ListItem>

                  <ListItem className={classes.listItem}>
                    <Button
                      href="#"
                      className={classes.navLink}
                      // onClick={e => e.preventDefault()}
                      color="transparent"
                      variant='flat'
                    >
                      <Public className={classes.icons} /> Services
                    </Button>
                  </ListItem>

                  <ListItem className={classes.listItem}>
                    <Button
                      href="Blog.html"
                      className={classes.navLink}
                      // onClick={e => e.preventDefault()}
                      color="transparent"
                      variant='flat'
                    >
                      <Cafe className={classes.icons} /> Blog
                    </Button>
                  </ListItem>

                  <ListItem className={classes.listItem}>
                    <Button
                      href="#"
                      className={classes.navLink}
                      // onClick={e => e.preventDefault()}
                      color="transparent"
                      variant='flat'
                    >
                      <AccountCircle className={classes.icons} /> Profile
                    </Button>
                  </ListItem>

                  <ListItem className={classes.listItem}>
                    <Button
                      href="#"
                      className={classes.navLink}
                      // onClick={e => e.preventDefault()}
                      color="transparent"
                      variant='flat'
                    >
                      <SpeakerNotes className={classes.icons} /> Contact
                    </Button>
                  </ListItem>

                  <ListItem className={classes.listItem}>
                      <IconButton
                      className={classes.navLink}
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
                      <MenuItem className={classes.menuItem} onClick={this.handleClose}>Profile</MenuItem>
                      <MenuItem className={classes.menuItem} onClick={this.handleClose}>My account</MenuItem>
                    </Menu>
                  </ListItem>

                </List>
              }
            />

        </div>
    );
  }
}




export default withStyles(navbarsStyle)(NavBar);
