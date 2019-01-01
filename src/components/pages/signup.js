import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Footer from '../footer';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import NavBar from '../navbar';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function SignUp(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <NavBar/>
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus disableUnderline/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" disableUnderline/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Input name="firstName" type="text" id="firstName" autoComplete="name" disableUnderline/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <Input name="lastName" type="text" id="lastName" autoComplete="family-name" disableUnderline/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="phoneNum">Primary Phone Number</InputLabel>
              <Input name="phoneNum" type="text" id="phoneNum" autoComplete="tel" disableUnderline/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="bday" shrink>Birthday</InputLabel>
              <Input name="bday" type="date" id="bday" autoComplete="bday" disableUnderline/>
            </FormControl>
            <FormControl required margin="normal">
              <InputLabel htmlFor="tier-native-required">Subscription Tier</InputLabel>
              <Select native value={this.state.tier} onChange={this.handleChange('tier')} name="tier" inputProps={{ id: 'tier-native-required' }}>
                <option value=""/>
                <option value={1}>Premium</option>
                <option value={2}>Elite</option>
                <option value={3}>Data Master</option>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
          </form>
        </Paper>
      </main>
      <Footer/>
    </React.Fragment>
  );
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);