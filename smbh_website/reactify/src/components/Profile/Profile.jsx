import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Parallax from '../Parallax/Parallax'
import 'whatwg-fetch'

// Style
import { theme } from '../Base/Base'
import styles from './ProfileStyle'


class Profile extends Component {


    render() {
        const { classes } = this.props
        return (
                <div>

                  {/* Profile */}
                  <Parallax image={require("../../assets/img/workspace.jpg")} className={classes.windowSize} >



                  </Parallax>

                </div>

        );
    }
}

export default withStyles(styles)(Profile)
