import React, { Component } from 'react';
import './styles/users.scss';
import { Container, Header, Divider, Card, Icon, Segment, Button } from 'semantic-ui-react';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';


class Users extends Component{
    constructor(props){
       super(props);
       this.state = {
           users: [],
           usersLeft: [],
           usersRight: [],
       }
    }
    
    componentDidMount(){
        fetch('http://127.0.0.1:8000/users/')
         .then(res=>res.json())
         .then(results => {
             console.log(results)
             this.setState({
                 users: results,
                 usersLeft: results.filter(user => user.id%2!=0),
                 usersRight: results.filter(user => user.id%2==0)
             })
             console.log(this.state.users);
             console.log(this.state.usersLeft);
             console.log(this.state.usersRight);
         })
    }

    listUsersodd(){
        let userList = this.state.usersLeft.map((user)=>
        <React.Fragment>
        <Card className='user-card'>
        <Card.Content className='avatar-box'>
           <Avatar className='avatar' name={user.username} />
           <div className="links">
            <Button circular color="facebook" icon="facebook" />
            <Button circular color="twitter" icon="twitter" />
            <Button circular color="instagram" icon="instagram" />
            <Button circular color="google plus" icon="google plus" />
          </div>
        </Card.Content>
        <Card.Content>
    <Card.Header>{user.username}</Card.Header>
        <Link to={{
            pathname: '/user/',
            state: {
              userId: user.id
            }
          }}>
        <i class="fas fa-id-card"></i>
        </Link>
          <Card.Description>
            {user.email}           
          </Card.Description>
        </Card.Content>
      </Card>
      </React.Fragment>
        );
        return(
            userList
        )
    }

    listUserseven(){
        let userList = this.state.usersRight.map((user)=>
        <React.Fragment>
        <Card className='user-card'>
        <Card.Content className='avatar-box'>
           <Avatar className='avatar' name={user.username} />
           <div className="links">
            <Button circular color="facebook" icon="facebook" />
            <Button circular color="twitter" icon="twitter" />
            <Button circular color="instagram" icon="instagram" />
            <Button circular color="google plus" icon="google plus" />
          </div>
        </Card.Content>
        <Card.Content>
        <Card.Header>{user.username}</Card.Header>
        <Link to={{
            pathname: '/user/',
            state: {
              userId: user.id
            }
          }}>
        <i class="fas fa-id-card"></i>
        </Link>
          <Card.Description>
            {user.email}           
          </Card.Description>
        </Card.Content>
      </Card>
      </React.Fragment>
        );
        return(
            userList
        )  
    }

    render(){
        return(  
          <React.Fragment>
            
            <Container className='home-box'>
            <Header as='h2'>Users</Header>
            <Divider section />
            <div className="box">
            <div className='left-card-box'>
                {this.listUsersodd()}
            </div>
            <div className="right-card-box">
                {this.listUserseven()}
            </div>
            </div>
            </Container>
          </React.Fragment>
        )
    }
}

export default Users;