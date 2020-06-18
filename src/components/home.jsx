import React, { Component } from 'react';
import './styles/home.scss';
import { Container, Header, Divider, Button, Segment, Card, CardContent } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import LargePlaceHolder from './largeplaceholder';

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
              <div dangerouslySetInnerHTML={{ __html: issue.wiki }} />
            </Card.Description>
            </Card.Content>
    
            <Card.Content extra className='extra-box'  style={{display:  this.state.show ? 'block' : 'none'}}>
              <div className='extra'> 
              <h3><span className='date'>Date:</span><span className='date-format'>{moment(issue.upload_time).fromNow()}</span></h3>
              <span className='project-name'>{issue.projectName}</span>
              </div>
            </Card.Content>
          
         </Card>
        )
    }
}


class Home extends Component{
      
    constructor(props){
        super(props);

        this.state = {
            issues: null,
            type: 'latest',
            IsloggedIn: sessionStorage.getItem('IsLoggedIn'),
            currentUrl: 'http://127.0.0.1:8000/issues/?ordering=-upload_time',
        }

        this.UpdateIssue = this.UpdateIssue.bind(this)
    }
     
    componentDidMount(){
         fetch('http://127.0.0.1:8000/issues/?ordering=-upload_time', {
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`,
               },
         })
         .then(res=>res.json())
         .then(results=>{
            results = results.results
             this.setState({
                 issues: results
             })
         })
    }  
    
    
    UpdateIssue(string){
        let type = string
        let base_url="http://127.0.0.1:8000/issues/?ordering=-upload_time"
        switch(type){
            case "latest":
               base_url += ''
               break
            case "important":
               base_url += '&important=true'
               break
            case "myissues":
               base_url += `&important=&creater=${parseInt(sessionStorage.getItem("UserId"))}&type=&status=&project=`
               break
           default: 
               base_url += ''
               break
        }
        fetch(base_url,{
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Token ${sessionStorage.getItem('token')}`,  
               },
        })
         .then(async response=>{
             let results = await response.json()
               results = results.results
             if(response.status == 200){
                 this.setState({
                     issues: results,
                     currentUrl: base_url,
                 })
             }
         })
         .catch(error=>{
             console.error('Error occur in fetching some data. Try again later!')
         })
    }

    IssueList() {
        let listIssues = ''
        if(this.state.issues == null){
          listIssues =  <Container className='placeholder-container'>
                           <LargePlaceHolder />
                           <LargePlaceHolder />
                           <LargePlaceHolder />
                           <LargePlaceHolder />
                           <LargePlaceHolder />
                           </Container>
        }else{
          if(this.state.issues.length == 0){
            listIssues = <Card fluid className='empty-issue' > 
                         <Card.Content  className='content' >
                         'There are no Issues yet'
                         </Card.Content>
                         </Card>
         }else{
            listIssues = this.state.issues.map((issue) => 
            <IssueCard issue={issue} />
         );
         }
        } 
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

    updateStuff(string){
        console.log('hello')
        let url = this.state.currentUrl
        switch(string){
            case "FRONT":
                url += '&type=FRONT'
                break
            case "BACK":
                url += '&type=BACK'
                break
            default:
                url += ''
                break
        }
        fetch(url,{
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Token ${sessionStorage.getItem('token')}`,  
               },
        })
         .then(async response=>{
             let results = await response.json()
               results = results.results
             if(response.status == 200){
                 this.setState({
                     issues: results,
                     currentUrl: url,
                 })
             }
         })
         .catch(error=>{
             console.error('Error occur in fetching some data. Try again later!', error)
         })

    }

    render(){
        return(
            <Container className='home-box'>
            <Header as='h2'>Issues</Header>
            <Divider section />
            <Segment className='segment'>
                  <div className="option-1">
                 <Button color='red' onClick={(event)=>this.updateStuff('FRONT')}  >Frontend</Button>
                 <Button color='orange' onClick={(event) => this.updateStuff('BACK')}  >Backend</Button>
                 </div>
               <Divider vertical ></Divider>
               <div className="option-2">
                 <Button color='teal' className='button-home' position='right'  onClick={(event)=> this.updateType('latest')}>Latest</Button>
                 <Button color='blue' className='button-home' onClick={(event)=> this.updateType('myissues')}>MyIssues</Button>
                 <Button color='green' className='button-home' >Tags</Button>
                 <Button color='violet' className='button-home' onClick={(event) => this.updateType('important')}>Important</Button>
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


