import { Input, Label } from 'semantic-ui-react';
import './Profil.scss';

function Profil() {
    return (  
        <main className="Profil">
            <h1 className="Profil-title">
                Profil de
            </h1>
            <form className="Profil-inputs">
                <Input className="Pseudo-input" labelPosition='right' type='text' placeholder='Changer de pseudo...'>
                    <Label className='Pseudo-label'>Pseudo</Label>
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
    );
}

export default Profil;