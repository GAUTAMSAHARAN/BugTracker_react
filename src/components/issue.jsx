import React, { Component } from 'react';
import './styles/issue.scss';
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
  } from "semantic-ui-react";
import edit from './images/edit.png';

class Issue extends Component{
    render(){
        return(
          <Container className='box'>
          <Header as='h2'>Issues</Header>
          <Divider section />
          <div className="main-box">
          <Card className='head'>
            <Card.Content className='head-header'>
                <img src={edit} alt='edit'  className='edit' />
                <i class="fas fa-bars"></i>
              <Card.Header>Matthew</Card.Header>
              <Card.Description>
                Matthew is a musician living in Nashville.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='user' />
                22 comments
            </Card.Content>
          </Card>
          
          <Divider section />

          <Card className='comment'>
            <Card.Content className='comment-body'>
              <Card.Description>
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:

“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”

The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.               </Card.Description>
            </Card.Content>
            <Card.Content extra className='extra'>
                <Icon name='user' className='userimg' />
                <p className='time'>Time:</p>
                <p className='name'>Name</p>
                <p className='member'>Member</p>
            </Card.Content>
          </Card>

          <Card className='comment'>
            <Card.Content className='comment-body'>
              <Card.Description>
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:

“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”

The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.               </Card.Description>
            </Card.Content>
            <Card.Content extra className='extra'>
                <Icon name='user' className='userimg' />
                <p className='time'>Time:</p>
                <p className='name'>Name</p>
                <p className='member'>Member</p>
            </Card.Content>
          </Card>

          </div>
        </Container>
        )
    }
}

export default Issue;