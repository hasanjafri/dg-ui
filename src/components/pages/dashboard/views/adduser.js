import React from 'react';
import Footer from '../footer';
import SideNavBar from '../sidenavbar';
import FormControl from '@material-ui/core/FormControl';
import history from '../../../history';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const permissions = [
    'Order Input',
    'Supplier Input',
    'Recipe Input',
    'Analytics'
];

const styles = theme => ({
    root: {
      display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: '100vh',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    paper: {
        marginTop: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        maxWidth: '400px',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
    },
})

class AddUser extends React.Component {
    state = {
        username: '',
        usernameError: false,
        password: '',
        passwordError: false,
        projectId: '',
        permissions: [],
        permissionsError: false,
        projects: null,
        response: ''
    }

    loadAdminProjects = () => {
        fetch('http://192.168.99.100:6969/api/project', {
            mode: 'cors',
            credentials: 'include'
        })
        .then(res => res.json()).then(responseJson => {
            if (responseJson.error) {
                history.push('/login')
            } else if (responseJson.projects) {
                this.setState({
                    projects: responseJson.projects
                });
                console.log(responseJson.projects);
            }
        }).catch(error => console.error('Error:', error));
    }

    componentDidMount() {
        this.loadAdminProjects();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    generateBodyDict = () => {
        let usernameErrorCheck = this.state.username === '';
        let passwordErrorCheck = this.state.password === '';
        let permissionsErrorCheck = this.state.permissions.length === 0;

        if (usernameErrorCheck || passwordErrorCheck || permissionsErrorCheck) {
            this.setState({
                usernameError: usernameErrorCheck,
                passwordError: passwordErrorCheck,
                permissionsError: permissionsErrorCheck
            })
            return {}
        } else {
            this.setState({
                usernameError: false,
                passwordError: false,
                permissionsError: false
            })
            return {
                "username": this.state.username,
                "password": this.state.password,
                "permissions": this.state.permissions.toString().replace(',', ';'),
                "project_id": this.state.projectId,
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let resBody = this.generateBodyDict();
        if (resBody === {}) {
            return;
        } else {
            fetch('http://192.168.99.100:6969/api/user', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resBody)
            }).then(res => res.json()).then(json => {
                if (json.msg.includes('Successfully')) {
                    this.setState({
                        response: json.msg
                    });
                }
            }).catch(err => console.error('Error: ', err));
        } 
    }

    render() {
        const { classes } = this.props;

        return(
            <React.Fragment>
                <div className={classes.root}>
                    <SideNavBar/>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Paper className={classes.paper}>
                            <Typography component="h1" variant="h6">
                                Add User
                            </Typography>
                            <form className={classes.form} onSubmit={this.handleSubmit}>
                                <FormControl className={classes.formControl} margin="normal" required fullWidth>
                                    <InputLabel htmlFor="projectId">Select a Project</InputLabel>
                                    <Select autoFocus autoWidth value={this.state.projectId} onChange={this.handleChange('projectId')} name="projectId" inputProps={{ id: 'projectId-required' }}>
                                        {this.state.projects != null && this.state.projects.map((project, i) => (
                                            <MenuItem key={i} value={project.id}>
                                                {project.project_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl} disabled={this.state.projectId === ""} margin="normal" required fullWidth>
                                    <InputLabel htmlFor="username">User Name</InputLabel>
                                    <Input value={this.state.username} onChange={this.handleChange('username')} id="username" name="username" disableUnderline/>
                                </FormControl>
                                <FormControl className={classes.formControl} disabled={this.state.projectId === ""} margin="normal" required fullWidth>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input value={this.state.password} onChange={this.handleChange('password')} name="password" type="password" id="password" disableUnderline/>
                                </FormControl>
                                <FormControl className={classes.formControl} disabled={this.state.projectId === ""} margin="normal" required fullWidth>
                                    <InputLabel htmlFor="user-permissions">User Permissions</InputLabel>
                                    <Select multiple value={this.state.permissions} onChange={this.handleChange('permissions')} input={<Input id="user-permissions" />}
                                            renderValue={selected => (
                                                <div className={classes.chips}>
                                                    {selected.map(value => (
                                                        <Chip key={value} label={value} className={classes.chip}/>
                                                    ))}
                                                </div>
                                            )} MenuProps={MenuProps}>
                                                        {permissions.map(permission => (
                                                            <MenuItem key={permission} value={permission} style={{fontWeight: this.state.permissions.indexOf(permission) === -1 ? 'normal' : 'bold'}}>
                                                                {permission}
                                                            </MenuItem>
                                                        ))}
                                            </Select>
                                </FormControl>
                                {this.state.response !== '' ? <FormHelperText focused component="h6">{this.state.response}</FormHelperText> : null}
                                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                    Add user
                                </Button>
                            </form>
                        </Paper>
                    </main>
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(AddUser);