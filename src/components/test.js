import React from 'react'
const axios = require('axios');
const params = {
  access_key: 'f0ab3d833bf1c9e6f32e08a4321fd22b'
}


const Test = () => {
    axios.get('http://api.aviationstack.com/v1/flights?access_key=f0ab3d833bf1c9e6f32e08a4321fd22b')
  .then(response => {
    const apiResponse = response.data;
  
    console.log(apiResponse)
  }).catch(error => {
    console.log(error);
  });
}

export default Test
