import React from 'react';
import { Input, Segment, Icon, Button } from 'semantic-ui-react';


function Admin() {
    return ( 
       <>
        <h1>Créez votre question</h1>
        <Input action='Valider' placeholder='Écrivez votre question' />

        <Segment>Quelle est la moitié de tout?
      <Button icon>
        <Icon name='pencil alternate' labelPosition='left' />
      </Button>
      <Button icon>
        <Icon name='trash alternate' labelPosition='right' />
      </Button>
        </Segment>
    
      </>
     );
}

export default Admin;