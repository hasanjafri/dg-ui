import React from 'react';
import history from 'history';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

});

class OrderInput extends React.Component {
    state = {
        
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
}

export default withStyles(styles)(OrderInput);