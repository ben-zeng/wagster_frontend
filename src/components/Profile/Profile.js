import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const profileAPI = "https://api-wagster.herokuapp.com/api/v1/profiles/1";
// const profileAPI = "http://localhost:3000/api/v1/profiles/1";

function Profile() {

    useEffect(() => {
        fetchProfile();
    },[]);

    const fetchProfile = async () => {
        const data = await fetch (profileAPI).then(response => response.json());
        console.log(data);
    };

  return (
      <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://www.sheknows.com/wp-content/uploads/2018/08/fajkx3pdvvt9ax6btssg.jpeg" />
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
