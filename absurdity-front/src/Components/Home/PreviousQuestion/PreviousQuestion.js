import { Segment, Divider, Label, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './PreviousQuestion.scss';

function PreviousQuestion( {questionTitle, user, userAnswer, path}) {

    return ( 
        <Segment className="Home-questions">
        <p className="Home-questions_title">
            {questionTitle}
        </p>
        <div className='Divider-Question'/>
        <div className='Previous-question_header'>
        <Icon
            circular
            className="Home-questions_label"
            name="star outline"
        >
        </Icon>
        <p className="Home-questions_answer">
            {user} : 
        </p>
        </div>
        <p className='Previous-question_answer'>{userAnswer}</p>
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