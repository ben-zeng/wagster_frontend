import React from 'react';
import {Link} from 'react-router-dom'
import Button from "@material-ui/core/Button";
import Axios from "axios";

function Nav() {

    const navLinkStyle = {
        color: 'white'
    };

    const handleClick = (evt) => {
        evt.preventDefault();
        localStorage.removeItem('jwt-auth');
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

                <Button
                    onClick={handleClick}
                    color="primary"
                >
                    Log Out
                </Button>

            </ul>
        </nav>
    );
}

export default Nav;
