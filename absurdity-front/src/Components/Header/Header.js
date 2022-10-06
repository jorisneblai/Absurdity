import './Header.scss';

import Logo from '../../assets/img/Absurdity_logo.svg';
import { Menu } from 'semantic-ui-react';
import NavBar from './NavBar/NavBar';
import { NavLink } from 'react-router-dom';


function Header() {
    return (<>
        <Menu fixed='top' className="Header" borderless >
            <Menu.Item className='Header-Logo' position="left" as={NavLink} to="/">
            <img
                className="Header-logo"
                src={Logo}
                alt="Absurdity logo">
            </img>
            
                </Menu.Item>

            <Menu.Item position="right">
                <NavBar />
            </Menu.Item>
            
        </Menu>
        <div id='Divider-Header'></div>
        </>
    )
}

export default Header;