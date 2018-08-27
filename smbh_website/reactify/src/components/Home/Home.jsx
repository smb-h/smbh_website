import React, { Component } from 'react'
import About from './About'
import RecentPosts from './RecentPosts'
import Parallax from '../Parallax/Parallax'
import { theme } from '../Base/Base'


class Home extends Component {



    render() {
        // const { classes } = this.props;
        return (
                <div>
                  {/* Intro */}
                  <Parallax image={require("../../assets/img/bg-4.jpg")}>
                  </Parallax>

                  {/* About Me */}
                  <About />

                  {/* Recent Posts */}
                  <Parallax style={{ backgroundColor: theme.palette.bg.main }}>
                  <RecentPosts />
                  </Parallax>


                  {/* Services */}
                  <Parallax image={require("../../assets/img/bg.jpg")}>
                  </Parallax>
                </div>
        );
    }
}

export default Home;
