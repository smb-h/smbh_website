import React, { Component } from 'react'
// import PostList from './PostList'
import PostCreate from './PostCreate'
import Parallax from '../Parallax/Parallax'
import { theme } from '../Base/Base'



class Blog extends Component {

    render() {
        // const { classes } = this.props;
        return (
                  <div>
                  {/* Blog */}
                  <Parallax style={{ backgroundColor: theme.palette.bg.main }}>

                  {/* <PostList /> */}
                  <PostCreate />

                  </Parallax>
                </div>
        );
    }
}

export default Blog;
