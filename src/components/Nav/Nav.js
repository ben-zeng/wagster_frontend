import React from 'react';
import {Link} from 'react-router-dom'

function Nav() {

    const navLinkStyle = {
        color: 'white'
    };

    return (
        <nav>
            <h3>Logo</h3>
            <ul className="nav-links">
                <Link style={navLinkStyle} to="/signup">
                    <li>Sign Up</li>
                </Link>
                <Link style={navLinkStyle} to="/login">
                    <li>Login</li>
                </Link>
                <li>Log Out</li>
            </ul>
        </nav>
    );
}

export default Nav;
