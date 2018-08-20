import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Parallax from '../Parallax/Parallax';
import classNames from "classnames";

import NavBar from '../NavBar/NavBar';
import FloatButton from '../FloatButton/FloatButton';
import Footer from '../Footer/FooterWithButton';
import RecentPosts from '../RecentPosts/RecentPosts';

import '../../assets/scss/App.css';



class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>

        <FloatButton id='ToTop' />
        {/* Intro */}
        <Parallax image={require("../../assets/img/bg-4.jpg")}>
          <NavBar />


        </Parallax>

        {/* Recent Posts */}
        <Parallax style={{ backgroundColor: theme.palette.bg.main }}>

          <RecentPosts />

        </Parallax>

          {/* Services */}
        <Parallax image={require("../../assets/img/bg.jpg")}>

          

        </Parallax>
        


        <Footer />

      </MuiThemeProvider>
    );
  }
}

export default App;




// Theme
const theme = createMuiTheme({
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



