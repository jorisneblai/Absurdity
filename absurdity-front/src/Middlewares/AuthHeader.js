import axios from 'axios';

 async function authHeader(route){

  const token = localStorage.getItem('user') || null;
  if(token === null) {return false}
  const baseURL = process.env.REACT_APP_API_URL;

   const data = await axios.post(`${baseURL}${route}`,
    JSON.stringify({ token }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  ).then((response) => {
    if (response.data.queryStatus) {
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


export default authHeader;