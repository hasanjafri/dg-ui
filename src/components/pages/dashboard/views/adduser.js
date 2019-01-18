import React from 'react';
import Footer from '../footer';
import SideNavBar from '../sidenavbar';
import FormControl from '@material-ui/core/FormControl';
import history from '../../../history';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

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
        height: '100%'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    projectTitle: {
        margin: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    }
})

class AddUser extends React.Component {
    state = {
        username: '',
        usernameError: false,
        password: '',
        passwordError: false,
        projectId: '',
        permissions: [],
        projects: null
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
                                <FormControl margin="normal" required fullWidth>
                                    <Select value={this.state.projectId} onChange={this.handleChange('projectId')} name="projectId" inputProps={{ id: 'projectId-required' }} className={classes.selectEmpty}>
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {this.state.projects != null && this.state.projects.map((project, i) => (
                                            <MenuItem key={i} value={project.id}>
                                                {project.project_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="user-permissions">User Permissions</InputLabel>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="email">Email Address</InputLabel>
                                    <Input value={this.state.email} onChange={this.handleChange('email')} id="email" name="email" autoFocus disableUnderline/>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input value={this.state.password} onChange={this.handleChange('password')} name="password" type="password" id="password" disableUnderline/>
                                </FormControl>
                                <FormControl>

                                </FormControl>
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