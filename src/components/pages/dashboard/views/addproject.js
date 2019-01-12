import React from 'react';
import Footer from '../footer';
import SideNavBar from '../sidenavbar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import ProjectsTable from '../projectstable';
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
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    projectTitle: {
        margin: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
    }
})

class AddProject extends React.Component {
    state = {
        projectName: '',
        projectNameError: false,
        projectAddress: '',
        projectAddressError: false
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    loadAdminProjects = () => {
        fetch('http://192.168.99.100:6969/api/project', {
            mode: 'cors',
        })
        .then(res => res.json()).then(responseJson => {
            console.log('Success:', JSON.stringify(responseJson))
        }).catch(error => console.error('Error:', error));
    }

    generateBodyDict = () => {
        let projectNameCheck = this.state.projectName === "";
        let projectAddressCheck = this.state.projectAddress === "";

        if (projectNameCheck || projectAddressCheck) {
            this.setState({
                projectNameError: projectNameCheck,
                projectAddressError: projectAddressCheck
            })
            return {}
        } else {
            this.setState({
                projectNameError: false,
                projectAddressError: false
            })
            return {
                "project_name": this.state.projectName,
                "project_address": this.state.projectAddress
            }
        }
    }

    addProject = (event) => {
        event.preventDefault();
        let resBody = this.generateBodyDict();
        if (resBody === {}) {
            return;
        } else {
            fetch('http://192.168.99.100:6969/api/project', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resBody)
            }).then(res => res.json()).then(json => console.log(json)).catch(error => console.error('Error:', error));
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
                                Add Project
                            </Typography>
                            <form className={classes.form} onSubmit={this.addProject}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="projectName">Project Name</InputLabel>
                                    <Input value={this.state.projectName} onChange={this.handleChange('projectName')} name="projectName" id="projectName" disableUnderline/>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="address">Address</InputLabel>
                                    <Input value={this.state.projectAddress} onChange={this.handleChange('projectAddress')} name="projectAddress" id="projectAddress" disableUnderline/>
                                </FormControl>
                                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                    Add project
                                </Button>
                            </form>
                        </Paper>
                        <Typography component="h1" variant="h6" className={classes.projectTitle}>
                            My Projects
                        </Typography>
                        <ProjectsTable/>
                    </main>
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(AddProject);
