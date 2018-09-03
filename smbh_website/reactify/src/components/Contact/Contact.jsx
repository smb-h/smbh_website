import React, { Component } from 'react'
import 'whatwg-fetch'
import PropTypes from 'prop-types'
import cookie from 'react-cookies'
import Snackbar from '@material-ui/core/Snackbar'
import { SnackBarWrapper } from './SnackBar'
import withStyles from '@material-ui/core/styles/withStyles'
import Parallax from '../Parallax/Parallax'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
// Style
// import { theme } from '../Base/Base'
import styles from './ContactStyle'


class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // Form
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      subject: "",
      content: "",
      // SnackBar
      open: false,
    }
  }

  // Snackbar Handle click
  handleClick = () => {
    this.setState({ open: true });
  }
  // Snackbar Handle click
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  }

  //   OnChange Events
  handleChange = prop => event => {
    event.preventDefault()
    const value = event.target.value
    const name = prop
    this.setState({
      // [event.target.name]: event.target.value
      // [prop]: event.target.value
      [name]: value
    })
    // console.log(name, value)
  }


  // Form Submit
  handleSubmit = (event) => {
    event.preventDefault()
    let data = this.state
    this.SendMessage(data)
  }

  // Send Message
  SendMessage = (data) => {
      const thisComp = this
      let endpoint = 'API/Contact'
      const csrfToken = cookie.load('csrftoken')

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

              // console.log(response.status)
              // Open snackbar
              if (response.status == 201) {
                thisComp.setState({
                  open: true,
                })
              }
              return response.json()

          }).then(function(responseData){

              // console.log(responseData)
              thisComp.clearForm()

          }).catch(function(error){

              console.log("error", error)
              alert('Something went wrong! Try again later.')

          })
      }
  }



  // Clear Form
  clearForm = (event) => {
    this.setState({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      subject: "",
      content: ""
    })
  }


  // Component Did Mount
  componentDidMount() {
    this.clearForm()
  }


  render() {
      const { classes } = this.props

      return (
              <div>

                {/* Contact */}
                <Parallax image={require("../../assets/img/img7.jpg")} className={classes.windowSize}>

                  {/* Message */}
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'center',
                      horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                  >
                    <SnackBarWrapper
                      onClose={this.handleClose}
                      variant="success"
                      message="The message was sent successfully!"
                    />
                  </Snackbar>

                  {/* main section */}
                  <Grid container spacing={24} className={classes.gridContainer}>

                  {/* Form */}
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={classes.GridItem}>
                      <Card className={classes.formContainer}>

                        <div>
                          <Typography variant="title" gutterBottom>
                            Contact Me
                          </Typography>

                          <form method='POST' autoComplete='off' onSubmit={this.handleSubmit}>
                            <Grid container spacing={24}>
                              {/* FirstName */}
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  required
                                  id="first_name"
                                  label="First name"
                                  fullWidth
                                  onChange={this.handleChange('first_name')}
                                  value={this.state.first_name}
                                />
                              </Grid>
                              {/* LastName */}
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  required
                                  id="last_name"
                                  label="Last name"
                                  fullWidth
                                  onChange={this.handleChange('last_name')}
                                  value={this.state.last_name}
                                />
                              </Grid>
                              {/* Email */}
                              <Grid item xs={12}>
                                <TextField
                                  required
                                  id="email"
                                  label="Email"
                                  fullWidth
                                  type='email'
                                  onChange={this.handleChange('email')}
                                  value={this.state.email}
                                />
                              </Grid>
                              {/* Phone */}
                              <Grid item xs={12}>
                                <TextField
                                  id="phone"
                                  label="Phone Number"
                                  fullWidth
                                  placeholder="+98 912 123 45 67"
                                  type='tel'
                                  onChange={this.handleChange('phone')}
                                  value={this.state.phone}
                                />
                              </Grid>
                              {/* Subject */}
                              <Grid item xs={12}>
                                <TextField
                                  required
                                  id="subject"
                                  label="Subject"
                                  fullWidth
                                  onChange={this.handleChange('subject')}
                                  value={this.state.subject}
                                />
                              </Grid>
                              {/* Content */}
                              <Grid item xs={12} >
                                <TextField
                                  required
                                  id="content"
                                  label="Content"
                                  fullWidth
                                  multiline
                                  rows="4"
                                  onChange={this.handleChange('content')}
                                  value={this.state.content}
                                />
                              </Grid>

                              <Grid item xs={12}>
                                {/* <FormControlLabel
                                  control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                  label="Use this address for payment details"
                                /> */}
                                <Button variant='outlined' color='secondary' type='submit'>Send</Button>
                              </Grid>
                            </Grid>
                          </form>
                        </div>

                      </Card>
                    </Grid>

                    <Grid item xl={5} lg={5} md={5} sm={12} xs={12} className={classes.GridItem}>
                      <Card className={classes.mapContainer}>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d73206.82695098352!2d50.91257263272305!3d35.816740654196785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8dbf95ef45f011%3A0x722a04e54eba9bcd!2sKaraj%2C+Alborz+Province%2C+Iran!5e0!3m2!1sen!2s!4v1535952567645" width="600" height="450" frameborder="0" style={{ border: 0, width: '100%' }} allowfullscreen></iframe>
                      </Card>
                    </Grid>

                  </Grid>



                </Parallax>

              </div>

      )
  }
}


Contact.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Contact)
