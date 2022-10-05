import { Container, Header } from 'semantic-ui-react';
import AboutProfil from './AboutProfil/AboutProfil';
import './About.scss';
import joris from '../../assets/img/profil-joris.png';
import nabiha from '../../assets/img/profil-nabiha.png';
import thibault from '../../assets/img/profil-thibault.png';
import nicolas from '../../assets/img/profil-nicolas.png';
import romain from '../../assets/img/profil-romain.png';


function About() {
    return (
        <main className="About-main">
            <Container textAlign='left' className="About-bio">
                <Header as="h1" dividing className="About-bio_title">
                    À propos
                </Header>
                <p className="About-bio_para">
                    Absurdity est une plateforme en ligne faite pour et par la communauté de l'absurde.</p>
                <p>Tous les jours une question vous est posée à laquelle vous pouvez répondre de la manière la plus déjantée possible.</p>
                <p>
                    Vous pouvez voter pour votre réponse préférée mais pas la vôtre, on pense à vos chevilles...</p>
                <p>
                    La meilleure sera sélectionnée et mise en valeur sur notre page d'accueil. Le début de la gloire pour son auteur...
                </p>
                <p>Inscrivez-vous pour votre dose d'absurde quotidienne.</p>

            </Container>

            <Container className="Trombi">
                <AboutProfil/>
                <AboutProfil image={joris} name='Joris' role='Lead Dev Front' description='The dark side of the front' />
                <AboutProfil image={nabiha} name='Nabiha' role='Référente technologies' description='Nabiha ne fait pas le moine' />
                <AboutProfil image={nicolas} name='Nicolas' role='Lead Dev Back' description="à toi jeune entrepreneur, l'introduction en bourse d'absurdity est proche !" />
                <AboutProfil image={romain} name='Romain' role='Scrum Master et Git Master' description="C'est en commençant par tout détruire que nous pouvons reconstruire. [DIEU]" />
                <AboutProfil image={thibault} name='Thibault' role='Product Owner' description="Un jour j'irai vivre en théorie parce qu'en théorie tout se passe bien" />
                <AboutProfil />
            </Container>
        </main>
    )
}

export default About;