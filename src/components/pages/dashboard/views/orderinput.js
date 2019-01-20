import React from 'react';
import history from 'history';
import Paper from '@material-ui/core/Paper';
import SideNavBar from '../sidenavbar';
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
    projectTitle: {
        marginBottom: theme.spacing.unit,
    },
});

class OrderInput extends React.Component {
    state = {
        projects: null
    }

    loadProjects = () => {
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
        this.loadProjects();
    }

    render() {
        const { classes } = this.props;

        return(
            <React.Fragment>
                <div className={classes.root}>
                    <SideNavBar/>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer}>
                            <Paper className={classes.paper}>
                                <Typography component="h1" variant="h6" className={classes.projectTitle}>
                                    Select Project
                                </Typography>
                                <Select autoFocus fullWidth value=
                            </Paper>
                        </div>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(OrderInput);