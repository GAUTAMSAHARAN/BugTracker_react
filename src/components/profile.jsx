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
  Message,
  Placeholder
} from "semantic-ui-react";
import edit from "./images/edit.png";
import Avatar from 'react-avatar';
import git from './images/githubblack.png';


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null,
      activeItem: "Email",
      update: [],
      updateError:{
        email: '',
        mobileno: '',
        username: '',
        gitlink: '',
        facebooklink: '',
        twitterlink: '',
        instalink: '',
      },
      form: {
        emailForm: true,
        usernameForm: false,
        socailLinkForm: false,
      },
      emailConfirmation: '',
      ProjectCount: '',
      CommentCount: '',
      IssueCount: '',
      success: false,
      successMsg: '',
      fail: false,
      failMsg: '',
    };  
    this.SuccessOn = this.SuccessOn.bind(this);
    this.FailOn = this.FailOn.bind(this);
  }

  componentDidMount(){
    const { UserId } = this.props.location.state
    fetch(`http://127.0.0.1:8000/users/${UserId}/`,{
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Token ${sessionStorage.getItem('token')}`,  
       },
    })
     .then(async response => {
       let data = await response.json()
       if(response.status == 200){
         this.setState({
           profile: data,
           update: data,
         })
       }
     })
     .catch(error=>{
       console.error('There are some error in processing your request. Try again Later.', error)
     })

     fetch(`http://127.0.0.1:8000/projects/?creater=${UserId}`,{
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Token ${sessionStorage.getItem('token')}`,  
       },
     })
      .then(async response => {
        let data = await response.json()
        if(response.status == 200){
            this.setState({
              ProjectCount: data.count
            })
        }
      })
      .catch(error=>{
        this.FailOn('Error in fetch the data. Try again later.')
      })

      fetch(`http://127.0.0.1:8000/issues/?creater=${UserId}`,{
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Token ${sessionStorage.getItem('token')}`,  
         },
      })
      .then(async response =>{
        let data = await response.json()
        if(response.status == 200){
           this.setState({
             IssueCount: data.count
           })
        }
      })
      .catch((error)=>{
        this.FailOn('Error while fetching some data. Try again later!')
      })

      fetch(`http://127.0.0.1:8000/comments/?creater=${UserId}`,{
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Token ${sessionStorage.getItem('token')}`,  
         },
      })
      .then(async response=>{
        let data = await response.json()
        if(response.status == 200){
          this.setState({
            CommentCount: data.count
          })
        }
      })
      .catch(error=>{
        this.FailOn('Error in fetching some of the data. Try again later!')
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
     this.setState({
       updateError: { ...this.state.updateError, email: value.length > 40 ? 'Email is not valid' : ''}
     })
  }

  async updateEmail(){
    let data = JSON.stringify(this.state.update)
    let UserId  = this.props.location.state.userId
    if(this.state.updateError.email === ''){
    if(this.state.update.email === this.state.emailConfirmation){
        const response = await fetch(`http://127.0.0.1:8000/users/${sessionStorage.getItem('UserId')}/`,{
          method: 'PUT',
          body: data,
          headers: {
           "Content-type": "application/json; charset=UTF-8",
           'Authorization': `Token ${sessionStorage.getItem('token')}`,  
          },
        });
        if(response.status == 200){
          this.SuccessOn('Your email address is updated successfully.')
        }else{
          this.FailOn('Error occurs in processing your request. Try again later!')
        }
    }else{
      this.FailOn('Your email is not matching with confirmation email')
    }
    }
  }

  usernameUpdate = (e) => {
   const{ name, value } = e.target
   console.log(value)
   this.setState({
     update: {...this.state.update, [name]: value}
   })
   this.setState({
    updateError: { ...this.state.updateError, username: value.length > 20 ? 'Username must be less than 10 character' : ''}
  })
  }

  async updateUsername(){
    let data = JSON.stringify(this.state.update)
    if(this.state.updateError.username===''){
    const response = await fetch(`http://127.0.0.1:8000/users/${sessionStorage.getItem('UserId')}/`,{
      method: 'PUT',
      body: data,
      headers: {
       "Content-type": "application/json; charset=UTF-8",
       'Authorization': `Token ${sessionStorage.getItem('token')}`,  
      },
    });
    if(response.status == 200){
      this.SuccessOn('Your Username is updated successfully.')
    }else{
      this.FailOn('Error occurs in updating your request. Try again later!')
    }
  }
  }

  linkUpdate = e =>{
    const{ name, value } = e.target
    console.log(name)
    console.log(value)
    this.setState({
      update: {...this.state.update, [name]: value}
    })
    if( name === 'gitlink' ){
      this.setState({
        updateError: {...this.state.updateError, gitlink: value.length > 30 ? 'url is not valid' : ''}
      })
    }
    if( name === 'facebooklink' ){
      this.setState({
        updateError: { ...this.state.updateError, facebooklink: value.length > 30 ? 'url is not valid' : ''}
      })
    }
    if( name=== 'twitterlink' ){
      this.setState({
        updateError: { ...this.state.updateError, twitterlink: value.length > 30 ? 'url is not valid' : ''}
      })
    }
    if( name=== 'instalink' ){
      this.setState({
        updateError: { ...this.state.updateError, instalink: value.length > 30 ? 'url is not valid' : ''}
      })
    }
  }

  async updateSocial(){
    let data = JSON.stringify(this.state.update)
    if(this.state.updateError.username === ''){
    const response = await fetch(`http://127.0.0.1:8000/users/${sessionStorage.getItem('UserId')}/`,{
      method: 'PUT',
      body: data,
      headers: {
       "Content-type": "application/json; charset=UTF-8",
       'Authorization': `Token ${sessionStorage.getItem('token')}`,  
      },
    });
    if(response.status == 200){
       this.SuccessOn('Links has been updated succcessfully.')
    }else{
       this.FailOn('Error occur while updaing. Try again later!')
    }
    }
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

  render() {
    const { activeItem } = this.state;
    if(this.state.profile == null){
      return(
        <Container className='box' >
                     <Header as="h2">Profile</Header>
           <Divider section />
           <Placeholder className='top' fluid >
    <Placeholder.Header image>
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Header>
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>
  </Placeholder>

          <Placeholder fluid className='middle'>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>

          <Placeholder fluid className='middle'>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>

          <Card.Group itemsPerRow={3} className='bottom'>
    <Card>
      <Card.Content>
        <Placeholder>
          <Placeholder.Image rectangular />
        </Placeholder>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Placeholder>
          <Placeholder.Image rectangular />
        </Placeholder>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Placeholder>
          <Placeholder.Image rectangular />
        </Placeholder>
      </Card.Content>
    </Card>
  </Card.Group>

        </Container>
      );
    }else{
      if(this.state.profile.length == 0){
        return(
           <Container className='box' >
             <Card>
               <Card.Content>
               'There are no data avaliable'
               </Card.Content>
             </Card>
           </Container>
        ); 
     }else{
       return (
         <Container className="box">
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
             <a href={this.state.profile.facebookProfile} target="_blank" ><Button circular color="facebook" icon="facebook" style={{display: this.state.profile.facebookProfile === '' ? 'none' : 'inline'}} /></a>
              <a href={this.state.profile.twitterProfile} target="_blank" ><Button circular color="twitter" icon="twitter" style={{display: this.state.profile.twitterProfile === '' ? 'none' : 'inline'}} /> </a>
              <a href={this.state.profile.instaProfile} target="_blank" > <Button circular color="instagram" icon="instagram" style={{display: this.state.profile.instaProfile === '' ? 'none' : 'inline'}} /></a>
              <a href={this.state.profile.gitProfile} target="_blank"> <Button circular color="github" icon="github" style={{display: this.state.profile.gitProfile === '' ? 'none' : 'inline'}} /></a>
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
                 {this.state.updateError.email}
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
                 {this.state.updateError.username}
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
                   name="gitProfile"
                   value={this.state.update.gitProfile}
                   onChange={this.linkUpdate}
                 />
                 { this.state.updateError.gitlink }
                 <Form.Input
                   label="Facebook"
                   placeholder="put your Facebook profile link here"
                   name="facebookProfile"
                   value={this.state.update.facebookProfile}
                   onChange={this.linkUpdate}
                 />
                 { this.state.updateError.facebooklink }
                 <Form.Input
                   label="Twitter"
                   placeholder="put your Twitter profile link here"
                   name="twitterProfile"
                   value={this.state.update.twitterProfile}
                   onChange={this.linkUpdate}
                 />
                 { this.state.updateError.twitterlink }
                 <Form.Input
                   label="Instagram"
                   placeholder="put your Instagram profile link here"
                   name="instaProfile"
                   value={this.state.update.instaProfile}
                   onChange={this.linkUpdate}
                 />
                 { this.state.updateError.instalink}
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
               <p>{this.state.ProjectCount}</p>
             </div>
             <div className="issues">
               <h3>No of Issues</h3>
               <p>{this.state.IssueCount}</p>
             </div>
             <div className="comments">
               <h3>No of comments</h3>
               <p>{this.state.CommentCount}</p>
             </div>
           </Segment>
         </Container>
       );
     }
    }
  }
}

export default Profile;
