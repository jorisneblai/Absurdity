import { useState, useEffect } from "react";
import './LogFormSignUp.scss';
import axios from 'axios';
import authHeader from '../../../Middlewares/AuthHeader';
import { useNavigate } from 'react-router';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

function LogFormSignUp() {


    const baseURL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate()

    const [email, setEmail] = useState('');

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
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


    }, [navigate]);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])


    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pseudo = user;
        const password = pwd;

        const v1 = USER_REGEX.test(pseudo);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const response = await axios.post(`${baseURL}sign-up`,
                JSON.stringify({ pseudo, password, email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(response);
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
        }
    }
    return (
        <div className="LogFormSignUp">
            {success ? (
                <section className="ConfirmSignUpSection">
                    <h1>Vous êtes inscrit.e !</h1>
                    <p>Vérifier votre boîte mail</p>
                    <p>(C'est la procédure standard)</p>
                </section>
            ) : (
                <section>
                    <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>S'inscrire</h1>
                    <div className='Divider-Question'/>
                    <form onSubmit={handleSubmit}>

                        <label className='Input-LogLabel' htmlFor="username">
                            E-Mail
                        </label>
                        <input
                        className='Input-Log'
                            type="email"
                            id="email"
                            autoComplete="off"
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                            required

                        />

                        <label className='Input-LogLabel' htmlFor="username">
                            Pseudo <p className="AdvicesSignUp">(entre 4 et 24 caractères et commençant par une lettre)</p>
                        </label>
                        <input
                        className='Input-Log'
                            type="text"
                            id="username"
                            autoComplete="off"
                            onChange={(event) => setUser(event.target.value)}
                            value={user}
                            required
                        />

                        <label className='Input-LogLabel' htmlFor="password">
                            Mot de passe <p className="AdvicesSignUp">(entre 8 et 24 caractères dont au moins 1 majuscule, 1 minuscule et un chiffre)</p>
                        </label>
                        <input 
                        className='Input-Log'
                            type="password"
                            id="password"
                            onChange={(event) => setPwd(event.target.value)}
                            value={pwd}
                            required
                        />

                        <label className='Input-LogLabel' htmlFor="confirm_pwd">
                            Confirmation du mot de passe
                        </label>
                        <input
                        className='Input-Log'
                            type="password"
                            id="confirm_pwd"
                            onChange={(event) => setMatchPwd(event.target.value)}
                            value={matchPwd}
                            required
                        />

                        <button className='Submit-button' disabled={!validName || !validPwd || !validMatch  ? true : false}>S'inscrire</button>
                    </form>
                </section>
            )}

        </div>
    );
}

export default LogFormSignUp;