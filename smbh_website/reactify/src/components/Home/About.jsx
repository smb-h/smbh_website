import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import BugReport from '@material-ui/icons/BugReportRounded'
import Info from '@material-ui/icons/InfoOutlined'
import Coffee from '@material-ui/icons/FreeBreakfastRounded'

// Style
import styles from './AboutStyle'
import './AboutStyle.css'




class About extends Component {

    render () {
        const { classes } = this.props
        return (

            <Grid className={classes.GridRoot}>

                <section id="AboutMe">

                    <div class='Position'>

                        <div class="animated fadeInUpBig" id="AboutMe-Head">
                            <h1>About Me</h1>
                        </div>
                        <Card className={classes.cardContainer}>
                          <Grid container spacing={8} className={classes.GridContainer}>

                              <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.GridItem + 'animated fadeInUpBig delay-1s'}>
                                  <div>
                                      <i class="material-icons" ><BugReport style={{color: 'red', fontSize: 80}} /></i>
                                  </div>
                                  <Typography variant='display1' className={classes.titleStyle}>Experienced in</Typography>
                                  <br />
                                  <Typography variant='subheading'>Python, Django, MVT
                                  <br />Rest Api, JS, JQuery
                                  <br />GUI, UI/UX, SQL</Typography>
                              </Grid>
                              <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.GridItem + 'animated fadeInUpBig delay-2s'}>
                                  <div>
                                      <i class="material-icons"><Info style={{color: 'royalblue', fontSize: 80}} /></i>
                                  </div>
                                  <Typography variant='display1' className={classes.titleStyle}>Familiar with</Typography>
                                  <br />
                                  <Typography variant='subheading'>ReactJs, PostgreSQL
                                  <br />MVC, C#, C, C++
                                  <br />Git, Bash, Linux, NginX
                                  <br />Design, Material</Typography>
                              </Grid>

                              <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={classes.GridItem + 'animated fadeInUpBig delay-3s'}>
                                  <div>
                                      <i class="material-icons"><Coffee style={{color: 'rgb(75, 15, 15)', fontSize: 80}} /></i>
                                  </div>
                                  <Typography variant='display1' className={classes.titleStyle}>Fun</Typography>
                                  <br />
                                  <Typography variant='subheading'>Intrested in AI
                                  <br />Robotic, MicroControllers
                                  <br />IoT, Security, Technology, ...
                                  <br />OpenSource &amp; FreeSoftware Community</Typography>
                              </Grid>
                          </Grid>
                        </Card>

                    </div>

                </section>


            </Grid>
        )
    }
}




About.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(About);
