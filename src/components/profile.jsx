import React, {Component} from 'react';
import './styles/profile.scss';
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
import edit from './images/edit.png';

class Profile extends Component{

    constructor(props){
       super(props)

       this.state={
           activeItem: 'Email'
       }

    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render(){
        const { activeItem } = this.state
    
        return(
            <Container className='box'>
            <Header as='h2'>Profile</Header>
            <Divider section /> 
            <Segment className='info'>
              <div className="picture"></div>
              <Card className='username'>
                <Card.Content>
                    <Card.Header>Username</Card.Header>
                    <Card.Description>gautam</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content className='email'>
                    <Card.Header>Email</Card.Header>
                    <Card.Description>gsooouuu@gmail.com</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content className='mobile'>
                    <Card.Header>Mobile No</Card.Header>
                    <Card.Description>7727021196</Card.Description>
                </Card.Content>
              </Card>
              <div className="links">
              <Button circular color='facebook' icon='facebook' />
              <Button circular color='twitter' icon='twitter' />
              <Button circular color='instagram' icon='instagram' />
              <Button circular color='google plus' icon='google plus' />
              </div>
            </Segment>
            <div>
               <Menu attached='top' tabular>
                 <Menu.Item
                   name='Email'
                   active={activeItem === 'Email'}
                   onClick={this.handleItemClick}
                 />
                 <Menu.Item
                   name='Password'
                   active={activeItem === 'Password'}
                   onClick={this.handleItemClick}
                 />
                 <Menu.Item
                   name='Mobile No'
                   active={activeItem === 'Mobile No'}
                   onClick={this.handleItemClick}
                 />
                 <Menu.Item
                   name='Username'
                   active={activeItem === 'Username'}
                   onClick={this.handleItemClick}
                 />
                 <Menu.Item
                   name='Social Link'
                   active={activeItem === 'Social Link'}
                   onClick={this.handleItemClick}
                 />
               </Menu>
       
               <Segment attached='bottom' className='form-sagment'>
               </Segment>
             </div>
            <Segment className='three-box'>
              <div className="projects">
                  <h3>No Of Projects</h3>
                  <p>12</p>
              </div>
              <div className="issues"></div>
              <div className="comments"></div>
            </Segment>         
            </Container>
        )
    }
}

export default Profile