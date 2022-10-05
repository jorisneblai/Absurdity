/*PatchData is a middleware used to get the data of a called API path without verifying if there is a valid token, it is used for data that don't require interaction with a connected user*/

import axios from 'axios';

 async function patchData(route, content){

  const token = localStorage.getItem('user') || null;
  if(token === null) {return false}
  const baseURL = process.env.REACT_APP_API_URL;
  
   const data = await axios.patch(`${baseURL}${route}`,
    JSON.stringify({ token, content }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  ).then((response) => {
    if (response.data.queryStatus) {
      console.log('Content modified', response.data)
      if (response.data.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.data.token));
      }
      return response.data;
    } else {
      console.log('Invalid Token');
      return false;
    }
  }).catch((error) => {
    console.log(error)
    return false;
  })
  return data;
}


export default patchData;