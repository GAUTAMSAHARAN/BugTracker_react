import React, { Component } from 'react';
import { Redirect } from 'react-router';
import CookieService from './services/CookieService';
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
    Message,
    Dimmer,
    Loader
  } from "semantic-ui-react";

const axios = require('axios');


class LogIn extends Component{
    constructor(props){
        super(props)

        this.state = {
            IsLoggedIn: false,
            UserId: '',
        }
    }

    async componentDidMount(){
       let code = ''

       const expiresAt = 60*24*10;
       let date = new Date();
       date.setTime(date.getTime() + expiresAt*60*1000);
       let options = { path: '/', expires: date}


       if(CookieService.get('access_token')){
            console.log(CookieService.get('access_token'))
            code = CookieService.get('access_token')
    
            await axios.post('http://127.0.0.1:8000/users/cookielogin/', { code: code }).then((res)=>{
                if(res.data.token !== undefined){
                    console.log(res.data)
                    sessionStorage.setItem("token", res.data.token)
                    CookieService.set('access_token',res.data.token,options)
                    sessionStorage.setItem('IsLoggedIn', true)
                    sessionStorage.setItem("enroll", res.data.user_data.enroll)
                  }   
            })

       }else{
           let url = window.location.href
           code = (url.match(/code=([^&]+)/) || [])[1]

           await axios.post('http://127.0.0.1:8000/users/login/', { code: code }).then((res)=>{
            if(res.data.token !== undefined){
                sessionStorage.setItem("token", res.data.token)
                CookieService.set('access_token',res.data.token,options)
                sessionStorage.setItem('IsLoggedIn', true)
                sessionStorage.setItem("enroll", res.data.user_data.student.enrolmentNumber)
              }
          })
       }

        await fetch(`http://127.0.0.1:8000/users/?boss=&enroll=${parseInt(sessionStorage.getItem('enroll'))}&username=&email=`,{
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Token ${sessionStorage.getItem('token')}`,  
               },
        })
        .then(async response => {
            let data = await response.json()
            let  results = data.results
            if(response.status == 200){
                sessionStorage.setItem('UserId', results[0].id)
                sessionStorage.setItem('admin', results[0].boss == true ? 'true' : 'false')
                this.setState({
                    IsLoggedIn: true,
                })
                console.log(this.state.IsLoggedIn)
            }else{
                this.setState({
                    IsLoggedIn: false,
                })
            }
        })
        .catch(error=>{
            sessionStorage.setItem('IsLoggedIn', 'false')
            console.log('There are some error in loginng in. Try again Later!')
        })
                
    };



    render(){
        if (this.state.IsLoggedIn) {
            return <Redirect to='/app/' />
        }else{
            return(
                <Container className="ContainerDiv">
                    <Dimmer active>
                        <Loader size='massive'>Logging In</Loader>
                    </Dimmer>
                </Container>       
    )
        }
    //     if (this.state.isRequestNotSuccessful) {
    //         return <Redirect to={{
    //             pathname: '/',
    //             state: { error: "You are Disabled by the Master Please Contact Your senior.",res:this.state.res}
    //         }} />
    //     }
    //     else {
    //         return (
    //             <Container className="ContainerDiv">
    //                 <Dimmer active>
    //                     <Loader size='massive'>Logging In</Loader>
    //                 </Dimmer>
    //             </Container>
    //         )
    //     }

       // }    
   }
}

export default LogIn