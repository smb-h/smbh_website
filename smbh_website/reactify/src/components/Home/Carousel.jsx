import React, { Component } from "react"
import Slider from "react-slick"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import withStyles from "@material-ui/core/styles/withStyles"
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import DevicesOther from '@material-ui/icons/DevicesOther'
import AllInclusive from '@material-ui/icons/AllInclusive'
import Public from '@material-ui/icons/Public'
import Group from '@material-ui/icons/Group'
import Timeline from '@material-ui/icons/Timeline'
// Style
import CarouselStyle from "./CarouselStyle"



class ServiceCarousel extends Component {
  render() {
    const { classes } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
          }
        },
        {
          breakpoint: 480,
          settings: {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
          }
        }
      ]
    };
    return (
      <div className={classes.container}>

        <div className={classes.centeralize}>
          <Typography variant='display1' className={classes.servicesTitle}>SERVICES</Typography>
          <Typography variant='headline' className={classes.servicesInfo}>What Can I Do For You?</Typography>
        </div>
        <div>

          <Slider {...settings}>

            <div>
              <Card  className={classes.InnerItem}>
                <Typography variant='display1'>
                  <DevicesOther className={classes.IconStyle} />
                </Typography>
                <Typography variant='display1'>
                  Develop
                </Typography>
                <Typography variant='subheading'>
                  WebSite &amp; Application
                </Typography>
              </Card>
            </div>

            <div>
              <Card className={classes.InnerItem}>
                <Typography variant='display1'>
                  <AllInclusive className={classes.IconStyle} />
                </Typography>
                <Typography variant='display1'>
                  Design
                </Typography>
                <Typography variant='subheading'>
                  UI, UX, Graphic, Illustration
                </Typography>
              </Card>
            </div>

            <div>
              <Card className={classes.InnerItem}>
                <Typography variant='display1'>
                  <Public className={classes.IconStyle} />
                </Typography>
                <Typography variant='display1'>
                  Research
                </Typography>
                <Typography variant='subheading'>
                  Technology, System, Security
                </Typography>
              </Card>
            </div>

            <div>
              <Card className={classes.InnerItem}>
                <Typography variant='display1'>
                  <Group className={classes.IconStyle} />
                </Typography>
                <Typography variant='display1'>
                  Consultancy
                </Typography>
                <Typography variant='subheading'>
                  E Commerce, Marketing, Branding
                </Typography>
              </Card>
            </div>

          </Slider>
        </div>
      </div>
    );
  }
}

ServiceCarousel.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(CarouselStyle)(ServiceCarousel)
