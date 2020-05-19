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
    Form,
    Modal,
  } from "semantic-ui-react";
import edit from './images/edit.png';
import axios from 'axios';

class Issue extends Component{

    constructor(props){
      super(props)
      this.state={
         issue: [],
         issueId: this.props.location.state,
         IssueComments: [],
         open: false,
         values: {
           body: '',
           creater: '1',
           issues: '1',
         },
         option: false,
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

        fetch('http://127.0.0.1:8000/issues/1/comments/')
         .then(res=>res.json())
         .then(results=>{
           this.setState({
             IssueComments: results
           })
         })
    }

     async createComment(data){
          const response = await fetch('http://127.0.0.1:8000/comments/',{
            method: 'POST',
            body: data,
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              'Authorization': `Token ${sessionStorage.getItem('token')}`,  
            }
          });
          console.log(response);
    }

    onChange = e => {
      const { name, value } = e.target
      this.setState({
        values: {...this.state.values, [name]: value}
      })
    }
    
    onSubmit = e =>{
        let data = JSON.stringify(this.state.values)
        this.createComment(data);
    }

    commentList(){
      let listComments = this.state.IssueComments.map((comment)=>
            <Card className='issue-comment'>
            <Card.Content className='comment-body'>
              <Card.Description> 
                { comment.body }
             </Card.Description>
            </Card.Content>
            <Card.Content extra className='extra'>
                <Icon name='user' className='userimg' />
    <p className='time'>Time:{ comment.upload_time }</p>
                <p className='name'>Name</p>
                <p className='member'>Member</p>
            </Card.Content>
          </Card> 
      );
      return(
        listComments
      )
    }
    
    CloseOption(){
      if(this.state.option === true){
            this.setState({
              option: false
            })
      } 
    }

    OpenOption(){
      if(this.state.option === false){
        this.setState({
          option: true
        })
      }
    }

    show = (dimmer) => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    deleteIssue(){
        const { IssueId } = this.props.location.state 
        fetch(`http://127.0.0.1:8000/issues/${IssueId}/`, {
         method: 'DELETE',
         headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Token ${sessionStorage.getItem('token')}`,  
        }
       })
       .then(res => res.text()) // or res.json()
       .then(res => console.log(res))
    }
       
    updateIssue(){

    }

    render(){
        const { open, dimmer } = this.state
         
        return(
          <React.Fragment>
          <Container className='issue-box'>
          <Header as='h2'>Issues</Header>
          <Divider section /> 
          <div className="main-issue-box">
          <Card className='issue-head'>
            <Card.Content className='issue-head-header'>
                <img src={edit} alt='edit'  className='issue-edit' onClick={(event)=> this.OpenOption()} />
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
                  <p>time</p>
                </div>
            </Card.Content>
          </Card>
          <i class='fas fa-plus' onClick={this.show('blurring')} ></i>
          <Divider className='small-divider' section />
         { this.commentList() }
          </div>

          <div>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Write a Comment</Modal.Header>
          <Modal.Content image>
            <Modal.Description>

            <Form> 
               <Form.TextArea label='Descrpition' onChange={this.onChange} name='body' value={this.state.body}  placeholder='Write a Comment if you have a  solution for the issue' />
               <Button
                positive
                type='submit'
                icon='checkmark'
                content="Create"
                onClick={(event) => this.onSubmit()}
                />
             </Form>

            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Nope
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Yep, that's me"
              onClick={this.close}
            />
          </Modal.Actions>  
        </Modal>
      </div>
        </Container>
        
        <div className='settings' style={{display: this.state.option ? 'block' : 'none'}}>
       <div className="close"><i class="fas fa-times" onClick={(event)=> this.CloseOption()}></i></div>
          <div className="setting-box">
             <div className="delete">
             <Modal trigger={<i class="fas fa-trash"></i>} closeIcon>
              <Header icon='archive' content='Delete This Issue' />
              <Modal.Actions>
                <Button color='red'>
                  <Icon name='remove' /> No
                </Button>
                <Button color='green' onClick={(event)=> this.deleteIssue()}>
                  <Icon name='checkmark' /> Yes 
                </Button>
              </Modal.Actions>
            </Modal>
             </div>
             <div className="update">
             <i class="fas fa-edit" onClick={(evnet)=> this.updateIssue()}></i>
             </div>
             <div className="important">
             <i class="far fa-check-square"></i>
             </div>
             <div className="project">
             <i class="fas fa-arrow-right"></i>
             </div>
             <div className="line"></div>
          </div>
          <div className="second-box">
            <div className="type">
                 <Button className='selected'>Frontend</Button>
                 <Button color='white'>Backend</Button>
            </div>
            <div className="status">
                 <Button className='selected'>pending</Button>
                 <Button color='white'>hold</Button>
                 <Button color='white '>to be discussed</Button>
            </div>
          </div>
      </div>

        </React.Fragment>
        )
    }
}

export default Issue;