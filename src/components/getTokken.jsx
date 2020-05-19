import React, { Component } from 'react';
import {
    Button,
  } from "semantic-ui-react";

class GetTokken extends Component{

    render(){
        return(
           <a href="https://internet.channeli.in/oauth/authorise/?client_id=l1Wb17BXy5ZoQeJ1fzOtZutOObUrzSi9fW1xxLGR&redirect_url=http://localhost:8000/bug_reporter/login/&state=RANDOM_STATE_STRING&scope=Person" ><Button>Log In</Button></a>
        )
    }
}

export default GetTokken;