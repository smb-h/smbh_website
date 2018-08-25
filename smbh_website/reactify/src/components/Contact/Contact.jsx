import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'


import PostList from './PostList'
import Parallax from '../Parallax/Parallax'
import NavBar from '../NavBar/NavBar'
import FloatButton from '../FloatButton/FloatButton'
import Footer from '../Footer/FooterWithButton'

import 'whatwg-fetch'
import cookie from 'react-cookies'





class Contact extends Component {


    // Create Post
    createPost(){
        let endpoint = 'Blog/API/'
        const csrfToken = cookie.load('csrftoken')
        let data = {
            "title": "",
            "image": null,
            "language": null,
            "summary": "",
            "content": "",
            "draft": false,
            "publish": null,
            "tag_list": ""
        }
        if (csrfToken !== undefined) {

            let lookupOptions = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify(data),
                credentials: 'include'
            }

            fetch(endpoint, lookupOptions)
            .then(function(response){
                return response.json()
            }).then(function(responseData){
                console.log(responseData)
            }).catch(function(error){
                console.log("error", error)
            })
        }
    }


    render() {
        // const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>

                <FloatButton id='ToTop' />
            
                <NavBar />


                {/* Blog */}
                <Parallax style={{ backgroundColor: theme.palette.bg.main }}>

                <PostList />

                </Parallax>

            

                <Footer />

            </MuiThemeProvider>
        );
    }
}

export default Contact;




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



