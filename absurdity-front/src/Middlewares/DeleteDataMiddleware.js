/*DeleteDataMiddleware is a middleware used to get the data of a called API path, verifying if there is a valid token, it is used to delete data*/

import axios from 'axios';

 async function DeleteDataMiddleware(route){

  const token = localStorage.getItem('user') || null;
  if(token === null) {return false}
  const baseURL = process.env.REACT_APP_API_URL;
  console.log(token);
   const data = await axios.put(`${baseURL}${route}`,
   JSON.stringify({ token }),

    {
      headers: { 'Content-Type': 'application/json' },
    }
  ).then((response) => {
    if (response.data.queryStatus) {
      return true;
    } else {
      console.log('Invalid Token');
      return false;
    }
  }).catch((error) => {
    console.log(error)
    return false;
  })
  return data
}


export default DeleteDataMiddleware;