import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'


// import PostList from './PostList'
import PostCreate from './PostCreate'
import Parallax from '../Parallax/Parallax'
import NavBar from '../NavBar/NavBar'
import FloatButton from '../FloatButton/FloatButton'
import Footer from '../Footer/FooterWithButton'

import 'whatwg-fetch'





class Blog extends Component {

    render() {
        // const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>

                <FloatButton id='ToTop' />
            
                <NavBar />


                {/* Blog */}
                <Parallax style={{ backgroundColor: theme.palette.bg.main }}>

                {/* <PostList /> */}
                <PostCreate />

                </Parallax>

            

                <Footer />

            </MuiThemeProvider>
        );
    }
}

export default Blog;




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


