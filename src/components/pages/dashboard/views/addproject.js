import React from 'react';
import Footer from '../footer';
import SideNavBar from '../sidenavbar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import history from '../../../history';
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
        projectAddressError: false,
        postalCode: '',
        postalCodeError: false,
        projects: null
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
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

    generateBodyDict = () => {
        let projectNameCheck = this.state.projectName === "";
        let projectAddressCheck = this.state.projectAddress === "";
        let postalCodeCheck = this.state.postalCode === "";

        if (projectNameCheck || projectAddressCheck || postalCodeCheck) {
            this.setState({
                projectNameError: projectNameCheck,
                projectAddressError: projectAddressCheck,
                postalCodeError: postalCodeCheck
            })
            return {}
        } else {
            this.setState({
                projectNameError: false,
                projectAddressError: false,
                postalCodeError: false
            })
            return {
                "project_name": this.state.projectName,
                "project_address": this.state.projectAddress,
                "postal_code": this.state.postalCode
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
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resBody)
            }).then(res => res.json()).then(json => {
                if (json.error) {
                    history.push('/login')
                } else if (json.msg.includes('successfully')) {
                    this.loadAdminProjects();
                }
            }).catch(error => console.error('Error:', error));
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
                                    {this.state.projectNameError === true ? <FormHelperText error>You must enter a unique project name</FormHelperText> : null}
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="address">Address</InputLabel>
                                    <Input value={this.state.projectAddress} onChange={this.handleChange('projectAddress')} name="projectAddress" id="projectAddress" disableUnderline/>
                                    {this.state.projectAddressError === true ? <FormHelperText error>You must enter an address for this project</FormHelperText> : null}
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="address">Postal Code</InputLabel>
                                    <Input value={this.state.postalCode} onChange={this.handleChange('postalCode')} name="postalCode" id="postalCode" disableUnderline/>
                                    {this.state.postalCodeError === true ? <FormHelperText error>You must enter a postal code for this project</FormHelperText> : null}
                                </FormControl>
                                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                    Add project
                                </Button>
                            </form>
                        </Paper>
                        <Typography component="h1" variant="h6" className={classes.projectTitle}>
                            My Projects
                        </Typography>
                        <ProjectsTable projectsData={this.state.projects}/>
                    </main>
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(AddProject);
