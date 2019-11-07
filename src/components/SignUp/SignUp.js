import React, { useState } from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from 'react-router-dom';
import { resolveAPIEndpoint } from '../../helpers/APIResolveHelper';
import { useGlobalState } from '../../helpers/GlobalState';


const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            background: 'radial-gradient(circle at 49% 55%, #ffecb3, #ffe082)',
        },
    },
    card: {
        flex: 1
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
    const [, setCurrentUser] = useGlobalState("currentUser");


    const history = useHistory();

    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
            user: { email, password }
        };

        Axios.post(resolveAPIEndpoint("users"), userData).then(result => {
            Axios.post(resolveAPIEndpoint("tokens"), userData).then(result => {
                setCurrentUser({
                    userId: result.data.user_id,
                    jsonWebToken: result.data.token,
                    isLoggedIn: true
                });

                history.push("/profile/create");
            });
        }).catch(error => {
            alert(error)
        });
    };

    return (
        <Card className={classes.card}>

            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <div className={classes.paper}>

                    <Typography component="h1" variant="h5">
                        Register
                        </Typography>

                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={e => setEmail(e.target.value)}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={e => setPassword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up!
                            </Button>

                        <Button
                            component={Link} to="/login"
                            type="submit"
                            fullWidth
                            color="primary"
                        >
                            Back
                            </Button>

                    </form>
                </div>
            </Container>
        </Card>
    );
}
