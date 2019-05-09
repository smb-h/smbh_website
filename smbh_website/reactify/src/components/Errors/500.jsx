import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { BrowserRouter, Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles"
// Style
import ErrorStyle from './ErrorStyle'


class ServerError extends Component {
  render() {
    const { classes } = this.props
    const vidSrc = require("../../assets/video/error_500.mp4")
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
              An server error has occurred.<br />
              We're working on a fix right now.<br />
              Thanks for your patience.
            </Typography>
          </Grid>
        </Grid>
      </Card>
    )
  }
}

export default withStyles(ErrorStyle)(ServerError)
