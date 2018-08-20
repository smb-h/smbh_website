import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import UpIcon from '@material-ui/icons/KeyboardArrowUpRounded';


// Style
import styles from './FloatButtonStyle.jsx';



class FloatButton extends React.Component {
  constructor(props){
    super(props);
    // this.state = {renderBtn: true};
    // this.dissBtn = this.dissBtn.bind(this);
  }

  goToTop(){
    // this.setState = {renderBtn: false};
  }


  render () {
  const { classes } = this.props;
  return (
    <div>
      <Button onClick={this.goToTop} variant="fab" color="primary" aria-label="Up" className={classes.button + ' ' + classes.FloatingButton}>
        <UpIcon />
      </Button>
    </div>
  );
  }
}

FloatButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatButton);

