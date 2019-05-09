import React, { Component } from 'react'
// https://www.npmjs.com/package/classnames
import classNames from "classnames"
import About from './About'
import RecentPosts from './RecentPosts'
import Services from './Services'
import Parallax from '../Parallax/Parallax'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
// Styles
import { theme } from '../Base/BaseStyle'
import styles from './HomeStyle'




class Home extends Component {


    render() {
        const { classes } = this.props
        // ClassNames Example
        // const appBarClasses = classNames({
        //   [classes.appBar]: true,
        //   [classes[color]]: color,
        //   [classes.absolute]: absolute,
        //   [classes.fixed]: fixed
        // });

        return (
                <div>
                  {/* Intro */}
                  <Parallax video={require("../../assets/video/home_coding.mp4")} className={classes.windowSize}>

                    <div>
                      <Typography variant='display1' className={classes.intro}>
                        Seyed Mohammad<span>&nbsp;</span>Bagher Hosseini
                      </Typography>
                      <Divider className={classes.dividerStyle} />
                      <Typography variant='display1' className={classes.intro + ' ' + classes.centeralize}>
                        Computer Software Engineer
                      </Typography>
                    </div>
                    {/* Social */}
                    <div className={classes.centeralize}>
                      <Grid container>

                        <Grid item xl={3} lg={3} md={3} sm={3} xs={6} className={classes.centeralize}>
                          <a className={classes.socialItem} href="https://github.com/smb-h" target="_blank">
                            <i class="fab fa-github"></i>
                          </a>
                        </Grid>
                        <Grid item xl={3} lg={3} md={3} sm={3} xs={6} className={classes.centeralize}>
                          <a className={classes.socialItem} href="https://twitter.com/smb_h" target="_blank">
                            <i class="fab fa-twitter"></i>
                          </a>
                        </Grid>
                        <Grid item xl={3} lg={3} md={3} sm={3} xs={6} className={classes.centeralize}>
                          <a className={classes.socialItem} href="https://www.instagram.com/smb__h/" target="_blank">
                            <i class="fab fa-instagram"></i>
                          </a>
                        </Grid>
                        <Grid item xl={3} lg={3} md={3} sm={3} xs={6} className={classes.centeralize}>
                          <a className={classes.socialItem} href="https://www.linkedin.com/in/smb-h-b64068155/" target="_blank">
                            <i class="fab fa-linkedin-in"></i>
                          </a>
                        </Grid>

                      </Grid>
                    </div>
                  </Parallax>

                  {/* About Me */}
                  <About />

                  {/* Recent Posts */}
                  <Parallax style={{ backgroundColor: theme.palette.bg.main }}>
                    <RecentPosts />
                  </Parallax>


                  {/* Services */}
                  <Parallax image={require("../../assets/img/Background-66.jpg")}>
                    <Services />
                  </Parallax>
                </div>
        );
    }
}



Home.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Home);
