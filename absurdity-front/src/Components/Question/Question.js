import { Segment, Divider, Button, Icon } from 'semantic-ui-react';
import './Question.scss';
import { useEffect, useState } from 'react';
import authHeader from '../../Middlewares/AuthHeader';
import getData from '../../Middlewares/GetDataMiddleware';
import sendDataMiddleware from '../../Middlewares/SendDataMiddleware';
import { useLocation } from 'react-router-dom';
import ButtonVote from './ButtonVote/ButtonVote';

function Question() {
    const location = useLocation();

    const [data, setData] = useState(null);
    const [connected, setConnected] = useState(false);
    const [answeredResponse, setAnsweredResponse] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const connect = async () => {
            const newData = await authHeader('user');
            if (!newData) {
                setConnected(false)
            } else {
                setConnected(true);
            }
        }
        connect();

        const alreadyVoted = async () => {
            const path = location.pathname.slice(10);
            const newData = await getData(`alreadyvoted/${path}`);
            if (!newData) {
                console.log('pas voté')
            } else {
                setAnsweredResponse(newData.data.answer_id)
            }
        }
        alreadyVoted();

        const f = async () => {
            const path = location.pathname.slice(10);
            const newData = await getData(`question/${path}/answers`)
            if (!newData) {
                setData(null)
            } else {
                console.log('des données', newData)
                setData(newData);
            }
        }
        f();



    }, [location]);



    function voteAnswer(path, Id) {

        const connect = async () => {
            const content = {};
            content.questionId = Id;
            const newData = await sendDataMiddleware(`question/${path}/voted`, content);
            if (!newData) {
                console.log('déjà voté');
            } else {
                const f = async () => {
                    const pathAnswer = location.pathname.slice(10);
                    const newData = await getData(`question/${pathAnswer}/answers`)
                    if (!newData) {
                        setData(null)
                    } else {
                        setData(newData);
                        window.location.reload();
                    }
                }
                f();
            }
        }
        connect();
    }

    function deVoteAnswer(path, Id) {

        const connect = async () => {
            const content = {};
            content.questionId = Id;
            const newData = await sendDataMiddleware(`question/${path}/unvoted`, content);
            if (!newData) {
                console.log('déjà voté')
            } else {
                console.log(newData)
                const f = async () => {
                    const pathAnswer = location.pathname.slice(10);
                    const newData = await getData(`question/${pathAnswer}/answers`)
                    if (!newData) {
                        setData(null)
                    } else {
                        setData(newData);
                        window.location.reload();
                    }
                }
                f();
            }
        }
        connect();
    }

    return (
        <Segment className="Questions">
            <p className="Question-title">
                {!data ? '' : data.data.question}
            </p>
            <div className='Divider-Question' />

            {!data ? '' : (
                <ul>{!data.data.list_answers[0].answer ? '' :
                    data.data.list_answers.map((answer) => {
                        return (
                            <li className="Question-answer" key={answer.answer_id}>
                            <div className='Previous-question_header'>
                                    <Icon
                                        circular
                                        className="Home-questions_label"
                                        name="star outline"
                                    >
                                    </Icon>
                            <p className="Home-questions_answer">
                                        {answer.pseudo} :
                                    </p>
                                    </div>

                                <p className='Question-answer_answer'>{answer.answer}</p>
                                {connected && answer.answer_id === answeredResponse
                                    ? <ButtonVote answer={answer} voteclass='Question-answer_Button voted' voteAnswer={(answerId) => {
                                        deVoteAnswer(answerId, data.data.question_id);
                                    }} />
                                    : connected && answeredResponse !== null
                                        ? <Button
                                            className='Question-answer_Button unvoted'
                                            size='mini'
                                            disabled>
                                            <Icon name='thumbs up' /><p>{answer.vote}</p>
                                        </Button>
                                        : ''

                                }

                                {connected && answeredResponse === null
                                    ? <ButtonVote answer={answer} voteclass='Question-answer_Button unvoted' voteAnswer={(answerId) => {
                                        voteAnswer(answerId, data.data.question_id);
                                    }} />
                                    : ''
                                }
                                {!connected
                                    ? <Button
                                            className='Question-answer_Button unvoted'
                                            size='mini'
                                            disabled>
                                            <Icon name='thumbs up' /><p>{answer.vote}</p>
                                        </Button>
                                    : ''
                                }

                                <Divider fitted />
                            </li>
                        )
                    })}
                </ul>
            )}

        </Segment>
    );
}

export default Question;