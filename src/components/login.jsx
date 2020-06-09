import React, { Component } from 'react';
import { Redirect } from 'react-router';
const axios = require('axios');

class LogIn extends Component{
    constructor(props){
        super(props)

        this.state = {
            IsLoggedIn: false,
            enroll: '',
            UserId: '',
        }
    }

    async componentDidMount(){
       let url = window.location.href
       let code = (url.match(/code=([^&]+)/) || [])[1]
       console.log(code);
       await axios.post('http://127.0.0.1:8000/users/login/', { code: code }).then((res)=>{
          if(res.data.token !== undefined){
              sessionStorage.setItem("token", res.data.token)
              sessionStorage.setItem('IsLoggedIn', true)
              this.setState({
                  enroll: res.data.user_data.student.enrolmentNumber,
              })
              console.log(res.data.user_data.student.enrolmentNumber)
            }
        })

        fetch(`http://127.0.0.1:8000/users/?boss=&enroll=${this.state.enroll}&username=&email=`,{
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Token ${sessionStorage.getItem('token')}`,  
               },
        })
        .then(res=>res.json())
        .then(results=>{
             results = results.results
              this.setState({
                 UserId: results[0].id
              })
              sessionStorage.setItem('UserId', this.state.UserId)
              console.log(this.state.UserId)
              console.log(sessionStorage.getItem('UserId'))
            })
        
    };
    

    render(){
        return(
            null
        )

    }
}

export default LogIn