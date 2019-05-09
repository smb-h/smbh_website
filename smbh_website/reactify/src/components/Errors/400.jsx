import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { BrowserRouter, Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles"
// Style
import ErrorStyle from './ErrorStyle'


class NotFound extends Component {
  render() {
    const { classes } = this.props
    const vidSrc = require("../../assets/video/error_404.mp4")
    return (
      <Card className={classes.rootContainer}>
        <Grid container spacing={24}>
          <Grid item xs>
              <div className={classes.gifStyle}>
                <video autoPlay muted loop >
                  <source src={vidSrc} type="video/mp4" />
                </video>
              </div>
          </Grid>
          <Grid item xs>
            <Typography variant='headline' className={classes.textContainer}>
              Ops! Something went wrong.<br />
              Check the url or go to<span> </span>
              <Link to={{
                pathname: `/en/`,
                state: {fromDashboard: false},
              }} maintainScrollPosition={false} >
                Main Page
              </Link>
              <span> </span> and see if you can locate what you are looking for. Good luck
            </Typography>
          </Grid>
        </Grid>
      </Card>
    )
  }
}

export default withStyles(ErrorStyle)(NotFound)
