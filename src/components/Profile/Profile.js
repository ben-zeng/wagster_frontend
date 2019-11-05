import React, {useEffect, useState} from 'react';
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import {Link,useHistory} from 'react-router-dom'
import {resolveAPIEndpoint} from "../../helpers/APIResolveHelper";
import Axios from "axios";

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
        Axios.get(resolveAPIEndpoint("profiles/1")).then(result => {
            console.log(result.data);
            console.log(process.env.NODE_ENV)
        }).catch(error => {
            alert(error)
        })
    }, []);


    return (
        <Card style={{width: '18rem'}}>
            <Card.Img variant="top"
                      src="https://www.sheknows.com/wp-content/uploads/2018/08/fajkx3pdvvt9ax6btssg.jpeg"/>
            <Card.Body>
                <Card.Title>Dog Name</Card.Title>
                <Card.Text>
                    Dog Bio
                </Card.Text>
                <Button variant="primary">Yes!</Button>

                <Button variant="primary">No! </Button>
            </Card.Body>
        </Card>
    );
}

export default Profile;
