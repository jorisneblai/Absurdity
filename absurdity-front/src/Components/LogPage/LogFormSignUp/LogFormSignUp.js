import { useRef, useState, useEffect } from "react";
import './LogFormSignUp.scss';
import axios from 'axios';
import authHeader from '../../../Middlewares/AuthHeader';
import { useNavigate } from 'react-router';

function LogFormSignUp(  ) {
    const userRef = useRef();
    const errRef = useRef();
    const baseURL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [matchPwd, setMatchPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const f = async () => {
            const newData = await authHeader('checkuser');
            if (!newData) {
                setSuccess(false)
            } else {
                setSuccess(newData);
                navigate('/')
            }
        }
        f();

    userRef.current.focus();
}, [navigate]);

useEffect(() => {
    setValidMatch(pwd === matchPwd);
}, [pwd, matchPwd])


    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pseudo = user;
        const password = pwd; 
        try {
            const response = await axios.post(`${baseURL}sign-up`,
                JSON.stringify({ pseudo, password, email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err.response) {
                setErrMsg("Pas de réponse du serveur");
            } else if (err.response.status === 409) {
                setErrMsg("Nom d'utilisateur déjà pris");
            } else {
                setErrMsg("Échec de la connexion")
            }
            errRef.current.focus();
        }
    }
    return ( 
        <div className="LogFormSignUp">
             {success ? (
                <section>
                    <h1>Vous êtes inscrit.e !</h1>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>S'inscrire</h1>
                    <form onSubmit={handleSubmit}>

                    <label htmlFor="username">
                            E-Mail :
                        </label>
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="username">
                            Pseudo :
                        </label>
                        <input
                            type="text"
                            id="username"
                            autoComplete="off"
                            onChange={(event) => setUser(event.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">
                            Mot de passe :
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(event) => setPwd(event.target.value)}
                            value={pwd}
                            required
                        />

                        <label htmlFor="confirm_pwd">
                            Confirmation du mot de passe :
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(event) => setMatchPwd(event.target.value)}
                            value={matchPwd}
                            required
                        />

                        <button disabled={!validMatch ? true : false}>S'inscrire</button>
                    </form>
                </section>
            )}
        
        </div>
     );
}

export default LogFormSignUp;