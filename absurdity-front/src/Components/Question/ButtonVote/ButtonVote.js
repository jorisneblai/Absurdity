import {Button, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';

function ButtonVote({answer, voteAnswer, voteclass}) {
    return (
        <Button
            className={voteclass}
            size='mini'
            onClick={() => {
                voteAnswer(answer.answer_id)
            }}>
            <Icon name='thumbs up' /><p>{answer.vote}</p>
        </Button>
    );
}

ButtonVote.propTypes = {
    answer: PropTypes.object,
    voteclass: PropTypes.string,
    voteAnswer: PropTypes.func
}

export default ButtonVote;