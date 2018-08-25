import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import BugReport from '@material-ui/icons/BugReportRounded'
import Info from '@material-ui/icons/InfoOutlined'
import Coffee from '@material-ui/icons/FreeBreakfastRounded'

// Style
import styles from './AboutStyle';
import './AboutStyle.css';




class About extends Component {

    render () {
        const { classes } = this.props
        return (

            <Grid className={classes.GridRoot}>
                <Grid spacing={16} className={classes.GridContainer}>
                
                <section class="jumbotron" id="AboutMe">

                    <div class='Position'>

                        <div class="animated fadeInUpBig" id="AboutMe-Head">
                            <h1>About Me</h1>
                        </div>

                        <div class="row">

                            <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.GridItem + ' ' + 'animated fadeInUpBig delay-1s'}>
                            {/* <div class="animated fadeInUpBig delay-1s"> */}
                                <div>
                                    <i class="material-icons" ><BugReport style={{color: 'red', fontSize: 80}} /></i>
                                </div>
                                <h2>Experienced in</h2>
                                <p>Python, Django, MVT
                                <br />Rest Api, JS, JQuery
                                <br />GUI, UI/UX, SQL</p>
                            {/* </div> */}
                            </Grid>

                            <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.GridItem + ' ' + 'animated fadeInUpBig delay-2s'}>
                            {/* <div class="animated fadeInUpBig delay-2s"> */}
                                <div>
                                    <i class="material-icons"><Info style={{color: 'royalblue', fontSize: 80}} /></i>
                                </div>
                                <h2>Familiar with</h2>
                                <p>ReactJs, PostgreSQL
                                <br />MVC, C#, C, C++
                                <br />Git, Bash, Linux, NginX
                                <br />Design, Material</p>
                            {/* </div> */}
                            </Grid>

                            <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.GridItem + ' ' + 'animated fadeInUpBig delay-3s'}>
                            {/* <div class="animated fadeInUpBig delay-3s"> */}
                                <div>
                                    <i class="material-icons"><Coffee style={{color: 'rgb(75, 15, 15)', fontSize: 80}} /></i>
                                </div>
                                <h2>Fun</h2>
                                <p>Intrested in AI
                                <br />Robotic, MicroControllers
                                <br />IoT, Security, Technology, ...
                                <br />OpenSource &amp; FreeSoftware Community</p>
                            {/* </div> */}
                            </Grid>

                        </div>

                    </div>

                </section>

                </Grid>
            </Grid>
        )
    }
}




About.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(About);
  
  
