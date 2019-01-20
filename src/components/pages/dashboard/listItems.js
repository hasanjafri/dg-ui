import React from 'react';
import history from '../../history';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

let current_path = window.location.pathname;

export const mainListItems = (
  <div>
    <ListSubheader inset>Project Statistics</ListSubheader>
    <ListItem selected={current_path === '/dashboard'? true : false} button onClick={() => history.push('/dashboard')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button selected={current_path === '/dashboard/instructions'? true : false}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Instructions" />
    </ListItem>
    <ListItem button selected={current_path === '/dashboard/orderinput'? true : false}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Order Input" />
    </ListItem>
    <ListItem button selected={current_path === '/dashboard/suppliers'? true : false} onClick={() => history.push('/dashboard/suppliers')}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Suppliers" />
    </ListItem>
    <ListItem button selected={current_path === '/dashboard/analytics'? true : false}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Analytics" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Project Roles</ListSubheader>
    <ListItem button selected={current_path === '/dashboard/projects'? true : false} onClick={() => history.push('/dashboard/projects')}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Projects" />
    </ListItem>
    <ListItem button selected={current_path === '/dashboard/users'? true : false} onClick={() => history.push('/dashboard/users')}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Add Users" />
    </ListItem>
    <ListItem button selected={current_path === '/dashboard/users/manage'? true : false} onClick={() => history.push('/dashboard/users/manage')}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Users" />
    </ListItem>
  </div>
);

export const thirdListItems = (
  <div>
    <ListSubheader inset>Other</ListSubheader>
    <ListItem button selected={current_path === '/dashboard/contactus'? true : false}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Contact Us" />
    </ListItem>
    <ListItem button onClick={() => history.push('/')}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItem>
  </div>
)