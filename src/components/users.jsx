import React, { Component } from 'react';
import './styles/users.scss';
import { Container, Header, Divider, Card, Icon, Segment, Button, CardContent } from 'semantic-ui-react';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

class UserCard extends Component{
     
     constructor(props){
       super(props)
       this.state={
         editOpen: false,
         block: this.props.user.disable,
         boss: this.props.user.boss,
       }
       this.openEdit = this.openEdit.bind(this)
     }

     openEdit(){
       this.setState({
         editOpen: this.state.editOpen ? false : true
       })
     }

     lock(){
       this.setState({
         block: true, 
       })
       this.props.UserBlock(this.props.user.id)
     }

     unlock(){
       this.setState({
         block: false
       })
       this.props.UserOpen(this.props.user.id)
     }

     makeBoss(){
       this.setState({
         boss: true,
       })
       this.props.MakeUserBoss(this.props.user.id)
     }

     unmakeBoss(){
       this.setState({
         boss: false
       })
       this.props.UnMakeUserBoss(this.props.user.id)
     }

     render(){
       const {user} = this.props
       return(
         <React.Fragment>
        <Card className='user-card'>
        <Card.Content className='avatar-box' style={{display: this.state.editOpen ? 'none' : 'block'}}>
           <i class="fa fa-pen" onClick={(event)=>this.openEdit()}></i>
           <Link to={{
            pathname: '/app/user/',
            state: {
              UserId: user.id
            }
          }}>
           <Avatar className='avatar' name={user.username} />
        </Link>
           <div className="links">
           <a href={user.facebookProfile} target="_blank" ><Button circular color="facebook" icon="facebook" style={{display: user.facebookProfile === '' ? 'none' : 'inline'}} /></a>
           <a href={user.twitterProfile} target="_blank" ><Button circular color="twitter" icon="twitter" style={{display: user.twitterProfile === '' ? 'none' : 'inline'}} /> </a>
           <a href={user.instaProfile} target="_blank" > <Button circular color="instagram" icon="instagram" style={{display: user.instaProfile === '' ? 'none' : 'inline'}} /></a>
           <a href={user.gitProfile} target="_blank"> <Button circular color="google plus" icon="google plus" style={{display: user.gitProfile === '' ? 'none' : 'inline'}} /></a>
          </div>
        </Card.Content>
        <CardContent className='avatar-box' style={{display: this.state.editOpen ? 'block' : 'none'}}>
        <i class="fa fa-times" onClick={(event)=>this.openEdit()}></i>
        <div className="flex-box">
        <div className="block" style={{display: this.state.block ? 'none' : 'inline'}} onClick={(event)=>this.lock()} >
        <i class="fas fa-unlock"></i>
        </div>
        <div className="block-active" style={{display: this.state.block ? 'inline' : 'none'}} onClick={(event)=>this.unlock()} >
        <i class="fas fa-lock"></i>
        </div>
        <div className="boss" style={{display: this.state.boss ? 'none' : 'inline'}} onClick={(event)=>this.makeBoss()} >
        <i class="fas fa-crown"></i>
        </div>
        <div className="boss-acitve" style={{display: this.state.boss ? 'inline' : 'none'}} onClick={(event)=>this.unmakeBoss()} >
        <i class="fas fa-crown"></i>
        </div>
        </div>
        </CardContent>
        <Card.Content>
        <Card.Header>{user.username}</Card.Header>
          <Card.Description>
            {user.email}
          </Card.Description>
        </Card.Content>
      </Card>
         </React.Fragment>
       )
     }
}

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
           value2: {
             boss: false,
           }
       }
       this.UserBlock = this.UserBlock.bind(this)
       this.UserOpen = this.UserOpen.bind(this)
       this.MakeUserBoss = this.MakeUserBoss.bind(this)
       this.UnMakeUserBoss = this.UnMakeUserBoss.bind(this)
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

    async UserBlock(id){
         await this.setState({
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

    async UserOpen(id){
      await this.setState({
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

    async MakeUserBoss(id){
      await this.setState({
        value2: {
          boss: false,
        }
      })
    console.log(this.state.value2.boss)
    let data = JSON.stringify(this.state.value2)
    let response = fetch(`http://127.0.0.1:8000/users/${id}/`,{
     method: 'PATCH', body: data,
     headers: {
         "Content-type": "application/json; charset=UTF-8",
         'Authorization': `Token ${sessionStorage.getItem('token')}`,
     },
   })
   console.log(response)
    }

    async UnMakeUserBoss(id){
      await this.setState({
        value2: {
          boss: false,
        }
      })
    console.log(this.state.value2.boss)
    let data = JSON.stringify(this.state.value2)
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
        <UserCard user={user} UserBlock={this.UserBlock} UserOpen={this.UserOpen} MakeUserBoss={this.MakeUserBoss} UnMakeUserBoss={this.UnMakeUserBoss} />
        );
        return(
            userList
        )
    }

    listUserseven(){
        let userList = this.state.usersRight.map((user)=>
        <UserCard user={user} UserBlock={this.UserBlock} UserOpen={this.UserOpen} MakeUserBoss={this.MakeUserBoss} UnMakeUserBoss={this.UnMakeUserBoss} />
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
