import { Input, Segment, Header, Button, Icon, Divider, Label } from 'semantic-ui-react';
import './Home.scss';
import { useState, useEffect } from 'react';
import getData from '../../Middlewares/GetDataMiddleware';
import authHeader from '../../Middlewares/AuthHeader';
import sendDataMiddleware from '../../Middlewares/SendDataMiddleware';

function Home() {
    const [data, setData] = useState(null);
    const [connected, setConnected] = useState(false);
    const [ value, setValue ] = useState('')
    const [answered, setAnswered] = useState(false);
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
            const newData = await getData('question/1');
            if (!newData) {
                setData(null)
            } else {
                setData(newData);

            }
        }
        f();
    }, []);

    function sendAnswer() {
        const trySendAnswer = async () => {
            const delivered = await sendDataMiddleware('question/1/answer', value);
            if (!delivered) {
                console.log("Answer not delivered")
                setAnswered(false)
            } else {
                console.log("Answer delivered")
                setAnswered(true);
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
                <form onSubmit={(event) => {
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
                    />
                </form>
                <Button icon circular className="Home-questions_button">
                    <Icon name="ellipsis horizontal" />
                </Button>
            </Segment>

            <Segment className="Home-questions">
                <p className="Home-questions-title">
                    Question :
                </p>
                <Divider />
                <Label
                    basic
                    className="Home-questions_label"
                >
                    Top réponse
                </Label>
                <p className="Home-questions_answer">
                    User : La réponse du user
                </p>
                <Button icon circular className="Home-questions_button">
                    <Icon name="ellipsis horizontal" />
                </Button>
            </Segment>
        </main>
    )
}

export default Home;