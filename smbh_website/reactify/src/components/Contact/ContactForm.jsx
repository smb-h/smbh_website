import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

function AddressForm() {
  return (
    <div>
      <Typography variant="title" gutterBottom>
        Contact Me
      </Typography>

      <form method='POST'>
        <Grid container spacing={24}>
          {/* FirstName */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
            />
          </Grid>
          {/* LastName */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
            />
          </Grid>
          {/* Email */}
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              type='email'
            />
          </Grid>
          {/* Phone */}
          <Grid item xs={12}>
            <TextField
              id="phone"
              name="phone"
              label="Phone Number"
              fullWidth
              placeholder="+98 912 123 45 67"
              type='tel'
            />
          </Grid>
          {/* Content */}
          <Grid item xs={12} >
            <TextField
              required
              id="content"
              name="content"
              label="Content"
              fullWidth
              multiline
              rows="4"
            />
          </Grid>

          <Grid item xs={12}>
            {/* <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Use this address for payment details"
            /> */}
            <Button variant='outlined' color='secondary' type='submit'>Send</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default AddressForm;
