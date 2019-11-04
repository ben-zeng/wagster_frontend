import React, {useState} from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link,useHistory} from 'react-router-dom'

const createProfileEndpoint = "http://localhost:3000/api/v1/profiles";
//const createProfileEndpoint = "https://api-wagster.herokuapp.com/api/v1/profiles";

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

export default function CreateProfile() {
    const history = useHistory();

    const classes = useStyles();

    const [ dogName, setDogName ] = useState("");
    const [ biography, setBiography ] = useState("");
    const [ picture, setPicture ] = useState(null);

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
        const userJwt = localStorage.getItem('jwt-auth');

        Axios.post(
            createProfileEndpoint,
            {
                profile: {
                    dog_name: dogName,
                    biography: biography,
                    // TODO: This shouldn't be hardcoded
                    user_id: "3",
                    picture: pictureDataURL
                }
            },
            {
                headers: {
                    Authorization: userJwt
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
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
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

                    <input type="file" onChange={event => setPicture(event.target.files[0])}/>

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
            </div>
        </Container>
    );
}
