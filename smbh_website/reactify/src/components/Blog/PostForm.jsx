import React, { Component } from 'react'
// https://react-dropzone.netlify.com/
import Dropzone from 'react-dropzone'
// https://github.com/DominicTobias/react-image-crop
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { image64toCanvasRef,
          extractImageFileExtensionFromBase64,
          // base64StringtoFile,
          downloadBase64File
      } from './ImageBase64'
import moment from 'moment'
import 'whatwg-fetch'
import cookie from 'react-cookies'

import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// Form
// https://material-ui.com/api/form-control/#formcontrol
import FormControl from '@material-ui/core/FormControl'
// https://material-ui.com/api/form-group/#formgroup
import FormGroup from '@material-ui/core/FormGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
// import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import withStyles from '@material-ui/core/styles/withStyles'
import Parallax from '../Parallax/Parallax'
import { theme } from '../Base/Base'
// Style
import styles from './PostFormStyle'



class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // Post
            title: "",
            image: null,
            language: null,
            summary: "",
            content: "",
            draft: false,
            publish: null,
            // publish: moment().format('YYYY-MM-DDTh:mm:ssZ'),
            tag_list: "",
            // Image DropZone
            imageValidTypes: 'image/png, image/jpeg, image/jpg, image/gif',
            // equal to 5 MB
            imageMaxSize: 5000000,
            // Crop
            crop: {
              // aspect: 16/9,
              // x: 20,
              // y: 10,
              // width: 30,
              // height: 10,
            },
        }
        // Form Refrence
        this.postFormFormRef = React.createRef()
    }


    //   Check Box
    handleChangeCheckBox = name => event => {
      this.setState({
        [name]: event.target.checked
      });
    };


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
    };


    // Form Submit
    handleSubmit = (event) => {
      event.preventDefault()
      let data = this.state
      // this.CRUDPost(data)
      const { post } = this.props
      // Update
      if (post !== undefined && post !== null){
        this.UpdatePost(data)
        // Create
      } else {
        this.CreatePost(data)
      }
    }


    // Create Retrieve Update Delete Post
    CRUDPost = (data) => {
        const thisComp = this
        let endpoint = ''
        const csrfToken = cookie.load('csrftoken')
        // TODO: Move token stuff to cookie
        // const Token = ('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InNtYmgiLCJleHAiOjE1MzUyNTI4NDAsImVtYWlsIjoic21iX2hAeWFob28uY29tIiwib3JpZ19pYXQiOjE1MzUyNTI1NDB9._H6oDPdGienzFtf4-V0KqoCOQ5vsC5LJKnONAxP6r1U')
        const { post } = this.props
        console.log(post)
        if (csrfToken !== undefined) {
          let lookupOptions = {}
          // Update
          if (post !== undefined && post !== null) {
            endpoint = `API/${post.slug}`
            lookupOptions = {
                method: 'PUT',
                headers: {
                    // 'Authorization': 'JWT ' +  Token,
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify(data),
                credentials: 'include'
            }
            // Create
          } else {
              endpoint = 'API/Post/Create'
              lookupOptions = {
                method: 'POST',
                headers: {
                    // 'Authorization': 'JWT ' +  Token,
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify(data),
                credentials: 'include'
            }
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

    // Create Post
    CreatePost = (data) => {
        const thisComp = this
        let endpoint = 'API/Post/Create'
        const csrfToken = cookie.load('csrftoken')
        // TODO: Move token stuff to cookie
        // const Token = ('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InNtYmgiLCJleHAiOjE1MzU4OTI3MzQsImVtYWlsIjoic21iX2hAeWFob28uY29tIiwib3JpZ19pYXQiOjE1MzU4OTI0MzR9.oWGtaZKhN9G2HNmnjghqTMDgAY7R0su1eLk16iUEeKc')

        if (csrfToken !== undefined) {
          let lookupOptions = {
            method: 'POST',
            headers: {
                // 'Authorization': 'JWT ' +  Token,
                'Content-type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data),
            credentials: 'include'
          }

            fetch(endpoint, lookupOptions)
            .then(function(response){

                console.log('response: ', response)
                return response.json()

            }).then(function(responseData){

                console.log('response Data: ', responseData)
                thisComp.clearForm()

            }).catch(function(error){

                console.log("error", error)
                alert('Something went wrong! Try again later.')

            })
        }
    }

    // Update Post
    UpdatePost = (data) => {
        const thisComp = this
        const { post } = this.props
        let endpoint = `API/${post.slug}`
        const csrfToken = cookie.load('csrftoken')
        // TODO: Move token stuff to cookie
        // const Token = ('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InNtYmgiLCJleHAiOjE1MzUyNTI4NDAsImVtYWlsIjoic21iX2hAeWFob28uY29tIiwib3JpZ19pYXQiOjE1MzUyNTI1NDB9._H6oDPdGienzFtf4-V0KqoCOQ5vsC5LJKnONAxP6r1U')

        if (csrfToken !== undefined) {
          let lookupOptions = {
            method: 'PUT',
            headers: {
                // 'Authorization': 'JWT ' +  Token,
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
                // console.log(responseData)
                // thisComp.clearForm()
                if (thisComp.props.postItemUpdated) {
                  thisComp.props.postItemUpdated(responseData)
                }

            }).catch(function(error){

                console.log("error", error)
                alert('Something went wrong! Try again later.')

            })
        }
    }


    // Clear Form
    clearForm = (event) => {
      // event.preventDefault()
      // this.postFormFormRef.reset()
      this.setState({
          title: "",
          image: null,
          language: "en",
          summary: "",
          content: "",
          draft: false,
          // publish: null,
          publish: moment(new Date()).format('YYYY-MM-DDThh:mm'),
          tag_list: "",
      })
    }


    // Component Did Mount
    componentDidMount() {
      this.clearForm()
      const { post } = this.props
      if (post !== undefined && post !== null) {
        this.setState({
          title: post.title,
          image: post.image,
          language: post.language,
          summary: post.summary,
          content: post.content,
          draft: post.draft,
          // publish: moment(post.publish).format('YYYY-MM-DDTh:mm:ssZ'),
          publish: moment(post.publish).format('YYYY-MM-DDThh:mm'),
          tag_list: post.tags,
        })
      }

    }


    // Render
    render() {
        const { classes } = this.props
        const csrfToken = cookie.load('csrftoken')

        return (
            <div>
              <Parallax style={{ backgroundColor: theme.palette.bg.main }} >

                { (csrfToken !== undefined && csrfToken !== null) ?
                  (<Card className={classes.formContainer}>
                      <CssBaseline />
                      <CardContent>

                          <Typography variant='headline' component="h2" className={classes.centerPos}>
                              Create New Post
                          </Typography>

                          <form onSubmit={this.handleSubmit} autoComplete='off' ref={this.postFormFormRef} >

                                  {/* Title */}
                                  <FormGroup className={classes.formItem}>
                                      <TextField id="title" label='Title' onChange={this.handleChange('title')} placeholder='' helperText="Title should be less than 50 Charachter" margin="normal" value={this.state.title} required />
                                  </FormGroup>

                                  {/* Image */}

                                  <FormControl>
                                    <Grid container spacing={16}>
                                      <Grid item xs>
                                        <FormControlLabel
                                        className={classes.imagePad}
                                            control={
                                              <input type="file" id="image" accept="image/*" onChange={this.handleChange('image')} />
                                            }
                                            label="Image"
                                        />
                                      </Grid>
                                      <Grid item xs>
                                        {/* Preview */}
                                        {/* { (this.state.image) ? (
                                            <img src={this.state.image} alt={this.state.title} />
                                        ) : '' } */}
                                      </Grid>
                                    </Grid>
                                  </FormControl>


                                  {/* Language */}
                                  <FormGroup className={classes.formItem}>
                                      <FormControl>
                                          {this.state.language === null ? (<InputLabel htmlFor="language">Language *</InputLabel>) : (<InputLabel htmlFor="language"></InputLabel>)}
                                          <Select
                                              value={this.state.language}
                                              onChange={this.handleChange('language')}
                                              inputProps={{
                                                  // name: 'Language',
                                                  id: 'language',
                                              }}
                                          >
                                              <MenuItem value='en'>English</MenuItem>
                                              <MenuItem value='fa'>Persian</MenuItem>
                                          </Select>
                                          <FormHelperText>Select a language</FormHelperText>
                                      </FormControl>
                                  </FormGroup>

                                  {/* Summary */}
                                  <FormGroup className={classes.formItem}>
                                      <TextField id="summary" label='Summary' onChange={this.handleChange('summary')} placeholder='' helperText="" margin="normal" value={this.state.summary} multiline rows="3" required />
                                  </FormGroup>

                                  {/* Content */}
                                  <FormGroup className={classes.formItem}>
                                      <TextField id="content" label='Content' onChange={this.handleChange('content')} placeholder='' helperText="" margin="normal" value={this.state.content} multiline rows="10" required />
                                  </FormGroup>

                                  {/* Tags */}
                                  <FormGroup className={classes.formItem}>
                                      <TextField id="tag_list" label='Tags' onChange={this.handleChange('tag_list')} placeholder='' helperText="Seprate tags with a cama ," margin="normal" value={this.state.tag_list} />
                                  </FormGroup>

                                  {/* Draft */}
                                  <FormControl className={classes.formItem}>

                                      <FormControlLabel
                                          control={
                                              <Checkbox id="draft" checked={this.state.draft} onChange={this.handleChangeCheckBox('draft')} value={this.state.draft}
                                                  classes={{
                                                      root: classes.checkBoxRoot,
                                                      checked: classes.checked,
                                                  }}
                                              />
                                          }
                                          label="Draft"
                                      />

                                  </FormControl>

                                  {/* Publish */}
                                  <FormGroup className={classes.formItem}>
                                      <TextField id="publish" label="Publish" type="datetime-local" onChange={this.handleChange('publish')} InputLabelProps={{ shrink: true, }} value={this.state.publish} helperText="Default Date and time is now." />
                                  </FormGroup>

                                  {/* Submit */}

                                  <FormGroup className={classes.gridRoot}>
                                      <Grid container spacing={24}>
                                          <Grid item xs>
                                              <FormGroup>
                                                  <Button variant='contained' type='submit' >Send</Button>
                                              </FormGroup>
                                          </Grid>
                                          <Grid item xs>
                                              <FormGroup>
                                                  <Button  variant='contained' color='secondary' onClick={this.clearForm} >Clear</Button>
                                              </FormGroup>
                                          </Grid>
                                      </Grid>
                                  </FormGroup>

                          </form>


                      </CardContent>


                  </Card>)
                : (<p>Something went wrong!</p>)}

              </Parallax>
            </div>

        );
    }
}




PostForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(PostForm)
