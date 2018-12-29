import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Pricing from './pages/pricing';
import SignIn from './pages/signin';

const Routes = () => {
    return(
        <Switch>
            <Route path="/" exact component={Pricing}/>
            <Route path="/plans" exact component={Pricing}/>
            <Route path="/login" exact component={SignIn}/>
        </Switch>
    )
}

export default Routes;