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
import FoodTable from '../fooditemstable';
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
        justifyContent: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        maxWidth: '400px',
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
    userTitle: {
        marginTop: theme.spacing.unit * 6,
    },
    selectInput: {
        width: '100%'
    }
});

class ManageSuppliers extends React.Component {
    state = {
        projects: null,
        projectId: '',
        supplier_name: '',
        supplierError: false,
        response: '',
        supplierId: '',
        supplierData: null,
        suppliers: null
    }

    generateBodyDict = () => {
        let supplierErrorCheck = this.state.supplier_name === "";

        if (supplierErrorCheck) {
            this.setState({
                supplierError: supplierErrorCheck
            })
            return {}
        } else {
            this.setState({
                supplierError: false
            })
            return {
                "name": this.state.supplier_name,
                "project_id": this.state.projectId
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let resBody = this.generateBodyDict();
        if (resBody === {}) {
            return;
        } else {
            fetch('http://192.168.99.100:6969/api/supplier', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resBody)
            }).then(res => res.json()).then(json => {
                if (json.msg) {
                    this.setState({
                        response: json.msg
                    });
                } else if (json.error) {
                    this.setState({
                        response: json.error
                    })
                }
            }).catch(err => console.err('Error: ', err));
        }
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

    loadSuppliers = () => {
        fetch('http://192.168.99.100:6969/api/supplier', {
            mode: 'cors',
            credentials: 'include'
        }).then(res => res.json()).then(json => {
            if (json.error) {
                history.push('/login')
            } else if (json.suppliers) {
                this.setState({
                    suppliers: json.suppliers
                });
                console.log(json.suppliers);
            }
        }).catch(err => console.error('Error: ', err));
    }

    componentDidMount() {
        this.loadProjects();
        this.loadSuppliers();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        }, () => {
            if (name === 'projectId') {
                this.setSupplierData();
            }
        });
    }

    setSupplierData = () => {
        this.setState({
            supplierData: this.state.suppliers.filter(supplier => supplier.project_id === Number(this.state.projectId))
        }, () => {
            console.log(this.state.supplierData);
        })
    }

    render() {
        const { classes } = this.props;

        return(
            <React.Fragment>
                <div className={classes.root}>
                    <SideNavBar/>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer}/>
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
                                    {this.state.supplierError === true ? <FormHelperText error>Please enter</FormHelperText> : null}
                                </FormControl>
                                {this.state.response !== '' ? <FormHelperText focused error component="h4">{this.state.response}</FormHelperText> : null}
                                <Button disabled={this.state.projectId === ""} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                    Add supplier
                                </Button>
                            </form>
                        </Paper>
                        <Paper className={classes.paper}>
                            <Typography component="h1" variant="h6" className={classes.projectTitle}>
                                Select Supplier
                            </Typography>
                            <Select disabled={this.state.projectId === ""} className={classes.selectInput} value={this.state.supplierId} onChange={this.handleChange('supplierId')} name="supplierId" inputProps={{ id: 'supplierId-required' }}>
                                {this.state.supplierData != null && this.state.supplierData.map((supplier, i) => (
                                    <MenuItem key={i} value={supplier.id}>
                                        {supplier.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Paper>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ManageSuppliers);