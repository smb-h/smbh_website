import React, { Component } from 'react'
import moment from 'moment'
import 'whatwg-fetch'
import cookie from 'react-cookies'
// Style



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
    return (

        <div>

          { postLoaded === true && post !== null ? (

            <div>
              <h1>{post.title}</h1>
            </div>

          ) : (<h3>{ err }</h3>) }

        </div>

    );
  }
}


export default PostDetail
