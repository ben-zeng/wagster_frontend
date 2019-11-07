import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { yellow } from '@material-ui/core/colors';
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
    flex: 1
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
  bigAvatar: {
    width: '4rem',
    height: '4rem',
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Matches() {
  const [currentUser, setCurrentUser] = useGlobalState("currentUser");
  const history = useHistory();

  if (!currentUser.isLoggedIn) {
    history.push("/login");
  }

  const [matchedProfiles, setMatchedProfiles] = useState(null);

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

  useEffect(() => {
    if (!currentUser.isLoggedIn) {
      return;
    }
    Axios.get(resolveAPIEndpoint(`profiles/${currentUser.userId}/match_show`))
      .then(function (response) {
        const getAllProfiles = response.data.map(matchedProfileId => {
          // TODO: Problem: We're passing profile ID, but backend is expecting user ID
          return Axios.get(resolveAPIEndpoint(`profiles/${matchedProfileId}`))
            .then(response => response.data);
        });

        Promise.all(getAllProfiles).then(profiles => {
          setMatchedProfiles(profiles);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [currentUser]);

  if (matchedProfiles === null) {
    return <p>Loading your matches...</p>;
  }

  if (matchedProfiles && matchedProfiles.length === 0) {
    return <p>Sorry, no matches just yet. Check back soon!</p>;
  }

  return (
    <Card className={classes.card}>
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
              <MenuItem component={Link} to="/matching" onClick={handleClose}>Get Matching!</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        }
      />

      <CardContent>
        {matchedProfiles.map(profile => {
          return (
            <div key={profile.id}>
              <Avatar alt={profile.dog_name} src={resolveAPIImage(profile.picture.url)} className={classes.bigAvatar} />
              <Typography gutterBottom variant="h5" component="h2">
                {profile.dog_name}
              </Typography>
            </div>
          )
        })}
      </CardContent>

    </Card>
  );
}


