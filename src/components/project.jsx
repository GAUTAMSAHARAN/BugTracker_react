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
    Modal,
    List,
    Form,
    Radio,
    Checkbox,
  } from "semantic-ui-react";
import github from "./images/githubwhite.png";
import edit from "./images/edit.png";
import { Link } from 'react-router-dom';
import moment from 'moment';
import App from './editor';



class Project extends Component{

    constructor(props){
        super(props)
        this.state={
             project: [],
             ProjectId: this.props.location.state.ProjectId,
             projectIssues: [],
             teamMembers: [],
             update: [],
             show: false,
             open: false, 
             issueData: {
               title: '',
               wiki: '',
               important: true,
               type: '',
               project: this.props.location.state.ProjectId,
               creater: 1,
               status: 'P',
             },
             up: false,
             form: false,
        }
        this.Show = this.Show.bind(this)
    }

    componentDidMount(){
      const { ProjectId } = this.props.location.state
      fetch(`http://127.0.0.1:8000/projects/${ProjectId}/`)
       .then(res=> res.json())
       .then(results=> {
         this.setState({
           project: results,
           update: results,
         })
       })

       fetch(`http://127.0.0.1:8000/projects/${ProjectId}/issues/`)
        .then(res => res.json())
        .then(results => {
          this.setState({
            projectIssues: results,
          })  
        })

        fetch(`http://127.0.0.1:8000/projects/${ProjectId}/members/`)
         .then(res=>res.json())
         .then(results=> {
           this.setState({
             teamMembers: results,
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
            <Card fluid color='red' className="issue" key={issue.id}>
              
            <Card.Content className='card-content-1'>
              {show ? (
                 <i class="fas fa-minus" onClick={(event)=> this.Show()} ></i>
               ) : (
                <i class="fas fa-plus" onClick={(event)=> this.Show()} ></i>
               )
              }
            <Card.Header className='header'>
               {issue.title}
            </Card.Header>
            <Link to={{
              pathname: '/issue/',
              state: {
                IssueId: issue.id
              }
            }}>
            <i class="fas fa-reply"></i>
            </Link>
            </Card.Content>
     
            <Card.Content  className='card-content-2' style={{display: this.state.show ? 'block' : 'none' }} >
            <Card.Description className='description'>
              <div dangerouslySetInnerHTML={{__html: issue.wiki}} />
            </Card.Description>
            </Card.Content>
              
            <Card.Content extra style={{display: this.state.show ? 'block' : 'none'}} >
    <h3 ><span className='date'>Date</span><span className='date-format'>{moment(issue.upload_time).fromNow()}</span></h3>
            </Card.Content>
     
           </Card>
       );
       return(
         issueList
       )
    }


    deleteProject(){
      const { ProjectId } = this.props.location.state.ProjectId
      fetch(`http://127.0.0.1:8000/projects/${ProjectId}/`,{
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
    }
  
    onSubmit = e => {
       let data = JSON.stringify(this.state.issueData)
       this.createIssue(data);
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
    }

    updateProject(){
      const { ProjectId } = this.props.location.state.ProjectId
      let data = JSON.stringify(this.state.update)
      let response = fetch(`http://127.0.0.1:8000/projects/${ProjectId}/`,{
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
    }


    render(){
      const { open, dimmer, value } = this.state

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
             <a><img src={github} alt='gitlink' className='gitlink' /></a>
               <img src={edit} alt='edit' className='edit' onClick={(event)=> this.up()} />
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
               <div className="add">
               <i class="fas fa-plus"></i>
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
           {/* <Form.TextArea label='Wiki' onChange={this.onChange} name='wiki' value={this.state.update.desc}  placeholder='Write about the issue ' /> */}
           <App onEditorChange={this.handleEditorUpdate} />
           <Form.Input label='Gitlink of the project'  name='gitlink' value={this.state.update.gitLink} onChange={this.onUpdate}  /> 
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
         <i class="fas fa-plus" onClick={this.show('blurring')} ></i>
         </div>

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