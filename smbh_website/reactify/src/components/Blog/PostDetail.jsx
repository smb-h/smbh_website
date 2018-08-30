import React, { Component } from 'react'
import moment from 'moment'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Parallax from '../Parallax/Parallax'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import ButtonBase from '@material-ui/core/ButtonBase'
// Style
import { theme } from '../Base/Base'
import styles from './PostDetailStyle'


class PostDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      slug: null,
      post: null,
      postLoaded: false,
      err: null
    }
  }

  // Load Post
  loadPost = (slug) => {
      const thisComp = this
      const endpoint = `API/${slug}`
      let lookupOptions = {
          method: 'GET',
          headers: {
              'Content-type': 'application/json'
          }
      }

      fetch(endpoint, lookupOptions)
      .then(function(response){
          // Handle error here or in responseData
          if (response.status == 404) {
            console.log('Page Not Found.')
          }
          // console.log(response)
          return response.json()

      }).then(function(responseData){
          if (responseData.detail){
            thisComp.setState({
                post: null,
                postLoaded: true,
                err: responseData.detail,
            })
          } else {
          thisComp.setState({
              post: responseData,
              postLoaded: true,
              err: null,
          })}
          // console.log(responseData)

      }).catch(function(error){

          console.log("error", error)

      })
  }

  // Update Post
  updatePost = (data) => {
      const thisComp = this
      const endpoint = 'API/:slug'
      const csrfToken = cookie.load('csrftoken')
      // TODO: Move token stuff to cookie
      const Token = ('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InNtYmgiLCJleHAiOjE1MzUyNTI4NDAsImVtYWlsIjoic21iX2hAeWFob28uY29tIiwib3JpZ19pYXQiOjE1MzUyNTI1NDB9._H6oDPdGienzFtf4-V0KqoCOQ5vsC5LJKnONAxP6r1U')

      if (csrfToken !== undefined) {

          let lookupOptions = {
              method: 'POST',
              headers: {
                  'Authorization': 'JWT ' +  Token,
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


  // Component Did Mount
  componentDidMount() {
    if (this.props.match) {
      const { slug } = this.props.match.params
      this.setState({
        slug: slug,
        postLoaded: false
      })
      this.loadPost(slug)
    }
  }


  render() {
    const { postLoaded } = this.state
    const { post } = this.state
    const { err } = this.state
    const { classes } = this.props

    const featuredPosts = [
        {
          title: 'Featured post',
          date: 'Nov 12',
          description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        },
        {
          title: 'Post title',
          date: 'Nov 11',
          description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        },
      ];

    const archives = [
        'March 2020',
        'February 2020',
        'January 2020',
        'December 2019',
        'November 2019',
        'October 2019',
        'September 2019',
        'August 2019',
        'July 2019',
        'June 2019',
        'May 2019',
        'April 2019',
    ];

    const social = ['GitHub', 'Twitter', 'Facebook'];

    return (
      <div>
        {/* Blog */}
        <Parallax image={require("../../assets/img/plant_room.jpg")}>

          <div className={classes.layout}>

            <div>
              { postLoaded === true && post !== null ? (

                <div>
                    <CssBaseline />

                    <main>
                      {/* Image */}
                      <CardMedia
                        component="img"
                        className={classes.media}
                        image={post.image}
                        title={post.title}
                      />


                      <Grid container spacing={40} className={classes.mainGrid}>
                          {/* Main content */}
                          <Grid item xs={12} md={8}>
                            <Card className={classes.mainCard}>
                              <Typography variant="title" className={classes.title}>
                                  {post.title}
                              </Typography>
                              <br />
                              <Typography variant='caption'>
                                <span style={{ marginRight: '3%' }}> {post.publish} </span> <span style={{ marginRight: '3%' }}> {post.author} </span> {post.read_time} Read
                              </Typography>
                              <Divider className={classes.dividerStyle} />
                              {/* Content */}
                              <Typography variant="body1" className={classes.content}>

                                {post.content}

                              </Typography>
                              <br />
                              {/* Tags */}
                              <Typography variant="title" className={classes.content}>
                                {post.tags.map(tag => (
                                    <Typography key={tag}>#{tag}</Typography>
                                ))}
                              </Typography>
                              <Divider className={classes.dividerStyle} />
                              {/* Comments */}
                              <Typography variant="display1" className={classes.content}>
                                Leave a comment
                              </Typography>
                              {/* Threads */}
                              <div>
                                {post.comments.map(comment => (

                                  <div class='container' id="Thread">
                                    <div class='jumbotron'>
                                        <blockquote class="blockquote text-left">
                                            <p class="mb-0">{ comment.content }</p>
                                            <footer class="blockquote-footer text-center">{ comment.user } | <cite title="Source Title">{ comment.timestamp }</cite>
                                                { comment.children.count > 0 ? (
                                                  <p>| { comment.children.count } Comment</p>
                                                ) : '' }

                                                {/* request.user == comment.user ? (<a href={ comment.get_delete_url } class="btn btn-outline-danger btn-sm">Delete</a>) : '' */}

                                            </footer>
                                        </blockquote>

                                        <hr/>
                                        <div>
                                            {/* for child_comment in comment.children */}
                                            { comment.children.map(child_comment => (

                                              <blockquote class="blockquote text-left">
                                                <p class="mb-0">{ child_comment.content }</p>
                                                <footer class="blockquote-footer text-center">{ child_comment.user } | <cite title="Source Title">{ child_comment.timestamp } ago</cite>
                                                {/* request.user == comment.user ? (<a href='{{ child_comment.get_delete_url }}' class="btn btn-outline-danger btn-sm">Delete</a>) : '' */}
                                                </footer>
                                              </blockquote>

                                            )) }

                                            {/* request.user.is_authenticated ? (

                                              <form method="POST">
                                                { form | crispy }
                                                <input type='hidden' name='parent_id' value='{{ comment.id }}' />
                                                <input type='submit' value='Reply' class='btn btn-default' />
                                              </form>

                                            ) : (<p>You must login to comment. </p>) */}

                                        </div>
                                        <hr/>
                                    </div>
                                  </div>

                                ))}
                              </div>
                              {/* End of thread */}


                            </Card>
                          </Grid>

                          {/* Sidebar */}
                          <Grid item xs={12} md={4}>
                            <Card className={classes.mainCard}>
                              <Paper elevation={0} className={classes.sidebarAboutBox}>
                                  <Typography variant="title" gutterBottom>
                                  About
                                  </Typography>
                                  <Typography>
                                  Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit
                                  amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
                                  </Typography>
                              </Paper>
                              <Typography variant="title" gutterBottom className={classes.sidebarSection}>
                                  Archives
                              </Typography>
                              {archives.map(archive => (
                                  <Typography key={archive}>{archive}</Typography>
                              ))}
                              <Typography variant="title" gutterBottom className={classes.sidebarSection}>
                                  Social
                              </Typography>
                              {social.map(network => (
                                  <Typography key={network}>{network}</Typography>
                              ))}
                            </Card>
                          </Grid>

                      </Grid>

                    </main>

                    {/* Sub featured posts */}
                    <Grid container spacing={40} className={classes.cardGrid}>
                    {featuredPosts.map(post => (
                      <Grid item key={post.title} xs={12} md={6}>
                      <Card className={classes.card}>
                      <div className={classes.cardDetails}>
                      <CardContent>
                      <Typography variant="headline">{post.title}</Typography>
                      <Typography variant="subheading" color="textSecondary">
                      {post.date}
                      </Typography>
                      <Typography variant="subheading" paragraph>
                      {post.description}
                      </Typography>
                      <Typography variant="subheading" color="primary">
                      Continue reading...
                      </Typography>
                      </CardContent>
                      </div>
                      <Hidden xsDown>
                      <CardMedia
                      className={classes.cardMedia}
                      image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                      title="Image title"
                      />
                      </Hidden>
                      </Card>
                      </Grid>
                    ))}
                    </Grid>


                </div>

              ) : (<h3>{ err }</h3>) }
            </div>
          </div>
        </Parallax>

      </div>
    );
  }
}



PostDetail.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(PostDetail);
