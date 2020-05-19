import React, { Component } from 'react';
const axios = require('axios');

class LogIn extends Component{
    constructor(props){
        super(props)

        this.state = {
            IsLoggedIn: false
        }
    }

    componentDidMount(){
       let url = window.location.href
       let code = (url.match(/code=([^&]+)/) || [])[1]
       console.log(code);
        axios.post('http://127.0.0.1:8000/users/login/', { code: code }).then((res)=>{
          if(res.data.token !== undefined){
              sessionStorage.setItem("token", res.data.token)
              sessionStorage.setItem('IsLoggedIn', true)
              console.log(res.data.token)
            }
        })
                   
    };
    

    render(){
        return null
    }
}

export default LogIn