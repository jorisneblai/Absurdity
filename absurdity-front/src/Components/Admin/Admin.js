import { Segment, Header, Input, Message, Button, Icon, Menu } from 'semantic-ui-react';
import './Admin.scss';
import { useState, useEffect } from 'react';
import getData from '../../Middlewares/GetDataMiddleware';
import authHeader from '../../Middlewares/AuthHeader';
import sendDataMiddleware from '../../Middlewares/SendDataMiddleware';
import deleteDataMiddleware from '../../Middlewares/DeleteDataMiddleware';
import patchData from '../../Middlewares/PatchDataMiddleware';
import {useNavigate} from 'react-router-dom';

function Admin() {
    const navigate = useNavigate()
    const [connected, setConnected] = useState(false);
    const [questionsList, setQuestionsList] = useState(null);
    const [createdQuestion, setCreatedQuestion] = useState(null);
    const [value, setValue] = useState('');
    const [patchInput, setPatchInput] = useState(false);
    const [patchValue, setPatchValue] = useState('');

    useEffect(() => {
        const connect = async () => {
            const newData = await authHeader('user');
            if (!newData) {
                setConnected(false);
                navigate('/')
            } else {
                setConnected(true);
            }
        }
        connect();
       
    
    const allQuestions = async () => {
          const newDataQuestions = await getData('admin/questions');
          if (!newDataQuestions) {
              setQuestionsList(null);
          } else {
              setQuestionsList(newDataQuestions);
            console.log(newDataQuestions);
          }
      }
      allQuestions();
  }, [navigate]);

  function createQuestion() {
    const tryCreateQuestion = async () => {
        const delivered = await sendDataMiddleware('questions', value);
        if (!delivered) {
            console.log("Question créée");
            setCreatedQuestion(false);
        } else {
            console.log("Question non créée");
            setCreatedQuestion(true);
            setValue('');
            window.location.reload();
        }
    }
    tryCreateQuestion();
};

function deleteQuestion(path) {
    const questionPath = 'question/' + path;
    const tryDeleteQuestion = async () => {
      const deleted = await deleteDataMiddleware(questionPath);
      if (!deleted) {
          console.log("Question non supprimée");
      } else {
          console.log("Question supprimée");
          window.location.reload();
      }
  }
  tryDeleteQuestion();
  };

  function patchQuestion(path) {
    const questionContent = 'question/' + path;
    const tryPatchQuestion = async () => {
      const patched = await patchData(questionContent, patchValue);
      if (!patched) {
        console.log("Question non modifiée")
      } else {
        console.log("Question modifiée");
        window.location.reload();

      }
    }
    tryPatchQuestion();

  } 

    return (
        <main className="Admin">
       <Segment className="Admin-question">
                <Header className="Admin-question-title" as="h2">
                    Crée ta question :
                </Header>

                {createdQuestion === true ?
      <Message positive>
          <Message.Header>Ta question a bien été créée!</Message.Header>
          <p>
              Tu peux lire Émile Zola ou Picsou Magazine en attendant les réponses
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
          className="Admin-form"
          onSubmit={(event) => {
            event.preventDefault();
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
                    {questionsList.data.map((question) => {
                        return (
                        <li key={question.id}>
                        <Menu borderless>
                        {patchInput !== question.id ? 
                        <Menu.Item position="left">
                        {question.content}
                        </Menu.Item> : <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          patchQuestion(question.id);
                        }}
                                 
                        >
                        <Input
                         action={{ icon: "arrow alternate circle right" }}
                         value={patchValue}
                         onChange={(event) => {
                             setPatchValue(event.target.value);
                         }}
                         fluid
                        >
                        
                        </Input>
                     
                        </form>}

                        <Menu.Item position="right">
                            <Button floated="right" 
                           onClick={() => {
                            setPatchInput(question.id)
                            
                            }}
                            >
                              <Icon name="pencil alternate"/>
                              </Button>
                              
                               <Button floated="right"
                               onClick={() => {
                                deleteQuestion(question.id);
                              }}>
                             <Icon name="trash alternate"
                            /> 
   
                            </Button> 
                            </Menu.Item>
                        </Menu>
                        </li>)
                    })}
                </ul>
            ) : ''}



        </main>
    )
}
export default Admin;