import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
    root: {
        width: '75%',
        overflowX: 'auto',
        margin: '20px',
        alignItems: 'center'
    },
    table: {
        minWidth: 350,
        textAlign: 'center',
    },
};

function FoodTable(props) {
    const { classes, foodData } = props;

    return(
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="center">SKU</TableCell>
                    <TableCell align="center">Unit Size</TableCell>
                    <TableCell align="center">Measurement Unit</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Cost</TableCell>
                    <TableCell align="right">Created At</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {foodData !== null && foodData.map((n, i) => {
                    return (
                    <TableRow key={i}>
                        <TableCell component="th" scope="row">
                        {n.product_name}
                        </TableCell>
                        <TableCell align="center">{n.sku}</TableCell>
                        <TableCell align="center">{n.unit_size}</TableCell>
                        <TableCell align="center">{n.measurement_unit}</TableCell>
                        <TableCell align="center">{n.quantity}</TableCell>
                        <TableCell align="center">{n.cost}</TableCell>
                        <TableCell align="right">{n.created_at}</TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </Paper>
    )    
}

FoodTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FoodTable);