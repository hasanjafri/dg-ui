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
        width: '100%',
        textAlign: 'center',
    },
};

function ProjectsTable(props) {
    const { classes, projectsData } = props;

    return(
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Project Name</TableCell>
                    <TableCell align="center">Address</TableCell>
                    <TableCell align="center">Postal Code</TableCell>
                    <TableCell align="center"># of Users</TableCell>
                    <TableCell align="right">Last Updated</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {projectsData !== null && projectsData.map((n, i) => {
                    return (
                    <TableRow key={i}>
                        <TableCell component="th" scope="row">
                        {n.project_name}
                        </TableCell>
                        <TableCell align="center">{n.address}</TableCell>
                        <TableCell align="center">{n.postal_code}</TableCell>
                        <TableCell align="center">{n.num_users}</TableCell>
                        <TableCell align="right">{n.last_updated}</TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </Paper>
    )    
}

ProjectsTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectsTable);