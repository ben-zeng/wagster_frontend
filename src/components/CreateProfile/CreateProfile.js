import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

const errorIs404 = (error) => {
    return error.response &&
        error.response.status === 404;
};

export default function CreateProfile() {
    const [currentUser] = useGlobalState("currentUser");
    const history = useHistory();

    if (!currentUser.isLoggedIn) {
        history.push("/login");
    }

    const classes = useStyles();

    const [dogName, setDogName] = useState("");
    const [biography, setBiography] = useState("");
    const [picture, setPicture] = useState(null);

    useEffect(() => {
        if (!currentUser.isLoggedIn) {
            return;
        }
        Axios.get(resolveAPIEndpoint(`profiles/${currentUser.userId}`))
            .then(response => {
                if (response.data && response.data.user_id === currentUser.userId) {
                    history.push("/profile");
                }
            })
            .catch(error => {
                if (!errorIs404(error)) {
                    console.error(error);
                }
            })
    }, [currentUser, history]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const reader = new FileReader();

        reader.addEventListener("load", () => {
            postForm(reader.result);
        }, false);

        if (picture) {
            reader.readAsDataURL(picture);
        } else {
            alert('Please select a photo of your dog.')
        }
    };

    const postForm = (pictureDataURL) => {

        Axios.post(
            resolveAPIEndpoint("profiles"),
            {
                profile: {
                    dog_name: dogName,
                    biography: biography,
                    user_id: currentUser.userId,
                    picture: pictureDataURL
                }
            },
            {
                headers: {
                    Authorization: currentUser.jsonWebToken
                }
            }
        ).then(result => {
            console.log(result.data);

            history.push("/");
        }).catch(error => {
            alert(error);
        });
    };

    return (
        <Card className={classes.card}>
            <Grid container justify="center" alignItems="center">
                <Avatar src="/images/wagster-logo.png" className={classes.wagsterLogoLarge} />
            </Grid>
            <Container component="main" maxWidth="xs">
                <Typography align="center" component="h1" variant="h5">
                    Create Profile
                </Typography>

                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="dog_name"
                        label="Dog Name"
                        name="dog_name"
                        autoFocus
                        onChange={event => setDogName(event.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="biography"
                        label="Biography"
                        id="biography"
                        multiline
                        rows="4"
                        onChange={event => setBiography(event.target.value)}
                    />

                    <input type="file" onChange={event => setPicture(event.target.files[0])} />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create Profile!
                    </Button>

                </form>
            </Container>
        </Card>
    )
}
