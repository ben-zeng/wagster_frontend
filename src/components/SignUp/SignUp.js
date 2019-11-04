import React, {useState} from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link,useHistory} from 'react-router-dom'

const signUpAPI = "http://localhost:3000/api/v1/users";
//const signUpAPI = "https://api-wagster.herokuapp.com/api/v1/users";
const getTokenAPI = "http://localhost:3000/api/v1/tokens/";


const resolveAPIEndpoint = (endpoint) => {
    if (process.env.NODE_ENV === 'development') {
        return `http://localhost:3000/api/v1/${endpoint}`
    }
    if (process.env.NODE_ENV === 'production') {
        return `https://api-wagster.herokuapp.com/api/v1/${endpoint}`
    }
};

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
    const history = useHistory();

    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();

        Axios.post(signUpAPI, {

            "user": {
                "email": email,
                "password": password
            }
        }).then(result => {
            Axios.post(getTokenAPI, {

                "user": {
                    "email": email,
                    "password": password
                }
            }).then(result => {
                    // console.log(result.data.token);
                    localStorage.setItem('jwt-auth', result.data.token);
                }
            );
            console.log(result.data);

            history.push("/");
        }).catch(error => {
            alert(error)
        })

    };

    return (
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
    );
}
