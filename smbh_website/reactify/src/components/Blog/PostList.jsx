import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from "classnames"
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
// Style
import styles from './PostListStyle'




class PostList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          anchorEl: null,
          Animated: false,
          postList: [],
          // Result stuff
          next: null,
          previous: null,
          count: 0,
        }
    }

    handleFavClick = () => {
        this.setState(state => ({ Animated: !state.Animated }));
    };

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

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


    render() {
        const { classes } = this.props
        const { anchorEl } = this.state
        const { postList } = this.state
        const { next } = this.state
        const { previous } = this.state


        return (

            <section class="my-5 container">

                {postList.length > 0 ? postList.map((postItem, index) => {
                    return (

                    <div class="row jumbotron">


                        {index % 2 === 0 ? (

                                <div class="col-lg-5">

                                    <div class="view overlay rounded z-depth-2 mb-lg-0 mb-4">
                                        <img class="img-fluid" src={postItem.image} alt={postItem.title} />
                                    </div>

                                </div>

                        ) : ''}


                        <div class="col-lg-7">
                            {/* Title */}
                            <h2 class="font-weight-bold mb-3"><strong>
                              <Link to={{
                                pathname: `${postItem.slug}`,
                                state: {fromDashboard: false},
                              }} maintainScrollPosition={false} >{postItem.title}</Link>
                            </strong></h2>
                            <p>{postItem.summary}</p>
                            <p>by <a><strong>{postItem.author}</strong></a>, {this.dateTimeConvertor(postItem.publish)}</p>
                            <div class='row'>
                                {postItem.tags.length > 0 ? postItem.tags.map((tag, tagIndex) => {
                                    return (
                                    <a href="#" className={classes.tagMargin}>
                                        <h6 class="font-weight-bold mb-3">
                                            #{tag}
                                        </h6>
                                    </a>
                                    )
                                }) : ''}
                            </div>

                            <IconButton
                                className={classNames(classes.Anime,
                                {[classes.AnimeOn]: this.state.Animated,}
                                )}
                                onClick={this.handleFavClick}
                                aria-label="Favorite">
                                <FavoriteIcon />
                            </IconButton>

                            <IconButton>
                                <IconButton
                                aria-label="Share"
                                aria-owns={anchorEl ? 'long-menu' : null}
                                aria-haspopup="true"
                                onClick={this.handleClick}
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

                            </IconButton>

                            <Button className={classes.Right} variant='contained' color='primary'>
                              <Link to={{
                                pathname: `${postItem.slug}`,
                                state: {fromDashboard: false},
                              }} maintainScrollPosition={false} >Read more</Link>
                            </Button>

                        </div>


                        {index % 2 !== 0 ? (

                                <div class="col-lg-5">

                                    <div class="view overlay rounded z-depth-2 mb-lg-0 mb-4">
                                        <img class="img-fluid" src={postItem.image} alt={postItem.title} />
                                    </div>

                                </div>

                        ) : ''}


                    </div>


                    )
                }) : ''}


                {/* Load more post button */}
                { next !== null ? (<Button variant='flat' onClick={this.postPaginationNext} >Next</Button>) : '' }
                { previous !== null ? (<Button variant='flat' onClick={this.postPaginationPrevious} >Previous</Button>) : '' }


            </section>
        );
    }
}

PostList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostList);
