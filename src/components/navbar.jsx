import React, { Component } from 'react';
import { Input, Icon, Menu, Dropdown  } from 'semantic-ui-react';
import './styles/navbar.scss';
import { Link, Redirect } from 'react-router-dom';
import { ProjectForm } from './projects';
import CookieService from './services/CookieService';

  

//options for the dropdown menu
const options = [
    { key: 1, text: 'This is a super long item', value: 1 },
    { key: 2, text: 'Dropdown direction can help', value: 2 },
    { key: 3, text: 'Items are kept within view', value: 3 },
  ]


class Navbar extends Component {

    constructor(props){
        super(props);

        this.state={
            option: false,
            logout: false,
        }

        this.showOptions = this.showOptions.bind(this)
        this.logout = this.logout.bind(this)
    }

    showOptions(){
      this.setState({
        option: this.state.option ? false : true,
      })
    }

    logout(){
      let options = { path: '/',  expires: -1}
      CookieService.remove('access_token', options);
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('IsLoggedIn')
      this.setState({
        logout: true,
      })
    }

    render(){
        const { activeItem } = this.state
        if(sessionStorage.getItem('IsLoggedIn') == 'true'){
          return(
            <React.Fragment>
              {this.state.logout ? <Redirect to='/' /> : ''}
        <Menu icon className='navbar'>
          <Menu.Item
            name='bars'
            active={activeItem === 'bars'}
            onClick={this.props.hideMenu}
          >
            <i class="fas fa-bars"></i>
          </Menu.Item>
           
          <Link 
             to='/app'
          >
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
          >
            <i class="fas fa-home"></i>
          </Menu.Item>
          </Link>
  
          <Menu.Item>
            <Input className='icon' id='search' icon='search' placeholder='Search...' />
           </Menu.Item>
  
           <Menu.Item position='right'
            name='home'
           >
            <ProjectForm />
          </Menu.Item>
  
          <Menu.Item 
            name='home'
            onClick={this.showOptions}
           >
            <i class="fas fa-cog"></i>
          </Menu.Item>
  
        </Menu>
  
        <div className='option-box' style={{visibility: this.state.option ? 'visible' : 'hidden'}} >
        <Link to={{
          pathname: '/app/user/',
          state: {
            UserId: parseInt(sessionStorage.getItem('UserId'))
          }
        }}
          >
        <div className="user">
        <i class="fas fa-user"></i>
        </div>
        </Link>
        <div className="darktheme">
        <i class="fas fa-moon"></i>
        </div>
        <div className="logout" onClick={(event) => this.logout()}>
        <i class="fas fa-sign-out-alt"></i>
        </div>
        </div>
           </React.Fragment>
          )
        }else{
          return null
        }
    }
}

export default Navbar;