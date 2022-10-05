import { Segment, Divider, Label, Icon, Button } from 'semantic-ui-react';
import './Question.scss';
import { useEffect, useState } from 'react';
import authHeader from '../../Middlewares/AuthHeader';
import getData from '../../Middlewares/GetDataMiddleware';
import { useLocation } from 'react-router-dom';

function Question() {
    const location = useLocation();

    const [data, setData] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {

        const connect = async () => {
            const newData = await authHeader('user');
            if (!newData) {
                setConnected(false)
            } else {
                setConnected(true);

            }
        }
        connect();
        const f = async () => {
            const path = location.pathname.slice(10);
            const newData = await getData(`question/${path}/answers`)
            if (!newData) {
                setData(null)
            } else {
                setData(newData);
            }
        }
        f();
    }, [location]);

    return (
        <Segment className="Questions">
            <p className="Question-title">
                {!data ? '' : data.data.question}
            </p>
            <Divider />
            <Label
                basic
                className="Questions-label"
            >
                Top réponses
                
            </Label>

            {!data ? '' : (
                <ul>
                    {data.data.list_answers.map((answer) => {

                        return (
                            <li className="Question-answer" key={answer.answer_id}>
                                <p><strong>{answer.pseudo}:</strong></p>
                                <p>{answer.answer}</p>
                                {connected
                                    ? <Button className='Question-answer_Button' size='mini'>
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