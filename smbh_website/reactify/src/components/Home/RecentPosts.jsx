import React from 'react'
import $ from 'jquery'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
// Icons
import ShareIcon from '@material-ui/icons/Share'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
// Style
import styles from './RecentPostStyle'



class RecentPosts extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        anchorEl: null,
        postList: [],
        };
    }

    // Menu Card handler
    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        })
    }
    // Menu Card handler
    handleClose = () => {
        this.setState({
            anchorEl: null,
        })
    }

    // Load Posts
    loadPosts = () => {
        let thisComp = this
        let endpoint = 'Blog/API/'
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }

        fetch(endpoint, lookupOptions)
        .then(function(response){

            // console.log(response.json())
            return response.json()

        }).then(function(responseData){
            thisComp.setState({
                postList: responseData.results
            })
            // console.log(responseData)

        }).catch(function(error){

            console.log("error", error)

        })
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
            postList: []
        })
        this.loadPosts()
    }


    render() {
        const { classes } = this.props
        const { anchorEl } = this.state
        const { postList } = this.state



        return (
            <Grid className={classes.GridRoot}>
                <Grid container spacing={16} className={classes.GridContainer}>

                    {postList.length > 0 ? postList.slice(0, 3).map((postItem, index) => {
                        return (

                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12} className={classes.GridItem}>
                              <Card className={classes.card}>
                                <CardHeader
                                    action={

                                    <div>
                                        <IconButton
                                          aria-label="More"
                                          aria-owns={anchorEl ? 'long-menu' : null}
                                          aria-haspopup="true"
                                          onClick={this.handleClick}
                                          className={classes.linkStyle}
                                        >
                                            <MoreVertIcon />
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

                                    </div>
                                    }
                                    title={
                                      <Link to={{
                                        pathname: `Blog/${postItem.slug}`,
                                        state: {fromDashboard: false},
                                      }} maintainScrollPosition={false} className={classes.linkStyle} >{postItem.title}</Link>
                                    }
                                    subheader={this.dateTimeConvertor(postItem.publish)}
                                />

                                <CardMedia
                                    className={classes.media}
                                    image={postItem.image}
                                    title={postItem.title}
                                />
                                <CardContent>
                                    <Typography component="p" id={'postSummary' + index} >
                                        <div className="Container" dangerouslySetInnerHTML={{__html:postItem.summary}}></div>
                                    </Typography>
                                    <br />
                                    <Typography variant="caption">
                                        {postItem.author}
                                    </Typography>

                                </CardContent>

                                <CardActions className={classes.actions} disableActionSpacing>

                                      <FormControlLabel
                                        control={
                                          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                                        }
                                        label=""
                                        className={classes.favStyle}
                                      />


                                    <IconButton
                                      onClick={this.handleShareClick}
                                      aria-label="Share"
                                      className={classes.linkStyle}
                                    >
                                        <ShareIcon />
                                    </IconButton>

                                    {/* Read More */}
                                    <Link to={{
                                      pathname: `Blog/${postItem.slug}`,
                                      state: {fromDashboard: false},
                                    }} maintainScrollPosition={false} className={classes.Right} >
                                      <Button className={classes.linkStyle} variant='contained' color='primary'>Read more</Button>
                                    </Link>

                                </CardActions>

                              </Card>
                            </Grid>

                        )
                    }) : ''}


                </Grid>
            </Grid>
        );
    }
}

RecentPosts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecentPosts);
