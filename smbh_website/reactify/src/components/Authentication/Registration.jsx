import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// Form
import FormControl from '@material-ui/core/FormControl'
// import FormGroup from '@material-ui/core/FormGroup'
// import FormHelperText from '@material-ui/core/FormHelperText'
// import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Input from '@material-ui/core/Input'
// import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
// Icons
import Lock from '@material-ui/icons/Lock'
import Person from '@material-ui/icons/Person'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Email from '@material-ui/icons/Email'
import Phone from '@material-ui/icons/Phone'
import Contacts from '@material-ui/icons/Contacts'
// Style
import styles from './RegistrationStyle'





class Registration extends React.Component {
    // constructor(props) {
    //     super(props);

    // }

  state = {
      name: '',
      password: '',
      showPassword: false,
      rememberme: false,
  }
  //   Check Box
  handleChangeCheckBox = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  //   Password Events
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render () {
      const { classes } = this.props;

      return (
        <div>

          <Card className={classes.card}>
            <CardContent>
                <form autoComplete="off">
                    {/* User Name */}

                    <div className={classes.margin}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <Person />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="UserName"
                                    label="Name"
                                    placeholder="User Name"
                                    className={classes.textField}
                                    helperText=""
                                    margin="normal"
                                    required
                                />
                            </Grid>
                        </Grid>
                    </div>

                    {/* Phone */}

                    <div className={classes.margin}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <Phone />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="Phone"
                                    label="Phone"
                                    placeholder="+989123456789"
                                    className={classes.textField}
                                    helperText=""
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </div>

                    {/* Email */}

                    <div className={classes.margin}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <Email />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="Email"
                                    label="Email"
                                    placeholder="example@domain.com"
                                    className={classes.textField}
                                    helperText=""
                                    margin="normal"
                                    required
                                />
                            </Grid>
                        </Grid>
                    </div>

                    {/* Password */}
                    {/* <FormControl className={classNames(classes.margin + ' ' + classes.textField)}> */}

                    <div className={classes.margin}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <Lock />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="Password"
                                    label="Password"
                                    placeholder="fq3A54JF ..."
                                    className={classes.textField}
                                    helperText=""
                                    margin="normal"
                                    required
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}

                                />

                                <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                                >
                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>

                            </Grid>
                        </Grid>
                    </div>


                    {/* Check Box */}
                    <Grid className={classes.margin}>
                        <Grid>
                        <FormControlLabel
                        control={
                            <Checkbox
                            checked={this.state.rememberme}
                            onChange={this.handleChangeCheckBox('rememberme')}
                            value="rememberme"
                            />
                        }
                        label="Remember Me"
                        />
                        </Grid>

                        {/* Button */}
                        <Grid className={classes.margin}>
                            <FormControl className={classes.alignCenter}>
                                <Grid style={{ float: 'center' }}>
                                    <Button variant='contained' color='secondary' type='submit'>
                                        <Contacts className={classes.btnIconPadding} />
                                        Register
                                    </Button>
                                </Grid>
                            </FormControl>
                        </Grid>
                    </Grid>


                </form>
            </CardContent>
            {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
          </Card>

        </div>
      );
  }
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Registration);
