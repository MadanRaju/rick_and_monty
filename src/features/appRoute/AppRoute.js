import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Header from 'Header';


const AppRoute = ({
    exact,
    path,
    component,
    header,
    footer,
}) => {
    const getComponent = props => (
        <React.Fragment>
            {header}
            {React.createElement(component, props)}
            {footer}
        </React.Fragment>
    );

    return (<Route exact={exact} path={path} component={getComponent} />);
};

AppRoute.propTypes = {
    exact: PropTypes.bool,
    path: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    header: PropTypes.object,
    footer: PropTypes.object,
};

AppRoute.defaultProps = {
    exact: false,
    header: <Header />,
    footer: <footer />,
};

export default AppRoute;
