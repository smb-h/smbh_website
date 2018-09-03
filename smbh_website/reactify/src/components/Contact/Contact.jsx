import React, { Component } from 'react'
import 'whatwg-fetch'
import ContactForm from './ContactForm'
import withStyles from '@material-ui/core/styles/withStyles'
import Parallax from '../Parallax/Parallax'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
// Style
// import { theme } from '../Base/Base'
import styles from './ContactStyle'


class Contact extends Component {



    render() {
        const { classes } = this.props

        return (
                <div>

                  {/* Contact */}
                  <Parallax image={require("../../assets/img/img7.jpg")} className={classes.windowSize}>

                    <Grid container spacing={24} className={classes.gridContainer}>

                    {/* Form */}
                      <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={classes.GridItem}>
                        <Card className={classes.formContainer}>
                          <ContactForm />
                        </Card>
                      </Grid>

                      <Grid item xl={5} lg={5} md={5} sm={12} xs={12} className={classes.GridItem}>
                        <Card className={classes.mapContainer}>
                          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d73206.82695098352!2d50.91257263272305!3d35.816740654196785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8dbf95ef45f011%3A0x722a04e54eba9bcd!2sKaraj%2C+Alborz+Province%2C+Iran!5e0!3m2!1sen!2s!4v1535952567645" width="600" height="450" frameborder="0" style={{ border: 0, width: '100%' }} allowfullscreen></iframe>
                        </Card>
                      </Grid>

                    </Grid>


                  </Parallax>

                </div>

        );
    }
}

export default withStyles(styles)(Contact)
