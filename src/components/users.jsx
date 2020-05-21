import React, { Component } from 'react';
import './styles/users.scss';
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


class Users extends Component{
    render(){
        return(
            <React.Fragment>
            <Container className='users-box'>
            <Header as='h2'>Users</Header>
            <Divider section /> 
            </Container>        
            </React.Fragment>
        )
    }
}

export default Users;