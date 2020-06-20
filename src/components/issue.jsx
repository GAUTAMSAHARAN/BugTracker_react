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
    Message,
  } from "semantic-ui-react";
import edit from './images/edit.png';
import { Link, Redirect } from 'react-router-dom';
import Background from './images/options.jpg';
import moment from 'moment';
import App from './editor';
import WebSocketInstance from './websocket.js';
import Avatar from 'react-avatar';



class CommentCard extends Component{z
 
  constructor(props){
    super(props)
    this.state={
      form: false,
    }
  }

  openForm(){
    this.setState({
      form: true,
    })
  }

  closeForm(){
    this.setState({
      form: false,
    })
  }

  render(){
    const {comment} = this.props
    return(
      <Card className='issue-comment' key={comment.id} >
      <Card.Content className='comment-body'>
        <Card.Description style={{display: this.state.form ? 'none' : 'block'}}> 
         <div dangerouslySetInnerHTML={{__html: comment.body}} />
       </Card.Description>
       <Segment className='update-comment-form' style={{display: this.state.form ? 'block' : 'none'}}>
       <Form> 
               {/* <Form.TextArea label='Descrpition' onChange={this.onChange} name='body' value={this.state.body}  placeholder='Write a Comment if you have a  solution for the issue' /> */}
               <App onEditorChange={this.handleCommentCreate} placeholder='Write your answer' initialValue='' />
               <Button
                positive
                type='submit'
                icon='checkmark'
                content="update"
                className='update-comment'
                onClick={(event) => this.onSubmit()}
                />
          </Form>
      </Segment>
      </Card.Content>
      <Card.Content extra className='extra'>
        <div style={{display: comment.creater === sessionStorage.getItem('UserId') ? 'block' : 'none'}}>
          <i class="fas fa-pen" style={{display: this.state.form ? 'none' : 'inline'}} onClick={(event) => this.openForm()}></i>
          <i class="fas fa-times" style={{display: this.state.form ? 'inline' : 'none'}} onClick={(event) => this.closeForm()}></i>
          <i class="fas fa-trash"></i>
          </div>
          <Avatar className='userimg' name={comment.username} />
           <p className='time'>Time: {moment(comment.upload_time).fromNow()}</p>
    <p className='name'>{comment.username}</p>
    <p className='member'>{comment.member ? 'member' : 'not a member'}</p>
      </Card.Content>
    </Card>
    )
  }
}


class Issue extends Component{

    constructor(props){
      super(props)
      this.state={
         issue: [],
         IssueComments: [],
         updateComment: [],
         updateCommentError: {
           body: '',
         },
         issueId: this.props.location.state.IssueId,
         open: false,
         values: {
           body: '',
           creater: parseInt(sessionStorage.getItem('UserId')),
           issues: '',
         },
         update: [],
         updateError: {
           title: '',
         },
         option: false,
         form: false,
         active1: 'front',
         active2: 'pending',
         commentBox: {
           first: true,
         },
         commentForm: false,
         deleteDone: false,
         success: false,
         successMsg: '',
         fail: false,
         failMsg: '',
      }
      this.statusUpdateRequest = this.statusUpdateRequest.bind(this)
      this.commentsLoder = this.commentsLoder.bind(this)
      this.fetchComment = this.fetchComment.bind(this)
      this.newComment = this.newComment.bind(this)
    }

    componentDidMount(){
       const { IssueId } = this.props.location.state 

       WebSocketInstance.connect(`ws://localhost:8000/bug_reporter/ws/comments/${IssueId}`)
       WebSocketInstance.addCallbacks(this.commentsLoder, this.newComment)
       this.ma = setInterval((event)=>this.fetchComment(), 500)

       fetch(`http://127.0.0.1:8000/issues/${IssueId}/`,{
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Token ${sessionStorage.getItem('token')}`,  
         },
       })
        .then(async response => {
          let results = await response.json()
          if(response.status==200){
            this.setState({
              issue: results,
              update: results,
              values: { ...this.state.values, issues: results.id},
            })
            switch(results.status){
             case "P":
               this.setState({
                 active2: 'pending'
               }) 
                  break
             case "T":
                this.setState({
                  active2: 'to be discussed'
                })
                break
             case "R":
               this.setState({
                 active2: 'resolved'
               }) 
                break
            default:
             this.setState({
               active2: 'pending'
             }) 
                break
         }
         switch(results.type){
           case "FRONT":
             this.setState({
               active1: 'front',
             })
             break
           case "BACK":
             this.setState({
               active1: 'back',
             })
             break
           default:
             this.setState({
               active1: 'front'
             })
             break
         }
          }
        })
        .catch(error => {
          console.error('There was an error!', error);
          });

        // fetch(`http://127.0.0.1:8000/issues/${IssueId}/comments/`,{
        //   headers: {
        //     "Content-type": "application/json; charset=UTF-8",
        //     'Authorization': `Token ${sessionStorage.getItem('token')}`,  
        //    },
        // })
        // .then(async response => {
        //     let results =  await response.json()
        //     if(response.status == 200){
        //       this.setState({
        //         IssueComments: results,
        //         updateComment: results,
        //       })
        //     }
        // })
        // .catch(error=>{
        //   console.error('There was an error!', error);
        // })


    }

  fetchComment() {
      if (WebSocketInstance.state() === 1) {
          clearInterval(this.ma)
          console.log('fetch')
          WebSocketInstance.fetchMessages()
      }
  }

  commentsLoder(data) {
      console.log('loder')
      const comments = data["data"]
      this.setState({ IssueComments: comments })
  }

  newComment(data) {
      console.log("test2")
      const comment = data.comment
      console.log(comment)
      this.setState({ IssueComments: [comment, ...this.state.IssueComments] })
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
          if(response.status == 200 || response.status == 201){
             this.SuccessOn('your response has been successfully created.');
          }
          console.log(data);
          console.log(response);
    }

    onChange = e => {
      const { name, value } = e.target
      this.setState({
        values: {...this.state.values, [name]: value}
      })
    }
    
    onSubmit = e =>{
        // this.createComment(data);
        WebSocketInstance.newComment(this.state.values.body)
        this.setState({
          commentForm: false,
        })
    }

    OpenOption(){
      if(this.state.option === false){
        this.setState({
          option: true
        })
      }
    }

    CloseOption(){
      if(this.state.option === true){
            this.setState({
              option: false
            })
      } 
    }

    commentList(){
      let listComments = this.state.IssueComments.map((comment)=>
      <React.Fragment>
         <CommentCard comment={comment} />
        </React.Fragment>
      );
      return(
        listComments
      )
    }


    deleteIssue(){
      const { IssueId } = this.props.location.state.IssueId 
      fetch(`http://127.0.0.1:8000/issues/${IssueId}/`, {
       method: 'DELETE',
       headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Token ${sessionStorage.getItem('token')}`,  
      }
     })
     .then(async response => {
         if(response.status == 204 || response.status ==202){
             this.setState(({
               deleteDone: true,
             }))
         }
     })// or res.json()
     .catch(error=>{
       console.error('There is an error!', error)
     })
  }
    
    onUpdate = e => {
        const { name, value } = e.target
        this.setState({
          update: { ...this.state.update, [name]: value }
        })
        if(name === 'title'){
          this.setState({
            updateError: {...this.state.updateError, title: value.length > 60 ? 'Title must be less than 60 characters.' : ''}
          })
        }
    }

   async updateIssue(){
          console.log(this.state.update)
          let data = JSON.stringify(this.state.update)
          let IssueId  = this.state.issue.id
          const response = await fetch(`http://127.0.0.1:8000/issues/${IssueId}/`,{
            method: 'PUT',
            body: data,
            headers: {
             "Content-type": "application/json; charset=UTF-8",
             'Authorization': `Token ${sessionStorage.getItem('token')}`,  
            },
          });
          if(response.status == 200){
            this.setState({
              issue: this.state.update
            })
            this.SuccessOn('you have successfully updated your issue')
          }else{
            this.FailOn('There are some error while updating issue details.')
          }
          console.log(response)
          this.formClose()
    }

    
    formOpen(){
      this.setState({
        form: true
      })
      this.CloseOption()
    }

    formClose(){
      this.setState({
        form: false
      })
    }
    
    commentFormOpen(){
      this.setState({
        commentForm: true, 
      })
    }

    commentFormClose(){
       this.setState({
         commentForm: false,
       })
    }

    async important(){
      this.setState({
        update: { ...this.state.update, important: this.state.update.important ? false : true}
      })
      let data = JSON.stringify(this.state.update)
      let IssueId  = this.state.issue.id
      const response = await fetch(`http://127.0.0.1:8000/issues/${IssueId}/`,{
        method: 'PUT',
        body: data,
        headers: {
         "Content-type": "application/json; charset=UTF-8",
         'Authorization': `Token ${sessionStorage.getItem('token')}`,  
        },
      });
      if(response.status == 200){
        this.setState({
          issue: this.state.update
        })
       this.SuccessOn('Issue has been updated successfully.')
      }else{
        this.FailOn('Error is occcured while updating issue')
      }
      this.CloseOption()
    }

    async typeUpdate(string){
       this.setState({
         update: {...this.state.update, type: string === 'front' ? 'FRONT' : 'BACK'},
       })
       console.log(this.state.update)
       if(string === 'front'){
         await this.setState({
            active1: 'front'
          })
       }
       if(string === 'back'){
         await this.setState({
           active1: 'back'
         })
       }
       let data = JSON.stringify(this.state.update)
       let IssueId = this.state.issue.id
       const response = await fetch(`http://127.0.0.1:8000/issues/${IssueId}/`,{
        method: 'PUT',
        body: data,
        headers: {
         "Content-type": "application/json; charset=UTF-8",
         'Authorization': `Token ${sessionStorage.getItem('token')}`,  
        },
       })
       if(response.status == 200){
         this.setState({
           issue: this.state.update
         })
         this.SuccessOn('Issue type has been updated.')
       }else{
         this.FailOn('Error Occur while updating. Try again later.')
         console.log(response)
       }
       this.CloseOption()
      }

    async statusUpdateRequest(data){
      let IssueId = this.state.issue.id
      const response = await fetch(`http://127.0.0.1:8000/issues/${IssueId}/`,{
       method: 'PUT',
       body: data,
       headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Token ${sessionStorage.getItem('token')}`,  
       },
      })
      if(response.status == 200){
        this.setState({
          issue: this.state.update
        })
        this.SuccessOn('Status of Issue is updated.')
      }else{        
        this.FailOn('Error occur while updating.')
        console.log(response)
      }
      this.CloseOption()
    }

    async statusUpdate(string){
      switch(string){
          case "pending":
            await this.setState({
              update: {...this.state.update, status: "P"},
              active2: 'pending'
            }) 
               break
          case "to be discussed":
             await this.setState({
               update: {...this.state.update, status: "T"},
               active2: 'to be discussed'
             })
             break
          case "resolved":
            await this.setState({
              update: {...this.state.update, status: "R"},
              active2: 'resolved'
            }) 
             break
         default:
          await this.setState({
            update: {...this.state.update, status: "P"},
            active2: 'pending'
          }) 
             break
      }
      let data = JSON.stringify(this.state.update)
      this.statusUpdateRequest(data)
      this.CloseOption()
    }

    handleEditorUpdateIssue = (content) => {
      this.setState({
        update: {...this.state.update, wiki: content}
      })
    }

    handleCommentCreate = (content) => {
      this.setState({
        values: {...this.state.values, body: content}
      }) 
    }

    SuccessOn(msg){
      this.setState({
        success: true, 
        successMsg: msg,
      })
  
      setInterval(()=>{
          this.setState({
            success:false,
          })
      }, 3000)
    }
  
    FailOn(msg){
      this.setState({
        fail: true,
        failMsg: msg,
      })
      setInterval(()=>{
         this.setState({
           success:false,
         })
      }, 3000)
    }
     
    render(){        
        return(
          <React.Fragment>
            { this.state.deleteDone ? (<Redirect push to={{ pathname: '/app/project',
                                                            state: { ProjectId: this.state.issue.project }}} />) : null }
          <Container className='issue-box'>
          <Message
            style = {{display: this.state.success ? 'block' : 'none'}}
            success
            header={this.state.successMsg}
          />
          <Message 
            negative
            style={{display: this.state.fail ? 'block' : 'none'}}
            >
              <Message.Header>{this.state.failMsg}</Message.Header>
           </Message>
          <Header as='h2'>Issues</Header>
          <Divider section /> 
          <div className="main-issue-box">

          <Card className='issue-head'>
            <Card.Content className='issue-head-header'>
                <img src={edit} alt='edit' style={{display: this.state.issue.creater === parseInt(sessionStorage.getItem('UserId')) ? 'block' : 'none'}} className='issue-edit' onClick={(event)=> this.OpenOption()} />
         <Card.Header style={{display: this.state.form ? 'none' : 'block'}} >{ this.state.issue.title }</Card.Header>
              <Card.Description style={{display: this.state.form ? 'none' : 'block'}} >
                <div dangerouslySetInnerHTML={{__html: this.state.issue.wiki}} />
              </Card.Description>

              <Segment  className='update' style={{display: this.state.form ? 'block' : 'none'}}>
          <Form className='update-form'> 
              <Form.Input label='Title' placeholder='Title' name='title' value={this.state.update.title} onChange={this.onUpdate}  /> 
                 {/* <Form.TextArea label='Wiki' onChange={this.onUpdate} name='wiki' value={this.state.update.wiki}  /> */}
                 <App onEditorChange={this.handleEditorUpdateIssue} initialValue={this.state.issue.wiki} />
                 <Button
                  positive
                  type='submit'
                  icon='checkmark'
                  content="Update"
                  onClick={(event) => this.updateIssue()}
                  className='form-submit'
                  />
                 <div className='close'>
                 <i class="fas fa-times" onClick={(event)=> this.formClose()}></i>
                 </div>
            </Form>
            </Segment>

            </Card.Content>
            <Card.Content className='extra-card' extra>
                <Icon name='user' />
                {this.state.IssueComments.length} comments
                <div className="time">
                  <Icon name='clock' />
                  <p>{moment(this.state.issue.upload_time).fromNow()}</p>
                </div>
            </Card.Content>
          </Card>

          <i class='fas fa-plus' onClick={(event)=>this.commentFormOpen()}  style={{display: this.state.commentForm ? 'none' : 'block'}} ></i>
          <i class='fas fa-minus' onClick={(event)=>this.commentFormClose()} style={{display: this.state.commentForm ? 'block' : 'none'}} ></i>
          <Divider className='small-divider' section />
          <Card className='comment-form' style={{display: this.state.commentForm ? 'block' : 'none'}}>
          <Form> 
               {/* <Form.TextArea label='Descrpition' onChange={this.onChange} name='body' value={this.state.body}  placeholder='Write a Comment if you have a  solution for the issue' /> */}
               <App onEditorChange={this.handleCommentCreate} placeholder='Write your answer' initialValue='' />
               <Button
                positive
                type='submit'
                icon='checkmark'
                content="create"
                className='create-comment'
                onClick={(event) => this.onSubmit()}
                />
          </Form>
          </Card>
         { this.commentList() }
          </div>
        </Container>

        <div className='settings' style={{display: this.state.option ? 'block' : 'none',backgroundImage: `url("${Background}")`}}>
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
             <i class="fas fa-edit" onClick={(event)=> this.formOpen()}></i>
             </div>
             <div className="important">
             <i class="far fa-check-square" onClick={(event)=>this.important()}></i>
             </div>
             <div className="project">
             <Link to={{
               pathname: '/project/',
               state: {
                 ProjectId: this.state.issue.project
               }
             }}>
             <i class="fas fa-arrow-right"></i>
             </Link>
             </div>
             <div className="line"></div>
          </div>
          <div className="second-box">
            <div className="type">
                 <Button color='white' className={this.state.active1 === 'front' ? 'selected' : ''} onClick={(event)=>this.typeUpdate('front')} >Frontend</Button>
                 <Button color='white' className={this.state.active1 === 'back' ? 'selected' : ''} onClick={(event)=>this.typeUpdate('back')} >Backend</Button>
            </div>
            <div className="status">
                 <Button color='white' className={this.state.active2 === 'pending' ? 'selected' : ''} onClick={(event)=>this.statusUpdate('pending')} >pending</Button>
                 <Button color='white' className={this.state.active2 === 'resolved' ? 'selected' : ''} onClick={(event)=>this.statusUpdate('resolved')} >resolved</Button>
                 <Button color='white 'className={this.state.active2 === 'to be discussed' ? 'selected' : ''} onClick={(event)=>this.statusUpdate('to be discussed')} >to be discussed</Button>
            </div>
          </div>    
      </div>
        </React.Fragment>
        )
    }
}

export { CommentCard }
export default Issue