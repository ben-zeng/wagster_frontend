import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Axios from "axios";
import { resolveAPIEndpoint, resolveAPIImage } from '../../helpers/APIResolveHelper';
import { useGlobalState } from '../../helpers/GlobalState';

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
    wagsterLogoSmall: {
        width: 50,
        height: 50,
        margin: theme.spacing(1),
    },
}));

export default function UpdateProfile() {
    const [currentUser, setCurrentUser] = useGlobalState("currentUser");
    const history = useHistory();

    if (!currentUser.isLoggedIn) {
        history.push("/login");
    }

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = (event) => {
      event.preventDefault();

      handleClose();

      setCurrentUser({
        userId: null,
        jsonWebToken: null,
        isLoggedIn: false
      });

      history.push("/login")
    };

    const [dogName, setDogName] = useState("");
    const [biography, setBiography] = useState("");
    const [picture, setPicture] = useState(null);
    const [currentPicture, setCurrentPicture] = useState(null);

    useEffect(() => {
        if (!currentUser.isLoggedIn) {
            return;
        }
        Axios.get(resolveAPIEndpoint(`profiles/${currentUser.userId}`)).then(response => {
            setDogName(response.data.dog_name);
            setBiography(response.data.biography);
            setCurrentPicture(response.data.picture.url);
        });
    }, [currentUser]);

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
            <CardHeader
                title="Edit Profile"
                titleTypographyProps={{ variant: "h5" }}
                avatar={
                    <Grid container justify="center" alignItems="center">
                        <Avatar src="/images/wagster-logo.png" className={classes.wagsterLogoSmall} />
                    </Grid>
                }
                action={
                    <div>
                        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <MoreVertIcon />
                        </IconButton>
                        <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        >
                        <MenuItem component={Link} to="/profile" onClick={handleClose}>My Profile</MenuItem>
                        <MenuItem component={Link} to="/profile/update" onClick={handleClose}>Edit Profile</MenuItem>
                        <MenuItem component={Link} to="/matches" onClick={handleClose}>Matches</MenuItem>
                        <MenuItem component={Link} to="/" onClick={handleClose}>Get Matching!</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                }
            />
            <CardContent>
                <Container component="main" maxWidth="xs">
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

                        <Avatar alt={dogName} src={resolveAPIImage(currentPicture)} className={classes.bigAvatar} />

                        <input type="file" onChange={event => setPicture(event.target.files[0])} />

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
                </Container>
            </CardContent>
        </Card>
    );
}
