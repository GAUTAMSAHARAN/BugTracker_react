import React, { Component } from 'react';
import './styles/project.scss';
import {
    Container,
    Header,
    Divider,
    Button,
    Segment,
    Card,
    Icon,
    Image,
    CardContent,
    List,
  } from "semantic-ui-react";
import github from "./images/githubwhite.png";
import edit from "./images/edit.png";

class Project extends Component{
    render(){
        return(
            <Container className="box">
            <Header as="h2">Projects</Header>
            <Divider section />
            <div className="main-box">
            <Card className='card'>
             <Card.Content className='info'>
               <Card.Header>Matthew</Card.Header>
               <Card.Description>
               Lorem ipsum dolor sit amet, velit nulla, viverra scelerisque vitae mauris sapien etiam vel, non placerat, fusce auctor id phasellus aliquet tincidunt. Porta dignissim nisl et aliquam suspendisse, tellus tellus vitae massa feugiat, lacus erat, wisi mauris vivamus vehicula. Laoreet quis. Tincidunt elit. Pede est sagittis id tristique fusce quam, feugiat dictum ultricies quis tincidunt sodales augue, volutpat mollis hendrerit nam blandit ornare, egestas sit quisque interdum sit ullamcorper, vitae lectus eu consectetuer delectus arcu nulla.               </Card.Description>
               <img src={github} alt='gitlink' className='gitlink' />
               <img src={edit} alt='edit' className='edit' />
             </Card.Content>
             <Card.Content extra>
                 <Icon name='user' />
                 22 Friends
             </Card.Content>
           </Card>
           <Segment className='members'>
           <List selection verticalAlign='middle' >
            <List.Item>
                <List.Content className='heading'>
                    Members
                </List.Content>
            </List.Item>
            <Divider section /> 
           <List.Item>
             <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />
             <List.Content>
               <List.Header>Helen</List.Header>
             </List.Content>
           </List.Item>
           <List.Item>
             <Image avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
             <List.Content>
               <List.Header>Christian</List.Header>
             </List.Content>
           </List.Item>
           <List.Item>
             <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
             <List.Content>
               <List.Header>Daniel</List.Header>
             </List.Content>
           </List.Item>
         </List>
         </Segment>
         <Divider section className='divider' /> 
          <div className="issuelist">
         <Card fluid color='red' className="issue">
         
         <Card.Content className='card-content-1'>
         <i class="fas fa-plus"></i>
         <Card.Header className='header'>
            sdjifsjdaf
         </Card.Header>
         <i class="fas fa-reply"></i>
         </Card.Content>
 
         <Card.Content  className='card-content-2'>
         <Card.Description className='description'>
             flkjdsflsdjf
         </Card.Description>
         </Card.Content>
 
         <Card.Content extra>
           <h3 ><span className='date'>Date:</span><span className='date-format'>25min ago</span></h3>
         </Card.Content>

        </Card>
        <Card fluid color='red' className="issue">
         
         <Card.Content className='card-content-1'>
         <i class="fas fa-plus"></i>
         <Card.Header className='header'>
            sdjifsjdaf
         </Card.Header>
         <i class="fas fa-reply"></i>
         </Card.Content>
 
         <Card.Content  className='card-content-2'>
         <Card.Description className='description'>
             flkjdsflsdjf
         </Card.Description>
         </Card.Content>
 
         <Card.Content extra>
           <h3 ><span className='date'>Date:</span><span className='date-format'>25min ago</span></h3>
         </Card.Content>

        </Card>
        </div>
           </div>
          </Container>
        )
    }
}

export default Project;