import axios from 'axios';
import React from 'react';


const profile = () => {

const getinfo =()=>{
    axios.get("http://localhost:5000/api/profile/:id")
    .then((data) => {
        console.log(data)
    })
    .catch( error => console.log(error) )
}

getinfo()

    return (
        <div>
        <h1>Welcom User</h1>
        <img src="" alt="profileImg" />

            
        </div>
    )
}

export default profile


