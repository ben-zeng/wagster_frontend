import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { yellow } from '@material-ui/core/colors';
import PetsIcon from '@material-ui/icons/Pets';
import CancelIcon from '@material-ui/icons/Cancel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Axios from "axios";
import { resolveAPIEndpoint, resolveAPIImage } from '../../helpers/APIResolveHelper';
import { useGlobalState } from '../../helpers/GlobalState';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
        background: 'radial-gradient(circle at 49% 55%, #ffecb3, #ffe082)',
    },
  },
  card: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1
  },
  action: {
    fontSize: 10
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: yellow[300],
    fontFamily: 'Raleway',
    width: 50,
    height: 50,
    margin: theme.spacing(1),  
  },
}));

export default function UnmatchedProfiles() {
  const [ currentUser, setCurrentUser ] = useGlobalState("currentUser");
  const history = useHistory();

  if (!currentUser.isLoggedIn) {
    history.push("/login");
  }

  const [profiles, setProfiles] = useState([]);
  const [profilesToDisplay, setProfilesToDisplay] = useState(true);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeCurrentProfile = () => {
    const profilesCopy = profiles.filter((profile, index) => {
      return index !== 0;
    });

    setProfiles(profilesCopy);

    if (profilesCopy.length === 0) {
      getProfiles();
    }
  };

  const handleReject = (profileId) => {
    Axios.post(resolveAPIEndpoint(`profiles/${currentUser.userId}/reject`), {
      profile: profileId
    })
    .then(removeCurrentProfile)
    .catch(function (error) {
      console.log(error);
    });
  };

  const handleAccept = (profileId) => {
    Axios.post(resolveAPIEndpoint(`profiles/${currentUser.userId}/accept`), {
        profile: profileId
    })
    .then(removeCurrentProfile)
    .catch(function (error) {
      console.log(error);
    });
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

  const getProfiles = () => {
    return Axios.get(resolveAPIEndpoint(`profiles/${currentUser.userId}/profiles_get`))
      .then(response => {
          if (response.data.length === 0) {
            return setProfilesToDisplay(false);
          }
          setProfiles(response.data);
      })
      .catch(function (error) { 
        console.log(error);
      });
  };

  useEffect(() => {
    if (!currentUser.isLoggedIn) {
      return;
    }

    getProfiles();
  }, []);

  let currentProfile = null;
  if (profiles && profiles.length > 0) {
    currentProfile = profiles[0];
  }

  return (
    <Card className={classes.card}>

      <CardActionArea>
        <CardHeader
          avatar={
            <Grid container justify="center" alignItems="center">
            <Avatar aria-label="wagster" className={classes.avatar}>
              W
             </Avatar>
             </Grid>
          }
          action={
            <div>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <MoreVertIcon/> 
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
            <MenuItem component={Link} to="/matching" onClick={handleClose}>Get Matching!</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
          </div>
          }
        />

        {!profilesToDisplay &&
          <CardContent>
            <p>No new profiles, come back later!</p>
          </CardContent>
        }

        {profilesToDisplay && !currentProfile && 
          <CardContent>
            <p>Loading profile...</p>
          </CardContent>
        }

        {currentProfile &&
          <>
            <CardMedia
              className={classes.media}
              image={resolveAPIImage(currentProfile.picture.url)}
              title="Dog"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {currentProfile.dog_name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {currentProfile.biography}
              </Typography>
            </CardContent>
          </>
        }

      </CardActionArea>
      {currentProfile &&
        <CardActions>
          <IconButton onClick={() => handleReject(currentProfile.id)}>
            <CancelIcon />
          </IconButton>
          <IconButton onClick={() => handleAccept(currentProfile.id)}>
            <PetsIcon />
          </IconButton>
        </CardActions>
      }
    </Card>
  );
}