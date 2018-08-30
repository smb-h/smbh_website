import React, { Component } from 'react'
// https://www.npmjs.com/package/classnames
import classNames from "classnames"
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import ServiceCarousel from './Carousel'
// Styles
import styles from './ServicesStyle'




class Services extends Component {

    // Component Did Mount
    componentDidMount() {
      // Config Owl Carousel
      // $(".owl-carousel").owlCarousel({
      //     rtl: true,
      //     loop: true,
      //     margin: 10,
      //     nav: true,
      //     autoplay: true,
      //     autoplayTimeout: 3000,
      //     autoplayHoverPause: false,
      //     responsive: {
      //         0: {
      //             items: 1
      //         },
      //         600: {
      //             items: 3
      //         },
      //         1000: {
      //             items: 5
      //         }
      //     }
      // });
      // const owlCarousel = document.getElementById('Owl').owlCarousel()
      // console.log(owlCarousel)

    }

    render() {
        const { classes } = this.props;
        // ClassNames Example
        // const appBarClasses = classNames({
        //   [classes.appBar]: true,
        //   [classes[color]]: color,
        //   [classes.absolute]: absolute,
        //   [classes.fixed]: fixed
        // });

        return (
                <div>

                   <ServiceCarousel />

                </div>
        );
    }
}



Services.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Services);
