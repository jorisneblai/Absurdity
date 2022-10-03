import { Container, Header } from 'semantic-ui-react';
import AboutProfil from './AboutProfil/AboutProfil';
import './About.scss';
import joris from '../../assets/img/juice.png';
import nabiha from '../../assets/img/profil-nabiha.jpg';
import thibault from '../../assets/img/profil-thibault.png';


function About() {
    return (
        <main className="About-main">
            <Container textAlign='left' className="About-bio">
                <Header as="h1" className="About-bio_title">
                    À propos
                </Header>
                <p className="About-bio_para">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae luctus leo. Donec sodales non neque ac consequat. Cras vitae ornare ligula. Proin ut nunc quis nibh varius sagittis in ut leo. In mollis euismod auctor. Nullam in maximus velit. Cras ullamcorper purus quis ante tincidunt pulvinar. Mauris eu mattis magna. Proin tristique erat vel eleifend condimentum. Nunc non dui vehicula, volutpat elit eget, posuere ipsum. Integer ante turpis, rhoncus et odio eu, varius venenatis tortor. Morbi hendrerit tellus elit, nec scelerisque metus ullamcorper sed. Proin rhoncus massa mi, at eleifend massa vestibulum eget. Aliquam vitae tortor ligula. Pellentesque iaculis orci ut enim consequat tincidunt. Donec in metus quis tortor volutpat ullamcorper eu placerat elit.

                Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc ut magna elementum, dignissim nunc id, pharetra lacus. Donec commodo libero sit amet eros lacinia commodo. Ut vulputate sapien nec nunc eleifend, eu posuere nibh scelerisque. Cras ut lacus ultrices, pharetra nibh sit amet, sagittis nisl. Integer odio tortor, commodo sit amet posuere sit amet, feugiat eu leo. Morbi tristique porta sodales.

                Aenean facilisis lacus vitae ipsum venenatis, vitae condimentum urna blandit. Nulla ac erat ex. Vivamus scelerisque erat in tempus varius. Vivamus facilisis commodo nulla, condimentum varius elit cursus in. Aenean bibendum ex vel tellus pulvinar rutrum. Sed varius ligula nulla. Suspendisse dignissim ex ac mi pretium porta. Sed vitae enim eu sem egestas pharetra. Praesent elementum non turpis ac finibus. Sed auctor arcu id felis gravida, sit amet facilisis ligula porttitor.

                Aliquam ut nulla dui. Integer at rhoncus ex. Vestibulum rhoncus, dolor ac commodo rhoncus, magna nisl pulvinar dolor, sit amet viverra ipsum lacus ac justo. Proin libero magna, feugiat in euismod sit amet, aliquet in neque. Praesent sed egestas est. Cras rhoncus arcu quis semper venenatis. Duis imperdiet lorem ac vulputate egestas. Aliquam ut lectus lectus.
                </p>
            </Container>

            <Container className="Trombi">
            <AboutProfil image={joris} name='Joris' role='Lead Dev Front' description ='The dark side of the front'/>
            <AboutProfil image={nabiha} name='Nabiha' role='Référente technologies' description ='Nabiha ne fait pas le moine'/>
            <AboutProfil image={joris} name='Nicolas' role='Lead Dev Back' description ='Lorem Ispum dolor sit amet'/>
            <AboutProfil image={joris} name='Romain' role='Scrum Master et Git Master' description ='Lorem Ispum dolor sit amet'/>
            <AboutProfil image={thibault} name='Thibault' role='Product Owner' description ="Un jour j'irai vivre en théorie parce qu'en théorie tout se passe bien"/>
            </Container>
        </main>
    )
}

export default About;