import React from 'react'
import BlogSearch from './Search'
import PropTypes from 'prop-types'
import 'whatwg-fetch'
import { withStyles } from '@material-ui/core/styles'
import classNames from "classnames"
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
// Icons
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import ShareIcon from '@material-ui/icons/Share'
// Style
import styles from './PostListStyle'




class PostList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          anchorEl: null,
          postList: [],
          // Result stuff
          next: null,
          previous: null,
          count: 0,
        }
    }

    // Menu Click
    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };
    // Menu Close
    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    // Load Posts
    loadPosts = (nextEndpoint) => {
      let endpoint = 'API/'
      // Basic pagination
      if(nextEndpoint !== undefined) {
        endpoint = nextEndpoint
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
            thisComp.setState({
                // Load each page
                postList: responseData.results,
                // Load in a row
                // postList: thisComp.state.postList.concat(responseData.results),
                next: responseData.next,
                previous: responseData.previous,
                count: responseData.count,
            })
            // console.log(responseData)

        }).catch(function(error){

            console.log("error", error)

        })
    }

    // Post List Next Page
    postPaginationNext = () => {
      const { next } = this.state
      if (next !== null) {
        this.loadPosts(next)
      }
    }

    // Post List Previous Page
    postPaginationPrevious = () => {
      const { previous } = this.state
      if (previous !== null) {
        this.loadPosts(previous)
      }
    }

    // handle search result
    handleSearchResult = (searchArray) => {
      if (searchArray){
        this.setState({
          postList: searchArray[0],
          // Result stuff
          next: searchArray[1],
          previous: searchArray[2],
          count: searchArray[3],
        })
      }
    }

    // Date Time Convertor
    dateTimeConvertor(dt){
        let newDate = new Date(dt)
        let output = newDate.toLocaleDateString() + newDate.toLocaleTimeString()
        const options = {day: 'numeric', month: 'short', year: 'numeric',  hour: 'numeric', minute: 'numeric'}
        // const language_code = navigator.language
        const language_code = window.location.pathname.slice(1, 3);
        output = newDate.toLocaleString(language_code, options)
        return output
    }


    // Component Did Mount
    componentDidMount(){
        this.setState({
            postList: [],
            // Result stuff
            next: null,
            previous: null,
            count: 0,
        })
        this.loadPosts()
    }


    render() {
        const { classes } = this.props
        const { anchorEl } = this.state
        const { postList } = this.state
        const { next } = this.state
        const { previous } = this.state


        return (

            <Grid className={classes.GridContainer}>

              <Grid item xs={12}>
                <BlogSearch result={this.handleSearchResult} />
              </Grid>


                {postList.length > 0 ? postList.map((postItem, index) => {
                    return (

                      <Grid item xs={12}>
                        <Paper className={classes.paperRoot}>

                          {/* Head */}
                          <Grid className={classes.rightAlign}>
                          </Grid>
                          {/* main */}
                          <Grid container spacing={16}>

                            {/* Image */}
                            { index % 2 === 0 && postItem.image ? (
                              <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                                <img alt={postItem.title} src={postItem.image} className={classes.paperImage} />
                              </Grid>
                            ) : ''}
                            {/* Content */}
                            <Grid item container direction="column" xl={7} lg={7} md={7} sm={12} xs={12}>
                                {/* Title */}
                                <Typography gutterBottom variant="display1" className={classes.title}>
                                  <Link to={{
                                    pathname: `${postItem.slug}`,
                                    state: {fromDashboard: false},
                                  }} maintainscrollposition={false} className={classes.linkStyle} >{postItem.title}</Link>
                                </Typography>
                                {/* Content */}
                                <Typography gutterBottom variant='body1' className={classes.infoStyle}>
                                  <div dangerouslySetInnerHTML={{__html:postItem.summary}}></div>
                                </Typography>
                                {/* Info */}
                                <Typography gutterBottom variant='body1' className={classes.infoStyle}>
                                  by <a><strong>{postItem.author}</strong></a>, {this.dateTimeConvertor(postItem.publish)}
                                </Typography>

                                <Grid container spacing={24} className={classes.infoStyle}>
                                    {postItem.tags.length > 0 ? postItem.tags.map((tag, tagIndex) => {
                                        return (
                                          <Grid item xs>
                                            <a className={classes.tagMargin}>
                                                <Typography gutterBottom variant='body2'>
                                                    #{tag}
                                                </Typography>
                                            </a>
                                          </Grid>
                                        )
                                    }) : ''}
                                </Grid>

                            </Grid>

                            {/* Image */}
                            { index % 2 !== 0 && postItem.image ? (
                              <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                                <img alt={postItem.title} src={postItem.image} className={classes.paperImage} />
                              </Grid>
                            ) : ''}

                          </Grid>

                          {/* Footer */}
                          <Grid className={classes.rightAlign}>
                            {/* Like */}
                            <FormControlLabel
                              control={
                                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                              }
                              label=""
                              className={classes.favStyle}
                            />

                            {/* Share */}
                            <span>
                                <IconButton
                                  aria-label="Share"
                                  aria-owns={anchorEl ? 'long-menu' : null}
                                  aria-haspopup="true"
                                  onClick={this.handleClick}
                                  className={classes.linkStyle}
                                >
                                    <ShareIcon />
                                </IconButton>
                                <Menu
                                  open={Boolean(anchorEl)}
                                  anchorEl={anchorEl}
                                  onClose={this.handleClose}
                                  anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'right',
                                  }}
                                  transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'right',
                                  }}
                                >
                                    <MenuItem className={classes.menuItem} onClick={this.handleClose}>1</MenuItem>
                                    <MenuItem className={classes.menuItem} onClick={this.handleClose}>2</MenuItem>
                                    <MenuItem className={classes.menuItem} onClick={this.handleClose}>3</MenuItem>
                                </Menu>

                            </span>


                            <Link to={{
                              pathname: `${postItem.slug}`,
                              state: {fromDashboard: false},
                            }} maintainscrollposition={false} className={classes.Right} >
                              <Button className={classNames(classes.linkStyle, classes.favStyle)} variant='contained' color='primary'>Read more</Button>
                            </Link>
                          </Grid>

                        </Paper>
                      </Grid>

                    )
                }) : ''}


                {/* Pagination */}
                { next !== null ? (<Button className={classes.linkStyle} variant='flat' onClick={this.postPaginationNext} >Next</Button>) : '' }
                { previous !== null ? (<Button className={classes.linkStyle} variant='flat' onClick={this.postPaginationPrevious} >Previous</Button>) : '' }

            </Grid>
        );
    }
}

PostList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostList);
