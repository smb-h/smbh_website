import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';



import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';



// Style
import styles from './RecentPostStyle.jsx';



class RecentPosts extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        anchorEl: null,
        Animated: false,
    };

  }

  handleShareClick = () => {
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


  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <Grid className={classes.GridRoot}>
      <Grid container spacing={16} className={classes.GridContainer}>

        {/* Item */}
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12} className={classes.GridItem}>
            <Card className={classes.card}>
            <CardHeader
                avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                    R
                </Avatar>
                }
                action={
                   
                <IconButton>
                    <IconButton
                      aria-label="More"
                      aria-owns={anchorEl ? 'long-menu' : null}
                      aria-haspopup="true"
                      onClick={this.handleClick}
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
                This impressive paella is a perfect party dish and a fun meal to cook together with
                your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography>
            </CardContent>

            <CardActions className={classes.actions} disableActionSpacing>
                <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                </IconButton>

                <IconButton 
                className={classnames(classes.Anime, 
                {[classes.AnimeOn]: this.state.Animated,}
                )} 
                onClick={this.handleShareClick}
                aria-label="Share">
                    <ShareIcon />
                </IconButton>
                
                <Button className={classes.Right} variant='contained' color='secondary'>
                    More
                </Button>

                
            </CardActions>

            </Card>
        </Grid>

        {/* Item */}
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12} className={classes.GridItem}>
            <Card className={classes.card}>
            <CardHeader
                avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                    R
                </Avatar>
                }
                action={
                   
                <IconButton>
                    <IconButton
                      aria-label="More"
                      aria-owns={anchorEl ? 'long-menu' : null}
                      aria-haspopup="true"
                      onClick={this.handleClick}
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
                This impressive paella is a perfect party dish and a fun meal to cook together with
                your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography>
            </CardContent>

            <CardActions className={classes.actions} disableActionSpacing>
                <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                </IconButton>

                <IconButton 
                className={classnames(classes.Anime, 
                {[classes.AnimeOn]: this.state.Animated,}
                )} 
                onClick={this.handleShareClick}
                aria-label="Share">
                    <ShareIcon />
                </IconButton>
                
                <Button className={classes.Right} variant='contained' color='secondary'>
                    More
                </Button>

                
            </CardActions>

            </Card>
        </Grid>

        {/* Item */}
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12} className={classes.GridItem}>
            <Card className={classes.card}>
            <CardHeader
                avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                    R
                </Avatar>
                }
                action={
                   
                <IconButton>
                    <IconButton
                      aria-label="More"
                      aria-owns={anchorEl ? 'long-menu' : null}
                      aria-haspopup="true"
                      onClick={this.handleClick}
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
                This impressive paella is a perfect party dish and a fun meal to cook together with
                your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography>
            </CardContent>

            <CardActions className={classes.actions} disableActionSpacing>
                <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                </IconButton>

                <IconButton 
                className={classnames(classes.Anime, 
                {[classes.AnimeOn]: this.state.Animated,}
                )} 
                onClick={this.handleShareClick}
                aria-label="Share">
                    <ShareIcon />
                </IconButton>
                
                <Button className={classes.Right} variant='contained' color='secondary'>
                    More
                </Button>

                
            </CardActions>

            </Card>
        </Grid>

      </Grid>
      </Grid>
    );
  }
}

RecentPosts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecentPosts);

