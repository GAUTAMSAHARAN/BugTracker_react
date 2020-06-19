import React, { Component } from 'react';
import CookieService from './services/CookieService';
import {
    Button,
  } from "semantic-ui-react";
import { Redirect } from 'react-router-dom';

class GetTokken extends Component{

    render(){
        if(CookieService.get('access_token') != undefined){
            return <Redirect to='/login' />
        }else{
            return(
               <a href="https://internet.channeli.in/oauth/authorise/?client_id=l1Wb17BXy5ZoQeJ1fzOtZutOObUrzSi9fW1xxLGR&redirect_url=http://localhost:8000/bug_reporter/login/&state=RANDOM_STATE_STRING&scope=Person" ><Button>Log In</Button></a>
            )
        }
    }
}

export default GetTokken;