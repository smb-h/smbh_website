import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'

import NavBar from '../Header/NavBar'
import ScrollButton from '../ScrollButton/ScrollButton'
import Footer from '../Footer/Footer'

import 'whatwg-fetch'
import cookie from 'react-cookies'
// Style
import { theme } from './BaseStyle'


class Base extends Component {
  render() {
    // const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>

        <ScrollButton scrollStepInPx="50" delayInMs="16.4"/>

        <NavBar />



        <Footer />

      </MuiThemeProvider>
    );
  }
}


export default Base
