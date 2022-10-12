import { TextArea, Segment, Header, Button, Icon, Message } from 'semantic-ui-react';
import './Home.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getData from '../../Middlewares/GetDataMiddleware';
import authHeader from '../../Middlewares/AuthHeader';
import sendDataMiddleware from '../../Middlewares/SendDataMiddleware';
import PreviousQuestion from './PreviousQuestion/PreviousQuestion';

const WHITESPACE_REGEX = /.*\S.*/;
const LENGTH_REGEX = /^.{1,250}$/


function Home() {
    const [data, setData] = useState(null);
    const [connected, setConnected] = useState(false);
    const [value, setValue] = useState('');
    const [validWhitespace, setValidWhitespace] = useState(false);
    const [validLength, setValidLength] = useState(false);
    const [answered, setAnswered] = useState(null);
    const [questionsList, setQuestionsList] = useState(null);
    /*
    topQuestion is a state use to get the id of the question of the day, it will start with a useEffect request to get it with getData middleware on a specific road, then the other request will have access to the good top question

    const [ topQuestion, setTopQuestion ] = useState(null);
    */
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
            const newData = await getData('dailyquestion');
            if (!newData) {
                setData(null)
            } else {
                setData(newData);
            }
        }
        f();
        const allQuestions = async () => {
            const newData = await getData('questions');
            if (!newData) {
                setQuestionsList(null)
            } else {
                setQuestionsList(newData);
            }
        }
        allQuestions();
    }, []);

    useEffect(() => {
        setValidWhitespace(WHITESPACE_REGEX.test(value));
        setValidLength(LENGTH_REGEX.test(value));
    }, [value])

    function sendAnswer() {
        const trySendAnswer = async () => {
            const delivered = await sendDataMiddleware(`question/${data.data.id}/answer`, value);
            if (!delivered) {
                console.log("Answer not delivered")
                setAnswered(false)
            } else {
                console.log("Answer delivered")
                setAnswered(true);
                setValue('');
            }
        }
        trySendAnswer()
    }

    return (
        <main className="Home">
            <Header className="Home-title">
                Absurdity, des vannes à toutes heures. L'absurdité dans toute sa Chandeleur.
            </Header>
            <Segment className="Home-top_question">
                <Header className="Home-top_question-title" as="h2">
                    Question du jour
                    <div className='Divider-Question'/>
                </Header>
                <p className="Home-top_question-para">
                    {!data ? "Loading..." : data.data.content}
                </p>
                {answered === true ?
                    <Message positive className='Home-PositiveMessage'>
                        <Message.Header>Votre réponse a bien été envoyée!</Message.Header>
                        <p>
                            On sait pas où, mais...elle a été envoyée...
                        </p>
                    </Message>
                    : ''
                }
                {answered === false && connected ?
                    <Message negative className='Home-PositiveMessage' >
                        <Message.Header>Euh, attends t'as pas déjà répondu toi ?</Message.Header>
                        <p>Parce que vous ressemblez vachement à quelqu'un qui aurait déjà répondu quand même.</p>
                    </Message>
                    : ''
                }
                {answered === false && !connected ?
                    <Message negative className='Home-PositiveMessage' >
                        <Message.Header>Hop, hop, hop, papier du véhicule</Message.Header>
                        <p>(ou un pot de vin)</p>
                        <Link className='Link-Login' to='login'>Ici pour faire la carte grise</Link>
                    </Message>
                    : ''
                }
                {answered === null ?
                    <form

                        className="Home-form"
                        onSubmit={(event) => {
                            event.preventDefault();
                            sendAnswer();
                        }}>

                        <TextArea className="TextArea-Home"
                            action={{ icon: "arrow alternate circle right" }}
                            placeholder='Pour répondre, connectez-vous...'
                            disabled={connected ? false : true}
                            value={value}
                            onChange={(event) => {
                                setValue(event.target.value);
                            }}
                            maxLength="250"
                        />
                        <Button icon='angle right' className='TextArea-Send' disabled={connected && validWhitespace && validLength ? false : true}></Button>
                            
                        
                    </form>
                    : ''
                }
                {data ?
                <Button title='Voir les réponses' icon circular className="Home-questions_button" as='a' href={`/question/${data.data.id}`}>
                    <Icon name="ellipsis horizontal" />
                </Button>
                : ''
                }
            </Segment>

            {questionsList? (
                <ul>
                    {questionsList.data.map((value) => {
                        return (
                        <li key={value.question_id}>
                        <PreviousQuestion user={value.list_answers[0].pseudo} questionTitle={value.question} userAnswer={value.list_answers[0].answer} path={`/question/${value.question_id}`} />
                        </li>)
                    })}
                </ul>
            ) : ''}


        </main>
    )
}

export default Home;