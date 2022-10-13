import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authHeader from '../../Middlewares/AuthHeader';
import { Input, Label, Divider, Button, Confirm, Segment } from 'semantic-ui-react';
import './Profil.scss';
import patchData from '../../Middlewares/PatchDataMiddleware';
import DeleteDataMiddleware from '../../Middlewares/DeleteDataMiddleware';
import Cookies from 'universal-cookie';

const pathURL = process.env.REACT_APP_PATH;
const domainURL = process.env.REACT_APP_DOMAIN;

const USER_REGEX = /^[A-z][A-z0-9-_]{3,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

function Profil() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [newPseudo, setNewPseudo] = useState(false);
    const [valuePseudo, setValuePseudo] = useState(undefined);
    const [valuePassword, setValuePassword] = useState(undefined);
    const [openModal, setOpenModal] = useState(false);
    const [validName, setValidName] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
   

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
    }, [navigate]);

    useEffect(() => {
        if (valuePseudo === undefined) {
            setValidName(true);
        }
        else {
            setValidName(USER_REGEX.test(valuePseudo));
        }
    }, [valuePseudo])

    useEffect(() => {
        if (valuePassword === undefined) {
            setValidPassword(true);
        }
        else {
            setValidPassword(PWD_REGEX.test(valuePassword));
        }
    }, [valuePassword])

    function updateProfil(pseudo, password) {
        const updatePseudo = async () => {
            const content = { pseudo, password };
            const modifyPseudo = await patchData('user', content);
            if (!modifyPseudo) {
                console.log('Pseudo or pwd not modified')
                setNewPseudo(false);
            } else {
                console.log('Pseudo or pwd modified')
                setNewPseudo(true);
                console.log(newPseudo);
                console.log(pseudo, password)
                setValuePseudo(undefined);
                setValuePassword(undefined);
                window.location.reload();
            }
        }
        updatePseudo();
    }  
    
    function deleteProfil() {
        const tryDeleteProfil = async () => {
          const deleted = await DeleteDataMiddleware('user');
          if (!deleted) {
              console.log("Profil non supprimée");
          } else {
              console.log("Profil supprimée");
              cookies.remove('user', { path: pathURL ,domain: domainURL});
              //localStorage.removeItem('user');
              navigate('/');
          }
      }
      tryDeleteProfil();
    
    };
        
    
    if(!data) {
        return (
            <div className="App">Loading...</div>
        )
    } else {
        return (  
            <main className="Profil">
            <Segment className='Profil-segment'>
                <h1 className="Profil-title">
                    Profil de {data.data.pseudo}
                </h1>
                <form 
                    className="Profil-inputs"
                    onSubmit={(event) => {
                        event.preventDefault();
                        setOpenModal(true);
                       
                    }}>
                    <Input 
                        className='Pseudo-input' 
                        type='text' 
                        placeholder='Changer de pseudo...' 
                        name="pseudo" 
                        value={valuePseudo}
                        onChange={(event) => {
                            setValuePseudo(event.target.value);
                        }}
                        >
                        <Label className='Pseudo-label'>Pseudo</Label>
                        <input />
                    </Input>
                    <Input 
                        className='Pwd-input' 
                        type='password' 
                        placeholder='Changer de mot de passe...' 
                        name="password" 
                        value={valuePassword}
                        onChange={(event) => {
                            setValuePassword(event.target.value);
                        }}
                        >
                        <Label className='Pwd-label'>Mot de passe</Label>
                        <input />
                    </Input>
                    <Divider />
                    <Button 
                        fluid
                        disabled={!validName || !validPassword ? true : false
                    }
                        onClick={(event) => {
                            setNewPseudo(event.target.value);
                            console.log(newPseudo);
                        }}
                        >
                            Sauvegarder les modifications
                    </Button>
                    <Confirm
                        open={openModal}
                        cancelButton='Mmmm...Finalement non'
                        confirmButton="Allez, changeons tout ça!"
                        onCancel={() => {setOpenModal(false)}}
                        onConfirm={(event) => {
                            event.preventDefault();
                            updateProfil(valuePseudo, valuePassword);
                       }}
                        
                      />
                </form>
                    <Button 
                        circular
                        icon="trash alternate"
                        onClick={() => {
                            deleteProfil();
                        }}
                        >
                            
                    </Button>
                    </Segment>
            </main>
        );}
    }
    
    export default Profil;
    

        
