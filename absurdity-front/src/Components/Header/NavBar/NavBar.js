import './NavBar.scss';
import { Menu, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import authHeader from '../../../Middlewares/AuthHeader';
import { useEffect } from 'react';
import isLoggedMiddleware from '../../../Middlewares/isLoggedMiddleware';
import Cookies from 'universal-cookie';

function NavBar() {
    const cookies = new Cookies();

    useEffect(() => {
        const f = async () => {
            const newData = await authHeader('user');
            if (!newData) {
                return
            } else {
                return
            }
        }
        f();
    }, []);

    function logOut() {
        cookies.remove('user');
        //localStorage.removeItem("user");
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
                    <Menu.Item id='NavBar-ButtonLogIn'
                        as={NavLink} to="/login"
                    >Se connecter
                    </Menu.Item>}
                <Dropdown icon="bars" item direction="left" id='NavBar-ButtonDropdown'>
                    <Dropdown.Menu className='DropdownMenu'>
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