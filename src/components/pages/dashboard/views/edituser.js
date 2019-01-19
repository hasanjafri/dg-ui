import React from 'react';
import Footer from '../footer';
import SideNavBar from '../sidenavbar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import history from '../../../history';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import UsersTable from '../userstable';
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
    },
    projectTitle: {
        marginBottom: theme.spacing.unit,
    },
    userTitle: {
        marginTop: theme.spacing.unit * 6,
    }
});

class ManageUsers extends React.Component {
    state = {
        projectId: '',
        users: null,
        usersData: null
    }

    loadUsers = () => {
        fetch('http://192.168.99.100:6969/api/user', {
            mode: 'cors',
            credentials: 'include'
        })
        .then(res => res.json()).then(json => {
            console.log(json.users.filter(project => project.length > 0))
            this.setState({
                users: json.users.filter(project => project.length > 0)
            });
        }).catch(err => console.error('Error: ', err));
    }

    componentDidMount() {
        this.loadUsers();
    }

    handleChange = name => event => {
        console.log(this.state.users.filter(users => users[0].project.id === event.target.value))
        this.setState({
            [name]: event.target.value,
            usersData: this.state.users.filter(users => users[0].project.id === event.target.value)
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
                            <Typography component="h1" variant="h6" className={classes.projectTitle}>
                                Select Project
                            </Typography>
                            <Select autoFocus fullWidth value={this.state.projectId} onChange={this.handleChange('projectId')} name="projectId" inputProps={{ id: 'projectId-required' }} className={classes.selectEmpty}>
                                {this.state.users !== null && this.state.users.map((project, i) => (
                                    <MenuItem key={i} value={project[0].project.id}>
                                        {project[0].project.project_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Paper>
                        <Typography component="h1" variant="h6" className={classes.userTitle}>
                            Users
                        </Typography>
                        <UsersTable usersData={this.state.usersData}/>
                    </main>
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(ManageUsers);