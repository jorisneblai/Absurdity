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
                Il n'y a pas de question idiote, que des r??ponses absurdes.
            </Header>
            <Segment className="Home-top_question">
                <Header className="Home-top_question-title" as="h2">
                    Question du jour
                    <div className='Divider-Question'/>
                </Header>
                <p className="Home-top_question-para">
                    {!data ? "Chargement des absurdit??s..." : data.data.content}
                </p>
                {answered === true ?
                    <Message positive className='Home-PositiveMessage'>
                        <Message.Header>Votre r??ponse a bien ??t?? envoy??e!</Message.Header>
                        <p>
                            On sait pas o??, mais...elle a ??t?? envoy??e...
                        </p>
                    </Message>
                    : ''
                }
                {answered === false && connected ?
                    <Message negative className='Home-PositiveMessage' >
                        <Message.Header>Euh, attends t'as pas d??j?? r??pondu toi ?</Message.Header>
                        <p>Parce que vous ressemblez vachement ?? quelqu'un qui aurait d??j?? r??pondu quand m??me.</p>
                    </Message>
                    : ''
                }
                {answered === false && !connected ?
                    <Message negative className='Home-PositiveMessage' >
                        <Message.Header>Hop, hop, hop, papier du v??hicule</Message.Header>
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
                            placeholder='Pour r??pondre, connectez-vous...'
                            disabled={connected ? false : true}
                            value={value}
                            onChange={(event) => {
                                setValue(event.target.value);
                            }}
                            maxLength="250"
                        />
                        <Button icon='angle right' className={connected ?"TextArea-Disabled" : "TextArea-Send" } disabled={connected && validWhitespace && validLength ? false : true}></Button>
                            
                        
                    </form>
                    : ''
                }
                {data ?
                <Button title='Voir les super r??ponses' icon circular className="Home-questions_button" as='a' href={`/question/${data.data.id}`}>
                    <Icon name="comment" />
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