import React from 'react';
import { Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

// import HomePage from 'pages/home/HomePage';
import HomePage from 'pages/home/HomePageContainer';
import AppRoute from 'features/appRoute/AppRouteContainer';

import routePaths from 'shared/routePaths';

import './App.css';

const App = () => (
    <Switch>
        <AppRoute exact path={routePaths.ROOT} component={HomePage} />
    </Switch>
);

export default hot(module)(App);
