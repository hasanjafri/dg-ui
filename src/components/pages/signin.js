import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Footer from '../footer';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText'
import history from '../history';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import NavBar from '../navbar';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
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

class SignIn extends Component {
  state={
    email: '',
    password: '',
    accountType: '',
    accountTypeError: false,
    authError: ''
  }

  generateBodyDict = () => {
    var accountTypeErrorCheck = this.state.accountType === "";

    if (accountTypeErrorCheck) {
      this.setState({
        accountTypeError: true
      })
      return {}
    } else {
      this.setState({
        accountTypeError: false
      })
      return {
        "username": this.state.email,
        "password": this.state.password,
        "account_type": this.state.accountType
      }
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    var resBody = this.generateBodyDict();
    if (resBody === {}) {
      return;
    } else {
      fetch('http://192.168.99.100:6969/api/auth', {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(resBody)
      }).then(res => res.json()).then(json => {
        if (json.msg === 'success') {
          history.push('/dashboard')
        } else {
          this.setState({
            authError: json
          });
        }
      }).catch(error => console.error('Error: ', error));
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <NavBar/>
        <main className={classes.main}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input value={this.state.email} onChange={this.handleChange('email')} id="email" name="email" autoComplete="email" autoFocus disableUnderline/>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input value={this.state.password} onChange={this.handleChange('password')} name="password" type="password" id="password" autoComplete="current-password" disableUnderline/>
              </FormControl>
              <FormControl required margin="normal" fullWidth>
                <InputLabel htmlFor="accountType-required">Account Type</InputLabel>
                <Select error={this.state.accountTypeError === true} value={this.state.accountType} onChange={this.handleChange('accountType')} name="accountType" inputProps={{ id: 'accountType-required' }}>
                  <option value={''}></option>
                  <option value={'admin'}>Admin</option>
                  <option value={'user'}>User</option>
                </Select>
                {this.state.accountTypeError === true ? <FormHelperText error>Please select an account type</FormHelperText> : null}
              </FormControl>
              <FormControl margin="normal" fullWidth>
                {this.state.authError !== "" ? <FormHelperText error>Invalid username or password</FormHelperText> : null}
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign in
              </Button>
            </form>
          </Paper>
        </main>
        <Footer/>
      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);