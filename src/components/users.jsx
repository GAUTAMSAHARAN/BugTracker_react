import React, { Component } from 'react';
import './styles/users.scss';
import { Container, Header, Divider, Card, Icon, Segment, Button, CardContent, Message } from 'semantic-ui-react';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import PaginationCard from "./pagination";
import Pluralize from 'react-pluralize';
import LargePlaceHolder from './largeplaceholder';
import SmallPlaceHolder from './smallplaceholder';

class UserCard extends Component{
     
     constructor(props){
       super(props)
       this.state={
         editOpen: false,
         block: this.props.user.disable,
         boss: this.props.user.boss,
         admin: sessionStorage.getItem('admin')
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
       this.props.UserBlock(this.props.user.id, this.props.user.username)
     }

     unlock(){
       this.setState({
         block: false
       })
       this.props.UserOpen(this.props.user.id, this.props.user.username)
     }

     makeBoss(){
       this.setState({
         boss: true,
       })
       this.props.MakeUserBoss(this.props.user.id, this.props.user.username)
     }

     unmakeBoss(){
       this.setState({
         boss: false
       })
       this.props.UnMakeUserBoss(this.props.user.id, this.props.user.username)
     }

     render(){
       const {user} = this.props
       return(
         <React.Fragment>
        <Card className='user-card'>
        <Card.Content className='avatar-box' style={{display: this.state.editOpen ? 'none' : 'block'}}>
           <i class="fa fa-pen" style={{display: this.state.admin == 'true' ? 'inline' : 'none'}} onClick={(event)=>this.openEdit()}></i>
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
           usersLeft: null,
           usersRight: null,
           Boss: false,
           value: {
             disable: false,
           },
           value2: {
             boss: false,
           },
           currentUrl: 'http://127.0.0.1:8000/users/?page=1',
           count: '',
           success: false,
           successMsg: '',
           fail: false,
           failMsg: '',
       }
       this.UserBlock = this.UserBlock.bind(this)
       this.UserOpen = this.UserOpen.bind(this)
       this.MakeUserBoss = this.MakeUserBoss.bind(this)
       this.UnMakeUserBoss = this.UnMakeUserBoss.bind(this)
    }

    componentDidMount(){
      console.log(this.state.value.disable)

        fetch('http://127.0.0.1:8000/users/?page=1',{
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Token ${sessionStorage.getItem('token')}`,  
           },
        })
         .then(async response=>{
              let results = await response.json()
              this.setState({
                count: results.count,
              })
              results = results.results
              if(response.status == 200){
                this.setState({
                    users: results,
                    usersLeft: results.filter(user => user.id%2!=0),
                    usersRight: results.filter(user => user.id%2==0),
                })
              }
         })
         .catch(error=>{
           console.error('There are some error', error);
         })
    }

    async UserBlock(id, name){
         await this.setState({
           value: {
             disable: true,
           },
         })
         console.log(this.state.value.disable)
         let data = JSON.stringify(this.state.value)
         let response = await fetch(`http://127.0.0.1:8000/users/${id}/`,{
          method: 'PATCH', body: data,
          headers: {
              "Content-type": "application/json; charset=UTF-8",
              'Authorization': `Token ${sessionStorage.getItem('token')}`,
          },
        })
        if(response.status == 200){
          this.SuccessOn(`${name} is successfully disable from this webapp.`)
        }else{
          this.FailOn('Error occur in proccessing your request. Try again later!')
        }

    
    }

    async UserOpen(id, name){
      await this.setState({
         value: {
           disable: false,
         }
       })
     console.log(this.state.value.disable)
     let data = JSON.stringify(this.state.value)
     let response = await fetch(`http://127.0.0.1:8000/users/${id}/`,{
      method: 'PATCH', body: data,
      headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Token ${sessionStorage.getItem('token')}`,
      },
    })
    if(response.status==200){
      this.SuccessOn(`${name} is now eligible for this webapp.`)
    }else{
      this.FailOn('Error occur in processing your request. Try again later!')
    }
    console.log(response)
    }

    async MakeUserBoss(id, name){
      await this.setState({
        value2: {
          boss: false,
        }
      })
    console.log(this.state.value2.boss)
    let data = JSON.stringify(this.state.value2)
    let response = await fetch(`http://127.0.0.1:8000/users/${id}/`,{
     method: 'PATCH', body: data,
     headers: {
         "Content-type": "application/json; charset=UTF-8",
         'Authorization': `Token ${sessionStorage.getItem('token')}`,
     },
   })
   if(response.status == 200){
    this.SuccessOn(`${name} has been successfully become master.`)
  }else{
    this.FailOn('Error occur while proccessing your request. Try again later!')
  }
   console.log(response)
    }

    async UnMakeUserBoss(id, name){
      await this.setState({
        value2: {
          boss: false,
        }
      })
    console.log(this.state.value2.boss)
    let data = JSON.stringify(this.state.value2)
    let response = await fetch(`http://127.0.0.1:8000/users/${id}/`,{
     method: 'PATCH', body: data,
     headers: {
         "Content-type": "application/json; charset=UTF-8",
         'Authorization': `Token ${sessionStorage.getItem('token')}`,
     },
   })
   if(response==200){
    this.SuccessOn(`${name} has been removed from master class.`)
  }else{
    this.FailOn('Error occur while proccessing your request. Try again later!')
  }
   console.log(response)
    }

    listUsersodd(){
        let userList = ''
        if(this.state.usersLeft == null){
          userList =  <Container className='placeholder-container'>
                           <SmallPlaceHolder />
                           <SmallPlaceHolder />
                           <SmallPlaceHolder />
                           <SmallPlaceHolder />
                           <SmallPlaceHolder />
                           </Container>
        }else{
          if(this.state.usersLeft.length == 0){
            userList = 'There are no Projects yet'
         }else{
          userList = this.state.usersLeft.map((user)=>
          <UserCard user={user} UserBlock={this.UserBlock} UserOpen={this.UserOpen} MakeUserBoss={this.MakeUserBoss} UnMakeUserBoss={this.UnMakeUserBoss} />
          );
         }
        } 
        return(
            userList
        )
    }

    listUserseven(){

      let userList = ''
      if(this.state.usersRight == null){
        userList = ''
      }else{
        if(this.state.usersRight.length == 0){
          userList = 'There are no Projects yet'
       }else{
        userList = this.state.usersRight.map((user)=>
        <UserCard user={user} UserBlock={this.UserBlock} UserOpen={this.UserOpen} MakeUserBoss={this.MakeUserBoss} UnMakeUserBoss={this.UnMakeUserBoss} />
        );
       }
      } 
        return(
            userList
        )
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

    render(){
        return(
          <React.Fragment>

            <Container className='home-box'>
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
            <Header as='h2'>Users</Header>
            <div className='pagination-user'>
            <PaginationCard sendData={this.sendData} url={this.state.currentUrl} currentUrl={this.currentUrl} count={this.state.count} />
            </div>
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
