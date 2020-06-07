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
  } from "semantic-ui-react";
import { ProjectCard } from './projects';
import { IssueCard } from './home';
import { CommentCard } from './issue';

class MyPage extends Component{
    constructor(props){
         super(props)

         this.state = {
            activeItem: 'Projects',
            project: [],
            issue: [],
            comment: [],
         }
    }

    componentDidMount(){
        let UserId = parseInt(sessionStorage.getItem('UserId'))
        fetch(`http://127.0.0.1:8000/projects/?creater=${UserId}&upload_time=`,{
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Token ${sessionStorage.getItem('token')}`,  
           },
        })
         .then(res=>res.json())
         .then(results=>{
             this.setState({
                 project: results,
             })
         })

         fetch(`http://127.0.0.1:8000/issues/?important=&creater=${UserId}&type=&status=`,{
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Token ${sessionStorage.getItem('token')}`,  
           },
         })
          .then(res=>res.json())
          .then(results=>{
              this.setState({
                  issue: results,
              })
          })

          fetch(`http://127.0.0.1:8000/comments/?creater=${UserId}`,{
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              'Authorization': `Token ${sessionStorage.getItem('token')}`,  
             },
          })
           .then(res=>res.json())
           .then(results => {
               this.setState({
                  comment: results,
               })
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

    render(){
        const { activeItem } = this.state

        return(
            <Container className='mypage-box'>
            <Header as='h2'>MyPage</Header>
            <Divider section />

            <Grid>
               <Grid.Column width={2}>
                 <Menu fluid vertical tabular>
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
                     onClick={this.handleItemClick}
                   />
                 </Menu>
               </Grid.Column>
       
               <Grid.Column stretched width={12}>
                 <Segment style={{display: this.state.activeItem === 'Projects' ? 'block' : 'none'}}>
                   <Header as='h2'>Projects</Header>
                   <Divider section />
                   <div className='project-container'> 
                   {this.listProjects()}  
                   </div>
                 </Segment>
                 <Segment style={{display: this.state.activeItem === 'Issues' ? 'blocsk' : 'none'}}>
                 <Header as='h2'>Issues</Header>
                   <Divider section />  
                   {this.listIssues()}    
                 </Segment>
                 <Segment style={{display: this.state.activeItem === 'Comments' ? 'block' : 'none'}}>
                 <Header as='h2'>Issues</Header>
                   <Divider section />
                   {this.commentList()}   
                 </Segment>
               </Grid.Column>
             </Grid>
                 
            </Container>
        )
    }
}

export default MyPage;