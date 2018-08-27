import React, { Component } from 'react'

import Parallax from '../Parallax/Parallax'

import 'whatwg-fetch'
import cookie from 'react-cookies'

// Style
import { theme } from '../Base/Base'



class Contact extends Component {



    render() {
        // const { classes } = this.props;
        return (
                <div>

                  {/* Blog */}
                  <Parallax style={{ backgroundColor: theme.palette.bg.main }}>



                  </Parallax>

                </div>

        );
    }
}

export default Contact;
