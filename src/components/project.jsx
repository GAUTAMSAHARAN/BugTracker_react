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


class Project extends Component{

    constructor(props){
        super(props)
        this.state={
             project: [],
             ProjectId: this.props.location.state.ProjectId,
             projectIssues: [],
             teamMembers: [],
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
                {issue.wiki}
            </Card.Description>
            </Card.Content>
              
            <Card.Content extra style={{display: this.state.show ? 'block' : 'none'}} >
    <h3 ><span className='date'>Date</span><span className='date-format'>{issue.upload_time}</span></h3>
            </Card.Content>
     
           </Card>
       );
       return(
         issueList
       )
    }


    deleteProject(){
      const { ProjectId } = this.prope.location.state.ProjectId
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
               <Card.Description>
                 {this.state.project.desc}
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
               <i class="fas fa-pen"></i>
               </div>
               <div className="add">
               <i class="fas fa-plus"></i>
               </div>
               </div>
             </Card.Content>
             <Card.Content extra>
                 <Icon name='user' />
                 {this.state.teamMembers.length} Members
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
                 <Form.TextArea label='Wiki' onChange={this.onChange} name='wiki' value={this.state.issueData.wiki}  placeholder='Write about the issue ' />
                 <Form.Group inline>
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