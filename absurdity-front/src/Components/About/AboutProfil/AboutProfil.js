import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';

function AboutProfil({image, name, role, description, idromain}) {
    return ( 
        <>
        <Card id={idromain}>
        <Image src={image} wrapped ui={false} />
        <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>
                <span className='date'>{role}</span>
            </Card.Meta>
            <Card.Description>
                {description}
            </Card.Description>
        </Card.Content>
    </Card>
    </>
     );
}

AboutProfil.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    description: PropTypes.string,
    idromain: PropTypes.string
}

export default AboutProfil;