import React, { Component } from "react";
import "./styles/profile.scss";
import {
  Container,
  Header,
  Divider,
  Button,
  Segment,
  Card,
  Icon,
  Menu,
  Form,
} from "semantic-ui-react";
import edit from "./images/edit.png";
import Avatar from 'react-avatar';


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: [],
      activeItem: "Email",
      update: [],
      form: {
        emailForm: true,
        usernameForm: false,
        socailLinkForm: false,
      },
      emailConfirmation: '',
    };
  }

  componentDidMount(){
    const { userId } = this.props.location.state
    console.log(userId);
    fetch(`http://127.0.0.1:8000/users/${userId}/`)
     .then(res=>res.json())
     .then(results=>{
       this.setState({
         profile: results,
         update: results,
       })
     })
  }
   
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if(name === 'Email'){
        this.setState({
          form:{
            emailForm: true,
            usernameForm: false,
            socailLinkForm: false,
          }
        })
    }
    if(name === 'Password'){
      this.setState({
        form: {
        emailForm: false,
        usernameForm: false,
        socailLinkForm: false,
        }
      })
    }
    if(name==='Mobile No'){
      
    }
    if(name === 'Username'){
      this.setState({
        form: {
          emailForm: false,
          usernameForm: true,
          socailLinkForm: false,  
        },
      })

    }if(name === 'Social Link'){
      this.setState({
        form: {
          emailForm: false,
          usernameForm: false,
          socailLinkForm: true, 
        }
      })
    }
  }

  emailUpdate = (e) => {
     const{ name, value } = e.target
     if(name === 'email'){
      this.setState({
        update: {...this.state.update, [name]: value},
      })
     }
     if(name === 'email_confirmation'){
      this.setState({
        emailConfirmation: value,
      })
     }
  }

  async updateEmail(){
    let data = JSON.stringify(this.state.update)
    let UserId  = this.props.location.state.userId
    if(this.state.update.email === this.state.emailConfirmation){
        const response = await fetch(`http://127.0.0.1:8000/users/${UserId}/`,{
          method: 'PUT',
          body: data,
          headers: {
           "Content-type": "application/json; charset=UTF-8",
           'Authorization': `Token ${sessionStorage.getItem('token')}`,  
          },
        });
        console.log(response);
    }else{
      console.log("error");
    }
  }

  usernameUpdate = (e) => {
   const{ name, value } = e.target
   this.setState({
     update: {...this.state.update, [name]: value}
   })
  }

  async updateUsername(){
    let data = JSON.stringify(this.state.update)
    const response = await fetch(`http://127.0.0.1:8000/users/1/`,{
      method: 'PUT',
      body: data,
      headers: {
       "Content-type": "application/json; charset=UTF-8",
       'Authorization': `Token ${sessionStorage.getItem('token')}`,  
      },
    });
    console.log(response);
  }

  linkUpdate = e =>{
    const{ name, value } = e.target
    this.setState({
      update: {...this.state.update, [name]: value}
    })
  }

  async updateSocail(){
    let data = JSON.stringify(this.state.update)
    const response = await fetch(`http://127.0.0.1:8000/users/1/`,{
      method: 'PUT',
      body: data,
      headers: {
       "Content-type": "application/json; charset=UTF-8",
       'Authorization': `Token ${sessionStorage.getItem('token')}`,  
      },
    });
    console.log(response);  
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Container className="box">
        <Header as="h2">Profile</Header>
        <Divider section />
        <Segment className="info">
          <div className="picture">
            <Avatar className='avatar' name={this.state.profile.username} />
          </div>
          <Card className="username">
            <Card.Content>
              <Card.Header>Username</Card.Header>
    <Card.Description>{this.state.profile.username}</Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content className="email">
              <Card.Header>Email</Card.Header>
              <Card.Description>{this.state.profile.email}</Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content className="mobile">
              <Card.Header>Mobile No</Card.Header>
              <Card.Description>{this.state.profile.mobile}</Card.Description>
            </Card.Content>
          </Card>
          <div className="links">
            <Button circular color="facebook" icon="facebook" />
            <Button circular color="twitter" icon="twitter" />
            <Button circular color="instagram" icon="instagram" />
            <Button circular color="google plus" icon="google plus" />
          </div>
        </Segment>
        <div>
          <Menu attached="top" tabular>
            <Menu.Item
              name="Email"
              active={activeItem === "Email"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Mobile No"
              active={activeItem === "Mobile No"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Username"
              active={activeItem === "Username"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Social Link"
              active={activeItem === "Social Link"}
              onClick={this.handleItemClick}
            />
          </Menu>

          <Segment attached="bottom" className="form-segment">
            <Form
              className="email-form"
              style={{ display: this.state.form.emailForm ? "block" : "none" }}
            >
              <Form.Input
                label="Email"
                placeholder="Email"
                name="email"
                value={this.state.update.email}
                onChange={this.emailUpdate}
              />
              <Form.Input
                label="Email Confirmation"
                placeholder="Email"
                name="email_confirmation"
                value={this.state.emailConfirmation}
                onChange={this.emailUpdate}
              />
              <Button
                positive
                type="submit"
                icon="checkmark"
                content="Update"
                onClick={(event) => this.updateEmail()}
                className="email-submit"
              />
            </Form>

            <Form
              className="username-form"
              style={{ display: this.state.form.usernameForm ? "block" : "none" }}
            >
              <Form.Input
                label="Username"
                placeholder="username"
                name="username"
                value={this.state.update.username}
                onChange={this.usernameUpdate}
              />
              <Button
                positive
                type="submit"
                icon="checkmark"
                content="Update"
                onClick={(event) => this.updateUsername()}
                className="username-submit"
              />
            </Form>

            <Form
              className="social-form"
              style={{ display: this.state.form.socailLinkForm ? "block" : "none" }}
            >
              <Form.Input
                label="GitHub"
                placeholder="put your Github profile link here"
                name="gitlink"
                value={this.state.update.gitProfile}
                onChange={this.linkUpdate}
              />
              <Form.Input
                label="Facebook"
                placeholder="put your Facebook profile link here"
                name="facebooklink"
                value={this.state.update.facebookProfile}
                onChange={this.linkUpdate}
              />
              <Form.Input
                label="Twitter"
                placeholder="put your Twitter profile link here"
                name="twitterlink"
                value={this.state.update.twitterProfile}
                onChange={this.linkUpdate}
              />
              <Form.Input
                label="Instagram"
                placeholder="put your Instagram profile link here"
                name="instagramlink"
                value={this.state.update.instaProfile}
                onChange={this.linkUpdate}
              />
              <Button
                positive
                type="submit"
                icon="checkmark"
                content="Update"
                onClick={(event) => this.updateSocial()}
                className="social-submit"
              />
            </Form>
          </Segment>
        </div>
        <Segment className="three-box">
          <div className="projects">
            <h3>No Of Projects</h3>
            <p>12</p>
          </div>
          <div className="issues"></div>
          <div className="comments"></div>
        </Segment>
      </Container>
    );
  }
}

export default Profile;
