import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyToken() {
    const navigate = useNavigate();
    useEffect(() => {
        const connect = async () => {
            let search = window.location.search;
            let params = new URLSearchParams(search);
            let token = params.get('token');
            console.log(token)
            const baseURL = process.env.REACT_APP_API_URL;
            const data = await axios.get(`${baseURL}verify/email?token=${token}`
            ).then((response) => {
                if (response.data.queryStatus) {
                    navigate('/login');
                } else {
                    navigate('/login');
                    console.log('ça a pas marché')
                }
            }).catch((error) => {
                navigate('/login');
                console.log('ya eu une error')
            })
            return data;
        }
        connect();
    }, [navigate])

    return (
        <p>Vérification</p>
    );
}

export default VerifyToken;