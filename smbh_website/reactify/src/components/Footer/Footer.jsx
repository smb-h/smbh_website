import React from "react"
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
      <div>
        {/* Footer */}
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
                  <Button className={classes.typoStyle} variant='flat' color='default' type='' href='/en/Blog/'>
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
                  <span className={classes.logo} style={{fontWeight: 'bold',}}>
                    SMB<span>&nbsp;</span><span className={classes.SmbhLogo}>H</span><span>&nbsp;</span>
                  </span>
                </a>

              </Typography>
            </div>
          </div>
        </footer>

      </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
