import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import FingerPrint from '@material-ui/icons/Fingerprint'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LoginCard from './Login'
import Registration from './Registration'
// Style
import styles from './AuthTabsStyle'
import { theme } from '../Base/Base'



function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
}



class AuthTabs extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    // const { classes, theme } = this.props
    const { classes } = this.props

    return (
      <div id='AuthTabs' className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="secondary"
            // fullWidth
            centered
          >
            <Tab icon={<FingerPrint />} label="Login" />
            <Tab label="" disabled />
            <Tab icon={<AccountCircle />} label="Register" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <LoginCard />
          </TabContainer>

          <TabContainer dir={theme.direction}></TabContainer>

          <TabContainer dir={theme.direction}>
            <Registration />
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}



AuthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(AuthTabs)
// export default withStyles(styles)(AuthTabs)
