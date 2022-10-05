import { Segment, Header, Input, Message, Button, Icon, Menu } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getData from '../../Middlewares/GetDataMiddleware';
import authHeader from '../../Middlewares/AuthHeader';
import sendDataMiddleware from '../../Middlewares/SendDataMiddleware';
import deleteDataMiddleware from '../../Middlewares/DeleteDataMiddleware';

function Admin() {
    const [connected, setConnected] = useState(false);
    const [questionsList, setQuestionsList] = useState(null);
    const [createdQuestion, setCreatedQuestion] = useState(null);
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const connect = async () => {
            const newData = await authHeader('user');
            if (!newData) {
                setConnected(false);
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
  }, []);

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
          navigate('/admin');
      }
  }
  tryDeleteQuestion();
  };

    return (
        <main className="Admin">
       <Segment className="Home-top_question">
                <Header className="Home-top_question-title" as="h2">
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
          className="Home-form"
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
                        <Menu.Item position="left">
                        {question.content}
                        </Menu.Item>
                        <Menu.Item position="right">
                            <Button floated="right" 
                            
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