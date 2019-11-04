import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from '../Nav/Nav';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';
import CreateProfile from '../CreateProfile/CreateProfile';

function App() {
    return (
        <Router>
            <div className="app">
                <Nav/>
 

                <Switch>
                <Route path="/profile" exact component={Profile} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route path="/profile/create" component={CreateProfile} />
                
                </Switch>

            </div>
        </Router>
    );
}

export default App;
