import React, { Component } from 'react'

// Style



class PostDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      slug: null,
    }
  }


  // Component Did Mount
  componentDidMount() {
    if (this.props.match) {
      const { slug } = this.props.match.params
      this.setState({
        slug: slug,
      })
    }
  }


  render() {
    const { slug } = this.state
    return (

        <div>
          { (slug !== null) ? (<p>{slug}</p>) : (<p>Not Found</p>) }
        </div>

    );
  }
}


export default PostDetail
