import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authHeader from '../../Middlewares/AuthHeader';
import { Input, Label, Divider, Button } from 'semantic-ui-react';
import './Profil.scss';
import patchData from '../../Middlewares/PatchDataMiddleware';
import DeleteDataMiddleware from '../../Middlewares/DeleteDataMiddleware';

function Profil() {

    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [newPseudo, setNewPseudo] = useState(false);
    const [valuePseudo, setValuePseudo] = useState('');
    const [valuePassword, setValuePassword] = useState('');
   

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
                setValuePseudo('');
                setValuePassword('');
                window.location.reload();
            }
        }
        updatePseudo();
        console.log(newPseudo);
    }  
    
    function deleteProfil() {
        const tryDeleteProfil = async () => {
          const deleted = await DeleteDataMiddleware('user');
          if (!deleted) {
              console.log("Profil non supprimée");
          } else {
              console.log("Profil supprimée");
              localStorage.removeItem('user');
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
                <h1 className="Profil-title">
                    Profil de {data.data.pseudo}
                </h1>
                <form 
                    className="Profil-inputs"
                    onSubmit={(event) => {
                        event.preventDefault();
                        const data = new FormData(event.target);
                        console.log(data.get("password"));
                        updateProfil(data.get("pseudo"), data.get("password"));
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
                        onChange={(event) => {
                            setNewPseudo(event.target.value);
                        }}
                        >
                            Sauvegarder les modifications
                    </Button>
                </form>
                    <Button 
                        circular
                        icon="trash alternate"
                        onClick={() => {
                            deleteProfil();
                        }}
                        >
                            
                    </Button>
            </main>
        );}
    }
    
    export default Profil;
    

        
