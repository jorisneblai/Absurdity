import { Input, Segment, Header, Button, Icon, Divider, Label } from 'semantic-ui-react';
import './Home.scss';

function Home() {
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
                    La question du jour ?
                </p>
                <Input 
                    action={{ icon: "arrow alternate circle right" }}
                    placeholder='Écrivez votre réponse...' 
                />
                <Button icon circular className="Home-questions_button">
                    <Icon name="ellipsis horizontal" />
                </Button>
            </Segment>

            <Segment className="Home-questions">
                <p className="Home-questions-title">
                    Question :
                </p>
                <Divider/>
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