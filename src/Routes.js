import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import CustomerList from './components/CustomerList';
import PlanSelection from './components/PlanSelection';
import PlanUpgradation from './components/PlanUpgradation';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/customers" component={CustomerList} />
                <Route exact path="/customer/:id/select-plan" component={PlanSelection} />
                <Route exact path="/customer/:id/upgrade-plan" component={PlanUpgradation} />
            </Switch>
        </Router>
    );
};

export default Routes;
