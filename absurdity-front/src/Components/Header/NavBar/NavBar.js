import { Menu } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import authHeader from '../../../Middlewares/AuthHeader';

function NavBar() {
    
    function logOut() {
        localStorage.removeItem("user");
    };

    return (
        <nav className="NavBar">
            <Menu borderless>
                {authHeader() ? <Menu.Item 
                    as={NavLink} to="/"
                    icon="sign-out" 
                    onClick={ () => logOut() }
                    >
                </Menu.Item> 
                : ''}
                <Menu.Item 
                    icon="user"
                    as={NavLink} to="/login"
                >
                </Menu.Item>
                <Dropdown icon="bars" item direction="left">
                    <Dropdown.Menu>
                        <Dropdown.Item>Accueil</Dropdown.Item>
                        <Dropdown.Item>Faq</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>
        </nav>
    )
}


export default NavBar;