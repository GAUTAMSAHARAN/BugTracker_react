import  React, { Component } from 'react';
import Notfound from './images/404.jpg';


class NotFound extends Component{
    render(){
        return(     
            <React.Fragment>
              <img src={Notfound} onClick={this.props.hide} />
            </React.Fragment>
        )
    }
}

export default NotFound;