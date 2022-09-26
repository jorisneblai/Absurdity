import { useRef, useState, useEffect } from 'react';
import './LogFormLogIn.scss';
import axios from 'axios';

const LogFormLogIn = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [role, setRole] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://nicolas-defranould.vpnuser.lan:3000/login",
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(JSON.stringify(response.data));
            setRole(response.data.roles);
            setUser('');
            setPwd('');
            setSuccess(true);
            console.log("role:", role);
        } catch (err) {
            if (!err.response) {
                setErrMsg("Pas de réponse du serveur");
            } else if (err.response.status === 400) {
                setErrMsg("Nom d'utilisateur.trice ou mot de passe manquant");
            } else if (err.response.status === 401) {
                setErrMsg("Non autorisé.e");
            } else {
                setErrMsg("Échec de la connexion");
            }
            errRef.current.focus();
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