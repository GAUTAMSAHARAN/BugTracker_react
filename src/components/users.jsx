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
           Boss: false,
           value: {
             disable: false,
           },
       }
    }

    componentDidMount(){
      console.log(this.state.value.disable)

        fetch('http://127.0.0.1:8000/users/',{
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Token ${sessionStorage.getItem('token')}`,  
           },
        })
         .then(res=>res.json())
         .then(results => {
             results = results.results
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

    UserBlock(id){
         this.setState({
           value: {
             disable: true,
           },
         })
         console.log(this.state.value.disable)
         let data = JSON.stringify(this.state.value)
         let response = fetch(`http://127.0.0.1:8000/users/${id}/`,{
          method: 'PATCH', body: data,
          headers: {
              "Content-type": "application/json; charset=UTF-8",
              'Authorization': `Token ${sessionStorage.getItem('token')}`,
          },
        })
        console.log(response)
    
    }

    UserOpen(id){
       this.setState({
         value: {
           disable: false,
         }
       })
     console.log(this.state.value.disable)
     let data = JSON.stringify(this.state.value)
     let response = fetch(`http://127.0.0.1:8000/users/${id}/`,{
      method: 'PATCH', body: data,
      headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Token ${sessionStorage.getItem('token')}`,
      },
    })
    console.log(response)
    }

    listUsersodd(){
        let userList = this.state.usersLeft.map((user)=>
        <React.Fragment>
        <Card className='user-card'>
        <Card.Content className='avatar-box'>
        <i class="fa fa-unlock-alt" onClick={(event)=>this.UserBlock(user.id) } style={{display: this.state.value.disable ? 'none' : 'inline'}}  ></i>
        <i class="fa fa-lock" style={{display: this.state.value.disable ? 'inline' : 'none'}} onClick={(event)=>this.UserOpen(user.id) } ></i>   
           <Avatar className='avatar' name={user.username} />
           <div className="links">
           <a href={user.facebookProfile} target="_blank" ><Button circular color="facebook" icon="facebook" style={{display: user.facebookProfile === '' ? 'none' : 'inline'}} /></a>
           <a href={user.twitterProfile} target="_blank" ><Button circular color="twitter" icon="twitter" style={{display: user.twitterProfile === '' ? 'none' : 'inline'}} /> </a>
           <a href={user.instaProfile} target="_blank" > <Button circular color="instagram" icon="instagram" style={{display: user.instaProfile === '' ? 'none' : 'inline'}} /></a>
           <a href={user.gitProfile} target="_blank"> <Button circular color="google plus" icon="google plus" style={{display: user.gitProfile === '' ? 'none' : 'inline'}} /></a>
          </div>
        </Card.Content>
        <Card.Content>
        <Card.Header>{user.username}</Card.Header>
        <Link to={{
            pathname: '/app/user/',
            state: {
              UserId: user.id
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
        <i class="fa fa-unlock-alt"></i>
           <Avatar className='avatar' name={user.username} />
           <div className="links">
           <a href={user.facebookProfile} target="_blank" ><Button circular color="facebook" icon="facebook" style={{display: user.facebookProfile === '' ? 'none' : 'inline'}} /></a>
           <a href={user.twitterProfile} target="_blank" ><Button circular color="twitter" icon="twitter" style={{display: user.twitterProfile === '' ? 'none' : 'inline'}} /> </a>
           <a href={user.instaProfile} target="_blank" > <Button circular color="instagram" icon="instagram" style={{display: user.instaProfile === '' ? 'none' : 'inline'}} /></a>
           <a href={user.gitProfile} target="_blank"> <Button circular color="google plus" icon="google plus" style={{display: user.gitProfile === '' ? 'none' : 'inline'}} /></a>
          </div>
        </Card.Content>
        <Card.Content>
        <Card.Header>{user.username}</Card.Header>
        <Link to={{
            pathname: '/user/',
            state: {
              UserId: user.id
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
