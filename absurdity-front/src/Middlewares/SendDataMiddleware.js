import axios from 'axios';
import Cookies from 'universal-cookie';
const pathURL = process.env.REACT_APP_PATH;
const domainURL = process.env.REACT_APP_DOMAIN;

 async function sendDataMiddleware(route, answer){
  const cookies = new Cookies();
  const token = cookies.get('user', { path: pathURL ,domain: domainURL}) || null;
  const content = answer;
  if(token === null) {return false}
  const baseURL = process.env.REACT_APP_API_URL;

   const data = await axios.post(`${baseURL}${route}?token=${token}`,
    JSON.stringify({ content }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  ).then((response) => {
    console.log(response.data)
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