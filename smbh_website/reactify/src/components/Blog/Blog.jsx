import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PostList from './PostList'
import Parallax from '../Parallax/Parallax'
// Style
// import { theme } from '../Base/Base'
import styles from './BlogStyle'



class Blog extends Component {

    render() {
        const { classes } = this.props
        return (
                <div>
                  {/* Blog */}
                  <Parallax image={require("../../assets/img/plant_room.jpg")} className={classes.windowSize} >

                    <PostList />

                  </Parallax>
                </div>
        );
    }
}

export default withStyles(styles)(Blog)
