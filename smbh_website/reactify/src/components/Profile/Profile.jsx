import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Parallax from '../Parallax/Parallax'
import 'whatwg-fetch'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import Collapse from '@material-ui/core/Collapse'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
// Icons
import ShareIcon from '@material-ui/icons/Share'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
// Style
import { theme } from '../Base/Base'
import styles from './ProfileStyle'


class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
          profileList: [],
          // Result stuff
          next: null,
          previous: null,
          count: 0,
          // Other
          anchorEl: null,
        }
    }
    // Handle CheckBox
    handleChangeCheckBox = name => event => {
      this.setState({ [name]: event.target.checked });
    }
    // Menu Icon Click
    handleMenuClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    }
    // Menu Icon Close
    handleMenuClose = () => {
        this.setState({
            anchorEl: null,
        });
    }

    // Handle Seprated Expand Click
    handleSepratedExpandClick = (event) => {
      const id = event.target.id
      const value = event.target.value
      // console.log('Item: ', id, value, 'To', !value)
      this.setState({
        // [id]: !value,
        [id]: (value === 'true' ? false : true),
      })
      // console.log('Event: ', event.target)
      // console.log('Item: ', id, this.state[id])
    }


    // Load Gallery
    loadGallery = (nextEndpoint) => {
        let thisComp = this

        let endpoint = '/API/Profile/'
        // Basic pagination
        if(nextEndpoint !== undefined) {
          endpoint = nextEndpoint
        }

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
            thisComp.setState({
                profileList: responseData.results,
                next: responseData.next,
                previous: responseData.previous,
                count: responseData.count,
            })
            // console.log(responseData)

        }).catch(function(error){

            console.log("error", error)

        })
    }


    // Gallery Next Page
    profilePaginationNext = () => {
      const { next } = this.state
      if (next !== null) {
        this.loadGallery(next)
      }
    }

    // Gallery Previous Page
    profilePaginationPrevious = () => {
      const { previous } = this.state
      if (previous !== null) {
        this.loadGallery(previous)
      }
    }


    // Component Did Mount
    componentDidMount(){
        this.setState({
            profileList: [],
            // Result stuff
            next: null,
            previous: null,
            count: 0,
        })
        this.loadGallery()
    }


    render() {
        const { classes } = this.props
        const { anchorEl } = this.state
        const { profileList } = this.state
        const { next } = this.state
        const { previous } = this.state
        // console.log('Profile List: ', profileList)

        return (
                <div>

                  {/* Profile */}
                  <Parallax image={require("../../assets/img/workspace.jpg")} className={classes.windowSize} >


                    <Grid className={classes.GridRoot}>
                      <Grid container spacing={24} className={classes.GridContainer}>

                        { profileList.length > 0 ? profileList.map((profileItem, index) => {
                          return (
                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12} className={classes.GridItem}>

                                  <Card>
                                    <CardHeader
                                      action={
                                        <div>
                                            <IconButton
                                              aria-label="More"
                                              aria-owns={anchorEl ? 'long-menu' : null}
                                              aria-haspopup="true"
                                              onClick={this.handleMenuClick}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                              open={Boolean(anchorEl)}
                                              anchorEl={anchorEl}
                                              onClose={this.handleMenuClose}
                                              anchorOrigin={{
                                                  vertical: 'bottom',
                                                  horizontal: 'right',
                                              }}
                                              transformOrigin={{
                                                  vertical: 'top',
                                                  horizontal: 'right',
                                              }}
                                            >
                                                <MenuItem className={classes.menuItem} onClick={this.handleMenuClose}>1</MenuItem>
                                                <MenuItem className={classes.menuItem} onClick={this.handleMenuClose}>2</MenuItem>
                                                <MenuItem className={classes.menuItem} onClick={this.handleMenuClose}>3</MenuItem>
                                            </Menu>

                                        </div>
                                      }
                                      title={profileItem.title}
                                      subheader={profileItem.updated}
                                    />
                                    <CardMedia
                                      className={classes.media}
                                      image={profileItem.image}
                                      title={profileItem.title}
                                    />
                                    <CardContent>
                                      <div>
                                        <Typography variant='Headline'>
                                          { profileItem.subTitle ? (<div>{profileItem.subTitle}</div>) : ''}
                                        </Typography>
                                        <Typography variant='body2'>
                                          { profileItem.start ? (<div>start: {profileItem.start}</div>) : ''}
                                          { profileItem.end ? (<div>end: {profileItem.end}</div>) : ''}
                                          { profileItem.url ? (<div>{profileItem.url}</div>) : ''}
                                        </Typography>
                                      </div>
                                    </CardContent>
                                    <CardActions className={classes.actions} disableActionSpacing>
                                      {/* Like */}
                                      <FormControlLabel
                                        control={
                                          <Checkbox onClick={this.handleChangeCheckBox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                                        }
                                        label=""
                                        className={classes.favStyle}
                                      />
                                      {/* Share */}
                                      <IconButton aria-label="Share">
                                        <ShareIcon />
                                      </IconButton>
                                      {/* Expand */}
                                      <IconButton
                                        id={'Expand' + index}
                                        aria-label="Show more"
                                        className={classnames(classes.expand, {
                                          [classes.expandOpen]: this.state['Expand' + index],
                                        })}
                                        onClick={this.handleSepratedExpandClick}
                                        aria-expanded={this.state['Expand' + index]}
                                        value={this.state['Expand' + index]}
                                      >
                                        <ExpandMoreIcon />
                                      </IconButton>
                                    </CardActions>
                                    <Collapse in={this.state['Expand' + index]} timeout="auto" unmountOnExit>
                                      <CardContent>
                                        <Typography paragraph variant="subheading">
                                          <div className="Container" dangerouslySetInnerHTML={{__html: profileItem.content}}></div>
                                        </Typography>
                                        <br />
                                        {/* Tags */}
                                        <Grid container>
                                          <Grid item xs>
                                            {/* Tags */}
                                            <Grid container>
                                              {profileItem.tags.map(tag => (
                                                  <Grid item xs><Typography variant="subheading" key={tag}>#{tag}</Typography></Grid>
                                              ))}
                                            </Grid>
                                          </Grid>
                                        </Grid>

                                      </CardContent>
                                    </Collapse>
                                  </Card>
                            </Grid>
                          )
                        }) : '' }


                      </Grid>

                      {/* Pagination */}
                      { next !== null ? (<Button variant='flat' onClick={this.profilePaginationNext} >Next</Button>) : '' }
                      { previous !== null ? (<Button variant='flat' onClick={this.profilePaginationPrevious} >Previous</Button>) : '' }


                    </Grid>

                  </Parallax>

                </div>

        );
    }
}

export default withStyles(styles)(Profile)
