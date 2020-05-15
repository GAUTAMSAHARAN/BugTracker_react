import React, { Component } from 'react';
import './styles/home.scss';
import { Container, Header, Divider, Button, Segment, Card, CardContent } from 'semantic-ui-react';

class Home extends Component{
      
    constructor(props){
        super(props);

        this.state = {
            LatestIssues: [],
            ImportantIssues: [],
            myIssues: [],
            type: 'none'
        }

        this.updateIssue = this.updateIssue.bind(this)
    }
     
    componentDidMount(){

        fetch('http://127.0.0.1:8000/home?important=True')
         .then(res=>res.json())
         .then(results=>{
             results = results.results
             this.setState({
                 ImportantIssues: results
             })
             console.log(this.state.ImportantIssues);
         })

         fetch('http://127.0.0.1:8000/home/')
         .then(res=>res.json())
         .then(results=>{
             results = results.results
             this.setState({
                 LatestIssues: results
             })
             console.log(this.state.LatestIssues);
         })

         fetch('http://127.0.0.1:8000/home?creater=2')
         .then(res=>res.json())
         .then(results=>{
             results = results.results
             this.setState({
                 myIssues: results
             })
             console.log(this.state.myIssues);
         })
        
    }
    
    IssueList() {
             if(this.state.type==='latest' || this.state.type==='none'){
             let listIssues = this.state.LatestIssues.map((issue) => 
             <Card fluid color='red' id="issue">
         
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
        return (
            listIssues
        )}
        else if(this.state.type==='myissues'){
            let listIssues = this.state.myIssues.map((issue) => 
            <Card fluid color='red' id="issue">
         
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
            return (
                listIssues
            )} else if(this.state.type==='important'){
            let listIssues = this.state.ImportantIssues.map((issue) => 
            <Card fluid color='red' id="issue">
         
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
            return (
                listIssues
            )}
      }
      
    
    updateIssue = (string)=>{ 
       if(string === "myissues"){
           this.setState({
               type: "myissues"
           })
           console.log(this.state.type)
       }if(string === 'important'){
          this.setState({
              type: "important"
          })
          console.log(this.state.type)
       }if(string === 'latest'){
           this.setState({
               type: "latest"
           })
           console.log(this.state.type)
       }
    }

    render(){
        return(
            <Container className='box'>
            <Header as='h2'>Issues</Header>
            <Divider section />
            <Segment className='segment'>
               <Button.Group  className='option-1'>
                 <Button color='red' basic>Frontend</Button>
                 <Button color='blue' basic>Backend</Button>
               </Button.Group>
               <Divider vertical></Divider>
               <Button.Group floated='right' className='option-2'>
                 <Button color='teal' basic onClick={(event)=> this.updateIssue('latest')}>Latest</Button>
                 <Button color='blue'basic onClick={(event)=> this.updateIssue('myissues')}>MyIssues</Button>
                 <Button color='green' basic>Tags</Button>
                 <Button color='violet' basic onClick={(event) => this.updateIssue('important')}>Important</Button>
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