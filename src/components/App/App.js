import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from '../Nav/Nav';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';


function App() {
    return (
        <Router>
            <div className="app">
                <Nav/>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Profile/>
            </div>
        </Router>
    );
}

export default App;
