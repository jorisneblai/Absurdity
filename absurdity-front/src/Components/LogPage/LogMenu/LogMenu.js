import { useState } from "react";
import { Menu } from 'semantic-ui-react';

function LogMenu( props ) {
  const [activeItem, setActiveItem] = useState('Connexion');

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    props.func(name)
  } 
    return (         
      <nav className="LogMenu">
        <Menu tabular fluid widths={2}>
          <Menu.Item
            name='Inscription'
            active={activeItem === 'Inscription'}
            onClick={handleItemClick}
          />
                  <Menu.Item
            name='Connexion'
            active={activeItem === 'Connexion'}
            onClick={handleItemClick}
          />
      </Menu>
      </nav> 
    );
}


export default LogMenu;