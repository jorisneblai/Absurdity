import LogFormLogIn from "./LogFormLogIn/LogFormLogIn";
import LogFormSignUp from "./LogFormSignUp/LogFormSignUp";
import LogMenu from "./LogMenu/LogMenu";
import { useState } from "react";
import './LogPage.scss';

function LogPage(chosenPage) {
  const [logMenu, setLogMenu] = useState('Inscription');

  const pull_data = (data) => {
    setLogMenu(data);
  }

  return ( 
    <section className="LogPage">
      <LogMenu func={pull_data}/>
      {logMenu === 'Inscription' ? <LogFormSignUp/> : ''}
      {logMenu === 'Connexion' ? <LogFormLogIn/> : ''}
      
    </section>
  );
}

export default LogPage;