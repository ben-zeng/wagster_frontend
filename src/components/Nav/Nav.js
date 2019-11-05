import React from 'react';
import {useHistory} from 'react-router-dom'
import Button from "@material-ui/core/Button";
import { useGlobalState } from '../../helpers/GlobalState';

function Nav() {
    const [currentUser, setCurrentUser] = useGlobalState("currentUser");
    console.log({ currentUser })

    const history = useHistory();

    const handleClick = (event) => {
        event.preventDefault();

        setCurrentUser({
            userId: null,
            jsonWebToken: null,
            isLoggedIn: false
        });

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

                {currentUser.isLoggedIn && 
                    <Button
                        onClick={handleClick}
                        color="primary"
                    >
                        Log Out
                    </Button>
                }

            </ul>
        </nav>
    );
}

export default Nav;
