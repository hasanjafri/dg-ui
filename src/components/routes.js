import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/home';
import Pricing from './pages/pricing';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Team from './pages/team';

import Dashboard from './pages/dashboard/views/dashboard';
import AddUser from './pages/dashboard/views/adduser';
import AddProject from './pages/dashboard/views/addproject';
import ManageUsers from './pages/dashboard/views/edituser';
import ManageSuppliers from './pages/dashboard/views/suppliers';
import OrderInput from './pages/dashboard/views/orderinput';
import InternalNaming from './pages/dashboard/views/internalnaming';

const Routes = () => {
    return(
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/plans" exact component={Pricing}/>
            <Route path="/login" exact component={SignIn}/>
            <Route path="/register" exact component={SignUp}/>
            <Route path="/team" exact component={Team}/>
            <Route path="/dashboard" exact component={Dashboard}/>
            <Route path="/dashboard/users" exact component={AddUser}/>
            <Route path="/dashboard/projects" exact component={AddProject}/>
            <Route path="/dashboard/users/manage" exact component={ManageUsers}/>
            <Route path="/dashboard/suppliers" exact component={ManageSuppliers}/>
            <Route path="/dashboard/order_input" exact component={OrderInput}/>
            <Route path="/dashboard/internal_naming" exact component={InternalNaming}/>
        </Switch>
    )
}

export default Routes;