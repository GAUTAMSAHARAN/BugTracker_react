import React, { Component } from 'react';
import { Container, Header, Divider, Button, Segment, Card, Icon, Image, CardContent} from 'semantic-ui-react';
import './styles/projects.scss';
import github from './images/githubwhite.png';
import edit from './images/edit.png';

class Projects extends Component{
    render(){
        return(
            <Container className='box'>
            <Header as='h2'>Projects</Header>
            <Divider section />
            <Segment className='segment'>
               <Button.Group  className='option-2'>
                 <Button color='teal' basic>  Latest  </Button>
                 <Button color='blue'basic>MyProjects</Button>
                 <Button color='green' basic>Collabrated</Button>
               </Button.Group>
                </Segment>
            <Divider section />
            <Card className='card'>
             <CardContent className='settings'>
                 <div className="gitbox">
                 <img src={github} alt='gitlink' className='gitlink' />
                 </div>
                 <div className="editbox">
                 <img src={edit} alt='edit' className='edit' />
                 </div>
                <div className="description">
                     <p>Lorem ipsum, or lipsum as it is sometimes kn in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with: </p>
                 </div>
             </CardContent>
             <Card.Content className='info'>
               <Card.Header>Project1</Card.Header>
             </Card.Content>
             <Card.Content extra>
               <a>
                 <Icon name='user' />
                 22 Members
               </a>
             </Card.Content>
           </Card>
           <Card className='card'>
             <CardContent className='settings'>
                 <div className="gitbox">
                 <img src={github} alt='gitlink' className='gitlink' />
                 </div>
                 <div className="editbox">
                 <img src={edit} alt='edit' className='edit' />
                 </div>
                 <div className="description">
                     <p>Lorem ipsum, or lipsum as it is sometimes kn in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with: </p>
                 </div>
             </CardContent>
             <Card.Content className='info'>
               <Card.Header>Project2</Card.Header>
             </Card.Content>
             <Card.Content extra>
               <a>
                 <Icon name='user' />
                 22 Members
               </a>
             </Card.Content>
           </Card>
           <Card className='card'>
             <CardContent className='settings'>
                 <div className="gitbox">
                 <img src={github} alt='gitlink' className='gitlink' />
                 </div>
                 <div className="editbox">
                 <img src={edit} alt='edit' className='edit' />
                 </div>
             </CardContent>
             <Card.Content className='info'>
               <Card.Header>Project3</Card.Header>
             </Card.Content>
             <Card.Content extra>
               <a>
                 <Icon name='user' />
                 22 Members
               </a>
             </Card.Content>
           </Card>
          </Container>
        );
    }
}

export default Projects;