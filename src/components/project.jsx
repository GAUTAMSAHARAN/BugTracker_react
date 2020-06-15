import React, { Component } from 'react';
import _ from 'lodash';
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
    Modal,
    Dropdown,
    Form,
    Radio,  
    Checkbox,
    Search,
    Grid,
    List,
    Responsive
  } from "semantic-ui-react";
import github from "./images/githubwhite.png";
import edit from "./images/edit.png";
import { Link } from 'react-router-dom';
import moment from 'moment';
import App from './editor';
import Avatar from 'react-avatar';
import { IssueCard } from './home';
import { Redirect } from 'react-router'
import Pluralize from 'react-pluralize';
import LargePlaceHolder from './largeplaceholder';
const axios = require('axios');



const validGitUrlRegex = RegExp(
  /^(?:git|ssh|https?|git@[-\w.]+):(\/\/)(github\.com)\/(\w{1,})\/(\w{1,})\/?$/
);


class MemberCard extends Component{
  render(){
    const{ member, deleteMemberId } = this.props
    return(
       <React.Fragment>
            <List.Item className='list-item'>
                 <Link to={{
                 pathname: '/app/user/',
                 state: {
                   UserId: member.id
                 }
               }}>
                <Avatar className=' avatar image' name={member.username} />
                </Link>
                <div className="delete" style={{display: this.props.delete ? 'block' : 'none'}} onClick={(evnet) => deleteMemberId(member.id)}>
                <i class="fas fa-trash"></i>
                </div>
                <span className='name'>{member.username}</span>
            </List.Item>
       </React.Fragment>
    )
  }
}


class UserCard extends Component{
  render(){
    const {user, onClick } = this.props
    return(
          <React.Fragment>
                   <Card key={user.id} className='card-box' onClick={(event) =>onClick(user.id)}>
                     <Card.Content>
                       <Card.Description>
                         <Avatar name={user.username} className='avatar' />
                         <span className='name'>{user.username}</span>
                       </Card.Description>
                     </Card.Content>
                   </Card>
          </React.Fragment>
    )
  }
}



class Project extends Component{

    constructor(props){
        super(props)
        this.state={
             project: [],
             members: [],
             users: [],
             ProjectId: this.props.location.state.ProjectId,
             projectIssues: null,
             teamMembers: [],
             update: [],
             updateError: {
                title: '',
                desc: '',
                gitLink: '',
             },
             show: false,
             open: false, 
             issueData: {
               title: '',
               wiki: '',
               important: false,
               type: '',
               status: 'P',
               creater: parseInt(sessionStorage.getItem('UserId')),
               project: this.props.location.state.ProjectId,
             },
             issueError: {
               title: '',
               type: '',            
             },
             up: false,
             form: false,
             deleteMember: false,
             redirect: false,
        }
        this.Show = this.Show.bind(this)
        this.deleteProject = this.deleteProject.bind(this)
    }

   componentDidMount(){
      const { ProjectId } = this.props.location.state
      
      axios.get(`http://127.0.0.1:8000/projects/${ProjectId}/`)
      .then((response) => {
        if(response.status == 200){
          this.setState({
            project: response.data,
            update: response.data,
            members: response.data.memebers,
          })
        }
      });

       fetch(`http://127.0.0.1:8000/projects/${ProjectId}/issues/`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Token ${sessionStorage.getItem('token')}`,  
         },
       })
        .then(async response => {
          let data = await response.json()
          if(response.status==200){
            this.setState({
              projectIssues: data,
            })  
          }
        })
        .catch(error => {
          console.error('There was an error!', error);
          });

        fetch(`http://127.0.0.1:8000/projects/${ProjectId}/members/`,{
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Token ${sessionStorage.getItem('token')}`,  
           },
        })
         .then(async response => {
            let data = await response.json()
            if(response.status==200){
              this.setState({
                teamMembers: data,
              })
            }
         })
         .catch(error => {
          console.error('There was an error!', error);
          });


        fetch('http://127.0.0.1:8000/users/', {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Token ${sessionStorage.getItem('token')}`,  
           },
        })
        .then(async response => {
            let data = await response.json()
            if(response.status ==200){
              data = data.results
              this.setState({
                users: data
              })
            }
        })
        .catch(error => {
          console.error('There was an error !', error);
        })
    }

    Show(){
      if(this.state.show === false){
          this.setState({
              show: true
          })
      }
      if(this.state.show === true){
          this.setState({ 
             show:false
          })
      }
    }

    IssueList(){
       let show = this.state.show
       let issueList = ''
       if(this.state.projectIssues == null){
           issueList = <Container>
                       <LargePlaceHolder />
                       <LargePlaceHolder />
                       <LargePlaceHolder />
                       <LargePlaceHolder />
                       </Container>
       }else{
         if(this.state.projectIssues.length == 0){
           issueList = <Card className='empty-issues'>
              <Card.Content className='content'>
                There are no issues yet.
              </Card.Content>
           </Card>
         }else{
           issueList = this.state.projectIssues.map((issue)=>
                <IssueCard issue={issue} />
           );
         }
       }
       return(
         issueList
       )
    }


    deleteProject(){
      fetch(`http://127.0.0.1:8000/projects/${this.state.project.id}/`,{
        method: 'DELETE',
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Token ${sessionStorage.getItem('token')}`,  
        }
      })
      .then(async response => {
        if(response.status==200 || response.status==204 || response.status==202){
           console.log('hello')
           this.setState({
             redirect: true,
           })
        }else{
          console.log(response)
        }
      })
    }

    async createIssue(data){
      let response = await fetch('http://127.0.0.1:8000/issues/',{
        method: 'POST',
        body: data,
        headers: {
         "Content-type": "application/json; charset=UTF-8",
         'Authorization': `Token ${sessionStorage.getItem('token')}`,  
        },
      });
      if(response.status == 201){
       response = await response.json()
       this.setState({
         projectIssues: [response, ...this.state.projectIssues],
       })
      }else{
        console.log(response)
      }
 }

    onChange = e => {
      const { name, value } = e.target
      this.setState({
        issueData: { ...this.state.issueData, [name]: value }
      })
      
      if(name==='title'){
        this.setState({
          issueError: { ...this.state.issueError, title: value.length > 60 ? 'Title must be less than 60 character.' : ''}
        })
      }
    }
  
    onSubmit = e => {
       let {title} = this.state.issueError 
       let data = JSON.stringify(this.state.issueData)
       if(title===''){
       this.createIssue(data);
       this.close()
      }
    }

    show = (dimmer) => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })
    handleChange = (e, { value }) => {
       this.setState({ value }) 
       if(value==='1'){
         this.setState({
           issueData: { ...this.state.issueData, type: 'FRONT'}
         })
       }
       if(value === '2'){
         this.setState({
          issueData: { ...this.state.issueData, type: 'BACK'}
         })
       }
       if(this.state.issueData.type === ''){
            this.setState({
              issueError: { ...this.state.issueError, type: 'you need to select one of the above options.'}
            })
       }
     } 

      handleCheckBox = (e, value) => {
        console.log(value); // the data / props that passed to the component
     }

    up(){
      if(this.state.up === false){
           this.setState({
              up: true
           })
      }
      if(this.state.up === true){
           this.setState({
             up: false
           })
      }
    }

    openForm(){
       this.setState({
         form: true,
         up: false
       })
    }

    closeForm(){
       this.setState({
         form: false
       })
    }
    
    onUpdate = e => {
      const {name, value} = e.target
      this.setState({
        update: {...this.state.update, [name]: value}
      })
      if(name==='title'){
         this.setState({
           updateError: {
             title: value.length > 20 ? 'Title must be less than 20 characters.' : ''
           }
         })
      }
      if(name==='gitLink'){
        this.setState({
          updateError: { ...this.state.updateError, gitLink: validGitUrlRegex.test(value) ? '' : 'Url is not valid!'}
        })
    }
  }

    async updateProject(){
      let data = JSON.stringify(this.state.update)
      let response = await fetch(`http://127.0.0.1:8000/projects/${this.state.project.id}/`,{
        method: 'PUT',
        body: data,
        headers: {
         "Content-type": "application/json; charset=UTF-8",
         'Authorization': `Token ${sessionStorage.getItem('token')}`,  
        },
      })
      if(response.status == 201 || response.status==200){
        this.setState({
          project: this.state.update
        })
      }else{
        console.log(response);
      }
      this.up()
      this.closeForm()
    }


    handleEditorUpdate = (content) =>{
      this.setState({
        update: {...this.state.update, desc: content},
      })
    }

    handleIssueCreate = (content) => {
      this.setState({
        issueData: {...this.state.issueData, wiki: content}
      })
      this.setState({
          issueError: { ...this.state.issueError, wiki: content.length > 500 ? 'wiki must be less than 500 character.' : ''}
      })

    }

     
    useroptions(){
      const UserOptions = this.state.users.map((user) => ({
        key: user.id,
        name: user.username
      }));
      return(
        UserOptions
      )
    }
    
    submitNewMembers(){
      let data = JSON.stringify(this.state.project)
      let response = fetch(`http://127.0.0.1:8000/projects/${this.state.project.id}/`,{
        method: 'PUT',
        body: data,
        headers: {
         "Content-type": "application/json; charset=UTF-8",
         'Authorization': `Token ${sessionStorage.getItem('token')}`,  
        },
      })
      console.log(this.state.project)
    }

    handleCardClick = (id) => {
        this.setState({
          project: {...this.state.project, memebers: this.state.project.memebers.push(id)},
        })
        this.submitNewMembers()
    }

    listUser() {
      let userlist = []
      let resultUsers = this.state.users.filter((user)=>{
        return  !(this.state.members.indexOf(user.id)>=0)
        })
      if (resultUsers.length !== 0) {
        userlist = resultUsers.map((user)=>
        <UserCard user={user} onClick={this.handleCardClick} />
     );
        }
        else {
            userlist = <span>users are not available</span>
        }
      return(
        userlist
      ) 
    } 

    deletePermanent(){
      let data = JSON.stringify(this.state.project)
      let response = fetch(`http://127.0.0.1:8000/projects/${this.state.project.id}/`,{
        method: 'PUT',
        body: data,
        headers: {
         "Content-type": "application/json; charset=UTF-8",
         'Authorization': `Token ${sessionStorage.getItem('token')}`,  
        },
      })
      
    }

    deleteMemberId = (id) => {
      this.setState({
        project: {...this.state.project, memebers: this.state.project.memebers.filter((Id)=>{
                 return (Id !== id)
        })}
      })
      this.deletePermanent()
  }

    listmember(){
      let memberList = ''
      if(this.state.teamMembers.length==0){
        memberList = <Container>
                      <LargePlaceHolder />
                      <LargePlaceHolder />
                     </Container>
      }else{
        memberList = this.state.teamMembers.map((member) =>
              <MemberCard member={member} delete={this.state.deleteMember} deleteMemberId = {this.deleteMemberId} />
       )      
      }
      return(
        memberList
      )
    }

    deleteOpen(){
      this.setState({
         deleteMember: true,
      })
    }

    deleteClose(){
      this.setState({
        deleteMember: false,
      })
    }
 
 
    render(){
      const { open, dimmer, value, members} = this.state

        return(
            <Container className="project-box">
            { this.state.redirect ? (<Redirect push to="/app/projects"/>) : null }
            <Header as="h2">Projects</Header>
            <Divider section />

            <div className="main-box">
            <Card className='card'> 
             <Card.Content className='info'>
        <Card.Header>{this.state.project.title}</Card.Header>
               <Card.Description >
               <div dangerouslySetInnerHTML={{__html: this.state.project.desc}} />
               </Card.Description>
             <a href={this.state.project.gitLink} target="_blank"  ><img src={github} alt='gitlink' className='gitlink' style={{display: this.state.project.gitLink === '' ? 'none' : 'inline'}} /></a>
               <img src={edit} alt='edit' style={{display: members.includes(parseInt(sessionStorage.getItem('UserId'))) ? 'inline' : 'none'}} className='edit' onClick={(event)=> this.up()} />
               <div className="option-box" style={{display: this.state.up ? 'block' : 'none'}}>
               <div className="delete">
               <Modal trigger={<i class="fas fa-trash"></i>} closeIcon>
                 <Header icon='archive' content='Delete This Issue' />
                 <Modal.Actions>
                   <Button color='red'>
                     <Icon name='remove' /> No
                   </Button>
                   <Button color='green' onClick={(event)=> this.deleteProject()}>
                     <Icon name='checkmark' /> Yes 
                   </Button>
                 </Modal.Actions>
               </Modal>
               </div>
               <div className="update">
               <i class="fas fa-pen" onClick={(event)=> this.openForm()}></i>
               </div>
               <div className='add'>
               <Modal trigger={<i class="fas fa-plus" ></i>}>
                 <Modal.Header>Add Members in project</Modal.Header>
                 <Modal.Content className='member-modal-content'>
                   {this.listUser()}
                 </Modal.Content>
               </Modal>
               </div>
               </div>
             </Card.Content>
             <Card.Content extra className='project-extra' >
                 <Icon name='user' />
                 <Pluralize singular={'member'} count={this.state.teamMembers.length} />
                 <div className="time">
                  <Icon name='clock' />
                  <p>{moment(this.state.project.upload_time).fromNow()}</p>
                </div>
             </Card.Content>
           </Card>

           <Segment className='project-form' style={{display: this.state.form ? 'block' : 'none'}}>
           <Form> 
           <Form.Input label='Title' placeholder='Title' name='title' value={this.state.update.title} onChange={this.onUpdate}  /> 
           { this.state.updateError.title}
           {/* <Form.TextArea label='Wiki' onChange={this.onChange} name='wiki' value={this.state.update.desc}  placeholder='Write about the issue ' /> */}
           <App onEditorChange={this.handleEditorUpdate} />
           <Form.Input label='Gitlink of the project'  name='gitLink' value={this.state.update.gitLink} onChange={this.onUpdate}  /> 
           { this.state.updateError.gitLink }
           <Button
            positive
            type='submit'
            icon='checkmark'
            content="Update"
            onClick={(event) => this.updateProject()}
            className='update-project'
            />
            <div className="close-box">
            <i class='fas fa-times' onClick={(event)=>this.closeForm()}></i>
            </div>
            </Form>
            </Segment>


         <div className="add">
         <i style={{display: members.includes(parseInt(sessionStorage.getItem('UserId'))) ? 'block' : 'none'}} class="fas fa-plus" onClick={this.show('blurring')} ></i>
         </div>

         <Card className='members'>
          <Card.Content>
            <Card.Header>Members</Card.Header>
            <div style={{display: members.includes(parseInt(sessionStorage.getItem('UserId'))) ? 'inline' : 'none'}}>
            <i class="fas fa-pen" style={{display: this.state.deleteMember ? 'none' : 'block'}} onClick={ (event)=> this.deleteOpen() }></i>
            <i class="fas fa-times" style={{display: this.state.deleteMember ? 'block' : 'none'}} onClick={ (event)=> this.deleteClose()   }></i>
            </div>
          </Card.Content>
          <Card.Content className='user-list'>
          <List selection verticalAlign='middle'>
              {this.listmember()}
          </List>
          </Card.Content>
         </Card>

         <Divider section className='divider' />

        <div className="issuelist">
          {this.IssueList()}
        </div>

       <div>
           <Modal dimmer={dimmer} open={open} onClose={this.close}>
             <Modal.Header>Create New Issue</Modal.Header>
             <Modal.Content>
               <Modal.Description>
         
               <Form> 
                 <Form.Field>
                   <label>Title</label>
                   <input placeholder='Title' name='title' value={this.state.issueData.title} onChange={this.onChange} />
                   {this.state.issueError.title}
                 </Form.Field>
                 <label>Description</label>
                 {/* <Form.TextArea label='Wiki' onChange={this.onChange} name='wiki' value={this.state.issueData.wiki}  placeholder='Write about the issue ' /> */}
                 <App onEditorChange={this.handleIssueCreate} />
                 <Form.Group className='inline-options' inline>
                  <label>Type</label>
                   <Form.Field
                     control={Radio}
                     label='FrontEnd'
                     value='1'
                     checked={value === '1'}
                     onChange={this.handleChange}
                   />
                   <Form.Field
                     control={Radio}
                     label='BackEnd'
                     value='2'
                     checked={value === '2'}
                     onChange={this.handleChange}
                   />
                 </Form.Group>
                 <Button
                  positive
                  type='submit'
                  icon='checkmark'
                  content="Create"
                  className='issue-create-button'
                  onClick={(event) => this.onSubmit()}
                  />
               </Form>

               </Modal.Description>
             </Modal.Content>
             <Modal.Actions>
               <Button color='black' onClick={this.close} >
                 Nope
               </Button>
             </Modal.Actions>
           </Modal>
         </div>
           </div>
          </Container>
        )
    }
}

export default Project;