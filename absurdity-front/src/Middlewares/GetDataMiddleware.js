/*GetData is a middleware used to get the data of a called API path without verifying if there is a valid token, it is used for data that don't require interaction with a connected user*/

import axios from 'axios';
import Cookies from 'universal-cookie';
const pathURL = process.env.REACT_APP_PATH;
const domainURL = process.env.REACT_APP_DOMAIN;

 async function getData(route){
  const cookies = new Cookies();
  const token = cookies.get('user', { path: pathURL ,domain: domainURL}) || 'No Token';
  
  const baseURL = process.env.REACT_APP_API_URL;

   const data = await axios.get(`${baseURL}${route}?token=${token}`

  ).then((response) => {

    if (response.data.queryStatus) {
      return response.data;
    } else {
      console.log('Bad Request');
      return false;
    }
  }).catch((error) => {
   console.log(error)
    return false;
  })
  return data;
}


export default getData;