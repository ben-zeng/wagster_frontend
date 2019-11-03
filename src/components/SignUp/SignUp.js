import React, { useState } from 'react';
import Axios from 'axios';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default function SignIn() {
    // const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        Axios.post(signUpAPI, {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            localStorage.setItem('jwt-auth', res.data);
            this.props.history.push('/protected')
        }).catch(() => this.setState({

            error: true
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <br/>
                Password:
                <input
                    type="text"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </label> <br/>

            <input type="submit" value="Submit"/>
        </form>
    );
}
