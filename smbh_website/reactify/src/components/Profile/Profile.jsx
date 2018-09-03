import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Parallax from '../Parallax/Parallax'
import 'whatwg-fetch'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import Collapse from '@material-ui/core/Collapse'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
// Style
import { theme } from '../Base/Base'
import styles from './ProfileStyle'


class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
          profileList: [],
          anchorEl: null,
          expanded: false,
        }
    }

    handleChangeCheckBox = name => event => {
      this.setState({ [name]: event.target.checked });
    }
    // Menu Icon Click
    handleMenuClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    }
    // Menu Icon Close
    handleMenuClose = () => {
        this.setState({
            anchorEl: null,
        });
    }

    handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }));
    }


    render() {
        const { classes } = this.props
        const { anchorEl } = this.state
        const { profileList } = this.state

        return (
                <div>

                  {/* Profile */}
                  <Parallax image={require("../../assets/img/workspace.jpg")} className={classes.windowSize} >


                    <Grid className={classes.GridRoot}>
                      <Grid container spacing={24} className={classes.GridContainer}>

                        {/* profileList.length > 0 ? profileList.map((profileItem, index) => {
                          <Grid item xl={4} lg={4} md={6} sm={12} xs={12} className={classes.GridItem}>
                                <Card>
                                  <CardHeader
                                    action={
                                      <IconButton>
                                          <IconButton
                                          aria-label="More"
                                          aria-owns={anchorEl ? 'long-menu' : null}
                                          aria-haspopup="true"
                                          onClick={this.handleMenuClick}
                                          >
                                              <MoreVertIcon />
                                          </IconButton>
                                          <Menu
                                          open={Boolean(anchorEl)}
                                          anchorEl={anchorEl}
                                          onClose={this.handleMenuClose}
                                          anchorOrigin={{
                                              vertical: 'bottom',
                                              horizontal: 'right',
                                          }}
                                          transformOrigin={{
                                              vertical: 'top',
                                              horizontal: 'right',
                                          }}
                                          >
                                              <MenuItem className={classes.menuItem} onClick={this.handleMenuClose}>1</MenuItem>
                                              <MenuItem className={classes.menuItem} onClick={this.handleMenuClose}>2</MenuItem>
                                              <MenuItem className={classes.menuItem} onClick={this.handleMenuClose}>3</MenuItem>
                                          </Menu>

                                      </IconButton>
                                    }
                                    title="Shrimp and Chorizo Paella"
                                    subheader="September 14, 2016"
                                  />
                                  <CardMedia
                                    className={classes.media}
                                    image="/static/images/cards/paella.jpg"
                                    title="Contemplative Reptile"
                                  />
                                  <CardContent>
                                    <Typography component="p">
                                      This impressive paella is a perfect party dish and a fun meal to cook together with your
                                      guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                    </Typography>
                                  </CardContent>
                                  <CardActions className={classes.actions} disableActionSpacing>

                                      <FormControlLabel
                                        control={
                                          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                                        }
                                        label=""
                                      />

                                    <IconButton aria-label="Share">
                                      <ShareIcon />
                                    </IconButton>
                                    <IconButton
                                      className={classnames(classes.expand, {
                                        [classes.expandOpen]: this.state.expanded,
                                      })}
                                      onClick={this.handleExpandClick}
                                      aria-expanded={this.state.expanded}
                                      aria-label="Show more"
                                    >
                                      <ExpandMoreIcon />
                                    </IconButton>
                                  </CardActions>
                                  <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                      <Typography paragraph variant="body2">
                                        Method:
                                      </Typography>
                                      <Typography paragraph>
                                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                        minutes.
                                      </Typography>
                                      <Typography paragraph>
                                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                        heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                        browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                                        chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                                        salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                                        minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                      </Typography>
                                      <Typography paragraph>
                                        Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                        without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
                                        to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
                                        cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                        minutes more. (Discard any mussels that don’t open.)
                                      </Typography>
                                      <Typography>
                                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                                      </Typography>
                                    </CardContent>
                                  </Collapse>
                                </Card>
                          </Grid>
                            )
                        }) : '' */}

                        <Grid item xl={4} lg={4} md={6} sm={12} xs={12} className={classes.GridItem}>
                              <Card>
                                <CardHeader
                                  action={
                                    <IconButton>
                                        <IconButton
                                        aria-label="More"
                                        aria-owns={anchorEl ? 'long-menu' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleMenuClick}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                        open={Boolean(anchorEl)}
                                        anchorEl={anchorEl}
                                        onClose={this.handleMenuClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        >
                                            <MenuItem className={classes.menuItem} onClick={this.handleMenuClose}>1</MenuItem>
                                            <MenuItem className={classes.menuItem} onClick={this.handleMenuClose}>2</MenuItem>
                                            <MenuItem className={classes.menuItem} onClick={this.handleMenuClose}>3</MenuItem>
                                        </Menu>

                                    </IconButton>
                                  }
                                  title="Shrimp and Chorizo Paella"
                                  subheader="September 14, 2016"
                                />
                                <CardMedia
                                  className={classes.media}
                                  image={require("../../assets/img/workspace.jpg")}
                                  title="Contemplative Reptile"
                                />
                                <CardContent>
                                  <Typography component="p">
                                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                  </Typography>
                                </CardContent>
                                <CardActions className={classes.actions} disableActionSpacing>

                                    <FormControlLabel
                                      control={
                                        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                                      }
                                      label=""
                                    />

                                  <IconButton aria-label="Share">
                                    <ShareIcon />
                                  </IconButton>
                                  <IconButton
                                    className={classnames(classes.expand, {
                                      [classes.expandOpen]: this.state.expanded,
                                    })}
                                    onClick={this.handleExpandClick}
                                    aria-expanded={this.state.expanded}
                                    aria-label="Show more"
                                  >
                                    <ExpandMoreIcon />
                                  </IconButton>
                                </CardActions>
                                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                  <CardContent>
                                    <Typography paragraph variant="body2">
                                      Method:
                                    </Typography>
                                    <Typography paragraph>
                                      Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                      minutes.
                                    </Typography>
                                    <Typography paragraph>
                                      Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                      heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                      browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                                      chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                                      salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                                      minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                    </Typography>
                                    <Typography paragraph>
                                      Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                      without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
                                      to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
                                      cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                      minutes more. (Discard any mussels that don’t open.)
                                    </Typography>
                                    <Typography>
                                      Set aside off of the heat to let rest for 10 minutes, and then serve.
                                    </Typography>
                                  </CardContent>
                                </Collapse>
                              </Card>
                        </Grid>

                      </Grid>
                    </Grid>

                  </Parallax>

                </div>

        );
    }
}

export default withStyles(styles)(Profile)
