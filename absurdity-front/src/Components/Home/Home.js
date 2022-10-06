import { Input, Segment, Header, Button, Icon, Message } from 'semantic-ui-react';
import './Home.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getData from '../../Middlewares/GetDataMiddleware';
import authHeader from '../../Middlewares/AuthHeader';
import sendDataMiddleware from '../../Middlewares/SendDataMiddleware';
import PreviousQuestion from './PreviousQuestion/PreviousQuestion';

function Home() {
    const [data, setData] = useState(null);
    const [connected, setConnected] = useState(false);
    const [value, setValue] = useState('')
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
            <Header className="Home-title" as="h1">
                Absurdity, des vannes à toutes heures. L'absurdité dans toute sa Chandeleur.
            </Header>
            <Segment className="Home-top_question">
                <Header className="Home-top_question-title" as="h2">
                    Question du jour :
                </Header>
                <p className="Home-top_question-para">
                    {!data ? "Loading..." : data.data.content}
                </p>
                {answered === true ?
                    <Message positive>
                        <Message.Header>Votre réponse a bien été envoyée!</Message.Header>
                        <p>
                            On sait pas où, mais...elle a été envoyée...
                        </p>
                    </Message>
                    : ''
                }
                {answered === false && connected ?
                    <Message negative >
                        <Message.Header>C'était presque ça !</Message.Header>
                        <p>mais, c'est pas ça.</p>
                    </Message>
                    : ''
                }
                {answered === false && !connected ?
                    <Message negative >
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

                        <Input
                            action={{ icon: "arrow alternate circle right" }}
                            placeholder='Écrivez votre réponse...'
                            disabled={connected ? false : true}
                            value={value}
                            onChange={(event) => {
                                setValue(event.target.value);
                            }}
                            fluid
                        />
                    </form>
                    : ''
                }
                {data ?
                <Button icon circular className="Home-questions_button" as='a' href={`/question/${data.data.id}`}>
                    <Icon name="ellipsis horizontal" />
                </Button>
                : <Button icon circular className="Home-questions_button" as='a'>
                    <Icon name="ellipsis horizontal" />
                </Button>
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