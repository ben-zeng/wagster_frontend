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
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { yellow } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import {Link,useHistory} from 'react-router-dom'
import Axios from "axios";
import { resolveAPIEndpoint } from '../../helpers/APIResolveHelper';

    // const useStyles = makeStyles({
    //     card: {
    //       maxWidth: 345,
    //     },
    //     media: {
    //       height: 140,
    //     },
    // });

    const useStyles = makeStyles(theme => ({
      card: {
        maxWidth: 345,
        'margin-left': '30%',
        justifyContent:'center',
        width: "90%",
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
      },
    }));
    
export default function Profile() {

    const [data, setData]  = useState(null);

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };


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
          />
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
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
            <Button size="small" color="primary">
              Nope
            </Button>
            <Button size="small" color="primary">
              Woof
            </Button>
          </CardActions>
        </Card>
      );
    }



