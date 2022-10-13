/*DeleteDataMiddleware is a middleware used to get the data of a called API path, verifying if there is a valid token, it is used to delete data*/

import axios from 'axios';
import Cookie from 'universal-cookie'

 async function DeleteDataMiddleware(route){
   const cookies = new Cookie()

  const token = cookies.get('user', { path: '/' ,domain: '.absurdity.vercel.app'}) || null;
  if(token === null) {return false}
  const baseURL = process.env.REACT_APP_API_URL;
  console.log(token);
   const data = await axios.delete(`${baseURL}${route}?token=${token}`

  ).then((response) => {
    if (response.data.queryStatus) {
      console.log(response)
      return true;
    } else {
      console.log(response);
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