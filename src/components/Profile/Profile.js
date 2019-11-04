import React, {useEffect, useState} from 'react';
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

    const [data, setData]  = useState(null);

    const classes = useStyles();

    // let dataStore = undefined;


    //
    // useEffect(() => {
    //     Axios.get(resolveAPIEndpoint("profiles/1") ).then(result =>{
    //         dataStore = result.data;
    //         console.log(dataStore.dog_name);
    //
    //
    //
    //     }).catch(error => {
    //         alert(error)
    //     })
    // },  []);


    // useEffect(async () => {
    //     const result = await Axios(resolveAPIEndpoint("profiles/1"));
    //     // dataStore = result;
    //     console.log(result.data.dog_name);
    //     setData(result.data);
    // },[]);

    // useEffect(() => {
    //
    //     const fetchData = async () => {
    //         const result = await Axios(resolveAPIEndpoint("profiles/1"),
    //         );
    //         setData(result.data);
    //     };
    //
    //     fetchData();
    //
    // }, []);

    useEffect(() => {
        Axios.get(resolveAPIEndpoint("profiles/1") ).then(response => setData(response));
    }, []);

    if (data === null) {
        return <p>Loading profile...</p>;
    }

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
                {data.data.dog_name}

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



