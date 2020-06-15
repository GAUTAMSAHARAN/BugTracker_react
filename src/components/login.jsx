import React, { Component } from 'react';
import { Redirect } from 'react-router';
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
       let url = window.location.href
       let code = (url.match(/code=([^&]+)/) || [])[1]
       console.log(code)
       await axios.post('http://127.0.0.1:8000/users/login/', { code: code }).then((res)=>{
           console.log(res)
          if(res.data.token !== undefined){
              sessionStorage.setItem("token", res.data.token)
              sessionStorage.setItem('IsLoggedIn', true)
              sessionStorage.setItem("enroll", res.data.user_data.student.enrolmentNumber)
            }
        })
        console.log(sessionStorage.getItem("token"))

        await fetch(`http://127.0.0.1:8000/users/?boss=&enroll=${parseInt(sessionStorage.getItem('enroll'))}&username=&email=`,{
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Token ${sessionStorage.getItem('token')}`,  
               },
        })
        .then(res=>res.json())
        .then(results=>{
              results = results.results
              sessionStorage.setItem('UserId', results[0].id)
            })
                
    };
    
    async componentDidUpdate(){
        let url = window.location.href
        let code = (url.match(/code=([^&]+)/) || [])[1]
        await axios.post('http://127.0.0.1:8000/users/login/', { code: code }).then((res)=>{
           if(res.status == 200 || res.status == 201 ){
               if(res.data.token !== undefined){
                   sessionStorage.setItem("token", res.data.token)
                   sessionStorage.setItem('IsLoggedIn', true)
                   sessionStorage.setItem("enroll", res.data.user_data.student.enrolmentNumber)
                 }
           }
         })
         fetch(`http://127.0.0.1:8000/users/?boss=&enroll=${parseInt(sessionStorage.getItem('enroll'))}&username=&email=`,{
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Token ${sessionStorage.getItem('token')}`,  
               },
        })
        .then(res=>res.json())
        .then(results=>{
              results = results.results
              sessionStorage.setItem('UserId', results[0].id)
              sessionStorage.setItem('admin', results[0].boss)
            })
    }

    render(){
        return(
            // <Redirect to='/app/' />
            null
        )

    }
}

export default LogIn