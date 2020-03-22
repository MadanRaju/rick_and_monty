import React from 'react';
import { Link } from 'react-router-dom';

import routePaths from 'shared/routePaths';

const Header = () => (
    <div className="navigationHeader">
        <Link className="navigationItem" to={routePaths.ROOT}>Rick and Monty</Link>
    </div>
);

export default Header;
