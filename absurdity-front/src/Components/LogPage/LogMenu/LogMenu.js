import { useState } from "react";
import { Menu } from 'semantic-ui-react';

function LogMenu(props) {
  const [activeItem, setActiveItem] = useState('Connexion');

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    props.func(name)
  }
  return (
    <nav className="LogMenu">
      <Menu tabular fluid widths={2}>
        <Menu.Item
          id="Button-inscription"
          name='Inscription'
          active={activeItem === 'Inscription'}
          onClick={handleItemClick}
        />
        <Menu.Item
          id="Button-connexion"
          name='Connexion'
          active={activeItem === 'Connexion'}
          onClick={handleItemClick}
        />
      </Menu>
    </nav>
  );
}


export default LogMenu;