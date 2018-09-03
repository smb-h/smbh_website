import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import cookie from 'react-cookies'
import 'whatwg-fetch'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
// Style
// import { theme } from '../Base/Base'
import styles from './ContactFormStyle'


class ContactForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      subject: "",
      content: ""
    }
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

              return response.json()

          }).then(function(responseData){

              console.log(responseData)
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
    return (

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
    )
  }
}

ContactForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ContactForm)
