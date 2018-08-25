import React, { Component } from 'react'

import 'whatwg-fetch'
import cookie from 'react-cookies'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// Form
// https://material-ui.com/api/form-control/#formcontrol
import FormControl from '@material-ui/core/FormControl'
// https://material-ui.com/api/form-group/#formgroup
import FormGroup from '@material-ui/core/FormGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import withStyles from '@material-ui/core/styles/withStyles'

// Style
import styles from './PostCreateStyle'



class PostCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            image: null,
            language: null,
            summary: "",
            content: "",
            draft: false,
            publish: null,
            tag_list: ""
        }
    }

    //   Check Box
    handleChangeCheckBox = name => event => {
      this.setState({ [name]: event.target.checked });
    };

    //   OnChange Events
    handleChange = prop => event => {
      this.setState({ [prop]: event.target.value });
    };


    // Create Post
    createPost(){
        let endpoint = 'Blog/API/Post/Create'
        const csrfToken = cookie.load('csrftoken')
        let data = {
            title: "",
            image: null,
            language: null,
            summary: "",
            content: "",
            draft: false,
            publish: null,
            tag_list: ""
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
                // console.log(responseData)
            }).catch(function(error){
                // console.log("error", error)
            })
        }
    }


    render() {
        const { classes } = this.props
        return (
            <div>

                <Card className={classes.formContainer}>
                    <CssBaseline />
                    <CardContent>

                        <Typography variant='headline' component="h2" className={classes.centerPos}>
                            Create New Post
                        </Typography>

                        <form autoComplete='off'>

                                {/* Title */}
                                <FormGroup className={classes.formItem}>
                                    <TextField id="title" label='Title' onChange={this.handleChange('title')} placeholder='' helperText="Title should be less than 50 Charachter" margin="normal" required />
                                </FormGroup>

                                {/* Image */}

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
                                    <TextField id="summary" label='Summary' onChange={this.handleChange('summary')} placeholder='' helperText="" margin="normal" multiline rows="3" required />
                                </FormGroup>

                                {/* Content */}
                                <FormGroup className={classes.formItem}>
                                    <TextField id="content" label='Content' onChange={this.handleChange('content')} placeholder='' helperText="" margin="normal" multiline rows="10" required />
                                </FormGroup>

                                {/* Tags */}
                                <FormGroup className={classes.formItem}>
                                    <TextField id="tag_list" label='Tags' onChange={this.handleChange('tag_list')} placeholder='' helperText="Seprate tags with a cama ," margin="normal" />
                                </FormGroup>

                                {/* Draft */}
                                <FormGroup className={classes.formItem}>

                                    <FormControlLabel
                                        control={
                                            <Checkbox id="draft" checked={this.state.draft} onChange={this.handleChangeCheckBox('draft')} value="draft"
                                                classes={{
                                                    root: classes.checkBoxRoot,
                                                    checked: classes.checked,
                                                }}
                                            />
                                        }
                                        label="Draft"
                                    />

                                </FormGroup>

                                {/* Publish */}
                                <FormGroup className={classes.formItem}>
                                    <TextField id="publish" label="Publish" type="datetime-local" onChange={this.handleChange('publish')} defaultValue="2020-01-01T00:00" InputLabelProps={{ shrink: true, }} />
                                </FormGroup>

                                {/* Submit */}
                                <FormGroup>
                                    <Button type='submit' size="small">Send</Button>
                                </FormGroup>

                        </form>


                    </CardContent>


                </Card>

            </div>

        );
    }
}




PostCreate.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(PostCreate)
