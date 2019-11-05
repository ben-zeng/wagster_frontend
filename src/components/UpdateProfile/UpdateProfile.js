import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link,useHistory} from 'react-router-dom'
import { resolveAPIEndpoint, resolveAPIImage } from '../../helpers/APIResolveHelper';


const createProfileEndpoint = "http://localhost:3000/api/v1/profiles/1";
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
    bigAvatar: {
        width: 100,
        height: 100,
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

export default function UpdateProfile() {
    const history = useHistory();
    const classes = useStyles();

    const [ dogName, setDogName ] = useState("");
    const [ biography, setBiography ] = useState("");
    const [ picture, setPicture ] = useState(null);
    const [ currentPicture, setCurrentPicture ] = useState(null);

    useEffect(() => {
        Axios.get(resolveAPIEndpoint("profiles/1") ).then(response => {
            setDogName(response.data.dog_name);
            setBiography(response.data.biography);
            setCurrentPicture(response.data.picture.url);
        });
    }, []);

    if (dogName === null) {
        return <p>Loading profile...</p>;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const reader = new FileReader();

        reader.addEventListener("load", () => {
            patchForm(reader.result);
        }, false);

        if (picture) {
            reader.readAsDataURL(picture);
        } else {
            patchForm();
        }
    };

    const patchForm = (pictureDataURL) => {
        const userJwt = localStorage.getItem('jwt-auth');
        
        const formData = {
            profile: {
                dog_name: dogName,
                biography: biography,
                user_id: "1"
            }
        };

        if (pictureDataURL) {
            formData.profile.picture = pictureDataURL;
        }

        Axios.patch(
            createProfileEndpoint,
            formData,
            {
                headers: {
                    Authorization: userJwt,
                }
            }
        ).then(result => {
            console.log(result.data);

            history.push("/profile");
        }).catch(error => {
            alert(error);
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Update Profile
                </Typography>

                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="dog_name"
                        value={dogName}
                        name="dog_name"
                        onChange={event => setDogName(event.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="biography"
                        value={biography}
                        id="biography"
                        multiline
                        rows="4"
                        onChange={event => setBiography(event.target.value)}
                    />

                    <Avatar alt="{dogName}" src={resolveAPIImage(currentPicture)} className={classes.bigAvatar} />

                    <input type="file" onChange={event => setPicture(event.target.files[0])}/>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Update Profile!
                    </Button>

                </form>
            </div>
        </Container>
    );
}
