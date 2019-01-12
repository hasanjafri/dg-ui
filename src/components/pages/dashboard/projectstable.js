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
        width: '66%',
        overflowX: 'auto',
        margin: '20px',
        alignItems: 'center'
    },
    table: {
        minWidth: 350,
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
                    <TableCell>Address</TableCell>
                    <TableCell align="right"># of Users</TableCell>
                    <TableCell align="right">Last Updated</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {projectsData !== undefined && projectsData.map((n, i) => {
                    return (
                    <TableRow key={i}>
                        <TableCell component="th" scope="row">
                        {n.project_name}
                        </TableCell>
                        <TableCell>{n.address}</TableCell>
                        <TableCell align="right">{n.num_users}</TableCell>
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