import React, { Component } from 'react'
import PostList from './PostList'
import Parallax from '../Parallax/Parallax'



class Blog extends Component {

    render() {
        // const { classes } = this.props;
        return (
                <div>
                  {/* Blog */}
                  <Parallax image={require("../../assets/img/plant_room.jpg")} >

                    <PostList />

                  </Parallax>
                </div>
        );
    }
}

export default Blog;
