import React, { Component } from 'react'
import Parallax from '../Parallax/Parallax'
import 'whatwg-fetch'

// Style
import { theme } from '../Base/Base'



class Profile extends Component {


    render() {
        // const { classes } = this.props;
        return (
                <div>

                  {/* Profile */}
                  <Parallax image={require("../../assets/img/workspace.jpg")} style={{ minHeight: window.innerHeight, }} >



                  </Parallax>

                </div>

        );
    }
}

export default Profile
