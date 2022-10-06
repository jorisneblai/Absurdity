import './NavBar.scss';
import { Menu, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import authHeader from '../../../Middlewares/AuthHeader';
import { useEffect, useState } from 'react';
import isLoggedMiddleware from '../../../Middlewares/isLoggedMiddleware';
import Cookies from 'universal-cookie';

function NavBar() {
    const [isLogged, setIsLogged] = useState(false);
    const cookies = new Cookies();

    useEffect(() => {
        const f = async () => {
            const newData = await authHeader('user');
            if (!newData) {
                setIsLogged(false)
            } else {
                setIsLogged(true)
            }
        }
        f();

    }, [isLogged]);



    function logOut() {
        cookies.remove('user');
        window.location.reload();
    };

    return (
        <nav className="NavBar">
            <Menu id='NavBar-Menu'>
                {isLoggedMiddleware() ? <Menu.Item id='NavBar-ButtonProfil'
                    icon="user"
                    as={NavLink} to="/profil"
                >
                </Menu.Item>
                    :
                    <Menu.Item
                        as={NavLink} to="/login"
                    >Se connecter
                    </Menu.Item>}
                <Dropdown icon="bars" item direction="left" id='NavBar-ButtonDropdown'>
                    <Dropdown.Menu>
                        <Dropdown.Item as={NavLink} to="/">Accueil</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/about">À propos</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/cgu">CGU</Dropdown.Item>
                        {isLoggedMiddleware() 
                            ? <Dropdown.Item
                                id='LogOutButton'
                                onClick={() => logOut()}
                            >
                                Se déconnecter
                            </Dropdown.Item>
                            : ''}
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>
        </nav>
    )
}


export default NavBar;