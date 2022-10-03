import axios from 'axios';

 async function sendDataMiddleware(route, answer){

  const token = localStorage.getItem('user') || null;
  const content = answer;
  if(token === null) {return false}
  const baseURL = process.env.REACT_APP_API_URL;

   const data = await axios.post(`${baseURL}${route}`,
    JSON.stringify({ token, content }),
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


export default sendDataMiddleware;