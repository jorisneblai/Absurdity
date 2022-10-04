import React from 'react';
import { Segment, Header, Input, Message, Button, Icon } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import getData from '../../Middlewares/GetDataMiddleware';
import authHeader from '../../Middlewares/AuthHeader';
import sendDataMiddleware from '../../Middlewares/SendDataMiddleware';
import DeleteDataMiddleware from '../../Middlewares/DeleteDataMiddleware';


function Admin() {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false);
  const [value, setValue] = useState('')
  const [createdQuestion, setCreatedQuestion] = useState(null);
  const [questionsList, setQuestionsList] = useState(null);


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
          const newData = await getData('questions');
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


    function createQuestion() {
        const tryCreateQuestion = async () => {
            const delivered = await sendDataMiddleware('/questions', value);
            if (!delivered) {
                console.log("Votre question a bien été créée")
                setCreatedQuestion(false)
            } else {
                console.log("Votre question n'a pas été créée")
                setCreatedQuestion(true);
                setValue('');
            }
        }
        tryCreateQuestion()
    }



    return (
      <main className="Admin">
       <Segment className="Home-top_question">
                <Header className="Home-top_question-title" as="h2">
                    Créez votre question :
                </Header>
  {createdQuestion === true ?
      <Message positive>
          <Message.Header>Votre question a bien été créée!</Message.Header>
          <p>
              Master of creation...
          </p>
      </Message>
      : ''
  }
 
  {createdQuestion === false && !connected ?
      <Message negative >
          <Message.Header>Ta question n'a pas été créée</Message.Header>
          <p>Retente ta chance</p>
      </Message>
      : ''
  }
  {createdQuestion === null ?
      <form
          className="Home-form"
          onSubmit={(event) => {
              createQuestion();
          }}>

          <Input
              action={{ icon: "arrow alternate circle right" }}
              placeholder='Écrivez votre question...'
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
  </Segment>


  {questionsList ? (
                <ul>
                    {questionsList.data.map((value) => {
                        return (
                        <li key={value.questions}>
                        <Segment>
                         Question
                            <Button>
                              <Icon name="pencil alternate"/>
                              </Button>
                              <Button>
                              <Icon name="trash alternate"/>
                            </Button>
                        </Segment>
                        </li>)
                    })}
                </ul>
            ) : ''}


  </main>
 )}






export default Admin;