import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import history from '../../../history';
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
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        margin: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        width: '400px'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 400,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    side: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})

class InternalNaming extends React.Component {
    state = {
        projects: null,
        projectId: '',
        category_name: '',
        categoryError: false,
        projectCategories: null,
        categoryId: '',
        response: '',
        responseI: '',
        internal_name: '',
        internalNameError: false
    };

    loadProjects = () => {
        fetch('http://192.168.99.100:6969/api/project', {
            mode: 'cors',
            credentials: 'include'
        })
        .then(res => res.json()).then(responseJson => {
            if (responseJson.error) {
                history.push('/login');
            } else if (responseJson.projects) {
                this.setState({
                    projects: responseJson.projects
                });
                console.log(responseJson.projects);
            }
        }).catch(error => console.error('Error:', error));
    }

    loadCategories = () => {
        fetch('http://192.168.99.100:6969/api/category?pid=' + this.state.projectId, {
            mode: 'cors',
            credentials: 'include'
        })
        .then(res => res.json()).then(json => {
            if (json.error) {
                history.push('/login');
            } else if (json.categories) {
                this.setState({
                    projectCategories: json.categories
                });
                console.log(json.categories);
            } else {
                console.log(json);
            }
        }).catch(err => console.error('Error: ', err));
    }

    componentDidMount() {
        this.loadProjects();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        }, () => {
            if (name === 'projectId') {
                this.loadCategories();
            }
        })
    }

    generateBodyDict = (type) => {
        if (type === 'category') {
            let categoryErrorCheck = this.state.category_name === "";

            if (categoryErrorCheck) {
                this.setState({
                    categoryError: categoryErrorCheck
                })
                return {}
            } else {
                this.setState({
                    categoryError: false
                });
                return {
                    "project_id": this.state.projectId,
                    "category_name": this.state.category_name
                }
            }
        } else if (type === 'internal_name') {
            let internalNameErrorCheck = this.state.internal_name === "";

            if (internalNameErrorCheck) {
                this.setState({
                    internalNameError: internalNameErrorCheck
                })
                return {}
            } else {
                this.setState({
                    internalNameError: false
                });
                return {
                    "internal_name": this.state.internal_name,
                    "category_id": this.state.categoryId
                }
            }
        } else {
            return {};
        }
    }

    handleSubmit = type => event => {
        event.preventDefault();
        let resBody = this.generateBodyDict(type);

        if (resBody === {}) {
            return;
        } else {
            if (type === 'category') {
                fetch('http://192.168.99.100:6969/api/category', {
                    mode: 'cors',
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(resBody)
                }).then(res => res.json()).then(json => {
                    if (json.error) {
                        history.push('/login');
                    } else if (json.msg) {
                        this.setState({
                            response: json.msg
                        }, () => {
                            this.loadCategories();
                        });
                    } else {
                        console.log(json);
                    }
                }).catch(err => console.error('Error: ', err));
            } else if (type === 'internal_name') {
                fetch('http://192.168.99.100:6969/api/internal_name', {
                    mode: 'cors',
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(resBody)
                }).then(res => res.json()).then(json => {
                    if (json.error) {
                        history.push('/login');
                    } else if (json.msg) {
                        this.setState({
                            responseI: json.msg
                        });
                    } else {
                        console.log(json);
                    }
                }).catch(err => console.error('Error: ', err));
            } else {
                return;
            }
        }
    }

    render() {
        const { classes } = this.props;

        return(
            <React.Fragment>
                <div className={classes.root}>
                    <SideNavBar/>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer}/>
                        <Paper className={classes.paper} style={{maxWidth: '250px'}}>
                            <Typography component="h1" variant="h6">
                                Project
                            </Typography>
                            <FormControl className={classes.formControl} style={{maxWidth: '300px'}} margin="normal" required fullWidth>
                                <InputLabel htmlFor="projectId">Select a Project</InputLabel>
                                <Select autoFocus autoWidth value={this.state.projectId} onChange={this.handleChange('projectId')} name="projectId" inputProps={{ id: 'projectId-required' }}>
                                    {this.state.projects != null && this.state.projects.map((project, i) => (
                                        <MenuItem key={i} value={project.id}>
                                            {project.project_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Paper>
                        <div className={classes.side}>
                            <Paper className={classes.paper}>
                                <Typography component="h1" variant="h6">
                                    Category
                                </Typography>
                                <form className={classes.form} onSubmit={this.handleSubmit('category')}>
                                    <FormControl className={classes.formControl} disabled={this.state.projectId === ""} margin="normal" required fullWidth>
                                        <InputLabel htmlFor="category_name">Category Name</InputLabel>
                                        <Input value={this.state.category_name} onChange={this.handleChange('category_name')} id="category_name" name="category_name" disableUnderline/>
                                    </FormControl>
                                    {this.state.response !== '' ? <FormHelperText focused error component="h4">{this.state.response}</FormHelperText> : null}
                                    <Button disabled={this.state.projectId === "" || this.state.category_name === ""} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                        Add category
                                    </Button>
                                </form>
                            </Paper>
                            <Paper className={classes.paper}>
                                <Typography component="h1" variant="h6">
                                    Internal Name
                                </Typography>
                                <form className={classes.form} onSubmit={this.handleSubmit('internal_name')}>
                                    <FormControl className={classes.formControl} margin="normal" required disabled={this.state.projectId === ""} fullWidth>
                                        <InputLabel htmlFor="categoryId">Select a Category</InputLabel>
                                        <Select autoFocus autoWidth value={this.state.categoryId} onChange={this.handleChange('categoryId')} name="categoryId" inputProps={{ id: 'categoryId-required' }}>
                                            {this.state.projectCategories != null && this.state.projectCategories.map((category, i) => (
                                                <MenuItem key={i} value={category.id}>
                                                    {category.category_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl className={classes.formControl} disabled={this.state.projectId === "" || this.state.categoryId === ""} margin="normal" required fullWidth>
                                        <InputLabel htmlFor="internal_name">Internal Name</InputLabel>
                                        <Input value={this.state.internal_name} onChange={this.handleChange('internal_name')} id="internal_name" name="internal_name" disableUnderline/>
                                    </FormControl>
                                    {this.state.responseI !== '' ? <FormHelperText focused error component="h4">{this.state.responseI}</FormHelperText> : null}
                                    <Button disabled={this.state.projectId === "" || this.state.internal_name === "" || this.state.categoryId === ""} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                        Add Internal Name
                                    </Button>
                                </form>
                            </Paper>
                        </div>
                    </main>
                </div>
            </React.Fragment>
        );
    }
};

export default withStyles(styles)(InternalNaming);