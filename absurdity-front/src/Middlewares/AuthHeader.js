import axios from 'axios';

 async function authHeader(route){

  const token = localStorage.getItem('user');
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
    console.log(error);
    return false;
  })
  return data;
}

export default authHeader;

/*import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authHeader from '../../Middlewares/AuthHeader';

function Profil() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        const f = async () => {
            const newData = await authHeader('user');
            if (!newData) {
                navigate('/');
            } else {
                setData(newData);
            }
        }
        f();
    }, []);

    function truc() {
        console.log(data)
    }


    return (
        <><button onClick={() => { truc() }}>truc</button></>
    );
}

export default Profil;*/