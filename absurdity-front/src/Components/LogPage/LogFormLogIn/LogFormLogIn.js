import { useRef, useState, useEffect } from 'react';
import './LogFormLogIn.scss';
import axios from 'axios';
import authHeader from '../../../Middlewares/AuthHeader';

const LogFormLogIn = () => {
    const userRef = useRef();
    const errRef = useRef();
    const baseURL = process.env.REACT_APP_API_URL;

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [role, setRole] = useState('');

    useEffect(() => {
        setSuccess(authHeader())
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const pseudo = user;
        const password = pwd;
        if(!pseudo || !password) {
            setErrMsg("Nom d'utilisateur.trice ou mot de passe manquant");
        } else {
        try {
            const response = await axios.post(`${baseURL}login`,
                JSON.stringify({ pseudo, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            /* if with got a response stocking an access token, we put it in the Local Storage */
            console.log(JSON.stringify(response.data));
            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
              }
              console.log(localStorage.getItem("user"));
            setRole(response.data.roles);
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err.response) {
                setErrMsg("Pas de réponse du serveur");
            } else if (err.response.status === 400) {
                setErrMsg("Nom d'utilisateur.trice ou mot de passe manquant");
            } else if (err.response.status === 401) {
                setErrMsg("Non autorisé.e, Pseudo, Email ou Mot de passe incorrect.");
            } else {
                setErrMsg("Échec de la connexion");
            }
            errRef.current.focus();
        }
    }
    }

    return (
        <div className='LogFormLogIn'>
            {success ? (
                <section>
                    <h1>Vous êtes connecté.e !</h1>
                    <br />
                    <p>
                        <a href="#">Retour à l'Accueil</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Se connecter</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Pseudo :</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Mot de passe :</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Se connecter</button>
                    </form>
                    <p>
                        Pas encore inscrit.e ?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">S'inscrire</a>
                        </span>
                    </p>
                </section>
            )}
        </div>
    )
}

export default LogFormLogIn