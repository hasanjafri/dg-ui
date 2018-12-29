import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/home';
import Pricing from './pages/pricing';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Team from './pages/team';

const Routes = () => {
    return(
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/plans" exact component={Pricing}/>
            <Route path="/login" exact component={SignIn}/>
            <Route path="/register" exact component={SignUp}/>
            <Route path="/team" exact component={Team}/>
        </Switch>
    )
}

export default Routes;