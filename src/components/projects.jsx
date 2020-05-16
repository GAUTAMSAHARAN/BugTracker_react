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
} from "semantic-ui-react";
import "./styles/projects.scss";
import github from "./images/githubwhite.png";
import edit from "./images/edit.png";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LatestProject: [],
      myProject: [],
      collabrated: [],
      type: "latest",
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/projects/")
      .then((res) => res.json())
      .then((results) => {
        results = results.results;
        this.setState({
          LatestProject: results,
        });
      });
    fetch("http://127.0.0.1:8000/projects/?member=1")
      .then((res) => res.json())
      .then((results) => {
        results = results.results;
        this.setState({
          collabrated: results,
        });
      });
    fetch("http://127.0.0.1:8000/projects/?creater=1")
      .then((res) => res.json())
      .then((results) => {
        results = results.results;
        this.setState({
          myProject: results,
        });
      });
  }

  ListProject() {
    if (this.state.type === "latest") {
      let projectLists = this.state.LatestProject.map((project) => (
        <Card className="card">
          <CardContent className="settings">
            <div className="gitbox">
              <img src={github} alt="gitlink" className="gitlink" />
            </div>
            <div className="editbox">
              <img src={edit} alt="edit" className="edit" />
            </div>
            <div className="description">{project.desc}</div>
          </CardContent>
          <Card.Content className="info">
            <Card.Header>{project.title}</Card.Header>
          </Card.Content>
          <Card.Content extra>
              <Icon name="user" />
              {project.memebers.length} Members
          </Card.Content>
        </Card>
      ));
      return projectLists;
    }
    if (this.state.type === "myprojects") {
      let projectLists = this.state.LatestProject.map((project) => (
        <Card className="card">
          <CardContent className="settings">
            <div className="gitbox">
              <img src={github} alt="gitlink" className="gitlink" />
            </div>
            <div className="editbox">
              <img src={edit} alt="edit" className="edit" />
            </div>
            <div className="description">{project.desc}</div>
          </CardContent>
          <Card.Content className="info">
            <Card.Header>{project.title}</Card.Header>
          </Card.Content>
          <Card.Content extra>
              <Icon name="user" />
              {project.memebers.length} Members
          </Card.Content>
        </Card>
      ));
      return projectLists;
    }
    if (this.state.type === "collabrated") {
      let projectLists = this.state.LatestProject.map((project) => (
        <Card className="card">
          <CardContent className="settings">
            <div className="gitbox">
              <img src={github} alt="gitlink" className="gitlink" />
            </div>
            <div className="editbox">
              <img src={edit} alt="edit" className="edit" />
            </div>
            <div className="description">{project.desc}</div>
          </CardContent>
          <Card.Content className="info">
            <Card.Header>{project.title}</Card.Header>
          </Card.Content>
          <Card.Content extra>
              <Icon name="user" />
              {project.memebers.length} Members
          </Card.Content>
        </Card>
      ));
      return projectLists;
    }
  }

  updateType(input){
    if(input==="latest"){
       this.setState({
          type: "latest"
       })
    }
    if(input==="myprojects"){
      this.setState({
        type: "myprojects"
     })
    }
    if(input==="collabrated"){
      this.setState({
        type: "collabrated"
     })
    }
  }

  render() {
    return (
      <Container className="box">
        <Header as="h2">Projects</Header>
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
      </Container>
    );
  }
}

export default Projects;
