import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'whatwg-fetch'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// Icons
import Search from '@material-ui/icons/SearchRounded'
// Style
// import { theme } from '../Base/Base'
import styles from './SearchStyle'



class BlogSearch extends Component {
    constructor(props) {
      super(props)
      this.state = {
        search: '',
      }
    }

    // Input Change Handler
    handleChange = event => {
      const name = event.target.id
      const value = event.target.value
      this.setState({
        [name]: value,
      })
      // console.log(this.state.search)
    }

    // handle search click
    handleSearchClick = () => {
      const { search } = this.state
      if (search !== '') {
        this.searchPosts(search)
      }
    }
    // handle search enter press
    handleSearchKeyPress = (event) => {
      if (event.key === 'Enter') {
        this.handleSearchClick()
      }
    }


    // Search
    searchPosts = (q) => {
      let endpoint = 'API/'
      // Query
      if(q !== undefined) {
        endpoint = 'API/' + '?q=' + q
      }
        const thisComp = this
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }

        fetch(endpoint, lookupOptions)
        .then(function(response){
            // console.log(response)
            return response.json()

        }).then(function(responseData){
            // Manage Response Data
            const searchArray = [responseData.results, responseData.next, responseData.previous, responseData.count]
            // console.log(responseData)
            thisComp.props.result(searchArray)

        }).catch(function(error){

            console.log("error", error)

        })
    }


    // Component Did Mount
    componentDidMount() {
      this.setState({
        search: '',
      })
    }

    render() {
        const { classes } = this.props
        const { search } = this.state
        return (
                <Grid container spacing={8} className={classes.alignment}>

                  <Grid item xs={11}>
                    <Typography variant='subheading'>
                      <TextField
                        id="search"
                        label="Search"
                        type="search"
                        onChange={this.handleChange}
                        margin="normal"
                        value={search}
                        fullWidth
                        onKeyPress={this.handleSearchKeyPress}
                      />
                    </Typography>
                  </Grid>

                  <Grid item xs={1}>
                    <Button variant='flat' onClick={this.handleSearchClick} className={classes.linkStyle} >
                      <Search className={classes.iconStyle} />
                    </Button>
                  </Grid>

                </Grid>
        );
    }
}

BlogSearch.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(BlogSearch)
