import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Pricing from './pages/pricing';

const Routes = () => {
    return(
        <Switch>
            <Route path="/" exact component={Pricing}/>
            <Route path="/plans" exact component={Pricing}/>
        </Switch>
    )
}

export default Routes;