import React, {useState, useEffect} from 'react';


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
    <div>
        Profile Page!
    </div>
  );
}

export default Profile;
