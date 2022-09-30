import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authHeader from '../../Middlewares/AuthHeader';
import { Input, Label } from 'semantic-ui-react';
import './Profil.scss';

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
    }, [navigate]);

    function truc() {
        console.log(data.data.pseudo)
    }

if(!data) {
    return (
        <div className="App">Loading...</div>
    )
} else {
    return (  
        <main className="Profil">
        <button onClick={() => { truc() }}>truc</button>
            <h1 className="Profil-title">
                Profil de
            </h1>
            <form className="Profil-inputs">
                <Input className="Pseudo-input" labelPosition='right' type='text' placeholder='Changer de pseudo...'>
                    <Label className='Pseudo-label'>{data ? data.data.pseudo : 'nope'}</Label>
                    <input />
                    <Label icon='pencil alternate'></Label>
                </Input>
                <Input labelPosition='right' type='password' placeholder='Changer de mot de passe...'>
                    <Label className='Pwd-label'>Mot de passe</Label>
                    <input />
                    <Label icon='pencil alternate'></Label>
                </Input>
            </form>
        </main>
    );}
}

export default Profil;