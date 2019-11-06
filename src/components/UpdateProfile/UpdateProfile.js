import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom'
import { resolveAPIEndpoint, resolveAPIImage } from '../../helpers/APIResolveHelper';
import { useGlobalState } from '../../helpers/GlobalState';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            background: 'radial-gradient(circle at 49% 55%, #ffecb3, #ffe082)',
        },
      },
      card: {
        maxWidth: 345,
        'margin-left': '35%',
        justifyContent: 'center',
        width: "90%",
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    const [ currentUser ] = useGlobalState("currentUser");
    const history = useHistory();

    if (!currentUser.isLoggedIn) {
      history.push("/login");
    }

    const classes = useStyles();

    const [ dogName, setDogName ] = useState("");
    const [ biography, setBiography ] = useState("");
    const [ picture, setPicture ] = useState(null);
    const [ currentPicture, setCurrentPicture ] = useState(null);

    useEffect(() => {
        if (!currentUser.isLoggedIn) {
            return;
        }
        Axios.get(resolveAPIEndpoint(`profiles/${currentUser.userId}`)).then(response => {
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
        const formData = {
            profile: {
                dog_name: dogName,
                biography: biography,
                user_id: currentUser.userId
            }
        };

        if (pictureDataURL) {
            formData.profile.picture = pictureDataURL;
        }

        Axios.patch(
            resolveAPIEndpoint(`profiles/${currentUser.userId}`),
            formData,
            {
                headers: {
                    Authorization: currentUser.jsonWebToken
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
        <Card className={classes.card}>

            <CardActionArea>
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
        </CardActionArea>
        </Card>
    );
}
