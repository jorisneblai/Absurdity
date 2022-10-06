import { Divider, Icon, Image } from 'semantic-ui-react';
import logo from '../../assets/img/Absurdity_logo-01.png';
import './Footer.scss';

function Footer() {
    return(
        <footer>
            <Divider />
            <Image 
                src={logo} 
                alt="logo titre"
            />
            <Icon name="copyright outline" />
        </footer>
    )
}

export default Footer;