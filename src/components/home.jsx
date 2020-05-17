import React, { Component } from 'react';
import './styles/home.scss';
import { Container, Header, Divider, Button, Segment, Card, CardContent } from 'semantic-ui-react';

class Home extends Component{
      
    constructor(props){
        super(props);

        this.state = {
            issues: [],
            type: 'none'
        }

        this.updateType = this.updateType.bind(this)
    }
     
    componentDidMount(){
         fetch('http://127.0.0.1:8000/home/')
         .then(res=>res.json())
         .then(results=>{
             this.setState({
                 issues: results
             })
         })
    }  
    
    
    UpdateIssue(){
        let type = this.state.type
        let base_url="http://127.0.0.1:8000/home/"
        switch(type){
            case "latest":
               base_url += ''
               break
            case "important":
               base_url += ''
               break
            case "myissues":
               base_url += ''
               break
           default: 
               base_url += ''
               break
        }
        fetch(base_url)
         .then(res=>res.json())
         .then(results=>{
             this.setState({
                 issues: results
             })
         })
    }
    
    IssueList() {
          let listIssues = this.state.issues.map((issue) => 
          <Card fluid color='red' className="issue">
         
          <Card.Content className='card-content-1'>
          <i class="fas fa-plus"></i>
          <Card.Header className='header'>
             { issue.title }
          </Card.Header>
          <i class="fas fa-reply"></i>
          </Card.Content>
  
          <Card.Content  className='card-content-2'>
          <Card.Description className='description'>
            { issue.wiki } 
          </Card.Description>
          </Card.Content>
  
          <Card.Content extra>
            <h3 ><span className='date'>Date:</span><span className='date-format'>{ issue.upload_time }</span></h3>
          </Card.Content>

       </Card>
        );
        return(
            listIssues
        );
      }
      
    
    updateType = (string)=>{   
           this.setState({
               type: string
           })
           this.updateIssue()
    }

    render(){
        return(
            <Container className='home-box'>
            <Header as='h2'>Issues</Header>
            <Divider section />
            <Segment className='segment'>
               <Button.Group  className='option-1'>
                 <Button color='red' basic>Frontend</Button>
                 <Button color='blue' basic>Backend</Button>
               </Button.Group>
               <Divider vertical></Divider>
               <Button.Group floated='right' className='option-2'>
                 <Button color='teal' basic onClick={(event)=> this.updateType('latest')}>Latest</Button>
                 <Button color='blue'basic onClick={(event)=> this.updateType('myissues')}>MyIssues</Button>
                 <Button color='green' basic>Tags</Button>
                 <Button color='violet' basic onClick={(event) => this.updateType('important')}>Important</Button>
               </Button.Group>
                </Segment>
            <Divider section />
            <Card.Group>
             { this.IssueList() }
            </Card.Group>
          </Container>
        )
    }
}

export default Home;


