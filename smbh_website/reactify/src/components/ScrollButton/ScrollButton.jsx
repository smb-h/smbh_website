import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import UpIcon from '@material-ui/icons/KeyboardArrowUpRounded'


// Style
import styles from './ScrollButtonStyle'



class ScrollButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      scrollTop: 0,
      intervalId: 0,
      doc: null,
      top: 0,
      left: 0,
    }
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e) => {
    let doc = document.documentElement
    this.setState({
      // doc: doc,
      // left: (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
      // top: (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0),
      top: window.pageYOffset || doc.scrollTop,
      // left: window.pageXOffset || doc.scrollLeft,
    })
    console.log('TOP: ', this.state.top)
  }

  render () {
  const { classes } = this.props
  return (
    <div>
      <Fade in={this.state.top > 100}>
        <Button variant="fab" color="primary" aria-label="Up" className={classes.button + ' ' + classes.FloatingButton} onClick={ () => { this.scrollToTop() }} >
          <UpIcon />
        </Button>
      </Fade>
    </div>
  );
  }
}

ScrollButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollButton);
