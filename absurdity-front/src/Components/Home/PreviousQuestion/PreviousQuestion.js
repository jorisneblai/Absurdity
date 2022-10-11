import { Segment, Divider, Label, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
function PreviousQuestion( {questionTitle, user, userAnswer, path}) {

    return ( 
        <Segment className="Home-questions">
        <p className="Home-questions-title">
            {questionTitle}
        </p>
        <Divider />
        <Label
            basic
            className="Home-questions_label"
        >
            Top réponse
        </Label>
        <p className="Home-questions_answer">
            {user} : {userAnswer}
        </p>
        <NavLink to={path}>
        <Button icon circular className="Home-questions_button">
            <Icon name="ellipsis horizontal" />
        </Button>
        </NavLink>
    </Segment>
     );
}

PreviousQuestion.propTypes = {
    questionTitle: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    userAnswer: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
}

export default PreviousQuestion;