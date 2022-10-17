/*PatchData is a middleware used to get the data of a called API path without verifying if there is a valid token, it is used for data that don't require interaction with a connected user*/

import axios from 'axios';
import Cookies from 'universal-cookie';
const pathURL = process.env.REACT_APP_PATH;
const domainURL = process.env.REACT_APP_DOMAIN;

 async function patchData(route, content){
  const cookies = new Cookies();
  const token = cookies.get('user', { path: pathURL ,domain: domainURL}) || null;
  if(token === null) {return false}
  const baseURL = process.env.REACT_APP_API_URL;
  
   const data = await axios.patch(`${baseURL}${route}?token=${token}`,
    JSON.stringify({ content }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  ).then((response) => {
    if (response.data.queryStatus) {
      console.log('Content modified', response.data)
      if (response.data.data && response.data.data.token) {
        console.log('ici')
        cookies.set("user", response.data.data.token, { path: pathURL ,domain: domainURL});
      }
      return response.data;
    } else {
      console.log(response);
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