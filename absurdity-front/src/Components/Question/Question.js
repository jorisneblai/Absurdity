import { Segment, Divider, Label, Icon } from 'semantic-ui-react';
import './Question.scss';
import { useEffect, useState } from 'react';
import authHeader from '../../Middlewares/AuthHeader';
import getData from '../../Middlewares/GetDataMiddleware';

function Question() {

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
            const newData = await getData('question/1/answers')
            if (!newData) {
                setData(null)
            } else {
                setData(newData);
                console.log(newData)
            }
        }
        f();
    }, []);

    return (
        <Segment className="Questions">
            <p className="Questions-title">
                {!data ? '' : data.data.questions}
            </p>
            <Divider />
            <Label
                basic
                className="Questions_label"
            >
                Top réponse
            </Label>

            {!data ? '' : (
                <ul>
                    {data.data.answers.map((value, key) => {

                        return (
                        <li key={key}>
                         {value}  
                         <Divider fitted />
                         {connected 
                         ? <><Icon name='thumbs up'/>{data.data.vote_count[key]}</>
                         : ''
                         }
                        </li>        
                        )
                    })}
                </ul>
            )}

        </Segment>
    );
}

export default Question;