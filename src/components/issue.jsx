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

    constructor(props){
      super(props)
      this.state={
         issue: [],
         issueId: this.props.location.state
      }
    }

    componentDidMount(){
       const { IssueId } = this.props.location.state 
       fetch(`http://127.0.0.1:8000/issues/${IssueId}/`)
        .then(res => res.json())
        .then(results => {
             this.setState({
               issue: results
             })
        })
    }

    render(){
        return(
          <Container className='issue-box'>
          <Header as='h2'>Issues</Header>
          <Divider section /> 
          <div className="main-issue-box">
          <Card className='issue-head'>
            <Card.Content className='issue-head-header'>
                <img src={edit} alt='edit'  className='issue-edit' />
                <i class="fas fa-bars"></i>
         <Card.Header>{ this.state.issue.title }</Card.Header>
              <Card.Description>
                  { this.state.issue.wiki }
              </Card.Description>
            </Card.Content>
            <Card.Content className='extra-card' extra>
                <Icon name='user' />
                22 comments
                <div className="time">
                  <Icon name='clock' />
                </div>
            </Card.Content>
          </Card>
          
          <Divider section />

          <Card className='issue-comment'>
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

          <Card className='issue-comment'>
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