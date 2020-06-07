import React, { Component } from 'react';
import './styles/home.scss';
import { Container, Header, Divider, Button, Segment, Card, CardContent } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class IssueCard extends Component{
    constructor(props){
        super(props)
        this.state={
            show: false,
        }
        this.Show = this.Show.bind(this)

    }

    Show(){
        if(this.state.show === false){
            this.setState({
                show: true
            })
        }
        if(this.state.show === true){
            this.setState({
               show: false
            })
        }
    }

    render(){
        const {issue} = this.props
        const {show} = this.state
        return(
            <Card fluid color='red' className="issue" key={issue.id}>
         
            <Card.Content className='card-content-1'>
            {show ? (
             <i class='fas fa-minus' onClick={(event)=>this.Show()}></i>
            ) : (
              <i class='fas fa-plus' onClick={(event)=>this.Show()}></i>
            )}
            <Card.Header className='header'>
               { issue.title }
            </Card.Header>
            <Link to={{
                pathname: '/app/issue/',
                state: {
                    IssueId: issue.id 
                }
            }} >
            <i class="fas fa-reply"></i>
            </Link>
            </Card.Content>
            <Card.Content  className='card-content-2' style={{display:  this.state.show ? 'block' : 'none'}}>
            <Card.Description className='description'>
              { issue.wiki } 
            </Card.Description>
            </Card.Content>
    
            <Card.Content extra style={{display:  this.state.show ? 'block' : 'none'}}>
              <h3 ><span className='date'>Date:</span><span className='date-format'>{ issue.upload_time }</span></h3>
            </Card.Content>
          
         </Card>
        )
    }
}


class Home extends Component{
      
    constructor(props){
        super(props);

        this.state = {
            issues: [],
            type: 'latest',
            IsloggedIn: sessionStorage.getItem('IsLoggedIn'),
        }

        this.UpdateIssue = this.UpdateIssue.bind(this)
    }
     
    componentDidMount(){
         fetch('http://127.0.0.1:8000/issues/', {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`,
               },
         })
         .then(res=>res.json())
         .then(results=>{
             this.setState({
                 issues: results
             })
         })
    }  
    
    
    UpdateIssue(string){
        let type = string
        let base_url="http://127.0.0.1:8000/issues/"
        switch(type){
            case "latest":
               base_url += '?ordering=upload_time'
               break
            case "important":
               base_url += '?important=true'
               break
            case "myissues":
               base_url += ''
               break
           default: 
               base_url += '?ordering=upload_time'
               break
        }
        fetch(base_url,{
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Token ${sessionStorage.getItem('token')}`,  
               },
        })
         .then(res=>res.json())
         .then(results=>{
             this.setState({
                 issues: results
             })

         })
    }

    IssueList() {
          let listIssues = this.state.issues.map((issue) => 
           <IssueCard issue={issue} />
        );
        return(
            listIssues
        );
      }
      
    
    updateType = (string)=>{   
           this.setState({
               type: string
           })
           console.log(string)
           console.log(this.state.type)
           this.UpdateIssue(string)
    }

    render(){
        return(
            <Container className='home-box'>
            <Header as='h2'>Issues</Header>
            <Divider section />
            <Segment className='segment'>
                  <div className="option-1">
                 <Button color='red' basic>Frontend</Button>
                 <Button color='blue' basic>Backend</Button>
                 </div>
               <Divider vertical ></Divider>
               <div className="option-2">
                 <Button color='teal' position='right' basic onClick={(event)=> this.updateType('latest')}>Latest</Button>
                 <Button color='blue'basic onClick={(event)=> this.updateType('myissues')}>MyIssues</Button>
                 <Button color='green' basic>Tags</Button>
                 <Button color='violet' basic onClick={(event) => this.updateType('important')}>Important</Button>
                </div>
            </Segment>
            <Divider section />
            <Card.Group>
             { this.IssueList() }
            </Card.Group>
          </Container>
        )
    }
}

export { IssueCard }
export default Home;


