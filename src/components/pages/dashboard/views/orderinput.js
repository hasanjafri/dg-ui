import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import history from '../../../history';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
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
        height: '110vh',
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
        minWidth: '200px',
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
        marginTop: theme.spacing.unit * 2,
    },
    menuHeading: {
        fontWeight: theme.typography.fontWeightMedium,
        opacity: 1
    },
    menuItem: {
        paddingLeft: 3 * theme.spacing.unit
    }
});

class OrderInput extends React.Component {
    state = {
        projects: null,
        projectId: '',
        supplierId: '',
        supplierData: null,
        suppliers: null,
        sku: '',
        skuError: false,
        product_name: '',
        productNameError: false,
        unit_size: '',
        unitSizeError: false,
        measurement_unit: '',
        measurementError: false,
        quantity: '',
        quantityError: false,
        cost: '',
        costError: false,
        internal_name_id: '',
        categoryData: null
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

    generateBodyDict = () => {
        let skuErrorCheck = this.state.sku === '';
        let productNameErrorCheck = this.state.product_name === '';
        let unitSizeErrorCheck = this.state.unit_size === '';
        let measurementErrorCheck = this.state.measurement_unit === '';
        let quantityErrorCheck = this.state.quantity === '';
        let costErrorCheck = this.state.cost === '';

        if (skuErrorCheck || productNameErrorCheck || unitSizeErrorCheck || measurementErrorCheck || quantityErrorCheck || costErrorCheck) {
            this.setState({
                skuError: skuErrorCheck,
                productNameError: productNameErrorCheck,
                unitSizeError: unitSizeErrorCheck,
                measurementError: measurementErrorCheck,
                quantityError: quantityErrorCheck,
                costError: costErrorCheck
            });
            return {};
        } else {
            this.setState({
                skuError: false,
                productNameError: false,
                unitSizeError: false,
                measurementError: false,
                quantityError: false,
                costError: false
            });
            return {
                "sku": this.state.sku,
                "product_name": this.state.product_name,
                "unit_size": this.state.unit_size,
                "measurement_unit": this.state.measurement_unit,
                "quantity": this.state.quantity,
                "cost": this.state.cost,
                "supplier_id": this.state.supplierId,
                "internal_name_id": this.state.internal_name_id
            };
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let resBody = this.generateBodyDict();
        if (resBody === {}) {
            return;
        } else {
            fetch('http://192.168.99.100:6969/api/inventory_product', {
                mode: 'cors',
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resBody)
            }).then(res => res.json()).then(json => {
                if (json.msg) {
                    this.setState({
                        response: json.msg
                    });
                } else {
                    this.setState({
                        response: json.error
                    })
                }
            }).catch(err => console.error('Error: ', err));
        }
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
                    categoryData: json.categories
                });
                console.log(json.categories);
            } else {
                console.log(json);
            }
        }).catch(err => console.error('Error: ', err));
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
        console.log(event.target.value);
        this.setState({
            [name]: event.target.value,
        }, () => {
            if (name === 'projectId') {
                this.setSupplierData();
                this.loadCategories();
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
                                Order Input
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
                                <FormControl className={classes.formControl} margin="normal" required fullWidth>
                                    <InputLabel htmlFor="internal_name_id">Select Internal Name</InputLabel>
                                    <Select autoFocus autoWidth value={this.state.internal_name_id} onChange={this.handleChange('internal_name_id')} name="internal_name_id" inputProps={{ id: 'internal_name_id-required' }}>
                                        {this.state.categoryData != null && this.state.categoryData.map((category, i) => (
                                            <MenuList>
                                                <MenuItem key={i} disabled className={classes.menuHeading}>{category.category_name}</MenuItem>
                                                {category.internal_names.map((internal_name, i) => (
                                                    <MenuItem key={i} value={internal_name.id} className={classes.menuItem}>
                                                        {internal_name.internal_name}
                                                    </MenuItem>
                                                ))}
                                            </MenuList>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl required fullWidth className={classes.formControl} disabled={this.state.projectId === ""} margin="normal">
                                    <InputLabel htmlFor="supplierId">Select a Supplier</InputLabel>
                                    <Select value={this.state.supplierId} onChange={this.handleChange('supplierId')} name="supplierId" inputProps={{ id: 'supplierId-required' }}>
                                        {this.state.supplierData != null && this.state.supplierData.map((supplier, i) => (
                                            <MenuItem key={i} value={supplier.id}>
                                                {supplier.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl} disabled={this.state.projectId === "" || this.state.supplierId === ''} margin="normal" required fullWidth>
                                    <InputLabel htmlFor="sku">Product SKU</InputLabel>
                                    <Input value={this.state.sku} onChange={this.handleChange('sku')} id="sku" name="sku" disableUnderline/>
                                    {this.state.skuError === true ? <FormHelperText error>Please enter a SKU for this order</FormHelperText> : null}
                                </FormControl>
                                <FormControl className={classes.formControl} disabled={this.state.projectId === "" || this.state.supplierId === ''} margin="normal" required fullWidth>
                                    <InputLabel htmlFor="product_name">Product Name</InputLabel>
                                    <Input value={this.state.product_name} onChange={this.handleChange('product_name')} id="product_name" name="product_name" disableUnderline/>
                                    {this.state.productNameError === true ? <FormHelperText error>Please enter a name for this order</FormHelperText> : null}
                                </FormControl>
                                <FormControl className={classes.formControl} disabled={this.state.projectId === "" || this.state.supplierId === ''} margin="normal" required fullWidth>
                                    <InputLabel htmlFor="unit_size">Unit Size</InputLabel>
                                    <Input value={this.state.unit_size} onChange={this.handleChange('unit_size')} id="unit_size" name="unit_size" disableUnderline/>
                                    {this.state.unitSizeError === true ? <FormHelperText error>Please enter a unit size for this order</FormHelperText> : null}
                                </FormControl>
                                <FormControl className={classes.formControl} disabled={this.state.projectId === "" || this.state.supplierId === ''} margin="normal" required fullWidth>
                                    <InputLabel htmlFor="measurement_unit">Measurement Unit</InputLabel>
                                    <Input value={this.state.measurement_unit} onChange={this.handleChange('measurement_unit')} id="measurement_unit" name="measurement_unit" disableUnderline/>
                                    {this.state.measurementError === true ? <FormHelperText error>Please enter a measurement unit for this order</FormHelperText> : null}
                                </FormControl>
                                <FormControl className={classes.formControl} disabled={this.state.projectId === "" || this.state.supplierId === ''} margin="normal" required fullWidth>
                                    <InputLabel htmlFor="quantity">Quantity</InputLabel>
                                    <Input value={this.state.quantity} onChange={this.handleChange('quantity')} id="quantity" name="quantity" disableUnderline/>
                                    {this.state.quantityError === true ? <FormHelperText error>Please enter a quantity for this order</FormHelperText> : null}
                                </FormControl>
                                <FormControl className={classes.formControl} disabled={this.state.projectId === "" || this.state.supplierId === ''} margin="normal" required fullWidth>
                                    <InputLabel htmlFor="cost">Cost</InputLabel>
                                    <Input value={this.state.cost} onChange={this.handleChange('cost')} id="cost" name="cost" disableUnderline/>
                                    {this.state.costError === true ? <FormHelperText error>Please enter a cost for this order</FormHelperText> : null}
                                </FormControl>
                                {this.state.response !== '' ? <FormHelperText focused error component="h4">{this.state.response}</FormHelperText> : null}
                                <Button disabled={this.state.projectId === "" || this.state.supplierId === ''} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                    Add supplier
                                </Button>
                            </form>
                        </Paper>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(OrderInput);