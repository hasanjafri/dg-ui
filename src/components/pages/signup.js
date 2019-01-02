import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Footer from '../footer';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import NewRealeasesIcon from '@material-ui/icons/NewReleases';
import NavBar from '../navbar';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import { CountryRegionData } from 'react-country-region-selector';

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
class SignUp extends Component {

  state = {
    tier: "0",
    period: "0",
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNum: '',
    country: '',
    bday: '',
    tierError: false,
    periodError: false,
    emailError: false,
    passwordError: false,
    firstNameError: false,
    lastNameError: false,
    phoneNumError: false,
    countryError: false,
    bdayError: false,
    anyError: false
  }

  generateBodyDict = () => {
    console.log(this.state);
    var tierErrorCheck = this.state.tier === "0";
    var periodErrorCheck = this.state.period === "0";
    var countryErrorCheck = this.state.country === "";
    var emailErrorCheck = !(this.state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/));
    // var passwordErrorCheck = !(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})").test(this.state.password));
    // var firstNameErrorCheck = !((/^[A-Za-z0-9-]/).test(this.state.firstName));
    // var lastNameErrorCheck = !((/^[A-Za-z0-9-]/).test(this.state.lastName));
    var passwordErrorCheck = false;
    var firstNameErrorCheck = false;
    var lastNameErrorCheck = false;
    var phoneNumErrorCheck = false;
    var bdayErrorCheck = false;

    if (tierErrorCheck || periodErrorCheck || countryErrorCheck || emailErrorCheck || passwordErrorCheck || firstNameErrorCheck || lastNameErrorCheck || phoneNumErrorCheck || bdayErrorCheck) {
      this.setState({
        tierError: tierErrorCheck,
        periodError: periodErrorCheck,
        countryError: countryErrorCheck,
        emailError: emailErrorCheck,
        passwordError: passwordErrorCheck,
        firstNameError: firstNameErrorCheck,
        lastNameError: lastNameErrorCheck,
        phoneNumError: phoneNumErrorCheck,
        bdayError: bdayErrorCheck,
        anyError: true
      })
      return {}
    } else {
      this.setState({
        tierError: false,
        periodError: false,
        countryError: false,
        emailError: false,
        passwordError: false,
        firstNameError: false,
        lastNameError: false,
        phoneNumError: false,
        bdayError: false,
        anyError: false
      })
      return {
        "email": this.state.email,
        "password": this.state.password,
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "phoneNum": this.state.phoneNum,
        "country": this.state.country[0],
        "countryCode": this.state.country[1],
        "bday": this.state.bday,
        "tier": this.state.tier,
        "period": this.state.period,
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var resBody = this.generateBodyDict();
    console.log(resBody["password"]);
    if (resBody === {}) {
      return;
    } else {
      fetch('http://localhost:6969/api/admin', {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(resBody)
      }).then(res => res.json()).then(json => console.log(json))
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <NavBar/>
        <main className={classes.main}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <NewRealeasesIcon/>
            </Avatar>
            <Typography component="h1" variant="h6">
              Sign up to access all of our features!
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input value={this.state.email} onChange={this.handleChange('email')} id="email" name="email" autoComplete="email" autoFocus disableUnderline/>
                {this.state.emailError === true ? <FormHelperText error>You must enter a valid email</FormHelperText> : null}
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input value={this.state.password} onChange={this.handleChange('password')} name="password" type="password" id="password" autoComplete="current-password" disableUnderline/>
                {this.state.passwordError === true ? <FormHelperText error>You must choose a valid password</FormHelperText> : null}
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input value={this.state.firstName} onChange={this.handleChange('firstName')} name="firstName" type="text" id="firstName" autoComplete="name" disableUnderline/>
                {this.state.firstNameError === true ? <FormHelperText error>First name can only contain alphanumeric characters or hyphens</FormHelperText> : null}
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <Input value={this.state.lastName} onChange={this.handleChange('lastName')} name="lastName" type="text" id="lastName" autoComplete="family-name" disableUnderline/>
                {this.state.lastNameError === true ? <FormHelperText error>Last name can only contain alphanumeric characters or hyphen</FormHelperText> : null}
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="phoneNum">Primary Phone Number</InputLabel>
                <Input value={this.state.phoneNum} onChange={this.handleChange('phoneNum')} name="phoneNum" type="text" id="phoneNum" autoComplete="tel" disableUnderline/>
                {this.state.phoneNumError === true ? <FormHelperText error>Phone number must only contain numbers</FormHelperText> : null}
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <TextField id="country" label="Country" required value={this.state.country} select onChange={this.handleChange('country')}>
                  {CountryRegionData.map((option, i) => (
                    <MenuItem key={option[0]} value={option}>
                      {option[0]}
                    </MenuItem>
                  ))}
                </TextField>
                {this.state.countryError === true ? <FormHelperText error>Please select your country</FormHelperText> : null}
              </FormControl>                
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="bday" shrink>Birthday</InputLabel>
                <Input value={this.state.bday} onChange={this.handleChange('bday')} name="bday" type="date" id="bday" autoComplete="bday" disableUnderline/>
              </FormControl>
              <FormControl required margin="normal" fullWidth>
                <InputLabel htmlFor="tier-native-required">Subscription Tier</InputLabel>
                <Select error={this.state.tierError} native value={this.state.tier} onChange={this.handleChange('tier')} name="tier" inputProps={{ id: 'tier-native-required' }}>
                  <option value={0}></option>
                  <option value={1}>Premium</option>
                  <option value={2}>Elite</option>
                  <option value={3}>Data Master</option>
                </Select>
                {this.state.tierError === true ? <FormHelperText error>You must select a subscription tier</FormHelperText> : null}
              </FormControl>
              <FormControl required margin="normal" fullWidth>
                <InputLabel htmlFor="period-native-required">Subscription Period</InputLabel>
                <Select error={this.state.periodError} native value={this.state.period} onChange={this.handleChange('period')} name="period" inputProps={{ id: 'period-native-required' }}>
                  <option value={0}></option>
                  <option value={1}>Monthly</option>
                  <option value={2}>Annual (Save 15% More!)</option>
                </Select>
                {this.state.periodError === true ? <FormHelperText error>You must select a subscription period</FormHelperText> : null}
              </FormControl>
              <FormControl margin="normal" fullWidth>
                {this.state.anyError === true ? <FormHelperText error>An error occurred, please check the red fields</FormHelperText> : null}
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
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);