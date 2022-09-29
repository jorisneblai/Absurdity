import { Menu } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import { NavLink, useNavigate } from 'react-router-dom';
import authHeader from '../../../Middlewares/AuthHeader';

function NavBar() {
    const navigate = useNavigate();
    function logOut() {
        localStorage.removeItem("user");
        navigate('/');
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
                {authHeader() ? <Menu.Item 
                    icon="user"
                    as={NavLink} to="/profil"
                >
                </Menu.Item>
                :
                <Menu.Item 
                    icon="user"
                    as={NavLink} to="/login"
                >
                </Menu.Item>}
                <Dropdown icon="bars" item direction="left">
                    <Dropdown.Menu>
                        <Dropdown.Item as={NavLink} to="/">Accueil</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/about">À propos</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/cgu">CGU</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>
        </nav>
    )
}


export default NavBar;