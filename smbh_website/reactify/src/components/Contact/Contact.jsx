import React, { Component } from 'react'
import Parallax from '../Parallax/Parallax'
import 'whatwg-fetch'

// Style
import { theme } from '../Base/Base'



class Contact extends Component {



    render() {
        // const { classes } = this.props;
        return (
                <div>

                  {/* Contact */}
                  <Parallax image={require("../../assets/img/img7.jpg")} >



                  </Parallax>

                </div>

        );
    }
}

export default Contact;
