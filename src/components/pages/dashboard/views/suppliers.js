import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import history from 'history';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
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
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Supplier extends React.Component {
    state = {
        projects: null,
        projectId: '',
        supplier_name: '',
        response: ''
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

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
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
                                        <InputLabel htmlFor="supplier_name">Supplier Name</InputLabel>
                                        <Input value={this.state.supplier_name} onChange={this.handleChange('supplier_name')} id="supplier_name" name="supplier_name" disableUnderline/>
                                    </FormControl>
                                    {this.state.response !== '' ? <FormHelperText focused component="h6">{this.state.response}</FormHelperText> : null}
                                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                        Add supplier
                                    </Button>
                                </form>
                            </Paper>
                        </div>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Supplier);