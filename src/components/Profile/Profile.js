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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Axios from "axios";
import { resolveAPIEndpoint, resolveAPIImage } from '../../helpers/APIResolveHelper';
import { useGlobalState } from '../../helpers/GlobalState';

const useStyles = makeStyles(theme => ({
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
  action: {
    fontSize: 10
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: yellow[300],
    fontFamily: 'Raleway',
    width: 50,
    height: 50,
    margin: theme.spacing(1),
  },
}));

const errorIs404 = (error) => {
  return error.response &&
    error.response.status === 404;
};

export default function Profile() {
  const [ currentUser, setCurrentUser ] = useGlobalState("currentUser");
  const history = useHistory();

  if (!currentUser.isLoggedIn) {
    history.push("/login");
  }

  const [data, setData] = useState(null);

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
    Axios.get(resolveAPIEndpoint(`profiles/${currentUser.userId}`))
      .then(response => setData(response))
      .catch(error => {
        if (errorIs404(error)) {
          history.push("/profile/create");
        } else {
          console.error(error);
        }
      });
  }, []);

  if (data === null) {
    return <p>Loading profile...</p>;
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
            <MenuItem component={Link} to="/profile" onClick={handleClose}>Matches</MenuItem>
            <MenuItem component={Link} to="/profile/view" onClick={handleClose}>Get Matching!</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
          </div>
          }
        />
        <CardMedia
          className={classes.media}
          image={data.data.image.url}
          title="Dog"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.data.dog_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.data.biography}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* TODO : logo?  */}
      </CardActions>
    </Card>
  );
}
