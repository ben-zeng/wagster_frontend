import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { yellow } from '@material-ui/core/colors';
import PetsIcon from '@material-ui/icons/Pets';
import CancelIcon from '@material-ui/icons/Cancel';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import {Link,useHistory} from 'react-router-dom'
import Axios from "axios";
import { resolveAPIEndpoint, resolveAPIImage } from '../../helpers/APIResolveHelper';

    const useStyles = makeStyles(theme => ({
      card: {
        maxWidth: 345,
        'margin-left': '35%',
        justifyContent:'center',
        width: "90%",
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
        fontStyle: 'bold',
        fontFamily: 'Raleway',
      },
    }));
    
export default function Profile() {

    const [data, setData]  = useState(null);

    const classes = useStyles();

    useEffect(() => {
        Axios.get(resolveAPIEndpoint("profiles/1") ).then(response => setData(response));
    }, []);

    if (data === null) {
        return <p>Loading profile...</p>;
    }

    return (
        <Card className={classes.card}>
          <CardActionArea>
          <CardHeader
            avatar={
             <Avatar aria-label="wagster" className={classes.avatar}>
               W
             </Avatar>
            }
             action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Wagster"
          />
          <CardMedia
            className={classes.media}
            image={resolveAPIImage(data.data.picture.url)}
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
            <IconButton aria-label="not interested">
              <CancelIcon />
            </IconButton>
            <IconButton aria-label="add to favorites">
              <PetsIcon />
            </IconButton>
          </CardActions>
        </Card>
      );
    }



