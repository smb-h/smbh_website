import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from "classnames"

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';


// Style
import styles from './PostListStyle';




class PostList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        anchorEl: null,
        Animated: false,
        postList: []
        };
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
    loadPosts = () => {
        const thisComp = this
        const endpoint = 'Blog/API/'
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }

        fetch(endpoint, lookupOptions)
        .then(function(response){

            return response.json()

        }).then(function(responseData){
            thisComp.setState({
                postList: responseData
            })
            // console.log(responseData)

        }).catch(function(error){

            console.log("error", error)

        })
    }


    componentDidMount(){
        this.setState({
            postList: []
        })
        this.loadPosts()
    }

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


        return (

            <section class="my-5 container">

                {postList.length > 0 ? postList.map((postItem, index) => {
                    return (

                    <div class="row jumbotron">


                        {index % 2 === 0 ? (

                                <div class="col-lg-5">

                                    <div class="view overlay rounded z-depth-2 mb-lg-0 mb-4">
                                        <img class="img-fluid" src={postItem.image} alt={postItem.title} />
                                        <a>
                                            <div class="mask rgba-white-slight"></div>
                                        </a>
                                    </div>

                                </div>

                        ) : ''}


                        <div class="col-lg-7">

                            <h2 class="font-weight-bold mb-3"><strong>{postItem.title}</strong></h2>
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

                            <Button className={classes.Right} variant='contained' color='primary' href={postItem.url}>
                                Read more
                            </Button>
                        </div>


                        {index % 2 !== 0 ? (

                                <div class="col-lg-5">

                                    <div class="view overlay rounded z-depth-2 mb-lg-0 mb-4">
                                        <img class="img-fluid" src={postItem.image} alt={postItem.title} />
                                        <a>
                                            <div class="mask rgba-white-slight"></div>
                                        </a>
                                    </div>

                                </div>

                        ) : ''}


                    </div>


                    )
                }) : ''}


            </section>
        );
    }
}

PostList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostList);
