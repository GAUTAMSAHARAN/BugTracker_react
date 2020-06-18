import React, { Component } from 'react';
import './styles/mypage.scss';
import {
    Container,
    Header,
    Divider,
    Button,
    Segment,
    Card,
    Icon,
    Menu,    
    Grid,
    Message
  } from "semantic-ui-react";
import { ProjectCard } from './projects';
import { IssueCard } from './home';
import { CommentCard } from './issue';
import PaginationCard from './pagination';

class MyPage extends Component{
    constructor(props){
         super(props)

         this.state = {
            activeItem: 'Projects',
            project: [],
            issue: [],
            comment: [],
            currentUrlProject: `http://127.0.0.1:8000/projects/?page=1&creater=${parseInt(sessionStorage.getItem('UserId'))}&upload_time=`,
            currentUrlIssue: `http://127.0.0.1:8000/issues/?page=1&creater=${parseInt(sessionStorage.getItem('UserId'))}&upload_time=`,
            countProject: '',
            countIssue: '',
         }

         this.sendDataProject= this.sendDataProject.bind(this)
         this.sendDataIssue = this.sendDataIssue.bind(this)
         this.currentUrlProject = this.currentUrlProject.bind(this)
         this.currentUrlIssue = this.currentUrlIssue.bind(this)
    }

    componentDidMount(){
        let UserId = parseInt(sessionStorage.getItem('UserId'))
        fetch(`http://127.0.0.1:8000/projects/?page=1&creater=${UserId}&upload_time=`,{
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Token ${sessionStorage.getItem('token')}`,  
           },
        })
         .then( async response => {
           let data = await response.json()
           let results = data.results
           this.setState({
             countProject: data.count
           })
           if(response.status == 200){
            this.setState({
              project: results,
          })
           }
         })
         .catch((error)=>{
           console.error('Error occur while fetching some data. Try again later!')
         })

         fetch(`http://127.0.0.1:8000/issues/?page=1&important=&creater=${UserId}&type=&status=`,{
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Token ${sessionStorage.getItem('token')}`,  
           },
         })
          .then(async response => {
            let data = await response.json()
            let results = data.results
            this.setState({
              countIssue: data.count
            })
            if(response.status == 200){
              this.setState({
                  issue: results,
              })
            }
          })
          .catch(error=>{
            console.log('Error in fetching data. Try again later!')
          })

          fetch(`http://127.0.0.1:8000/comments/?creater=${UserId}`,{
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              'Authorization': `Token ${sessionStorage.getItem('token')}`,  
             },
          })
           .then(async response => {
             let data = await response.json()
             let results = data.results
             if(response.status == 200){
               this.setState({
                  comment: results,
               })
             }
           })
           .catch(error=>{
             console.error('Error occur in fetching some data. Try again later!')
           })

        
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    listProjects(){
        let listproject = this.state.project.map((project) => 
            <ProjectCard project={project} />
        );
        return(
           listproject
        )
    }

    listIssues(){
        let Issuelist = this.state.issue.map((issue)=>
            <IssueCard issue={issue} />
        );
        return(
            Issuelist
        ) 
    } 

    commentList(){
        let listcomments = this.state.comment.map((comment)=>
            <CommentCard comment={comment} />
        );
        return(
            listcomments
        )
    }

    sendDataProject(data){
      this.setState({
        project: data,
      })
    }
  
    currentUrlProject(data){
     this.setState({
       currentUrlProject: data,
     })
    }

    sendDataIssue(data){
      this.setState({
       issue: data,
      })
    }
  
    currentUrlIssue(data){
     this.setState({
       currentUrlIssue: data,
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
        const { activeItem } = this.state

        return(
            <Container className='mypage-box'>
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
            <Header as='h2'>MyPage</Header>
            <Divider section />

        <Menu  tabular>
          <Menu.Item
            name='Projects'
            active={activeItem === 'Projects'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Issues'
            active={activeItem === 'Issues'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
          name='Comments'
          active={activeItem === 'Comments'}
          onClick = {this.handleItemClick}
          />
        </Menu>

        <Segment className='projects-box'  style={{display: this.state.activeItem === 'Projects' ? 'block' : 'none'}}>
         <Header as='h2'>Projects</Header>
         <PaginationCard sendData={this.sendDataProject} url={this.state.currentUrlProject} currentUrl={this.currentUrlProject} count={this.state.countProject} />
         <Divider section />
         <div className='project-container'> 
         {this.listProjects()}  
         </div>
         </Segment>

         <Segment style={{display: this.state.activeItem === 'Issues' ? 'block' : 'none'}}>
         <Header as='h2'>Issues</Header>
         <PaginationCard sendData={this.sendDataIssue} url={this.state.currentUrlIssue} currentUrl={this.currentUrlIssue} count={this.state.countIssue} />
         <Divider section />  
         {this.listIssues()}    
         </Segment>

         <Segment style={{display: this.state.activeItem === 'Comments' ? 'block' : 'none'}}>
         <Header as='h2'>Comments</Header>
         <Divider section />
         <div className="comment-box">
         {this.commentList()}   
         </div>
         </Segment>
                 
            </Container>


        )
    }
}

export default MyPage;