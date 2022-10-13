import { useState, useEffect } from 'react';
import './LogFormLogIn.scss';
import axios from 'axios';
import authHeader from '../../../Middlewares/AuthHeader';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';
import { Modal, Button } from 'semantic-ui-react';
const pathURL = process.env.REACT_APP_PATH;
const domainURL = process.env.REACT_APP_DOMAIN;

const LogFormLogIn = () => {

    const baseURL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const cookies = new Cookies();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [forgottenMail, setForgottenMail] = useState('');
    const [success, setSuccess] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    /* This useEffect have a navigate dependency so it can use useNavigate Hook */
    useEffect(() => {
        window.scrollTo(0, 0);
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
        setErrMsg('');
    }, [user, pwd])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const pseudo = user;
        const password = pwd;
        if (!pseudo || !password) {
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
                if (response.data) {
                    cookies.set('user', response.data.data.token, { path: pathURL, domain: domainURL });
                    // localStorage.setItem("user", response.data.data.token);
                }
                setUser('');
                setPwd('');
                setSuccess(true);
                navigate('/')
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
            }
        }
    }

    function sendMail(mail) {

        const content = {mail};
         axios.post(`${baseURL}retrieve/password`,
                     JSON.stringify({ content }),
                     {
                         headers: { 'Content-Type': 'application/json' },
                     }
         );
    }

    return (
        <div className='LogFormLogIn'>
            {success ? (
                <section>
                    <h1>Vous êtes connecté.e !</h1>
                </section>
            ) : (
                <section>
                    <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Se connecter</h1>
                    <div className='Divider-Question' />
                    <form onSubmit={handleSubmit}>
                        <label className='Input-LogLabel' htmlFor="username">Pseudo</label>
                        <input
                            className='Input-Log'
                            type="text"
                            id="username"

                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label className='Input-LogLabel' htmlFor="password">Mot de passe</label>
                        <input
                            className='Input-Log'
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <p id="Forgotten-password" onClick={() => setOpenModal(true)}>mot de passe oublié ?</p>
                        <Modal
                            open={openModal}

                        ><div id="block_modal"><label>Adresse mail</label><input value={forgottenMail} type="email" onChange={(event) => setForgottenMail(event.target.value)}
                            placeholder='Entrez votre adresse mail'
                            name="forgottenmail"
                            autoComplete="off" /></div>

                            <Modal.Actions>
                                <Button color='black' onClick={() => setOpenModal(false)}>
                                    Nan c'est bon je m'en suis souvenu
                                </Button>
                                <Button
                                    id='validModalButton'
                                    content="Mon MDP STP"
                                    labelPosition='right'
                                    icon='checkmark'
                                    onClick={() => sendMail(forgottenMail)}
                                    positive
                                />
                            </Modal.Actions>

                        </Modal>
                        <button className='Submit-button' disabled={pwd && user !== '' ? false : true}>
                            Se connecter
                        </button>
                    </form>
                </section>
            )}
        </div>
    )
}

export default LogFormLogIn