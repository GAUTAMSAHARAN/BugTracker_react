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
  Pagination,
} from "semantic-ui-react";
import "./styles/projects.scss";
import github from "./images/githubwhite.png";
import edit from "./images/edit.png";
import { Link } from 'react-router-dom';
import App from './editor';
import PaginationCard from "./pagination";
import Pluralize from 'react-pluralize';

const validGitUrlRegex = RegExp(
  /^(?:git|ssh|https?|git@[-\w.]+):(\/\/)(github\.com)\/(\w{1,})\/(\w{1,})\/?$/
);

class ProjectCard extends Component{
  render(){
    const { project} = this.props
    return(
        <React.Fragment>
        <Card className="project-card">
        <Card.Content className='information-box'>
          <div className="info-box">
          <div className="gitbox">
            <img src={github} alt="gitlink" className="gitlink" style={{display: project.gitLink === '' ? 'none' : 'inline'}} />
          </div>
          <div className="wiki"><div dangerouslySetInnerHTML={{__html: project.desc}} /></div>
          </div>
        </Card.Content>

        <Link to={{
            pathname: '/app/project/',
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
            <Pluralize singular={'member'} count={project.memebers.length} />
        </Card.Content>
      </Card>
        </React.Fragment>
    )
  }
}

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: '',
      Projects: [],
      type: "latest",
      values: {
        title: '',
        desc: '',
        gitlink: '',
        creater: parseInt(sessionStorage.getItem('UserId')),
        memebers: [parseInt(sessionStorage.getItem('UserId'))],
      },
      projectError: {
        title: '',
        gitlink: '',
      },
      currentUrl: 'http://127.0.0.1:8000/projects/?page=1'
    };
    this.sendData = this.sendData.bind(this)
    this.currentUrl = this.currentUrl.bind(this)
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/projects/?page=1&ordering=upload_time", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Token ${sessionStorage.getItem('token')}`,  
       },
    })
      .then((res) => res.json())
      .then((results) => {
        this.setState({
            count: results.count,
        })
        results = results.results
        this.setState({
          Projects: results,
          open: false,
        });
      });
  }

  sendData(data){
    this.setState({
     Projects: data,
    })
  }

  currentUrl(data){
   this.setState({
     currentUrl: data,
   })
  }

  updateProjects(type){
    let UserId = parseInt(sessionStorage.getItem('UserId'))
    console.log(UserId)
    let base_url = 'http://127.0.0.1:8000/projects/?'
    switch(type){
      case "latest":
        base_url += 'page=1&ordering=upload_time'
        break
      case "myprojects":
        base_url += `creater=${UserId}&ordering=desc&upload_time=`
        break
      case "collabrated":
        base_url += `creater=&memebers=${UserId}&upload_time=`
        break
      default:
        base_url += 'page=1&ordering=upload_time'
        break    
    }
    console.log(base_url)
    fetch(base_url,{
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Token ${sessionStorage.getItem('token')}`,  
       },
    })
     .then(res=>res.json())
     .then(results=>{
       results = results.results
       this.setState({
         Projects: results
       })
     })
  }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

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
       console.log(body);
       this.close()
  }

  ListProject() {
    let projectLists = this.state.Projects.map((project) => 
       <ProjectCard project={project} />
    );
    return(
        projectLists
    );
  }


  
  
  onChange = e => {
    const { name, value } = e.target
    this.setState({
      values: { ...this.state.values, [name]: value }
    })
    if(name==='title'){
          this.setState({
            projectError: {...this.state.projectError, title: value.length > 40 ? 'title must be less than 40 characters.' : ''}
          })
    }
    if(name==='gitlink'){
        this.setState({
          projectError: { ...this.state.projectError, gitlink: validGitUrlRegex.test(value) ? '' : 'Url is not valid!'}
        })
    }
  }

  onSubmit = e => {
     let data = JSON.stringify(this.state.values)
    //  console.log(data);
     this.createProject(data);
  }

  handleProjectCreate = (content) => {
    this.setState({
      values: { ...this.state.values, desc: content }
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
            <Button color="teal" basic onClick={(event)=>this.updateProjects('latest')}>
              Latest
            </Button>
            <Button color="blue" basic onClick={(event)=>this.updateProjects("myprojects")}>
              MyProjects
            </Button>
            <Button color="green" basic onClick={(event)=>this.updateProjects("collabrated")}>
              Collabrated
            </Button>
          </Button.Group>
        </Segment>
        <Divider section />

        <div className='projects-list'>
        {this.ListProject()}
        </div>
        
        <PaginationCard sendData={this.sendData} url={this.state.currentUrl} currentUrl={this.currentUrl} count={this.state.count} />
        <Divider section />


        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Create New Project</Modal.Header>
          <Modal.Content image>
            <Modal.Description>

               <Form> 
                 <Form.Field>
                   <label>Title</label>
                   <input placeholder='Title' name='title' value={this.state.title} onChange={this.onChange} />
                   {this.state.projectError.title}
                 </Form.Field>
                 {/* <Form.TextArea label='Descrpition' onChange={this.onChange} name='desc' value={this.state.desc}  placeholder='Write short description about the project  ' /> */}
                 <App onEditorChange={this.handleProjectCreate} placeholder='write a short description of your project' initialValue='' />
                 <Form.Field className='link' >
                   <label>Git Link</label>
                   <input placeholder='Git Link' name='gitlink' onChange={this.onChange} value={this.state.gitlink} />
                   {this.state.projectError.gitlink}
                 </Form.Field>
                 <Button
                  positive
                  type='submit'
                  icon='checkmark'
                  content="Create"
                  className='create-project-button'
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

export { ProjectCard }
export default Projects;


