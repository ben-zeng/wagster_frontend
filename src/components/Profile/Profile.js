import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {resolveAPIEndpoint} from "../../helpers/APIResolveHelper";
import Axios from "axios";


function Profile() {

    useEffect(() => {
        Axios.get(resolveAPIEndpoint("profiles/1")).then(result => {
            console.log(result.data);
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
