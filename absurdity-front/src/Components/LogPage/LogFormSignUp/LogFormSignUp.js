import { useRef, useState, useEffect } from "react";
import './LogFormSignUp.scss';
import axios from 'axios';

function LogFormSignUp(  ) {
    const userRef = useRef();
    const errRef = useRef();
    const baseURL = process.env.REACT_APP_API_URL;

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])


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
                    <p>
                        <a href="#">S'inscrire</a>
                    </p>
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
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
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
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        {/* <p id="uidnote" className={userFocus && user ? "instructions" : "offscreen"}>
                            <Icon name="info"></Icon>
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p> */}


                        <label htmlFor="password">
                            Mot de passe :
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(event) => setPwd(event.target.value)}
                            value={pwd}
                            required
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        {/* <p id="pwdnote" className={pwdFocus ? "instructions" : "offscreen"}>
                            <Icon name="info"></Icon>
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p> */}


                        <label htmlFor="confirm_pwd">
                            Confirmation du mot de passe :
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(event) => setMatchPwd(event.target.value)}
                            value={matchPwd}
                            required
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        {/* <p id="confirmnote" className={matchFocus ? "instructions" : "offscreen"}>
                            <Icon name="info"></Icon>  
                            Must match the first password input field.
                        </p> */}

                        <button>S'inscrire</button>
                    </form>
                </section>
            )}
        
        </div>
     );
}

export default LogFormSignUp;