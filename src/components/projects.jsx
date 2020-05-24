import React, { Component } from "react";
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
  Modal,    
  Form,
} from "semantic-ui-react";
import "./styles/projects.scss";
import github from "./images/githubwhite.png";
import edit from "./images/edit.png";
import { Link } from 'react-router-dom';
import App from './editor';


class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Projects: [],
      type: "latest",
      values: {
        title: '',
        desc: '',
        gitlink: '',
        creater: '1',
        memebers: [1],
      },
      up: false, 
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/projects/")
      .then((res) => res.json())
      .then((results) => {
        this.setState({
          Projects: results,
          open: false,
        });
      });
  }

  updateProjects(){
    let type = this.state.type
    let base_url = 'http://127.0.0.1:8000/projects/'
    switch(type){
      case "latest":
        base_url += ''
        break
      case "myprojects":
        base_url += ''
        break
      case "collabrated":
        base_url += ''
        break
      default:
        base_url += ''
        break    
    }
    fetch(base_url)
     .then(res=>res.join())
     .then(results=>{
       this.setState({
         Projects: results
       })
     })
  }

  async createProject(body){
       const response = await fetch('http://127.0.0.1:8000/projects/',{
         method: 'POST',
         body: body,
         headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Token ${sessionStorage.getItem('token')}`,  
         },
       });
       console.log(response);
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

  ListProject() {
    let projectLists = this.state.Projects.map((project) => 
      <Card className="project-card">
        <Card.Content className='information-box'>
          <div className="info-box">
          <div className="editbox">
            <img src={edit} alt="edit" className="edit" onClick={(event)=>this.up()} />
          </div>
          
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
          </div>

          <div className="gitbox">
            <img src={github} alt="gitlink" className="gitlink" />
          </div>
          <div className="wiki"><div dangerouslySetInnerHTML={{__html: project.desc}} /></div>
          </div>
        </Card.Content>

        <Link to={{
            pathname: '/project/',
            state: {
              ProjectId: project.id
            }
          }}>
        <Card.Content className="info">
          <Card.Header className='project-heading'>{project.title}</Card.Header>
        </Card.Content>
        </Link>
        <Card.Content extra>
            <Icon name="user" />
            {project.memebers.length} Members
        </Card.Content>
      </Card>
    );
    return(
        projectLists
    );
  }

  updateType(input){
       this.setState({
          type: input
       })
       this.updateProjects()
  }
  
  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })
  
  onChange = e => {
    const { name, value } = e.target
    this.setState({
      values: { ...this.state.values, [name]: value }
    })
  }

  onSubmit = e => {
     let data = JSON.stringify(this.state.values)
    //  console.log(data);
     this.createProject(data);
  }

  handleProjectCreate = (content) => {
    this.setState({
        values: {
          desc: content,
        }
    })
  }

  render() {
    const { open, dimmer } = this.state
    return (
      <Container className="project-box">
        <Header as="h2" className='projects-header'>Projects<Button className='add-button' onClick={this.show('blurring')}><i class="fas fa-plus"></i></Button></Header>
        <Divider section />
        <Segment className="segment">
          <Button.Group className="option-2">
            <Button color="teal" basic onClick={(event)=>this.updateType('latest')}>
              Latest
            </Button>
            <Button color="blue" basic onClick={(event)=>this.updateType("myprojects")}>
              MyProjects
            </Button>
            <Button color="green" basic onClick={(event)=>this.updateType("collabrated")}>
              Collabrated
            </Button>
          </Button.Group>
        </Segment>
        <Divider section />
        {this.ListProject()}

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Create New Project</Modal.Header>
          <Modal.Content image>
            <Modal.Description>

               <Form> 
                 <Form.Field>
                   <label>Title</label>
                   <input placeholder='Title' name='title' value={this.state.title} onChange={this.onChange} />
                 </Form.Field>
                 {/* <Form.TextArea label='Descrpition' onChange={this.onChange} name='desc' value={this.state.desc}  placeholder='Write short description about the project  ' /> */}
                 <App onEditorChange={this.handleProjectCreate} placeholder='write a short description of your project' initialValue='' />
                 <Form.Field className='link' >
                   <label>Git Link</label>
                   <input placeholder='Git Link' name='gitlink' onChange={this.onChange} value={this.state.gitlink} />
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
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>

      </Container>
    );
  }
}

export default Projects;


