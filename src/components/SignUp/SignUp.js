import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';

import { resolveAPIEndpoint } from '../../helpers/APIResolveHelper';
import { useGlobalState } from '../../helpers/GlobalState';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            background: 'radial-gradient(circle at 49% 55%, #c5e1a5, #66bb6a)',
        },
    },
    card: {
        flex: 1,
        overflow: 'auto',
        margin: '5%'
    },
    wagsterLogoLarge: {
        width: 200,
        height: 200,
        margin: theme.spacing(4),
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
    const [currentUser, setCurrentUser] = useGlobalState("currentUser");
    const history = useHistory();

    if (currentUser.isLoggedIn) {
        history.push("/profile");
    }

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
            if (error.response.status === 422) {
                alert("Account already exists")
            }
            else
                console.log(error);
        });
    };

    return (
        <Card className={classes.card}>
            <Grid container justify="center" alignItems="center">
                <Avatar src="/images/wagster-logo.png" className={classes.wagsterLogoLarge} />
            </Grid>
            <Container component="main" maxWidth="xs">
                <Typography component="h1" variant="h5">
                    Register
                </Typography>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        type="email"
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
            </Container>
        </Card>
    );
}
