/*AuthHeader is a middleware used to verify if the token corresponding to a connected user is true, then it gets and returns the data of a called API path*/

import axios from 'axios';
import Cookies from 'universal-cookie';

 async function authHeader(route){
  const cookies = new Cookies();

  const token = cookies.get('user') || null;
  if(token === null) {return false}
  const baseURL = process.env.REACT_APP_API_URL;

   const data = await axios.get(`${baseURL}${route}?token=${token}`

  ).then((response) => {
    console.log(response)
    if (response.data.queryStatus) {
      return response.data;
    } else {
      console.log('Invalid Token');
      return false;
    }
  }).catch((error) => {
    if(error.response.status === 511) {
      cookies.remove('user');
    }
    console.log(error)
    return false;
  })
  return data;
}


export default authHeader;