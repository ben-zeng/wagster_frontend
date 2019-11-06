import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';
import CreateProfile from '../CreateProfile/CreateProfile';
import UnmatchedProfiles from '../UnmatchedProfiles/UnmatchedProfiles';
import Matches from '../Matches/Matches';
import UpdateProfile from '../UpdateProfile/UpdateProfile';
import { GlobalStateProvider } from '../../helpers/GlobalState';


function App() {
    return (
        <GlobalStateProvider>
            <Router>
                <div className="app">

                    <Switch>
                    <Route path="/profile" exact component={Profile} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/profile/create" exact component={CreateProfile} />
                    <Route path="/matching" exact component={UnmatchedProfiles} />
                    <Route path="/profile/update" exact component={UpdateProfile} />
                    <Route path="/matches" exact component={Matches} />
                    </Switch>

                </div>
            </Router>
        </GlobalStateProvider>
    );
}

export default App;
