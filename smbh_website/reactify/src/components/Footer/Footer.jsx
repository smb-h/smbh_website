import React from "react"
// import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'
// nodejs library to set properties for components
import PropTypes from "prop-types"
// nodejs library that concatenates classes
import classNames from "classnames"
import { List, ListItem, withStyles } from "@material-ui/core"
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// @material-ui/icons

import styles from './FooterStyle';



function Footer({ ...props }) {
  const { classes } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
  });
  const aClasses = classNames({
    [classes.a]: true,
  });
  return (
    <footer className={footerClasses + ' ' + classes.footerRoot}>
        <div className={classes.container}>
          <div className={classes.left}>
            <List className={classes.list}>

              <ListItem className={classes.inlineBlock}>
                <Button className={classes.typoStyle} variant='flat' color='default' type='' href='#'>
                  About
                </Button>
              </ListItem>

              <ListItem className={classes.inlineBlock}>
                <Button className={classes.typoStyle} variant='flat' color='default' type='' href='#'>
                  Blog
                </Button>
              </ListItem>

              <ListItem className={classes.inlineBlock}>
                <Button className={classes.typoStyle} variant='flat' color='default' type='' href='#'>
                  License
                </Button>
              </ListItem>

            </List>
          </div>
          <div className={classes.right}>
            <Typography variant='subheading' className={classes.static}>
              &copy; {1900 + new Date().getYear()}{" "}

              <a href='/en/' className={classes.typoStyle}>
                SMB<span>&nbsp;</span><span className={classes.SmbhLogo}>H</span><span>&nbsp;</span>
              </a>

              {/* <Link to={{
                pathname: `/en/`,
                state: {fromDashboard: false},
              }} maintainScrollPosition={false} className={classes.typoStyle} >
                 SMB<span>&nbsp;</span><span className={classes.SmbhLogo}>H</span><span>&nbsp;</span>
              </Link>*/}

            </Typography>
          </div>
        </div>

    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
