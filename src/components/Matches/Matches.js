import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import ChatOutlined from '@material-ui/icons/ChatOutlined';
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
  action: {
    fontSize: 10
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  noMatchesPug: {
    width: 120,
    height: 120,
    margin: theme.spacing(1),
  },
  bigAvatar: {
    width: '4rem',
    height: '4rem',
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  wagsterLogoSmall: {
    width: 50,
    height: 50,
    margin: theme.spacing(1),
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

  const getProfile = (userId) => {
    return Axios.get(resolveAPIEndpoint(`profiles/${userId}`))
      .then(response => response.data);
  };

  const completeProfiles = (profiles, matches) => {
    return profiles.map(profile => {
      profile.email = matches.find(match => match.user_id === profile.user_id).email;
      return profile;
    });
  };

  useEffect(() => {
    if (!currentUser.isLoggedIn) {
      return;
    }

    Axios.get(resolveAPIEndpoint(`profiles/${currentUser.userId}/match_show`))
      .then((response) => {
        const matches = response.data;
        const getMatchedProfiles = matches.map(match => getProfile(match.user_id));

        Promise.all(getMatchedProfiles).then(profiles => {
          setMatchedProfiles(completeProfiles(profiles, matches));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentUser]);

  return (
    <Card className={classes.card}>
      <CardHeader
        title="My Matches"
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
        {matchedProfiles === null &&
          <p>Loading your matches...</p>
        }

        {matchedProfiles && matchedProfiles.length === 0 &&
          <>
            <Grid container justify="center" alignItems="center">
              <Avatar src="/images/no-matches-pug.jpg" className={classes.noMatchesPug} />
            </Grid>
            <Typography variant="body1" align="center">Sorry, no matches just yet...</Typography>
            <Typography variant="body1" align="center">
              <Link to="/">Keep matching</Link> and check back soon!
            </Typography>
          </>
        }

        {matchedProfiles && matchedProfiles.length > 0 &&
          matchedProfiles.map(profile => {
            return (
              <Grid key={profile.id} container justify="center" alignItems="center">
                <Grid item xs={3}>
                  <Avatar alt={profile.dog_name} src={resolveAPIImage(profile.picture.url)} className={classes.bigAvatar} />
                </Grid>
                <Grid item xs={7}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {profile.dog_name}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <a href={"mailto:" + profile.email}>
                    <ChatOutlined fontSize="large" />
                  </a>
                </Grid>
              </Grid>
            )
          })
        }
      </CardContent>

    </Card>
  );
}


