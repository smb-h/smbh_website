import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import { List, ListItem, withStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';

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
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Button className={classes.block} variant='flat' color='default' type='' href='#'>
                SMB <span className={classes.SmbhLogo}>H</span>
              </Button>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Button className={classes.block} variant='flat' color='default' type='' href='#'>
                About
              </Button>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Button className={classes.block} variant='flat' color='default' type='' href='#'>
                Blog
              </Button>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Button className={classes.block} variant='flat' color='default' type='' href='#'>
                License
              </Button>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          <p>
            &copy; {1900 + new Date().getYear()}{" "} 
            SMB <span className={classes.SmbhLogo}>H</span> | Powerd By{" "}
            <a
              href="https://www.djangoproject.com/"
              className={aClasses}
              target="_blank"
              rel="noopener noreferrer"
            >
              Django
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
