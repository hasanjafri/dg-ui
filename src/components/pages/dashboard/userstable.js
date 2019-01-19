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

function UsersTable(props) {
  const { classes, usersData } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Last Logged In</TableCell>
            <TableCell align="right">Permissions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData !== null && usersData[0].map((n, i) => {
            return (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {n.username}
                </TableCell>
                <TableCell align="right">{n.created_at}</TableCell>
                <TableCell align="right">{n.last_logged_in}</TableCell>
                <TableCell align="right">{n.permissions.join().replace(',', ', ')}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

UsersTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersTable);