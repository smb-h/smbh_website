import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import NavBar from '../Header/NavBar'
import FloatButton from '../FloatButton/FloatButton'
import Footer from '../Footer/FooterWithButton'

import 'whatwg-fetch'
// import cookie from 'react-cookies'



class Base extends Component {
  render() {
    // const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>

        <FloatButton id='ToTop' />

        <NavBar />



        <Footer />

      </MuiThemeProvider>
    );
  }
}


// Theme
export const theme = createMuiTheme({
  palette: {
      bg: {
        main: '#364f6b',
      },
      primary: {
          // light: will be calculated from palette.primary.main,
          main: '#ffd460',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contast with palette.primary.main
      },
      secondary: {
          // light: will be calculated from palette.primary.main,
          main: '#f08a5d',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contast with palette.primary.main
      },
      error: {
          // light: will be calculated from palette.primary.main,
          main: '#ff165d',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contast with palette.primary.main
      },
    },
});


export default Base
