import React from 'react';
import {useHistory} from 'react-router-dom'
import Button from "@material-ui/core/Button";
// import Axios from "axios";

function Nav() {

    const history = useHistory();

    const handleClick = (evt) => {
        evt.preventDefault();
        localStorage.removeItem('jwt-auth');
        history.push("/login")
    };

    return (
        <nav>
            <h3>Logo</h3>
            <ul className="nav-links">
                {/*<Link style={navLinkStyle} to="/signup">*/}
                {/*    <li>Sign Up</li>*/}
                {/*</Link>*/}
                {/*<Link style={navLinkStyle} to="/login">*/}
                {/*    <li>Login</li>*/}
                {/*</Link>*/}

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
