import React from 'react';
import history from './history';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    appBar: {
        position: 'relative',
    },
    toolbarTitle: {
        flex: 1,
    },
})

function NavBar(props) {
    const { classes } = props;

    return(
        <React.Fragment>
            <AppBar position="static" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        Datagram
                    </Typography>
                    <Button onClick={() => history.push('/')}>Home</Button>
                    <Button onClick={() => history.push('/plans')}>Plans</Button>
                    <Button color="primary" variant="outlined" onClick={() => history.push('/login')}>
                        Login
                    </Button>
                    <Button color="secondary" variant="outlined" onClick={() => history.push('/register')}>
                        Sign Up
                    </Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavBar);