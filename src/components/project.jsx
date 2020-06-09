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
    List
  } from "semantic-ui-react";
import github from "./images/githubwhite.png";
import edit from "./images/edit.png";
import { Link } from 'react-router-dom';
import moment from 'moment';
import App from './editor';
import Avatar from 'react-avatar';
import { IssueCard } from './home';

const validGitUrlRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
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
             projectIssues: [],
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
               project: this.props.location.state.ProjectId,
               creater: parseInt(sessionStorage.getItem('UserId')),
               status: 'P',
             },
             issueError: {
               title: '',
               wiki: '',   
               type: '',            
             },
             up: false,
             form: false,
             deleteMember: false,
        }
        this.Show = this.Show.bind(this)
    }

    componentDidMount(){
      const { ProjectId } = this.props.location.state
      fetch(`http://127.0.0.1:8000/projects/${ProjectId}/`,{
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Token ${sessionStorage.getItem('token')}`,  
         },
      })
       .then(res=> res.json())
       .then(results=> {
         this.setState({
           project: results,
           update: results,
           members: results.memebers,
         })
         console.log(sessionStorage.getItem('UserId'))
         console.log(this.state.members)
       })

       fetch(`http://127.0.0.1:8000/projects/${ProjectId}/issues/`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Token ${sessionStorage.getItem('token')}`,  
         },
       })
        .then(res => res.json())
        .then(results => {
          this.setState({
            projectIssues: results,
          })  
        })

        fetch(`http://127.0.0.1:8000/projects/${ProjectId}/members/`,{
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Token ${sessionStorage.getItem('token')}`,  
           },
        })
         .then(res=>res.json())
         .then(results=> {
           this.setState({
             teamMembers: results,
           })
         })

        fetch('http://127.0.0.1:8000/users/', {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Token ${sessionStorage.getItem('token')}`,  
           },
        })
        .then(res => res.json())
        .then(results => {
          this.setState({
            users: results
          })
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
       let issueList = this.state.projectIssues.map((issue)=>
            <IssueCard issue={issue} />
       );
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
      .then(res => res.json())
      .then(res=> console.log(res))
    }

    async createIssue(data){
      console.log(data);
      const response = await fetch('http://127.0.0.1:8000/issues/',{
        method: 'POST',
        body: data,
        headers: {
         "Content-type": "application/json; charset=UTF-8",
         'Authorization': `Token ${sessionStorage.getItem('token')}`,  
        },
      });
      console.log(response);
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
       let {title, wiki} = this.state.issueError 
       let data = JSON.stringify(this.state.issueData)
       if(title==='' && wiki===''){
       this.createIssue(data);
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

    updateProject(){
      let data = JSON.stringify(this.state.update)
      console.log(data)
      let response = fetch(`http://127.0.0.1:8000/projects/${this.state.project.id}/`,{
        method: 'PUT',
        body: data,
        headers: {
         "Content-type": "application/json; charset=UTF-8",
         'Authorization': `Token ${sessionStorage.getItem('token')}`,  
        },
      })
      this.setState({
        project: this.state.update
      })
      console.log(response);
      this.up()
      this.closeForm()
    }


    handleEditorUpdate = (content) =>{
      this.setState({
        update: {...this.state.update, desc: content},
      })
      this.setState({
        updateError: { ...this.state.updateError, desc: content.length > 500 ? 'description must be less than 500 characters' : ''}
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
      console.log(this.state.project)
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
       let  memberList = this.state.teamMembers.map((member) =>
             <MemberCard member={member} delete={this.state.deleteMember} deleteMemberId = {this.deleteMemberId} />
      )      
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
                 {this.state.teamMembers.length} Members
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
           { this.state.updateError.desc }
           <Form.Input label='Gitlink of the project'  name='gitlink' value={this.state.update.gitLink} onChange={this.onUpdate}  /> 
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
                 {this.state.issueError.wiki}
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
                 <Form.Field>
                   <Checkbox  onChange={(e, data) => this.handleCheckBox(e, data.value)} label='Important' />
                 </Form.Field>
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
           </div>
          </Container>
        )
    }
}

export default Project;