import { Menu } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import authHeader from '../../../Middlewares/AuthHeader';
import { useState, useEffect } from 'react';
import isLoggedMiddleware from '../../../Middlewares/isLoggedMiddleware';

function NavBar() {
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const f = async () => {
            const newData = await authHeader('checkuser');
            if (!newData) {
                setSuccess(false);
                console.log("utilisateur non connecté")
            } else {
                console.log("rendu fait et connecté")
                setSuccess(newData);
            }
        }
        f();
    }, []);

    function logOut() {
        localStorage.removeItem("user");
        window.location.reload();
    };

    return (
        <nav className="NavBar">
            <Menu borderless>
                {isLoggedMiddleware() ? <Menu.Item
                    as={NavLink} to="/"
                    icon="sign-out"
                    onClick={() => logOut()}
                >
                </Menu.Item>
                    : ''}
                {isLoggedMiddleware() ? <Menu.Item
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