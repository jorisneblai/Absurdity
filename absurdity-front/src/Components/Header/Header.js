import Logo from '../../assets/img/Absurdity_logo.svg';
import { Menu } from 'semantic-ui-react';
import NavBar from './NavBar/NavBar';

function Header() {
    return (
        <Menu className="Header" borderless>
            <Menu.Item position="left">
            <img 
                className="Header-logo" src={Logo} alt="Absurdity logo">
            </img>
            </Menu.Item>
            <Menu.Item position="right">
                <NavBar />
            </Menu.Item>
        </Menu>
    )
}

export default Header;