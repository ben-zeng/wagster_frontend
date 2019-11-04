import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import {Link,useHistory} from 'react-router-dom'
import Axios from "axios";
import { resolveAPIEndpoint } from '../../helpers/APIResolveHelper';

    const useStyles = makeStyles({
        card: {
          maxWidth: 345,
        },
        media: {
          height: 140,
        },
    });
export default function Profile() {

    
    const classes = useStyles();


    useEffect(() => {
        Axios.get(resolveAPIEndpoint("profiles/1") ).then(result =>{
            console.log(result.data);
        }).catch(error => {
            alert(error)
        })
    },  []);
    
    
    return (
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
            //   image="/static/images/cards/contemplative-reptile.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Lizard
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Profile.biography
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
       

// export default Profile;



