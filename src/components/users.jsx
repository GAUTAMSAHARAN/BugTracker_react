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
            <Container className='box'>
            <Header as='h2'>Users</Header>
            <Divider section />         
            </Container>
        )
    }
}

export default Users;